import { useEffect, useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { ArrowLeft, Plus, RefreshCw, Swords } from 'lucide-react';
import type { Categoria, Duelo, Ejercicio, ModoDuelo, Nivel, Palabra, TemaGramatica } from '../types';
import { actualizarDocumento, cargarColeccion, crearDocumento, invalidar } from '../services/datos';
import { cargarUsuarios } from '../services/sesion';
import type { Usuario } from '../types';
import { barajar } from '../utils/barajar';
import { generarQuizVocabulario, NIVELES_CEFR } from '../utils/vocabulario';
import Cuestionario from './Cuestionario';
import BuhoGuia from './BuhoGuia';
import GatoSuerte from './GatoSuerte';
import './Duelos.css';

interface Props {
  miId: string;
  miNombre: string;
  miEmoji: string;
  temas: TemaGramatica[];
  palabras: Palabra[];
  categorias: Categoria[];
  // XP por jugar tu turno del duelo
  onJugado: (modo: ModoDuelo, aciertos: number, total: number) => void;
  onSalir: () => void;
}

const MODOS: { id: ModoDuelo; etiqueta: string }[] = [
  { id: 'vocabulario', etiqueta: 'Vocabulario' },
  { id: 'gramatica', etiqueta: 'Gramática y tiempos' },
  { id: 'mixto', etiqueta: 'Mixto' },
];

// Arena de duelos: retos por turnos con las MISMAS preguntas para ambos.
// Gana quien conecte más aciertos; el rival responde cuando entre.
export default function Duelos({
  miId,
  miNombre,
  miEmoji,
  temas,
  palabras,
  categorias,
  onJugado,
  onSalir,
}: Props) {
  const [duelos, setDuelos] = useState<Duelo[] | null>(null);
  const [usuarios, setUsuarios] = useState<Usuario[]>([]);
  const [creando, setCreando] = useState(false);
  const [jugando, setJugando] = useState<Duelo | null>(null);
  const [resultadoDe, setResultadoDe] = useState<Duelo | null>(null);

  // configuración del reto nuevo
  const [rivalId, setRivalId] = useState('');
  const [nivel, setNivel] = useState<Nivel>('A1');
  const [modo, setModo] = useState<ModoDuelo>('vocabulario');
  const [categoriaId, setCategoriaId] = useState('todas');
  const [error, setError] = useState<string | null>(null);

  async function refrescar() {
    invalidar('duelos');
    const lista = await cargarColeccion<Duelo>('duelos');
    setDuelos(lista);
  }

  useEffect(() => {
    void refrescar();
    cargarUsuarios()
      .then(setUsuarios)
      .catch(() => setUsuarios([]));
  }, []);

  const mios = useMemo(
    () =>
      (duelos ?? [])
        .filter((d) => d.retadorId === miId || d.rivalId === miId)
        .sort((a, b) => b.creadoEn - a.creadoEn),
    [duelos, miId],
  );

  const rivales = usuarios.filter((u) => u.id !== miId);

  function generarPreguntas(): Ejercicio[] | string {
    const palabrasPool =
      modo !== 'gramatica'
        ? categoriaId === 'todas'
          ? palabras.filter((p) => (p.nivel ?? 'A1') === nivel)
          : palabras.filter((p) => p.categoriaId === categoriaId)
        : [];
    const gramaticaPool =
      modo !== 'vocabulario'
        ? barajar(temas.filter((t) => t.nivel === nivel).flatMap((t) => t.ejercicios))
        : [];

    if (modo === 'vocabulario') {
      if (palabrasPool.length < 4) return 'No hay suficientes palabras para ese reto.';
      return generarQuizVocabulario(palabrasPool, Math.min(10, palabrasPool.length));
    }
    if (modo === 'gramatica') {
      if (gramaticaPool.length < 4) return 'Aún no hay gramática de ese nivel.';
      return gramaticaPool.slice(0, 10);
    }
    if (palabrasPool.length < 4 || gramaticaPool.length < 4) {
      return 'No hay suficiente material de ese nivel para un reto mixto.';
    }
    return barajar([
      ...generarQuizVocabulario(palabrasPool, 5),
      ...gramaticaPool.slice(0, 5),
    ]);
  }

  async function lanzarReto() {
    setError(null);
    const rival = rivales.find((u) => u.id === rivalId);
    if (!rival) {
      setError('Elige a tu contrincante.');
      return;
    }
    const preguntas = generarPreguntas();
    if (typeof preguntas === 'string') {
      setError(preguntas);
      return;
    }
    const categoria = categorias.find((cat) => cat.id === categoriaId);
    const datos: Omit<Duelo, 'id'> = {
      nivel,
      modo,
      preguntas,
      total: preguntas.length,
      retadorId: miId,
      retadorNombre: miNombre,
      retadorEmoji: miEmoji,
      rivalId: rival.id,
      rivalNombre: rival.nombre,
      rivalEmoji: '🎭',
      puntajeRetador: null,
      puntajeRival: null,
      creadoEn: Date.now(),
    };
    if (modo !== 'gramatica' && categoria) datos.categoriaNombre = categoria.nombre;
    const id = await crearDocumento('duelos', datos);
    const duelo: Duelo = { id, ...datos };
    setDuelos((previos) => [duelo, ...(previos ?? [])]);
    setCreando(false);
    setJugando(duelo); // el retador lanza el primer golpe de una vez
  }

  async function terminarTurno(aciertos: number) {
    if (!jugando) return;
    const soyRetador = jugando.retadorId === miId;
    const cambios: Partial<Duelo> = soyRetador
      ? { puntajeRetador: aciertos }
      : { puntajeRival: aciertos, rivalEmoji: miEmoji };
    await actualizarDocumento('duelos', jugando.id, cambios);
    invalidar('duelos');
    const actualizado: Duelo = { ...jugando, ...cambios };
    setDuelos((previos) => (previos ?? []).map((d) => (d.id === actualizado.id ? actualizado : d)));
    onJugado(jugando.modo, aciertos, jugando.total);
    setJugando(null);
    setResultadoDe(actualizado);
  }

  function etiquetaModo(d: Duelo): string {
    const base = MODOS.find((m) => m.id === d.modo)?.etiqueta ?? d.modo;
    return d.categoriaNombre ? `${base} · ${d.categoriaNombre}` : base;
  }

  // ── Jugando mi turno ───────────────────────────────
  if (jugando) {
    return (
      <div className="duelos">
        <div className="titulo-seccion">
          <h2>
            ⚔️ {jugando.retadorNombre} vs {jugando.rivalNombre}
          </h2>
        </div>
        <p className="texto-suave">
          {etiquetaModo(jugando)} · Nivel {jugando.nivel} · {jugando.total} golpes posibles. ¡Cada
          acierto es un golpe conectado!
        </p>
        <div className="tarjeta">
          <Cuestionario
            key={jugando.id}
            ejercicios={jugando.preguntas}
            maxPreguntas={jugando.total}
            onTerminar={(aciertos) => void terminarTurno(aciertos)}
          />
        </div>
      </div>
    );
  }

  // ── Resultado de un duelo ──────────────────────────
  if (resultadoDe) {
    const d = resultadoDe;
    const completo = d.puntajeRetador !== null && d.puntajeRival !== null;
    const gane =
      completo &&
      ((d.retadorId === miId && (d.puntajeRetador ?? 0) > (d.puntajeRival ?? 0)) ||
        (d.rivalId === miId && (d.puntajeRival ?? 0) > (d.puntajeRetador ?? 0)));
    const empate = completo && d.puntajeRetador === d.puntajeRival;
    return (
      <div className="duelos">
        <div className="tarjeta duelo-resultado">
          <p className="duelo-versus">
            <span className="duelo-emoji">{d.retadorEmoji}</span> {d.retadorNombre}
            <span className="duelo-espadas">⚔️</span>
            {d.rivalNombre} <span className="duelo-emoji">{d.rivalEmoji}</span>
          </p>
          <div className="duelo-marcador">
            <div className="duelo-barra-fila">
              <span className="duelo-barra-nombre">{d.retadorNombre}</span>
              <span className="duelo-barra">
                <span
                  className="duelo-dano"
                  style={{ '--dano': (d.puntajeRetador ?? 0) / d.total } as CSSProperties}
                />
              </span>
              <strong>{d.puntajeRetador ?? '–'}</strong>
            </div>
            <div className="duelo-barra-fila">
              <span className="duelo-barra-nombre">{d.rivalNombre}</span>
              <span className="duelo-barra">
                <span
                  className="duelo-dano rival"
                  style={{ '--dano': (d.puntajeRival ?? 0) / d.total } as CSSProperties}
                />
              </span>
              <strong>{d.puntajeRival ?? '–'}</strong>
            </div>
          </div>
          {!completo && (
            <p className="texto-suave">
              Turno jugado. Ahora le toca a {d.puntajeRetador === null ? d.retadorNombre : d.rivalNombre}:
              el duelo se decide cuando responda.
            </p>
          )}
          {completo && gane && <GatoSuerte mensaje="Victory!" />}
          {completo && empate && <p className="cuestionario-pregunta">🤝 ¡Empate de campeones!</p>}
          {completo && !gane && !empate && (
            <BuhoGuia
              curiosidades={[]}
              fallback="Esta batalla no fue tuya, pero cada duelo deja XP y memoria. ¡Pide la revancha!"
            />
          )}
          <button className="btn-primario" onClick={() => setResultadoDe(null)}>
            Volver a la arena
          </button>
        </div>
      </div>
    );
  }

  // ── Crear reto ─────────────────────────────────────
  if (creando) {
    return (
      <div className="duelos">
        <div className="titulo-seccion">
          <h2>Nuevo duelo</h2>
          <button className="btn-contorno" onClick={() => setCreando(false)}>
            <ArrowLeft size={18} />
            Arena
          </button>
        </div>
        <div className="tarjeta duelos-config">
          <div className="campo">
            <label htmlFor="duelo-rival">Contrincante</label>
            <select id="duelo-rival" value={rivalId} onChange={(e) => setRivalId(e.target.value)}>
              <option value="">Elige a tu rival…</option>
              {rivales.map((u) => (
                <option key={u.id} value={u.id}>
                  {u.nombre}
                </option>
              ))}
            </select>
          </div>
          <div>
            <p className="texto-suave">Nivel del reto</p>
            <div className="fila-chips">
              {NIVELES_CEFR.map((n) => (
                <button
                  key={n}
                  className={`chip${nivel === n ? ' activo' : ''}`}
                  onClick={() => setNivel(n)}
                >
                  {n}
                </button>
              ))}
            </div>
          </div>
          <div>
            <p className="texto-suave">Arena</p>
            <div className="fila-chips">
              {MODOS.map((m) => (
                <button
                  key={m.id}
                  className={`chip${modo === m.id ? ' activo' : ''}`}
                  onClick={() => setModo(m.id)}
                >
                  {m.etiqueta}
                </button>
              ))}
            </div>
          </div>
          {modo !== 'gramatica' && (
            <div className="campo">
              <label htmlFor="duelo-categoria">Vocabulario del reto</label>
              <select
                id="duelo-categoria"
                value={categoriaId}
                onChange={(e) => setCategoriaId(e.target.value)}
              >
                <option value="todas">Todas las palabras del nivel</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    Solo: {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          )}
          {error && <p className="texto-error">{error}</p>}
          <button className="btn-primario" onClick={() => void lanzarReto()} disabled={!rivalId}>
            <Swords size={18} />
            ¡Lanzar reto y jugar mi turno!
          </button>
        </div>
      </div>
    );
  }

  // ── Arena: lista de duelos ─────────────────────────
  return (
    <div className="duelos">
      <div className="titulo-seccion">
        <h2>⚔️ Arena de duelos</h2>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Inicio
        </button>
      </div>

      <BuhoGuia
        curiosidades={[]}
        fallback="Reta a un compañero: ambos responden LAS MISMAS preguntas y gana quien conecte más aciertos. El rival juega su turno cuando entre a la arena."
      />

      <div className="examen-acciones">
        <button className="btn-primario" onClick={() => setCreando(true)}>
          <Plus size={18} />
          Nuevo duelo
        </button>
        <button className="btn-contorno" onClick={() => void refrescar()}>
          <RefreshCw size={18} />
          Actualizar
        </button>
      </div>

      {duelos === null ? (
        <p className="vacio">Afilando las espadas…</p>
      ) : mios.length === 0 ? (
        <p className="vacio">Aún no tienes duelos. ¡Lanza el primer reto!</p>
      ) : (
        <ul className="duelos">
          {mios.map((d) => {
            const soyRetador = d.retadorId === miId;
            const miTurno = soyRetador ? d.puntajeRetador === null : d.puntajeRival === null;
            const completo = d.puntajeRetador !== null && d.puntajeRival !== null;
            return (
              <li key={d.id} className="tarjeta duelo-item">
                <p className="duelo-versus">
                  <span className="duelo-emoji">{d.retadorEmoji}</span> {d.retadorNombre}
                  <span className="duelo-espadas">⚔️</span>
                  {d.rivalNombre} <span className="duelo-emoji">{d.rivalEmoji}</span>
                </p>
                <div className="duelo-meta">
                  <span className="insignia-nivel">{d.nivel}</span>
                  <span className="texto-suave">{etiquetaModo(d)}</span>
                  {completo && (
                    <strong>
                      {d.puntajeRetador} - {d.puntajeRival}
                    </strong>
                  )}
                </div>
                {miTurno ? (
                  <button className="btn-primario" onClick={() => setJugando(d)}>
                    <Swords size={18} />
                    {soyRetador ? 'Jugar mi turno' : '¡Te retaron! Responder'}
                  </button>
                ) : (
                  <button className="btn-contorno" onClick={() => setResultadoDe(d)}>
                    {completo ? 'Ver resultado' : `Esperando a ${d.rivalNombre}…`}
                  </button>
                )}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
