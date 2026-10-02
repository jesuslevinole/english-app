import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, Check, Dumbbell, RotateCcw, Table } from 'lucide-react';
import type { Verbo } from '../data/verbos';
import { VERBOS } from '../data/verbos';
import { barajar } from '../utils/barajar';
import BuhoGuia from './BuhoGuia';
import GatoSuerte from './GatoSuerte';
import './EntrenadorVerbos.css';

interface Props {
  // XP al terminar una ronda de práctica (aciertos, total)
  onTerminar: (aciertos: number, total: number) => void;
  onSalir: () => void;
}

type Forma = 'pasado' | 'participio' | 'gerundio' | 'tercera' | 'futuro' | 'mezcla';

const FORMAS: { id: Forma; etiqueta: string }[] = [
  { id: 'pasado', etiqueta: 'Pasado simple' },
  { id: 'participio', etiqueta: 'Participio pasado' },
  { id: 'gerundio', etiqueta: '-ing' },
  { id: 'tercera', etiqueta: '3ª persona' },
  { id: 'futuro', etiqueta: 'Futuro (will)' },
  { id: 'mezcla', etiqueta: 'Mezcla' },
];

const CONSIGNAS: Record<Exclude<Forma, 'mezcla'>, string> = {
  pasado: 'Pasado simple de',
  participio: 'Participio pasado de',
  gerundio: 'Forma -ing de',
  tercera: 'Tercera persona (he/she/it) de',
  futuro: 'Futuro con will de',
};

interface Pregunta {
  verbo: Verbo;
  forma: Exclude<Forma, 'mezcla'>;
}

function respuestaDe(p: Pregunta): string {
  if (p.forma === 'futuro') return `will ${p.verbo.base}`;
  return p.verbo[p.forma];
}

function esCorrecta(escrito: string, p: Pregunta): boolean {
  const limpio = escrito.trim().toLowerCase().replace(/\s+/g, ' ');
  return respuestaDe(p)
    .toLowerCase()
    .split('/')
    .some((opcion) => opcion.trim() === limpio);
}

