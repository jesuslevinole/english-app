import { useState } from 'react';
import { Lightbulb } from 'lucide-react';
import './BuhoGuia.css';

interface Props {
  // Datos curiosos del tema que el búho va contando
  curiosidades: string[];
  // Mensaje si el tema no trae curiosidades (temas creados a mano)
  fallback: string;
}

// El Profe Búho: la mascota de la app explica y cuenta curiosidades
// de lo que se está aprendiendo, en una burbuja de diálogo.
export default function BuhoGuia({ curiosidades, fallback }: Props) {
  const [indice, setIndice] = useState(0);
  const texto = curiosidades.length > 0 ? curiosidades[indice] : fallback;

  return (
    <div className="buho-guia">
      <img className="buho-avatar" src="/logo.svg" alt="Profe Búho" />
      <div className="buho-burbuja">
        <p className="buho-nombre">Profe Búho dice…</p>
        <p className="buho-texto">{texto}</p>
        {curiosidades.length > 1 && (
          <button
            className="btn-contorno buho-boton"
            onClick={() => setIndice((indice + 1) % curiosidades.length)}
          >
            <Lightbulb size={16} />
            Otra curiosidad
          </button>
        )}
      </div>
    </div>
  );
}
