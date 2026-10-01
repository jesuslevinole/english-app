import { useEffect, useMemo, useRef, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Turtle, Volume2 } from 'lucide-react';
import type { Nivel, TemaGramatica } from '../types';
import { barajar } from '../utils/barajar';
import { nivelesHasta } from '../utils/vocabulario';
import BuhoGuia from './BuhoGuia';
import GatoSuerte from './GatoSuerte';
import './Shadowing.css';

interface Props {
  temas: TemaGramatica[];
  nivel: Nivel;
  // XP al terminar la ronda (frases repetidas, total)
  onTerminar: (repetidas: number, total: number) => void;
  onSalir: () => void;
}

const FRASES_POR_RONDA = 8;

// Shadowing: escucha la frase con la voz del dispositivo y repítela en voz
// alta imitando ritmo y pronunciación. Incluye repaso de niveles anteriores.
export default function Shadowing({ temas, nivel, onTerminar, onSalir }: Props) {
  const frases = useMemo(() => {
    const niveles = nivelesHasta(nivel);
    const pool = temas
      .filter((t) => niveles.includes(t.nivel))
      .flatMap((t) => [...(t.oraciones ?? []), ...(t.dialogo ?? []).map((l) => l.texto)]);
    return barajar(Array.from(new Set(pool))).slice(0, FRASES_POR_RONDA);
  }, [temas, nivel]);

  const [indice, setIndice] = useState(0);
  const [repetidas, setRepetidas] = useState(0);
  const [hablando, setHablando] = useState(false);
  const [terminado, setTerminado] = useState(false);
  const avisado = useRef(false);

  const soporta = typeof window !== 'undefined' && 'speechSynthesis' in window;

  useEffect(() => {
    return () => {
      if (soporta) window.speechSynthesis.cancel();
    };
  }, [soporta]);

  function hablar(lento: boolean) {
    if (!soporta) return;
    window.speechSynthesis.cancel();
    const frase = new SpeechSynthesisUtterance(frases[indice]);
    frase.lang = 'en-US';
    frase.rate = lento ? 0.7 : 0.95;
    const vozIngles = window.speechSynthesis
      .getVoices()
      .find((v) => v.lang.toLowerCase().startsWith('en'));
    if (vozIngles) frase.voice = vozIngles;
    frase.onend = () => setHablando(false);
    setHablando(true);
    window.speechSynthesis.speak(frase);
  }

  function siguiente(laRepeti: boolean) {
    if (soporta) window.speechSynthesis.cancel();
    setHablando(false);
    const nuevas = laRepeti ? repetidas + 1 : repetidas;
    setRepetidas(nuevas);
    if (indice + 1 >= frases.length) {
      setTerminado(true);
      if (!avisado.current) {
        avisado.current = true;
        onTerminar(nuevas, frases.length);
      }
    } else {
      setIndice(indice + 1);
    }
  }

  if (frases.length === 0) {
    return (
      <div className="tarjeta shadowing-sin-voz">
        <p className="vacio">Aún no hay frases de este nivel. Carga el contenido del aula.</p>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>
    );
  }

  if (terminado) {
    return (
      <div className="tarjeta shadowing-final">
        <GatoSuerte mensaje="Great shadowing!" />
        <p className="cuestionario-puntaje">
          {repetidas} / {frases.length}
        </p>
        <p className="texto-suave">
          Frases repetidas en voz alta. Repetir justo después del audio entrena oído, ritmo y
          pronunciación a la vez.
        </p>
        <button className="btn-primario" onClick={onSalir}>
          Volver a Listening
        </button>
      </div>
    );
  }

  return (
    <div className="shadowing">
      <div className="titulo-seccion">
        <h2>Shadowing · {nivel}</h2>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Salir
        </button>
      </div>

      <BuhoGuia
        curiosidades={[]}
        fallback="Escucha la frase y repítela EN VOZ ALTA de inmediato, como una sombra del audio. Imita el ritmo, no solo las palabras."
      />

      <div className="tarjeta">
        <p className="shadowing-pasos texto-suave">
          Frase {indice + 1} de {frases.length}
        </p>
        <p className="shadowing-frase">{frases[indice]}</p>
        {soporta ? (
          <div className="shadowing-controles">
            <button className="btn-primario" onClick={() => hablar(false)} disabled={hablando}>
              <Volume2 size={18} />
              Escuchar
            </button>
            <button className="btn-contorno" onClick={() => hablar(true)} disabled={hablando}>
              <Turtle size={18} />
              Lento
            </button>
          </div>
        ) : (
          <p className="shadowing-sin-voz texto-suave">
            Tu navegador no tiene voz disponible: lee la frase en voz alta imitando el ritmo del
            inglés.
          </p>
        )}
      </div>

      <div className="shadowing-controles">
        <button className="btn-primario" onClick={() => siguiente(true)}>
          <Check size={18} />
          La repetí
        </button>
        <button className="btn-contorno" onClick={() => siguiente(false)}>
          Saltar
          <ArrowRight size={18} />
        </button>
      </div>
    </div>
  );
}
