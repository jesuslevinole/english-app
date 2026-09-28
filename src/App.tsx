import { useEffect, useState } from 'react';
import type {
  Categoria,
  Palabra,
  Personaje,
  RecursoListening,
  TemaGramatica,
  TipoActividad,
  Usuario,
  Vista,
} from './types';
import {
  borrarDocumento,
  cargarColeccion,
  cargarPersonaje,
  crearDocumento,
  guardarPersonaje,
  sembrarNivel1,
} from './services/datos';
import { cargarUsuario, observarSesion, salir } from './services/sesion';
import { SEMILLA_NIVEL1 } from './data/nivel1';
import { fechaHoy, nivelDeXp } from './utils/nivelXp';
import Encabezado from './components/Encabezado';
import NavInferior from './components/NavInferior';
import Login from './views/Login';
import Inicio from './views/Inicio';
import Vocabulario from './views/Vocabulario';
import Gramatica from './views/Gramatica';
import Listening from './views/Listening';
import Usuarios from './views/Usuarios';
import './App.css';

// App.tsx es el único dueño de los datos: observa la sesión, y con sesión
// activa carga cada colección una vez (con caché de sesión, ver
// services/datos.ts). Las vistas reciben todo por props y las mutaciones
// actualizan este estado local — nunca se re-fetchea una colección completa.
export default function App() {
  const [vista, setVista] = useState<Vista>('inicio');
  // undefined = Firebase aún está resolviendo si hay sesión guardada
  const [uid, setUid] = useState<string | null | undefined>(undefined);
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [cargando, setCargando] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [palabras, setPalabras] = useState<Palabra[]>([]);
  const [temas, setTemas] = useState<TemaGramatica[]>([]);
  const [recursos, setRecursos] = useState<RecursoListening[]>([]);
  const [personaje, setPersonaje] = useState<Personaje | null>(null);

  useEffect(() => observarSesion(setUid), []);

  useEffect(() => {
    if (!uid) {
      // sin sesión: se limpia todo (el login toma la pantalla)
      setUsuario(null);
      setPersonaje(null);
      setCategorias([]);
      setPalabras([]);
      setTemas([]);
      setRecursos([]);
      setError(null);
      setVista('inicio');
      return;
    }
    let activo = true;
    setCargando(true);
    (async () => {
      try {
        const u = await cargarUsuario(uid);
        const [cats, pals, tms, recs] = await Promise.all([
          cargarColeccion<Categoria>('categorias'),
          cargarColeccion<Palabra>('palabras'),
          cargarColeccion<TemaGramatica>('temas'),
          cargarColeccion<RecursoListening>('listening'),
        ]);
        const p = await cargarPersonaje(uid, u.nombre, u.rol === 'admin');
        if (!activo) return;
        setUsuario(u);
        setCategorias(cats);
        setPalabras(pals);
        setTemas(tms);
        setRecursos(recs);
        setPersonaje(p);
        setError(null);
      } catch (e: unknown) {
        if (activo) setError(e instanceof Error ? e.message : 'Error desconocido');
      } finally {
        if (activo) setCargando(false);
      }
    })();
    return () => {
      activo = false;
    };
  }, [uid]);

  const esAdmin = usuario?.rol === 'admin';

  // ── Personaje / XP ─────────────────────────────────
  function actualizarPersonaje(actualizado: Personaje) {
    if (!uid) return;
    setPersonaje(actualizado);
    void guardarPersonaje(uid, actualizado);
  }

  function completarActividad(tipo: TipoActividad, xpGanada: number) {
    if (!personaje) return;
    const hoy = fechaHoy();
    const deHoy = personaje.diario[hoy] ?? [];
    actualizarPersonaje({
      ...personaje,
      xp: personaje.xp + xpGanada,
      diario: {
        ...personaje.diario,
        [hoy]: deHoy.includes(tipo) ? deHoy : [...deHoy, tipo],
      },
    });
  }

  const nivel = personaje ? nivelDeXp(personaje.xp) : 1;

  // ── Semilla del Nivel 1 (material de la academia) ──
  const necesitaSemilla = SEMILLA_NIVEL1.temas.some((s) => {
    const existente = temas.find((t) => t.nombre === s.nombre);
    return (
      !existente ||
      (existente.explicacion ?? []).length === 0 ||
      (existente.curiosidades ?? []).length === 0
    );
  });

  async function sembrar() {
    const r = await sembrarNivel1({ categorias, palabras, temas, recursos });
    setCategorias((previas) => [...previas, ...r.categorias]);
    setPalabras((previas) => [...previas, ...r.palabras]);
    setTemas((previos) => [
      ...previos.filter((t) => !r.temas.some((rt) => rt.id === t.id)),
      ...r.temas,
    ]);
    setRecursos((previos) => [
      ...previos.filter((x) => !r.recursos.some((rr) => rr.id === x.id)),
      ...r.recursos,
    ]);
  }

  // ── Vocabulario ────────────────────────────────────
  async function crearCategoria(datos: Omit<Categoria, 'id'>) {
    const id = await crearDocumento('categorias', datos);
    setCategorias((previas) => [...previas, { id, ...datos }]);
  }

  async function crearPalabra(datos: Omit<Palabra, 'id'>) {
    const id = await crearDocumento('palabras', datos);
    setPalabras((previas) => [...previas, { id, ...datos }]);
  }

  async function borrarPalabra(palabra: Palabra) {
    await borrarDocumento('palabras', palabra.id);
    setPalabras((previas) => previas.filter((p) => p.id !== palabra.id));
  }

  // ── Gramática ──────────────────────────────────────
  async function crearTema(datos: Omit<TemaGramatica, 'id'>) {
    const id = await crearDocumento('temas', datos);
    setTemas((previos) => [...previos, { id, ...datos }]);
  }

  async function borrarTema(tema: TemaGramatica) {
    await borrarDocumento('temas', tema.id);
    setTemas((previos) => previos.filter((t) => t.id !== tema.id));
  }

  // ── Listening ──────────────────────────────────────
  async function crearRecurso(datos: Omit<RecursoListening, 'id'>) {
    const id = await crearDocumento('listening', datos);
    setRecursos((previos) => [...previos, { id, ...datos }]);
  }

  async function borrarRecurso(recurso: RecursoListening) {
    await borrarDocumento('listening', recurso.id);
    setRecursos((previos) => previos.filter((r) => r.id !== recurso.id));
  }

  // ── Pantallas según el estado de la sesión ─────────
  if (uid === undefined || (uid && (cargando || (!usuario && !error)))) {
    return (
      <div className="app-cargando">
        <img src="/logo.svg" alt="" />
        <p>Preparando tu aula…</p>
      </div>
    );
  }

  if (uid === null) {
    return <Login />;
  }

  if (error !== null || !usuario || !personaje) {
    return (
      <div className="app-cargando">
        <img src="/logo.svg" alt="" />
        <p>No se pudo conectar con la base de datos.</p>
        {error && <p className="texto-suave">{error}</p>}
        <button className="btn-primario" onClick={() => window.location.reload()}>
          Reintentar
        </button>
        <button className="btn-contorno" onClick={() => void salir()}>
          Cerrar sesión
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Encabezado nombre={usuario.nombre} onSalir={() => void salir()} />
      <main className="app-contenido">
        {vista === 'inicio' && (
          <Inicio
            personaje={personaje}
            onGuardarPersonaje={actualizarPersonaje}
            mostrarSemilla={esAdmin && necesitaSemilla}
            onSembrar={sembrar}
          />
        )}
        {vista === 'vocabulario' && (
          <Vocabulario
            categorias={categorias}
            palabras={palabras}
            nivel={nivel}
            esAdmin={esAdmin}
            onCrearCategoria={crearCategoria}
            onCrearPalabra={crearPalabra}
            onBorrarPalabra={borrarPalabra}
            onRondaTerminada={(cartas) => completarActividad('vocabulario', 10 + cartas + nivel * 2)}
            onEscrituraTerminada={(aciertos) =>
              completarActividad('vocabulario', aciertos * 3 + nivel * 2)
            }
          />
        )}
        {vista === 'gramatica' && (
          <Gramatica
            temas={temas}
            nivelPersonaje={nivel}
            esAdmin={esAdmin}
            onCrearTema={crearTema}
            onBorrarTema={borrarTema}
            onCuestionarioTerminado={(aciertos) =>
              completarActividad('gramatica', aciertos * 5 + nivel * 2)
            }
            onJuegoTerminado={(aciertos) =>
              completarActividad('gramatica', aciertos * 4 + nivel * 2)
            }
          />
        )}
        {vista === 'listening' && (
          <Listening
            recursos={recursos}
            nivelPersonaje={nivel}
            esAdmin={esAdmin}
            onCrearRecurso={crearRecurso}
            onBorrarRecurso={borrarRecurso}
            onCuestionarioTerminado={(aciertos) =>
              completarActividad('listening', aciertos * 5 + nivel * 2)
            }
          />
        )}
        {vista === 'usuarios' && esAdmin && <Usuarios miUid={usuario.id} />}
      </main>
      <NavInferior vista={vista} onCambiar={setVista} esAdmin={esAdmin} />
    </div>
  );
}
