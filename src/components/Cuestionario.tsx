import { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import GatoSuerte from './GatoSuerte';
import type { Ejercicio } from '../types';
import { barajar } from '../utils/barajar';
import './Cuestionario.css';

interface Props {
  ejercicios: Ejercicio[];
  // Máximo de preguntas por sesión (sube con el nivel del personaje).
  maxPreguntas?: number;
  // Se llama una sola vez al terminar, con los aciertos obtenidos.
  onTerminar: (aciertos: number, total: number) => void;
}

// Cuestionario de opción múltiple, compartido por Gramática y Listening.
// Baraja las preguntas al montar para que el orden nunca sea predecible.
export default function Cuestionario({ ejercicios, maxPreguntas, onTerminar }: Props) {
  const [orden] = useState(() => barajar(ejercicios).slice(0, maxPreguntas ?? ejercicios.length));
  const [indice, setIndice] = useState(0);
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  const actual = orden[indice];

  function responder(opcion: number) {
    if (seleccion !== null) return;
    setSeleccion(opcion);
    if (opcion === actual.respuesta) setAciertos((a) => a + 1);
  }

  function siguiente() {
    if (indice + 1 < orden.length) {
      setIndice(indice + 1);
      setSeleccion(null);
    } else {
      setTerminado(true);
      onTerminar(aciertos, orden.length);
    }
  }

  if (terminado) {
    return (
      <div className="cuestionario-final">
        <GatoSuerte mensaje={aciertos === orden.length ? 'Perfect!' : 'Good job!'} />
        <p className="cuestionario-puntaje">
          {aciertos} / {orden.length}
        </p>
        <p className="texto-suave">
          {aciertos === orden.length
            ? '¡Perfecto! Dominas este tema.'
            : 'Repasa la lección y los videos del tema y vuelve a intentarlo.'}
        </p>
      </div>
    );
  }

  return (
    <div>
      <p className="cuestionario-progreso texto-suave">
        Pregunta {indice + 1} de {orden.length}
      </p>
      <p className="cuestionario-pregunta">{actual.pregunta}</p>
      <div className="cuestionario-opciones">
        {actual.opciones.map((texto, i) => {
          let modificador = '';
          if (seleccion !== null) {
            if (i === actual.respuesta) modificador = ' correcta';
            else if (i === seleccion) modificador = ' incorrecta';
          }
          return (
            <button
              key={texto}
              className={`opcion${modificador}`}
              onClick={() => responder(i)}
              disabled={seleccion !== null}
            >
              {texto}
            </button>
          );
        })}
      </div>
      {seleccion !== null && (
        <div className="cuestionario-pie">
          <button className="btn-primario" onClick={siguiente}>
            {indice + 1 < orden.length ? 'Siguiente' : 'Ver resultado'}
            <ArrowRight size={18} />
          </button>
        </div>
      )}
    </div>
  );
}
