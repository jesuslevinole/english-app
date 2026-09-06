import { X } from 'lucide-react';
import './Modal.css';

interface Props {
  titulo: string;
  onCerrar: () => void;
  children: React.ReactNode;
}

// Hoja inferior estilo mockup (“Create Task”), reutilizada por todos los formularios.
export default function Modal({ titulo, onCerrar, children }: Props) {
  return (
    <div className="modal-fondo" onClick={onCerrar}>
      <div
        className="modal-cuadro"
        role="dialog"
        aria-label={titulo}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="modal-encabezado">
          <h3>{titulo}</h3>
          <button className="btn-icono" onClick={onCerrar} aria-label="Cerrar">
            <X size={22} />
          </button>
        </div>
        {children}
      </div>
    </div>
  );
}
