import { useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowRight, Check, RotateCcw } from 'lucide-react';
import GatoSuerte from './GatoSuerte';
import type { Palabra } from '../types';
import { barajar } from '../utils/barajar';
import { normalizarRespuesta } from '../utils/texto';
import './JuegoEscritura.css';

interface Props {
  palabras: Palabra[];
  cantidad: number;
  colorDe: (categoriaId: string) => string;
  // Se llama una sola vez al terminar, con las escritas bien al primer intento.
  onTerminar: (aciertos: number, total: number) => void;
  onSalir: () => void;
}

// Modo escritura (spelling): se muestra el significado en español y hay que
// ESCRIBIR la palabra en inglés. Practica ortografía y memoria activa.
export default function JuegoEscritura({ palabras, cantidad, colorDe, onTerminar, onSalir }: Props) {
  const [ronda] = useState(() => barajar(palabras).slice(0, cantidad));
  const [indice, setIndice] = useState(0);
  const [respuesta, setRespuesta] = useState('');
  const [resultado, setResultado] = useState<'bien' | 'mal' | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const actual = ronda[indice];

  function comprobar() {
    if (respuesta.trim() === '' || resultado !== null) return;
    if (normalizarRespuesta(respuesta) === normalizarRespuesta(actual.termino)) {
      setAciertos((a) => a + 1);
      setResultado('bien');
    } else {
      setResultado('mal');
    }
  }

  function siguiente() {
    if (indice + 1 < ronda.length) {
      setIndice(indice + 1);
      setRespuesta('');
      setResultado(null);
    } else {
      setTerminado(true);
      onTerminar(aciertos, ronda.length);
    }
  }

  if (terminado) {
    return (
      <div className="tarjeta juego-final">
        <GatoSuerte mensaje="Well done!" />
        <h2>¡Ronda de escritura completada!</h2>
        <p className="texto-suave">
          Escribiste bien {aciertos} de {ronda.length} palabras. Tu personaje ganó XP.
        </p>
        <button className="btn-primario" onClick={onSalir}>
          <RotateCcw size={18} />
          Volver al vocabulario
        </button>
      </div>
    );
  }

  return (
    <div className="escritura">
      <div className="juego-estado">
        <span className="texto-suave">
          Palabra {indice + 1} de {ronda.length}
        </span>
        <button className="btn-icono" onClick={onSalir}>
          Salir del juego
        </button>
      </div>

      <div
        className="tarjeta escritura-significado"
        style={{ '--cat-color': colorDe(actual.categoriaId) } as CSSProperties}
      >
        <span>{actual.significado}</span>
        <span className="carta-pista">Escribe la palabra en inglés</span>
      </div>

      <input
        value={respuesta}
        onChange={(e) => setRespuesta(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === 'Enter') (resultado === null ? comprobar : siguiente)();
        }}
        placeholder="Escribe aquí…"
        aria-label="Tu respuesta en inglés"
        autoCapitalize="none"
        autoCorrect="off"
        spellCheck={false}
      />

      {resultado === 'bien' && <p className="escritura-mensaje bien">¡Correcto! ✨ {actual.termino}</p>}
      {resultado === 'mal' && (
        <p className="escritura-mensaje mal">
          Casi. La forma correcta es: {actual.termino}
        </p>
      )}

      <div className="escritura-acciones">
        {resultado === null ? (
          <button className="btn-primario" onClick={comprobar} disabled={respuesta.trim() === ''}>
            <Check size={18} />
            Comprobar
          </button>
        ) : (
          <button className="btn-primario" onClick={siguiente}>
            {indice + 1 < ronda.length ? 'Siguiente' : 'Ver resultado'}
            <ArrowRight size={18} />
          </button>
        )}
      </div>
    </div>
  );
}
