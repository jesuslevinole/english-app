import './Encabezado.css';

interface Props {
  nombre: string;
  accion?: React.ReactNode; // botón contextual de la vista (ej. “Nueva palabra”)
}

export default function Encabezado({ nombre, accion }: Props) {
  return (
    <header className="encabezado">
      <img className="encabezado-logo" src="/logo.svg" alt="Logo de Aula Crear: búho leyendo" />
      <div className="encabezado-textos">
        <p className="encabezado-app">Aula Crear</p>
        <p className="encabezado-saludo">¡Hola, {nombre}!</p>
      </div>
      {accion}
    </header>
  );
}
