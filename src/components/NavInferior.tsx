import { BookOpen, GraduationCap, Headphones, House } from 'lucide-react';
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
];

export default function NavInferior({ vista, onCambiar }: Props) {
  return (
    <nav className="nav-inferior" aria-label="Secciones">
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
