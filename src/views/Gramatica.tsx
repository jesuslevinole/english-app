import { useState } from 'react';
import { ArrowLeft, ExternalLink, Play, Plus, Trash2, Youtube } from 'lucide-react';
import type { Ejercicio, IdiomaVideo, Nivel, TemaGramatica, VideoRef } from '../types';
import { urlBusqueda } from '../utils/youtube';
import Modal from '../components/Modal';
import Cuestionario from '../components/Cuestionario';
import EditorEjercicios from '../components/EditorEjercicios';
import './Gramatica.css';

interface Props {
  temas: TemaGramatica[];
  onCrearTema: (datos: Omit<TemaGramatica, 'id'>) => void;
  onBorrarTema: (tema: TemaGramatica) => void;
  onCuestionarioTerminado: (aciertos: number, total: number) => void;
}

const NIVELES: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function Gramatica({
  temas,
  onCrearTema,
  onBorrarTema,
  onCuestionarioTerminado,
}: Props) {
  const [temaAbiertoId, setTemaAbiertoId] = useState<string | null>(null);
  const [practicando, setPracticando] = useState(false);
  const [creando, setCreando] = useState(false);

  // formulario de tema nuevo
  const [nombre, setNombre] = useState('');
  const [nivel, setNivel] = useState<Nivel>('A1');
  const [notas, setNotas] = useState('');
  const [videos, setVideos] = useState<VideoRef[]>([]);
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);
  const [videoTitulo, setVideoTitulo] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [videoIdioma, setVideoIdioma] = useState<IdiomaVideo>('en');

  const temaAbierto = temas.find((t) => t.id === temaAbiertoId) ?? null;

  function agregarVideo() {
    if (!videoUrl.trim()) return;
    setVideos([
      ...videos,
      { titulo: videoTitulo.trim() || videoUrl.trim(), url: videoUrl.trim(), idioma: videoIdioma },
    ]);
    setVideoTitulo('');
    setVideoUrl('');
  }

  function guardarTema() {
    if (!nombre.trim()) return;
    onCrearTema({ nombre: nombre.trim(), nivel, notas: notas.trim(), videos, ejercicios });
    setNombre('');
    setNotas('');
    setVideos([]);
    setEjercicios([]);
    setCreando(false);
  }

  function cerrarDetalle() {
    setTemaAbiertoId(null);
    setPracticando(false);
  }

  // ── Detalle de un tema ─────────────────────────────
  if (temaAbierto) {
    const videosEn = temaAbierto.videos.filter((v) => v.idioma === 'en');
    const videosEs = temaAbierto.videos.filter((v) => v.idioma === 'es');
    return (
      <div className="tema-detalle">
        <div className="titulo-seccion">
          <h2>{temaAbierto.nombre}</h2>
          <button className="btn-contorno" onClick={cerrarDetalle}>
            <ArrowLeft size={18} />
            Temas
          </button>
        </div>

        {practicando ? (
          <div className="tarjeta">
            <Cuestionario
              ejercicios={temaAbierto.ejercicios}
              onTerminar={onCuestionarioTerminado}
            />
          </div>
        ) : (
          <>
            {temaAbierto.notas && <p className="tarjeta tema-notas">{temaAbierto.notas}</p>}

            <div className="tarjeta videos-grupo">
              <h3>Videos en inglés</h3>
              <ul>
                {videosEn.map((v) => (
                  <li key={v.url}>
                    <a className="video-link" href={v.url} target="_blank" rel="noreferrer">
                      <Youtube size={18} />
                      {v.titulo}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="video-link"
                    href={urlBusqueda(temaAbierto.nombre, 'en')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={18} />
                    Buscar más videos en inglés
                  </a>
                </li>
              </ul>
            </div>

            <div className="tarjeta videos-grupo">
              <h3>Videos en español</h3>
              <ul>
                {videosEs.map((v) => (
                  <li key={v.url}>
                    <a className="video-link" href={v.url} target="_blank" rel="noreferrer">
                      <Youtube size={18} />
                      {v.titulo}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    className="video-link"
                    href={urlBusqueda(temaAbierto.nombre, 'es')}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <ExternalLink size={18} />
                    Buscar más videos en español
                  </a>
                </li>
              </ul>
            </div>

            {temaAbierto.ejercicios.length > 0 ? (
              <button className="btn-primario" onClick={() => setPracticando(true)}>
                <Play size={18} />
                Practicar ({temaAbierto.ejercicios.length} ejercicios)
              </button>
            ) : (
              <p className="vacio">Este tema aún no tiene ejercicios.</p>
            )}
          </>
        )}
      </div>
    );
  }

  // ── Lista de temas ─────────────────────────────────
  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Gramática
          <span className="contador-seccion">{temas.length}</span>
        </h2>
        <button className="btn-primario" onClick={() => setCreando(true)}>
          <Plus size={18} />
          Nuevo tema
        </button>
      </div>

      {temas.length === 0 ? (
        <p className="vacio">
          Crea tu primer tema de gramática con sus ejercicios y videos recomendados.
        </p>
      ) : (
        <ul className="temas-lista">
          {temas.map((t) => (
            <li key={t.id} className="tarjeta tema-item" onClick={() => setTemaAbiertoId(t.id)}>
              <div className="tema-textos">
                <p className="tema-nombre">{t.nombre}</p>
                <p className="texto-suave">
                  {t.ejercicios.length} ejercicios · {t.videos.length} videos
                </p>
              </div>
              <span className="insignia-nivel">{t.nivel}</span>
              <button
                className="btn-icono btn-peligro"
                onClick={(e) => {
                  e.stopPropagation();
                  onBorrarTema(t);
                }}
                aria-label={`Borrar tema ${t.nombre}`}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {creando && (
        <Modal titulo="Nuevo tema de gramática" onCerrar={() => setCreando(false)}>
          <div className="campo">
            <label htmlFor="tema-nombre">Tema</label>
            <input
              id="tema-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Present simple, Comparatives…"
            />
          </div>
          <div className="campo">
            <label htmlFor="tema-nivel">Nivel</label>
            <select
              id="tema-nivel"
              value={nivel}
              onChange={(e) => setNivel(e.target.value as Nivel)}
            >
              {NIVELES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="tema-notas">Notas de estudio (opcional)</label>
            <textarea
              id="tema-notas"
              rows={3}
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              placeholder="Reglas, ejemplos, apuntes de la academia…"
            />
          </div>

          <div className="campo">
            <label>Videos recomendados</label>
            {videos.length > 0 && (
              <ul>
                {videos.map((v) => (
                  <li key={v.url} className="video-guardado">
                    <span>
                      [{v.idioma.toUpperCase()}] {v.titulo}
                    </span>
                    <button
                      type="button"
                      className="btn-icono btn-peligro"
                      onClick={() => setVideos(videos.filter((x) => x !== v))}
                      aria-label={`Quitar video ${v.titulo}`}
                    >
                      <Trash2 size={18} />
                    </button>
                  </li>
                ))}
              </ul>
            )}
            <div className="editor-video">
              <input
                value={videoTitulo}
                onChange={(e) => setVideoTitulo(e.target.value)}
                placeholder="Título del video"
                aria-label="Título del video"
              />
              <select
                value={videoIdioma}
                onChange={(e) => setVideoIdioma(e.target.value as IdiomaVideo)}
                aria-label="Idioma del video"
              >
                <option value="en">EN</option>
                <option value="es">ES</option>
              </select>
              <button type="button" className="btn-contorno" onClick={agregarVideo}>
                <Plus size={18} />
              </button>
            </div>
            <input
              value={videoUrl}
              onChange={(e) => setVideoUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
              aria-label="URL del video"
            />
          </div>

          <div className="campo">
            <label>Ejercicios</label>
            <EditorEjercicios valor={ejercicios} onCambiar={setEjercicios} />
          </div>

          <div className="acciones-modal">
            <button className="btn-primario" onClick={guardarTema} disabled={!nombre.trim()}>
              Guardar tema
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
