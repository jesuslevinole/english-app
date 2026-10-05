import { useEffect, useState } from 'react';
import { Mail, Plus } from 'lucide-react';
import type { ModuloApp, RolUsuario, Usuario } from '../types';
import { MODULOS_APP } from '../types';
import { cambiarRol, cargarUsuarios, crearUsuarioInvitado, guardarModulos, mensajeErrorSesion, reenviarInvitacion } from '../services/sesion';
import Modal from '../components/Modal';
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
  const [creando, setCreando] = useState(false);
  const [nombreNuevo, setNombreNuevo] = useState('');
  const [correoNuevo, setCorreoNuevo] = useState('');
  const [rolNuevo, setRolNuevo] = useState<RolUsuario>('estudiante');
  const [ocupado, setOcupado] = useState(false);
  const [aviso, setAviso] = useState<string | null>(null);
  const [errorForm, setErrorForm] = useState<string | null>(null);

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

  async function invitar() {
    setErrorForm(null);
    setOcupado(true);
    try {
      const nuevo = await crearUsuarioInvitado(nombreNuevo, correoNuevo, rolNuevo);
      setUsuarios((previos) => [...(previos ?? []), nuevo]);
      setAviso(`Cuenta creada. Le enviamos a ${nuevo.correo} el enlace para establecer su contraseña.`);
      setNombreNuevo('');
      setCorreoNuevo('');
      setRolNuevo('estudiante');
      setCreando(false);
    } catch (e) {
      setErrorForm(mensajeErrorSesion(e));
    } finally {
      setOcupado(false);
    }
  }

  async function reenviar(usuario: Usuario) {
    setGuardandoId(usuario.id);
    try {
      await reenviarInvitacion(usuario.correo);
      setAviso(`Invitación reenviada a ${usuario.correo}.`);
    } catch (e) {
      setAviso(mensajeErrorSesion(e));
    } finally {
      setGuardandoId(null);
    }
  }

  // Módulos visibles: ausente = todos. Al tocar un chip se materializa la lista.
  async function alternarModulo(usuario: Usuario, modulo: ModuloApp) {
    if (!usuarios) return;
    const actuales = usuario.modulos ?? MODULOS_APP;
    const nuevos = actuales.includes(modulo)
      ? actuales.filter((m) => m !== modulo)
      : [...actuales, modulo];
    setGuardandoId(usuario.id);
    try {
      await guardarModulos(usuario.id, nuevos);
      setUsuarios(usuarios.map((u) => (u.id === usuario.id ? { ...u, modulos: nuevos } : u)));
    } finally {
      setGuardandoId(null);
    }
  }

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
        <button className="btn-primario" onClick={() => setCreando(true)}>
          <Plus size={18} />
          Nuevo usuario
        </button>
      </div>

      {aviso && <p className="usuarios-aviso">{aviso}</p>}

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
              <div className="usuario-pie">
                <div className="fila-chips">
                  {MODULOS_APP.map((m) => {
                    const activo = (u.modulos ?? MODULOS_APP).includes(m);
                    return (
                      <button
                        key={m}
                        className={`chip${activo ? ' activo' : ''}`}
                        onClick={() => void alternarModulo(u, m)}
                        disabled={guardandoId === u.id}
                        title={activo ? 'Puede ver este módulo' : 'Oculto para este usuario'}
                      >
                        {m}
                      </button>
                    );
                  })}
                </div>
                <button
                  className="btn-contorno"
                  onClick={() => void reenviar(u)}
                  disabled={guardandoId === u.id}
                >
                  <Mail size={16} />
                  Reenviar invitación
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <p className="texto-suave usuarios-nota">
        Los chips controlan qué módulos ve cada usuario en su menú. Tu propio rol no se puede
        cambiar aquí, para que el aula nunca se quede sin admin.
      </p>

      {creando && (
        <Modal titulo="Nuevo usuario" onCerrar={() => setCreando(false)}>
          <p className="texto-suave">
            Se crea la cuenta y le llega un correo con el enlace para establecer su contraseña.
          </p>
          <div className="campo">
            <label htmlFor="nuevo-nombre">Nombre</label>
            <input id="nuevo-nombre" value={nombreNuevo} onChange={(e) => setNombreNuevo(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="nuevo-correo">Correo</label>
            <input
              id="nuevo-correo"
              type="email"
              value={correoNuevo}
              onChange={(e) => setCorreoNuevo(e.target.value)}
              placeholder="correo@ejemplo.com"
            />
          </div>
          <div className="campo">
            <label htmlFor="nuevo-rol">Rol</label>
            <select id="nuevo-rol" value={rolNuevo} onChange={(e) => setRolNuevo(e.target.value as RolUsuario)}>
              {ROLES.map((r) => (
                <option key={r.valor} value={r.valor}>
                  {r.etiqueta}
                </option>
              ))}
            </select>
          </div>
          {errorForm && <p className="texto-error">{errorForm}</p>}
          <div className="acciones-modal">
            <button
              className="btn-primario"
              onClick={() => void invitar()}
              disabled={ocupado || !nombreNuevo.trim() || !correoNuevo.trim()}
            >
              {ocupado ? 'Creando…' : 'Crear y enviar invitación'}
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
