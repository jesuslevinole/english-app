import { useMemo, useRef, useState } from 'react';
import { ArrowLeft, RotateCcw } from 'lucide-react';
import type { Palabra } from '../types';
import { barajar } from '../utils/barajar';
import GatoSuerte from './GatoSuerte';
import './JuegoParejas.css';

interface Props {
  palabras: Palabra[];
  // (paresEncontrados, intentos) una sola vez al completar el tablero
  onTerminar: (pares: number, intentos: number) => void;
  onSalir: () => void;
}

interface Carta {
  palabraId: string;
  texto: string;
  emoji?: string;
}

const PARES_POR_TABLERO = 8;

// Juego de memoria: encuentra cada palabra con su significado.
// Forma inteligente de practicar: obliga a leer y recordar posiciones.
export default function JuegoParejas({ palabras, onTerminar, onSalir }: Props) {
  const [intento, setIntento] = useState(0);
  const cartas = useMemo<Carta[]>(() => {
    const elegidas = barajar(palabras).slice(0, PARES_POR_TABLERO);
    return barajar(
      elegidas.flatMap((p) => [
        { palabraId: p.id, texto: p.termino, emoji: p.emoji },
        { palabraId: p.id, texto: p.significado },
      ]),
    );
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [palabras, intento]);

  const pares = cartas.length / 2;
  const [abiertas, setAbiertas] = useState<number[]>([]);
  const [resueltas, setResueltas] = useState<Set<string>>(new Set());
  const [intentos, setIntentos] = useState(0);
  const avisado = useRef(false);
  const cerrando = useRef<number | null>(null);

  function reiniciar() {
    if (cerrando.current) window.clearTimeout(cerrando.current);
    setIntento((i) => i + 1);
    setAbiertas([]);
    setResueltas(new Set());
    setIntentos(0);
    avisado.current = false;
  }

  function tocar(indice: number) {
    const carta = cartas[indice];
    if (resueltas.has(carta.palabraId) || abiertas.includes(indice)) return;
    if (abiertas.length === 2) return; // esperando el cierre de un error

    const nuevas = [...abiertas, indice];
    setAbiertas(nuevas);
    if (nuevas.length < 2) return;

    setIntentos((n) => n + 1);
    const [a, b] = nuevas;
    if (cartas[a].palabraId === cartas[b].palabraId) {
      const listas = new Set(resueltas);
      listas.add(carta.palabraId);
      setResueltas(listas);
      setAbiertas([]);
      if (listas.size === pares && !avisado.current) {
        avisado.current = true;
        onTerminar(pares, intentos + 1);
      }
    } else {
      cerrando.current = window.setTimeout(() => setAbiertas([]), 750);
    }
  }

  if (resueltas.size === pares && pares > 0) {
    return (
      <div className="tarjeta parejas-final">
        <GatoSuerte mensaje="Perfect match!" />
        <p className="cuestionario-puntaje">
          {pares} pares en {intentos} intentos
        </p>
        <p className="texto-suave">
          Menos intentos = mejor memoria. ¿Puedes bajar tu marca?
        </p>
        <div className="examen-acciones">
          <button className="btn-primario" onClick={reiniciar}>
            <RotateCcw size={18} />
            Otra ronda
          </button>
          <button className="btn-contorno" onClick={onSalir}>
            Volver
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="parejas">
      <div className="titulo-seccion">
        <h2>
          Parejas · {resueltas.size}/{pares}
        </h2>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Salir
        </button>
      </div>
      <p className="texto-suave">Encuentra cada palabra con su significado. Intentos: {intentos}</p>
      <div className="parejas-grid">
        {cartas.map((carta, i) => {
          const abierta = abiertas.includes(i) || resueltas.has(carta.palabraId);
          return (
            <button
              key={`${carta.palabraId}-${carta.texto}-${i}`}
              className={`pareja-carta${abiertas.includes(i) ? ' abierta' : ''}${resueltas.has(carta.palabraId) ? ' resuelta' : ''}`}
              onClick={() => tocar(i)}
            >
              {abierta ? (
                <span>
                  {carta.emoji ? `${carta.emoji} ` : ''}
                  {carta.texto}
                </span>
              ) : (
                <span className="pareja-dorso" aria-hidden="true">
                  🦉
                </span>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}
