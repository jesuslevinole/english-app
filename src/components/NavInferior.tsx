import { BookMarked, BookOpen, GraduationCap, Headphones, House } from 'lucide-react';
import type { Vista } from '../types';
import './NavInferior.css';

interface Props {
  vista: Vista;
  onCambiar: (vista: Vista) => void;
}

const OPCIONES: { id: Vista; etiqueta: string; Icono: typeof House }[] = [
  { id: 'inicio', etiqueta: 'Inicio', Icono: House },
  { id: 'vocabulario', etiqueta: 'Vocabulario', Icono: BookOpen },
  { id: 'gramatica', etiqueta: 'Gramática', Icono: GraduationCap },
  { id: 'listening', etiqueta: 'Listening', Icono: Headphones },
  { id: 'lectura', etiqueta: 'Lectura', Icono: BookMarked },
];

// Barra inferior en móvil; en escritorio (≥900px) el CSS la convierte
// en menú lateral fijo y muestra la marca.
export default function NavInferior({ vista, onCambiar }: Props) {
  return (
    <nav className="nav-inferior" aria-label="Secciones">
      <div className="nav-marca">
        <img src="/logo.svg" alt="" />
        <span>Aula Crear</span>
      </div>
      {OPCIONES.map(({ id, etiqueta, Icono }) => (
        <button
          key={id}
          className={`nav-item${vista === id ? ' activo' : ''}`}
          onClick={() => onCambiar(id)}
          aria-current={vista === id ? 'page' : undefined}
        >
          <Icono size={22} />
          {etiqueta}
        </button>
      ))}
    </nav>
  );
}
