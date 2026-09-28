import { LogOut, Users } from 'lucide-react';
import './Encabezado.css';

interface Props {
  nombre: string;
  accion?: React.ReactNode; // botón contextual de la vista (ej. “Nueva palabra”)
  onSalir: () => void;
  // presente solo para admin: abre la vista de Usuarios
  onUsuarios?: () => void;
}

export default function Encabezado({ nombre, accion, onSalir, onUsuarios }: Props) {
  return (
    <header className="encabezado">
      <img className="encabezado-logo" src="/logo.svg" alt="Logo de Aula Crear: búho leyendo" />
      <div className="encabezado-textos">
        <p className="encabezado-app">Aula Crear</p>
        <p className="encabezado-saludo">¡Hola, {nombre}!</p>
      </div>
      {accion}
      {onUsuarios && (
        <button className="btn-icono" onClick={onUsuarios} aria-label="Usuarios">
          <Users size={20} />
        </button>
      )}
      <button className="btn-icono" onClick={onSalir} aria-label="Cerrar sesión">
        <LogOut size={20} />
      </button>
    </header>
  );
}
