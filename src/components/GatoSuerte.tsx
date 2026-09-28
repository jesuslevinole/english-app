import { MASCOTAS } from '../data/mascotas';
import './GatoSuerte.css';

interface Props {
  // Frase corta que Lucky dice debajo (opcional)
  mensaje?: string;
}

// Lucky, el maneki-neko de la app: el gato de la suerte que saluda con la
// patita. Aparece en celebraciones (rondas completadas, misiones del día).
export default function GatoSuerte({ mensaje }: Props) {
  return (
    <div className="gato-suerte">
      <svg
        className="gato-svg"
        viewBox="0 0 120 120"
        xmlns="http://www.w3.org/2000/svg"
        role="img"
        aria-label={`${MASCOTAS.gato}, el gato de la suerte`}
      >
        {/* cuerpo */}
        <ellipse cx="58" cy="86" rx="30" ry="26" fill="#fff" stroke="#1c2a1f" strokeWidth="3" />
        {/* moneda koban dorada */}
        <ellipse cx="58" cy="92" rx="14" ry="17" fill="#e0b13e" stroke="#1c2a1f" strokeWidth="3" />
        <path d="M52 86 h12 M52 92 h12 M52 98 h12" stroke="#1c2a1f" strokeWidth="2" fill="none" />
        {/* pata izquierda apoyada */}
        <ellipse cx="38" cy="104" rx="9" ry="7" fill="#fff" stroke="#1c2a1f" strokeWidth="3" />
        {/* pata derecha que saluda */}
        <g className="gato-pata">
          <rect x="78" y="34" width="13" height="28" rx="6.5" fill="#fff" stroke="#1c2a1f" strokeWidth="3" />
          <circle cx="84.5" cy="34" r="8" fill="#fff" stroke="#1c2a1f" strokeWidth="3" />
          <path d="M79 32 q5.5 -4 11 0" stroke="#1c2a1f" strokeWidth="2" fill="none" />
        </g>
        {/* cabeza */}
        <circle cx="52" cy="44" r="24" fill="#fff" stroke="#1c2a1f" strokeWidth="3" />
        {/* orejas */}
        <path d="M32 32 l4 -14 l12 9 z" fill="#fff" stroke="#1c2a1f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M72 32 l-4 -14 l-12 9 z" fill="#fff" stroke="#1c2a1f" strokeWidth="3" strokeLinejoin="round" />
        <path d="M36 29 l2 -7 l6 4.5 z" fill="#ec6a55" />
        <path d="M68 29 l-2 -7 l-6 4.5 z" fill="#ec6a55" />
        {/* carita feliz */}
        <path d="M40 43 q3 -4 6 0" stroke="#1c2a1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M58 43 q3 -4 6 0" stroke="#1c2a1f" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <circle cx="52" cy="49" r="2" fill="#ec6a55" />
        <path d="M52 51 q-3 4 -6 1 M52 51 q3 4 6 1" stroke="#1c2a1f" strokeWidth="2" fill="none" strokeLinecap="round" />
        {/* bigotes */}
        <path d="M28 46 h10 M28 52 h10 M66 46 h10 M66 52 h10" stroke="#1c2a1f" strokeWidth="2" strokeLinecap="round" />
        {/* collar y cascabel */}
        <path d="M34 60 q18 10 36 0" stroke="#ec6a55" strokeWidth="6" fill="none" />
        <circle cx="52" cy="66" r="5" fill="#e0b13e" stroke="#1c2a1f" strokeWidth="2.5" />
      </svg>
      {mensaje && (
        <p className="gato-mensaje">
          {MASCOTAS.gato} dice: {mensaje}
        </p>
      )}
    </div>
  );
}
