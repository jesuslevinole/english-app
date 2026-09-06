import { useState } from 'react';
import { ArrowRight, Check, Eye, Trophy } from 'lucide-react';
import { barajar } from '../utils/barajar';
import './OrdenarOracion.css';

interface Ficha {
  id: number;
  palabra: string;
}

interface Props {
  oraciones: string[];
  // Cuántas oraciones entran en la partida (sube con el nivel).
  maxOraciones: number;
  // Se llama una sola vez al terminar: aciertos = correctas al primer intento.
  onTerminar: (aciertos: number, total: number) => void;
}

function fichasDe(oracion: string): Ficha[] {
  return barajar(oracion.split(' ').map((palabra, id) => ({ id, palabra })));
}

// Juego de armar oraciones: se muestran las palabras desordenadas y hay que
// tocarlas en orden para construir la oración correcta.
export default function OrdenarOracion({ oraciones, maxOraciones, onTerminar }: Props) {
  const [ronda] = useState(() => barajar(oraciones).slice(0, maxOraciones));
  const [indice, setIndice] = useState(0);
  const [disponibles, setDisponibles] = useState<Ficha[]>(() => fichasDe(ronda[0]));
  const [construida, setConstruida] = useState<Ficha[]>([]);
  const [resultado, setResultado] = useState<'bien' | 'mal' | null>(null);
  const [intentos, setIntentos] = useState(0);
  const [fallada, setFallada] = useState(false);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const oracionActual = ronda[indice];

  function ponerFicha(ficha: Ficha) {
    if (resultado === 'bien') return;
    setDisponibles(disponibles.filter((f) => f.id !== ficha.id));
    setConstruida([...construida, ficha]);
    setResultado(null);
  }

  function quitarFicha(ficha: Ficha) {
    if (resultado === 'bien') return;
    setConstruida(construida.filter((f) => f.id !== ficha.id));
    setDisponibles([...disponibles, ficha]);
    setResultado(null);
  }

  function comprobar() {
    const propuesta = construida.map((f) => f.palabra).join(' ');
    if (propuesta === oracionActual) {
      if (!fallada) setAciertos((a) => a + 1);
      setResultado('bien');
    } else {
      setResultado('mal');
      setFallada(true);
      setIntentos((i) => i + 1);
    }
  }

  function verSolucion() {
    setConstruida(oracionActual.split(' ').map((palabra, id) => ({ id, palabra })));
    setDisponibles([]);
    setFallada(true);
    setResultado('bien');
  }

  function siguiente() {
    if (indice + 1 < ronda.length) {
      const proxima = indice + 1;
      setIndice(proxima);
      setDisponibles(fichasDe(ronda[proxima]));
      setConstruida([]);
      setResultado(null);
      setIntentos(0);
      setFallada(false);
    } else {
      setTerminado(true);
      onTerminar(aciertos, ronda.length);
    }
  }

  if (terminado) {
    return (
      <div className="cuestionario-final">
        <Trophy size={40} />
        <p className="cuestionario-puntaje">
          {aciertos} / {ronda.length}
        </p>
        <p className="texto-suave">Oraciones armadas al primer intento. ¡Sigue así!</p>
      </div>
    );
  }

  return (
    <div className="ordenar">
      <p className="texto-suave">
        Oración {indice + 1} de {ronda.length} · Toca las palabras en orden para armar la oración
      </p>

      <div
        className={`ordenar-zona${resultado === 'bien' ? ' correcta' : ''}${resultado === 'mal' ? ' incorrecta' : ''}`}
        aria-label="Tu oración"
      >
        {construida.length === 0 && <span className="texto-suave">Tu oración va aquí…</span>}
        {construida.map((f) => (
          <button key={f.id} className="ficha puesta" onClick={() => quitarFicha(f)}>
            {f.palabra}
          </button>
        ))}
      </div>

      <div className="ordenar-fichas" aria-label="Palabras disponibles">
        {disponibles.map((f) => (
          <button key={f.id} className="ficha" onClick={() => ponerFicha(f)}>
            {f.palabra}
          </button>
        ))}
      </div>

      {resultado === 'bien' && (
        <p className="ordenar-mensaje bien">¡Correcto! {oracionActual}</p>
      )}
      {resultado === 'mal' && (
        <p className="ordenar-mensaje mal">Ese no es el orden. Reacomoda e intenta otra vez.</p>
      )}

      <div className="ordenar-acciones">
        {resultado === 'mal' && intentos >= 2 && (
          <button className="btn-contorno" onClick={verSolucion}>
            <Eye size={18} />
            Ver solución
          </button>
        )}
        {resultado === 'bien' ? (
          <button className="btn-primario" onClick={siguiente}>
            {indice + 1 < ronda.length ? 'Siguiente' : 'Ver resultado'}
            <ArrowRight size={18} />
          </button>
        ) : (
          <button className="btn-primario" onClick={comprobar} disabled={disponibles.length > 0}>
            <Check size={18} />
            Comprobar
          </button>
        )}
      </div>
    </div>
  );
}
