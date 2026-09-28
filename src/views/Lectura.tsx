import { useState } from 'react';
import { ArrowLeft, BookMarked, Plus, Trash2 } from 'lucide-react';
import type { Cuento, Ejercicio, EjemploFrase, Nivel } from '../types';
import { preguntasPorCuestionario } from '../utils/dificultad';
import Modal from '../components/Modal';
import Cuestionario from '../components/Cuestionario';
import EditorEjercicios from '../components/EditorEjercicios';
import BuhoGuia from '../components/BuhoGuia';
import './Lectura.css';

interface Props {
  cuentos: Cuento[];
  nivelPersonaje: number;
  esAdmin: boolean;
  onCrearCuento: (datos: Omit<Cuento, 'id'>) => void;
  onBorrarCuento: (cuento: Cuento) => void;
  // XP al terminar las preguntas de un cuento
  onLecturaTerminada: (aciertos: number, total: number) => void;
}

const NIVELES: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

// Lectura: cuentos cortos por nivel con glosario y preguntas de comprensión.
export default function Lectura({
  cuentos,
  nivelPersonaje,
  esAdmin,
  onCrearCuento,
  onBorrarCuento,
  onLecturaTerminada,
}: Props) {
  const [filtro, setFiltro] = useState<'todos' | Nivel>('todos');
  const [abiertoId, setAbiertoId] = useState<string | null>(null);
  const [pestana, setPestana] = useState<'leer' | 'preguntas'>('leer');
  const [creando, setCreando] = useState(false);

  // formulario de cuento nuevo (admin)
  const [titulo, setTitulo] = useState('');
  const [nivel, setNivel] = useState<Nivel>('A1');
  const [texto, setTexto] = useState('');
  const [glosarioTexto, setGlosarioTexto] = useState('');
  const [ejercicios, setEjercicios] = useState<Ejercicio[]>([]);

  const filtrados = filtro === 'todos' ? cuentos : cuentos.filter((c) => c.nivel === filtro);
  const abierto = cuentos.find((c) => c.id === abiertoId) ?? null;

  function guardarCuento() {
    if (!titulo.trim() || !texto.trim()) return;
    const parrafos = texto
      .split(/\n\s*\n/)
      .map((p) => p.trim())
      .filter(Boolean);
    const glosario: EjemploFrase[] = glosarioTexto
      .split('\n')
      .map((linea) => linea.split('='))
      .filter((partes) => partes.length === 2 && partes[0].trim() && partes[1].trim())
      .map(([en, es]) => ({ en: en.trim(), es: es.trim() }));
    onCrearCuento({ titulo: titulo.trim(), nivel, parrafos, glosario, preguntas: ejercicios });
    setTitulo('');
    setTexto('');
    setGlosarioTexto('');
    setEjercicios([]);
    setCreando(false);
  }

  // ── Detalle de un cuento ───────────────────────────
  if (abierto) {
    return (
      <div className="cuento-detalle">
        <div className="titulo-seccion">
          <h2>{abierto.titulo}</h2>
          <button
            className="btn-contorno"
            onClick={() => {
              setAbiertoId(null);
              setPestana('leer');
            }}
          >
            <ArrowLeft size={18} />
            Cuentos
          </button>
        </div>

        <div className="fila-chips">
          <button
            className={`chip${pestana === 'leer' ? ' activo' : ''}`}
            onClick={() => setPestana('leer')}
          >
            Leer
          </button>
          <button
            className={`chip${pestana === 'preguntas' ? ' activo' : ''}`}
            onClick={() => setPestana('preguntas')}
          >
            Preguntas ({abierto.preguntas.length})
          </button>
        </div>

        {pestana === 'leer' && (
          <>
            <BuhoGuia
              curiosidades={[]}
              fallback={`Lee "${abierto.titulo}" con calma (nivel ${abierto.nivel}). Apóyate en el glosario y, cuando termines, responde las preguntas.`}
            />
            <section className="tarjeta">
              {abierto.parrafos.map((p) => (
                <p key={p.slice(0, 40)} className="cuento-parrafo">
                  {p}
                </p>
              ))}
            </section>
            {abierto.glosario.length > 0 && (
              <section className="tarjeta">
                <h3>Glosario</h3>
                <ul className="glosario-lista">
                  {abierto.glosario.map((g) => (
                    <li key={g.en} className="ejemplo">
                      <p className="ejemplo-en">{g.en}</p>
                      <p className="texto-suave">{g.es}</p>
                    </li>
                  ))}
                </ul>
              </section>
            )}
          </>
        )}

        {pestana === 'preguntas' &&
          (abierto.preguntas.length > 0 ? (
            <div className="tarjeta">
              <Cuestionario
                key={abierto.id}
                ejercicios={abierto.preguntas}
                maxPreguntas={preguntasPorCuestionario(nivelPersonaje)}
                onTerminar={onLecturaTerminada}
              />
            </div>
          ) : (
            <p className="vacio">Este cuento no tiene preguntas todavía.</p>
          ))}
      </div>
    );
  }

  // ── Lista de cuentos ───────────────────────────────
  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Lectura
          <span className="contador-seccion">{filtrados.length}</span>
        </h2>
        {esAdmin && (
          <button className="btn-primario" onClick={() => setCreando(true)}>
            <Plus size={18} />
            Nuevo cuento
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

      {filtrados.length === 0 ? (
        <p className="vacio">
          Aún no hay cuentos de este nivel. Carga el contenido del aula desde Inicio.
        </p>
      ) : (
        <ul className="cuentos-lista">
          {filtrados.map((c) => (
            <li key={c.id} className="tarjeta cuento-item" onClick={() => setAbiertoId(c.id)}>
              <BookMarked size={22} />
              <div className="cuento-textos">
                <p className="cuento-titulo">{c.titulo}</p>
                <p className="texto-suave">
                  {c.parrafos.length} párrafos · {c.preguntas.length} preguntas
                </p>
              </div>
              <span className="insignia-nivel">{c.nivel}</span>
              {esAdmin && (
                <button
                  className="btn-icono btn-peligro"
                  onClick={(e) => {
                    e.stopPropagation();
                    onBorrarCuento(c);
                  }}
                  aria-label={`Borrar cuento ${c.titulo}`}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {creando && (
        <Modal titulo="Nuevo cuento" onCerrar={() => setCreando(false)}>
          <div className="campo">
            <label htmlFor="cuento-titulo">Título</label>
            <input id="cuento-titulo" value={titulo} onChange={(e) => setTitulo(e.target.value)} />
          </div>
          <div className="campo">
            <label htmlFor="cuento-nivel">Nivel</label>
            <select id="cuento-nivel" value={nivel} onChange={(e) => setNivel(e.target.value as Nivel)}>
              {NIVELES.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          <div className="campo">
            <label htmlFor="cuento-texto">Cuento (separa párrafos con una línea en blanco)</label>
            <textarea
              id="cuento-texto"
              rows={8}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
            />
          </div>
          <div className="campo">
            <label htmlFor="cuento-glosario">Glosario (una línea por palabra: inglés=español)</label>
            <textarea
              id="cuento-glosario"
              rows={3}
              value={glosarioTexto}
              onChange={(e) => setGlosarioTexto(e.target.value)}
              placeholder={'lighthouse=faro\ntogether=juntos'}
            />
          </div>
          <div className="campo">
            <label>Preguntas de comprensión</label>
            <EditorEjercicios valor={ejercicios} onCambiar={setEjercicios} />
          </div>
          <div className="acciones-modal">
            <button className="btn-primario" onClick={guardarCuento} disabled={!titulo.trim() || !texto.trim()}>
              Guardar cuento
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
