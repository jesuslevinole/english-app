import { useEffect, useState } from 'react';
import type {
  Categoria,
  Palabra,
  Personaje,
  RecursoListening,
  TemaGramatica,
  TipoActividad,
  Vista,
} from './types';
import {
  borrarDocumento,
  cargarColeccion,
  cargarPersonaje,
  crearDocumento,
  guardarPersonaje,
} from './services/datos';
import { fechaHoy, nivelDeXp } from './utils/nivelXp';
import Encabezado from './components/Encabezado';
import NavInferior from './components/NavInferior';
import Inicio from './views/Inicio';
import Vocabulario from './views/Vocabulario';
import Gramatica from './views/Gramatica';
import Listening from './views/Listening';
import './App.css';

// App.tsx es el único dueño de los datos: carga cada colección una vez
// (con caché de sesión, ver services/datos.ts) y las vistas los reciben
// por props. Las mutaciones actualizan este estado local — nunca se
// re-fetchea una colección completa tras crear/borrar.
export default function App() {
  const [vista, setVista] = useState<Vista>('inicio');
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(false);

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [palabras, setPalabras] = useState<Palabra[]>([]);
  const [temas, setTemas] = useState<TemaGramatica[]>([]);
  const [recursos, setRecursos] = useState<RecursoListening[]>([]);
  const [personaje, setPersonaje] = useState<Personaje | null>(null);

  useEffect(() => {
    let activo = true;
    Promise.all([
      cargarColeccion<Categoria>('categorias'),
      cargarColeccion<Palabra>('palabras'),
      cargarColeccion<TemaGramatica>('temas'),
      cargarColeccion<RecursoListening>('listening'),
      cargarPersonaje(),
    ])
      .then(([cats, pals, tms, recs, per]) => {
        if (!activo) return;
        setCategorias(cats);
        setPalabras(pals);
        setTemas(tms);
        setRecursos(recs);
        setPersonaje(per);
        setCargando(false);
      })
      .catch(() => {
        if (!activo) return;
        setError(true);
        setCargando(false);
      });
    return () => {
      activo = false;
    };
  }, []);

  // ── Personaje / XP ─────────────────────────────────
  function actualizarPersonaje(actualizado: Personaje) {
    setPersonaje(actualizado);
    void guardarPersonaje(actualizado);
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

  if (cargando) {
    return (
      <div className="app-cargando">
        <img src="/logo.svg" alt="" />
        <p>Preparando tu aula…</p>
      </div>
    );
  }

  if (error || !personaje) {
    return (
      <div className="app-cargando">
        <img src="/logo.svg" alt="" />
        <p>No se pudo conectar con la base de datos.</p>
        <button className="btn-primario" onClick={() => window.location.reload()}>
          Reintentar
        </button>
      </div>
    );
  }

  return (
    <div className="app">
      <Encabezado nombre={personaje.nombre} />
      <main className="app-contenido">
        {vista === 'inicio' && (
          <Inicio personaje={personaje} onGuardarPersonaje={actualizarPersonaje} />
        )}
        {vista === 'vocabulario' && (
          <Vocabulario
            categorias={categorias}
            palabras={palabras}
            onCrearCategoria={crearCategoria}
            onCrearPalabra={crearPalabra}
            onBorrarPalabra={borrarPalabra}
            onRondaTerminada={(cartas) => completarActividad('vocabulario', 10 + cartas + nivel * 2)}
          />
        )}
        {vista === 'gramatica' && (
          <Gramatica
            temas={temas}
            onCrearTema={crearTema}
            onBorrarTema={borrarTema}
            onCuestionarioTerminado={(aciertos) =>
              completarActividad('gramatica', aciertos * 5 + nivel * 2)
            }
          />
        )}
        {vista === 'listening' && (
          <Listening
            recursos={recursos}
            onCrearRecurso={crearRecurso}
            onBorrarRecurso={borrarRecurso}
            onCuestionarioTerminado={(aciertos) =>
              completarActividad('listening', aciertos * 5 + nivel * 2)
            }
          />
        )}
      </main>
      <NavInferior vista={vista} onCambiar={setVista} />
    </div>
  );
}