// Entrenador de verbos: tabla de consulta (253 verbos con todas sus formas)
// y práctica escrita de conjugaciones con corrección inmediata.
export default function EntrenadorVerbos({ onTerminar, onSalir }: Props) {
  const [pestana, setPestana] = useState<'practicar' | 'tabla'>('practicar');

  // ── Tabla ──
  const [busqueda, setBusqueda] = useState('');
  const [grupo, setGrupo] = useState<'todos' | 'irregulares' | 'regulares'>('todos');
  const visibles = useMemo(() => {
    const texto = busqueda.trim().toLowerCase();
    return VERBOS.filter((vb) => {
      if (grupo === 'irregulares' && !vb.irregular) return false;
      if (grupo === 'regulares' && vb.irregular) return false;
      if (!texto) return true;
      return vb.base.includes(texto) || vb.es.toLowerCase().includes(texto);
    });
  }, [busqueda, grupo]);

  // ── Práctica ──
  const [forma, setForma] = useState<Forma>('mezcla');
  const [soloIrregulares, setSoloIrregulares] = useState(true);
  const [preguntas, setPreguntas] = useState<Pregunta[] | null>(null);
  const [indice, setIndice] = useState(0);
  const [escrito, setEscrito] = useState('');
  const [resultado, setResultado] = useState<'bien' | 'mal' | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [avisado, setAvisado] = useState(false);

  function empezar(cantidad: number) {
    const pool = soloIrregulares ? VERBOS.filter((vb) => vb.irregular) : VERBOS;
    const formasPosibles = FORMAS.map((f) => f.id).filter(
      (id): id is Exclude<Forma, 'mezcla'> => id !== 'mezcla',
    );
    const lista: Pregunta[] = barajar(pool)
      .slice(0, cantidad)
      .map((verbo, i) => ({
        verbo,
        forma: forma === 'mezcla' ? formasPosibles[i % formasPosibles.length] : forma,
      }));
    setPreguntas(barajar(lista));
    setIndice(0);
    setEscrito('');
    setResultado(null);
    setAciertos(0);
    setAvisado(false);
  }

  function comprobar() {
    if (!preguntas || resultado) return;
    const bien = esCorrecta(escrito, preguntas[indice]);
    setResultado(bien ? 'bien' : 'mal');
    if (bien) setAciertos((a) => a + 1);
  }

  function siguiente() {
    if (!preguntas) return;
    if (indice + 1 >= preguntas.length) {
      if (!avisado) {
        setAvisado(true);
        onTerminar(aciertos, preguntas.length);
      }
      setIndice(preguntas.length); // pantalla final
    } else {
      setIndice(indice + 1);
    }
    setEscrito('');
    setResultado(null);
  }

  // ── Render: ronda de práctica activa ──
  if (preguntas) {
    if (indice >= preguntas.length) {
      return (
        <div className="tarjeta practica-verbo">
          {aciertos / preguntas.length >= 0.7 ? <GatoSuerte mensaje="Verb master!" /> : null}
          <p className="cuestionario-puntaje">
            {aciertos} / {preguntas.length}
          </p>
          <p className="texto-suave">
            Escribir las formas (no solo reconocerlas) es lo que las graba de verdad.
          </p>
          <div className="examen-acciones">
            <button className="btn-primario" onClick={() => empezar(preguntas.length)}>
              <RotateCcw size={18} />
              Otra ronda
            </button>
            <button className="btn-contorno" onClick={() => setPreguntas(null)}>
              Volver
            </button>
          </div>
        </div>
      );
    }

    const p = preguntas[indice];
    return (
      <div className="verbos">
        <div className="titulo-seccion">
          <h2>
            Verbos · {indice + 1}/{preguntas.length}
          </h2>
          <button className="btn-contorno" onClick={() => setPreguntas(null)}>
            <ArrowLeft size={18} />
            Salir
          </button>
        </div>
        <div className="tarjeta practica-verbo">
          <p className="practica-consigna">{CONSIGNAS[p.forma]}…</p>
          <p className="practica-base">
            {p.verbo.base}
            <span className="texto-suave"> ({p.verbo.es})</span>
          </p>
          <input
            className="practica-input"
            value={escrito}
            onChange={(e) => setEscrito(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') (resultado ? siguiente : comprobar)();
            }}
            placeholder={p.forma === 'futuro' ? 'will …' : 'Escribe la forma'}
            autoFocus
            autoCapitalize="none"
            autoCorrect="off"
            spellCheck={false}
          />
          {resultado && (
            <p className={`practica-feedback ${resultado}`}>
              {resultado === 'bien' ? '¡Correcto!' : `Casi: es "${respuestaDe(p)}"`}
            </p>
          )}
          {resultado ? (
            <button className="btn-primario" onClick={siguiente}>
              {indice + 1 >= preguntas.length ? 'Ver resultado' : 'Siguiente'}
              <ArrowRight size={18} />
            </button>
          ) : (
            <button className="btn-primario" onClick={comprobar} disabled={!escrito.trim()}>
              <Check size={18} />
              Comprobar
            </button>
          )}
        </div>
      </div>
    );
  }

  // ── Render: portada (config + tabla) ──
  return (
    <div className="verbos">
      <div className="titulo-seccion">
        <h2>Entrenador de verbos</h2>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Volver
        </button>
      </div>

      <div className="fila-chips">
        <button
          className={`chip${pestana === 'practicar' ? ' activo' : ''}`}
          onClick={() => setPestana('practicar')}
        >
          <Dumbbell size={14} /> Practicar
        </button>
        <button
          className={`chip${pestana === 'tabla' ? ' activo' : ''}`}
          onClick={() => setPestana('tabla')}
        >
          <Table size={14} /> Tabla ({VERBOS.length})
        </button>
      </div>

      {pestana === 'practicar' && (
        <div className="tarjeta verbos-config">
          <BuhoGuia
            curiosidades={[]}
            fallback="Elige la forma verbal, escribe la conjugación y comprueba. Los irregulares no siguen reglas: hay que escribirlos hasta que salgan solos."
          />
          <div>
            <p className="texto-suave">¿Qué forma quieres practicar?</p>
            <div className="fila-chips">
              {FORMAS.map((f) => (
                <button
                  key={f.id}
                  className={`chip${forma === f.id ? ' activo' : ''}`}
                  onClick={() => setForma(f.id)}
                >
                  {f.etiqueta}
                </button>
              ))}
            </div>
          </div>
          <label className="campo-check">
            <input
              type="checkbox"
              checked={soloIrregulares}
              onChange={(e) => setSoloIrregulares(e.target.checked)}
            />
            Solo verbos irregulares (los que caen en el examen)
          </label>
          <div className="examen-acciones">
            <button className="btn-primario" onClick={() => empezar(10)}>
              Ronda de 10
            </button>
            <button className="btn-primario" onClick={() => empezar(20)}>
              Ronda de 20
            </button>
          </div>
        </div>
      )}

      {pestana === 'tabla' && (
        <>
          <input
            className="verbos-buscador"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            placeholder="Busca por verbo o significado (go, comer…)"
          />
          <div className="fila-chips">
            {(['todos', 'irregulares', 'regulares'] as const).map((g) => (
              <button
                key={g}
                className={`chip${grupo === g ? ' activo' : ''}`}
                onClick={() => setGrupo(g)}
              >
                {g === 'todos' ? 'Todos' : g === 'irregulares' ? 'Irregulares' : 'Regulares'}
              </button>
            ))}
          </div>
          <ul className="verbos-lista">
            {visibles.map((vb) => (
              <li key={vb.base} className="tarjeta verbo-item">
                <div className="verbo-cabecera">
                  <span className="verbo-base">{vb.base}</span>
                  <span className="texto-suave">{vb.es}</span>
                  {vb.irregular && <span className="insignia-nivel">irregular</span>}
                </div>
                <div className="verbo-formas">
                  <span className="verbo-forma">
                    <span className="verbo-forma-etiqueta">he/she/it</span>
                    <span className="verbo-forma-valor">{vb.tercera}</span>
                  </span>
                  <span className="verbo-forma">
                    <span className="verbo-forma-etiqueta">-ing</span>
                    <span className="verbo-forma-valor">{vb.gerundio}</span>
                  </span>
                  <span className="verbo-forma">
                    <span className="verbo-forma-etiqueta">pasado</span>
                    <span className="verbo-forma-valor">{vb.pasado}</span>
                  </span>
                  <span className="verbo-forma">
                    <span className="verbo-forma-etiqueta">participio</span>
                    <span className="verbo-forma-valor">{vb.participio}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}
