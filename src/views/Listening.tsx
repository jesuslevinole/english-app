import { useState } from 'react';
import { ArrowLeft, Mic, Play, Plus, Trash2 } from 'lucide-react';
import type { Ejercicio, Nivel, RecursoListening, TemaGramatica } from '../types';
import { urlEmbed } from '../utils/youtube';
import Modal from '../components/Modal';
import Cuestionario from '../components/Cuestionario';
import { preguntasPorCuestionario } from '../utils/dificultad';
import EditorEjercicios from '../components/EditorEjercicios';
import Shadowing from '../components/Shadowing';
import './Listening.css';

interface Props {
  recursos: RecursoListening[];
  // Para las frases del shadowing (oraciones y diálogos por nivel)
  temas: TemaGramatica[];
  onCrearRecurso: (datos: Omit<RecursoListening, 'id'>) => void;
  onBorrarRecurso: (recurso: RecursoListening) => void;
  esAdmin: boolean;
  onCuestionarioTerminado: (aciertos: number, total: number) => void;
  // nivel del personaje (dificultad); distinto del `nivel` A1–C1 del formulario
  nivelPersonaje: number;
  onShadowingTerminado: (repetidas: number, total: number) => void;
}

const NIVELES: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

// nota: los recursos sin preguntas son 'práctica libre' (enlaces por nivel)

export default function Listening({
  recursos,
  onCrearRecurso,
  onBorrarRecurso,
  esAdmin,
  onCuestionarioTerminado,
  nivelPersonaje,
  temas,
  onShadowingTerminado,
}: Props) {
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const [respondiendo, setRespondiendo] = useState(false);
  const [creando, setCreando] = useState(false);
  const [filtro, setFiltro] = useState<'todos' | Nivel>('todos');
  const [sombraNivel, setSombraNivel] = useState<Nivel | null>(null);

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

  const filtrados = filtro === 'todos' ? recursos : recursos.filter((r) => r.nivel === filtro);

  if (sombraNivel) {
    return (
      <Shadowing
        temas={temas}
        nivel={sombraNivel}
        onTerminar={onShadowingTerminado}
        onSalir={() => setSombraNivel(null)}
      />
    );
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
            <Cuestionario
              ejercicios={abierto.preguntas}
              maxPreguntas={preguntasPorCuestionario(nivelPersonaje)}
              onTerminar={onCuestionarioTerminado}
            />
          </div>
        ) : abierto.preguntas.length > 0 ? (
          <button className="btn-primario" onClick={() => setRespondiendo(true)}>
            <Play size={18} />
            Responder preguntas ({abierto.preguntas.length})
          </button>
        ) : (
          <p className="vacio">Práctica libre: escucha, disfruta y anota lo nuevo. Este enlace no tiene cuestionario.</p>
        )}
      </div>
    );
  }

  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Listening
          <span className="contador-seccion">{filtrados.length}</span>
        </h2>
        {esAdmin && (
          <button className="btn-primario" onClick={() => setCreando(true)}>
            <Plus size={18} />
            Nuevo recurso
          </button>
        )}
      </div>

      <div className="fila-chips">
        <button
          className={`chip${filtro === 'todos' ? ' activo' : ''}`}
          onClick={() => setFiltro('todos')}
        >
          Todos
        </button>
        {NIVELES.map((n) => (
          <button
            key={n}
            className={`chip${filtro === n ? ' activo' : ''}`}
            onClick={() => setFiltro(n)}
          >
            {n}
          </button>
        ))}
      </div>

      <section className="tarjeta shadowing-invitacion">
        <Mic size={22} />
        <div className="shadowing-invitacion-textos">
          <p className="cuento-titulo">Práctica de shadowing</p>
          <p className="texto-suave">
            Escucha cada frase y repítela en voz alta de inmediato. Incluye repaso de niveles
            anteriores.
          </p>
        </div>
        <div className="fila-chips">
          {NIVELES.map((n) => (
            <button key={n} className="chip" onClick={() => setSombraNivel(n)}>
              {n}
            </button>
          ))}
        </div>
      </section>

      {filtrados.length === 0 ? (
        <p className="vacio">
          Agrega un video o audio de YouTube con sus preguntas de comprensión.
        </p>
      ) : (
        <ul className="recursos-lista">
          {filtrados.map((r) => (
            <li key={r.id} className="tarjeta recurso-item" onClick={() => setAbiertoId(r.id)}>
              <div className="recurso-textos">
                <p className="recurso-titulo">{r.titulo}</p>
                <p className="texto-suave">
                  {r.nivel} · {r.preguntas.length > 0 ? `${r.preguntas.length} preguntas` : 'práctica libre'}
                </p>
              </div>
              {esAdmin && (
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
              )}
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
