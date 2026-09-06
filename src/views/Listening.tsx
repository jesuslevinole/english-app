import { useState } from 'react';
import { ArrowLeft, Play, Plus, Trash2 } from 'lucide-react';
import type { Ejercicio, Nivel, RecursoListening } from '../types';
import { urlEmbed } from '../utils/youtube';
import Modal from '../components/Modal';
import Cuestionario from '../components/Cuestionario';
import EditorEjercicios from '../components/EditorEjercicios';
import './Listening.css';

interface Props {
  recursos: RecursoListening[];
  onCrearRecurso: (datos: Omit<RecursoListening, 'id'>) => void;
  onBorrarRecurso: (recurso: RecursoListening) => void;
  onCuestionarioTerminado: (aciertos: number, total: number) => void;
}

const NIVELES: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

export default function Listening({
  recursos,
  onCrearRecurso,
  onBorrarRecurso,
  onCuestionarioTerminado,
}: Props) {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const [respondiendo, setRespondiendo] = useState(false);
  const [creando, setCreando] = useState(false);

  const [titulo, setTitulo] = useState('');
  const [url, setUrl] = useState('');
  const [nivel, setNivel] = useState<Nivel>('A1');
  const [preguntas, setPreguntas] = useState<Ejercicio[]>([]);

  const abierto = recursos.find((r) => r.id === abiertoId) ?? null;

  function guardarRecurso() {
    if (!titulo.trim() || !url.trim()) return;
    onCrearRecurso({ titulo: titulo.trim(), url: url.trim(), nivel, preguntas });
    setTitulo('');
    setUrl('');
    setPreguntas([]);
    setCreando(false);
  }

  if (abierto) {
    const embed = urlEmbed(abierto.url);
    return (
      <div className="listening-detalle">
        <div className="titulo-seccion">
          <h2>{abierto.titulo}</h2>
          <button
            className="btn-contorno"
            onClick={() => {
              setAbiertoId(null);
              setRespondiendo(false);
            }}
          >
            <ArrowLeft size={18} />
            Volver
          </button>
        </div>

        {embed ? (
          <iframe
            className="marco-video"
            src={embed}
            title={abierto.titulo}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <a className="btn-contorno" href={abierto.url} target="_blank" rel="noreferrer">
            Abrir audio/video
          </a>
        )}

        {respondiendo ? (
          <div className="tarjeta">
            <Cuestionario ejercicios={abierto.preguntas} onTerminar={onCuestionarioTerminado} />
          </div>
        ) : abierto.preguntas.length > 0 ? (
          <button className="btn-primario" onClick={() => setRespondiendo(true)}>
            <Play size={18} />
            Responder preguntas ({abierto.preguntas.length})
          </button>
        ) : (
          <p className="vacio">Este recurso aún no tiene preguntas de comprensión.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Listening
          <span className="contador-seccion">{recursos.length}</span>
        </h2>
        <button className="btn-primario" onClick={() => setCreando(true)}>
          <Plus size={18} />
          Nuevo recurso
        </button>
      </div>

      {recursos.length === 0 ? (
        <p className="vacio">
          Agrega un video o audio de YouTube con sus preguntas de comprensión.
        </p>
      ) : (
        <ul className="recursos-lista">
          {recursos.map((r) => (
            <li key={r.id} className="tarjeta recurso-item" onClick={() => setAbiertoId(r.id)}>
              <div className="recurso-textos">
                <p className="recurso-titulo">{r.titulo}</p>
                <p className="texto-suave">
                  {r.nivel} · {r.preguntas.length} preguntas
                </p>
              </div>
              <button
                className="btn-icono"
                onClick={(e) => {
                  e.stopPropagation();
                  onBorrarRecurso(r);
                }}
                aria-label={`Borrar recurso ${r.titulo}`}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      {creando && (
        <Modal titulo="Nuevo recurso de listening" onCerrar={() => setCreando(false)}>
          <div className="campo">
            <label htmlFor="recurso-titulo">Título</label>
            <input
              id="recurso-titulo"
              value={titulo}
              onChange={(e) => setTitulo(e.target.value)}
              placeholder="Daily routine — listening práctica"
            />
          </div>
          <div className="campo">
            <label htmlFor="recurso-url">Link de YouTube</label>
            <input
              id="recurso-url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              placeholder="https://www.youtube.com/watch?v=…"
            />
          </div>
          <div className="campo">
            <label htmlFor="recurso-nivel">Nivel</label>
            <select
              id="recurso-nivel"
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
            <label>Preguntas de comprensión</label>
            <EditorEjercicios valor={preguntas} onCambiar={setPreguntas} />
          </div>
          <div className="acciones-modal">
            <button
              className="btn-primario"
              onClick={guardarRecurso}
              disabled={!titulo.trim() || !url.trim()}
            >
              Guardar recurso
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
