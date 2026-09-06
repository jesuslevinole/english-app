import { useEffect, useState } from 'react';
import { ArrowRight, Check, Trophy } from 'lucide-react';
import type { Ejercicio, TipoEjercicio } from '../types';
import { barajar } from '../utils/barajar';
import { normalizarRespuesta } from '../utils/texto';
import './Cuestionario.css';

interface Props {
  ejercicios: Ejercicio[];
  // Máximo de preguntas por sesión (sube con el nivel del personaje).
  maxPreguntas?: number;
  // Se llama una sola vez al terminar, con los aciertos obtenidos.
  onTerminar: (aciertos: number, total: number) => void;
}

function tipoDe(e: Ejercicio): TipoEjercicio {
  return e.tipo ?? 'opciones';
}

// Descarta documentos malformados (datos viejos o cargas a mano incompletas).
function esValido(e: Ejercicio): boolean {
  const tipo = tipoDe(e);
  if (tipo === 'opciones') return !!e.opciones && e.opciones.length >= 2 && e.respuesta != null;
  if (tipo === 'ordenar') return !!e.oracion && e.oracion.trim().includes(' ');
  return !!e.respuestaTexto;
}

// Cuestionario con tres modos de juego, compartido por Gramática y Listening:
// elegir opción, armar la oración en orden, y escribir la respuesta.
// Baraja las preguntas al montar para que el orden nunca sea predecible.
export default function Cuestionario({ ejercicios, maxPreguntas, onTerminar }: Props) {
  const [orden] = useState(() => {
    const validos = ejercicios.filter(esValido);
    return barajar(validos).slice(0, maxPreguntas ?? validos.length);
  });
  const [indice, setIndice] = useState(0);
  const [aciertos, setAciertos] = useState(0);
  const [terminado, setTerminado] = useState(false);

  // estado de la pregunta en curso
  const [resuelto, setResuelto] = useState<boolean | null>(null); // null = sin responder
  const [seleccion, setSeleccion] = useState<number | null>(null);
  const [texto, setTexto] = useState('');
  const [banco, setBanco] = useState<string[]>([]);
  const [elegidas, setElegidas] = useState<number[]>([]); // índices del banco, en orden

  const actual: Ejercicio | undefined = orden[indice];

  useEffect(() => {
    if (!actual) return;
    setResuelto(null);
    setSeleccion(null);
    setTexto('');
    setElegidas([]);
    if (tipoDe(actual) === 'ordenar') setBanco(barajar(actual.oracion!.split(/\s+/)));
  }, [actual]);

  if (!actual) {
    return <p className="vacio">Este tema aún no tiene ejercicios jugables.</p>;
  }

  const tipo = tipoDe(actual);

  function acertar(ok: boolean) {
    setResuelto(ok);
    if (ok) setAciertos((a) => a + 1);
  }

  function responderOpcion(opcion: number) {
    if (resuelto !== null) return;
    setSeleccion(opcion);
    acertar(opcion === actual!.respuesta);
  }

  function comprobarTexto() {
    if (resuelto !== null || texto.trim() === '') return;
    acertar(normalizarRespuesta(texto) === normalizarRespuesta(actual!.respuestaTexto!));
  }

  function comprobarOrden() {
    if (resuelto !== null || elegidas.length !== banco.length) return;
    const armada = elegidas.map((i) => banco[i]).join(' ');
    acertar(normalizarRespuesta(armada) === normalizarRespuesta(actual!.oracion!));
  }

  function siguiente() {
    if (indice + 1 < orden.length) {
      setIndice(indice + 1);
    } else {
      setTerminado(true);
      onTerminar(aciertos, orden.length);
    }
  }

  if (terminado) {
    return (
      <div className="cuestionario-final">
        <Trophy size={40} />
        <p className="cuestionario-puntaje">
          {aciertos} / {orden.length}
        </p>
        <p className="texto-suave">
          {aciertos === orden.length
            ? '¡Perfecto! Dominas este tema.'
            : 'Repasa la lección y los videos, y vuelve a intentarlo.'}
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

      {tipo === 'opciones' && (
        <div className="cuestionario-opciones">
          {actual.opciones!.map((textoOpcion, i) => {
            let modificador = '';
            if (resuelto !== null) {
              if (i === actual.respuesta) modificador = ' correcta';
              else if (i === seleccion) modificador = ' incorrecta';
            }
            return (
              <button
                key={textoOpcion}
                className={`opcion${modificador}`}
                onClick={() => responderOpcion(i)}
                disabled={resuelto !== null}
              >
                {textoOpcion}
              </button>
            );
          })}
        </div>
      )}

      {tipo === 'ordenar' && (
        <div>
          {actual.traduccion && <p className="texto-suave">“{actual.traduccion}”</p>}
          <div className="oracion-armada" aria-label="Tu oración">
            {elegidas.length === 0 ? (
              <span className="texto-suave">Toca las palabras en orden…</span>
            ) : (
              elegidas.map((i) => (
                <button
                  key={i}
                  className="palabra-ficha en-oracion"
                  onClick={() => resuelto === null && setElegidas(elegidas.filter((x) => x !== i))}
                  disabled={resuelto !== null}
                >
                  {banco[i]}
                </button>
              ))
            )}
          </div>
          <div className="banco-palabras">
            {banco.map((palabra, i) => (
              <button
                key={i}
                className="palabra-ficha"
                onClick={() => resuelto === null && setElegidas([...elegidas, i])}
                disabled={resuelto !== null || elegidas.includes(i)}
              >
                {palabra}
              </button>
            ))}
          </div>
          {resuelto === null && (
            <button
              className="btn-primario"
              onClick={comprobarOrden}
              disabled={elegidas.length !== banco.length}
            >
              <Check size={18} />
              Comprobar
            </button>
          )}
        </div>
      )}

      {tipo === 'escribir' && (
        <div>
          {actual.pista && <p className="texto-suave">Pista: {actual.pista}</p>}
          <input
            className="campo-escribir"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') comprobarTexto();
            }}
            disabled={resuelto !== null}
            placeholder="Escribe tu respuesta en inglés…"
            aria-label="Tu respuesta"
          />
          {resuelto === null && (
            <button className="btn-primario" onClick={comprobarTexto} disabled={texto.trim() === ''}>
              <Check size={18} />
              Comprobar
            </button>
          )}
        </div>
      )}

      {resuelto !== null && (
        <p className={`feedback ${resuelto ? 'feedback-ok' : 'feedback-mal'}`}>
          {resuelto
            ? '¡Correcto! 🎉'
            : `Casi. La respuesta era: ${
                tipo === 'ordenar'
                  ? actual.oracion
                  : tipo === 'escribir'
                    ? actual.respuestaTexto
                    : actual.opciones![actual.respuesta!]
              }`}
        </p>
      )}

      {resuelto !== null && (
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
