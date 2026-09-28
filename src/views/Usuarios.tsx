import { useEffect, useState } from 'react';
import type { RolUsuario, Usuario } from '../types';
import { cambiarRol, cargarUsuarios } from '../services/sesion';
import './Usuarios.css';

interface Props {
  // uid del admin que está viendo la lista (no puede cambiarse su propio rol)
  miUid: string;
}

const ROLES: { valor: RolUsuario; etiqueta: string }[] = [
  { valor: 'admin', etiqueta: 'Admin' },
  { valor: 'estudiante', etiqueta: 'Estudiante' },
];

// Gestión de cuentas (solo admin): ver quién usa el aula y asignar roles.
// Admin: gestiona contenido, semilla y usuarios. Estudiante: estudia y juega.
export default function Usuarios({ miUid }: Props) {
  const [usuarios, setUsuarios] = useState<Usuario[] | null>(null);
  const [error, setError] = useState(false);
  const [guardandoId, setGuardandoId] = useState<string | null>(null);

  useEffect(() => {
    let activo = true;
    cargarUsuarios()
      .then((lista) => {
        if (activo) setUsuarios(lista);
      })
      .catch(() => {
        if (activo) setError(true);
      });
    return () => {
      activo = false;
    };
  }, []);

  async function asignarRol(usuario: Usuario, rol: RolUsuario) {
    if (rol === usuario.rol || !usuarios) return;
    setGuardandoId(usuario.id);
    try {
      await cambiarRol(usuario.id, rol);
      setUsuarios(usuarios.map((u) => (u.id === usuario.id ? { ...u, rol } : u)));
    } finally {
      setGuardandoId(null);
    }
  }

  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Usuarios
          {usuarios && <span className="contador-seccion">{usuarios.length}</span>}
        </h2>
      </div>

      {error && <p className="vacio">No se pudo cargar la lista de usuarios.</p>}
      {!error && usuarios === null && <p className="vacio">Cargando usuarios…</p>}

      {usuarios && (
        <ul className="usuarios-lista">
          {usuarios.map((u) => (
            <li key={u.id} className="tarjeta usuario-item">
              <span className="usuario-avatar" aria-hidden="true">
                {u.nombre.trim().charAt(0).toUpperCase() || '?'}
              </span>
              <div className="usuario-textos">
                <p className="usuario-nombre">
                  {u.nombre}
                  {u.id === miUid && ' (tú)'}
                </p>
                <p className="texto-suave usuario-correo">{u.correo}</p>
              </div>
              <select
                className="usuario-rol"
                value={u.rol}
                onChange={(e) => void asignarRol(u, e.target.value as RolUsuario)}
                disabled={u.id === miUid || guardandoId === u.id}
                aria-label={`Rol de ${u.nombre}`}
              >
                {ROLES.map((r) => (
                  <option key={r.valor} value={r.valor}>
                    {r.etiqueta}
                  </option>
                ))}
              </select>
            </li>
          ))}
        </ul>
      )}

      <p className="texto-suave usuarios-nota">
        Las cuentas nuevas se crean desde la pantalla de entrada con “Crear cuenta”. Tu propio rol
        no se puede cambiar aquí, para que el aula nunca se quede sin admin.
      </p>
    </div>
  );
}
