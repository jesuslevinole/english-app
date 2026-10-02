import { useMemo, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import type { CSSProperties } from 'react';
import { Brain, Check, Keyboard, LayoutGrid, ListChecks, Play, Plus, RotateCcw, Shuffle, Trash2, X } from 'lucide-react';
import GatoSuerte from '../components/GatoSuerte';
import type { Categoria, Nivel, Palabra } from '../types';
import { barajar } from '../utils/barajar';
import { cartasPorRonda, proporcionInversa } from '../utils/dificultad';
import Modal from '../components/Modal';
import JuegoEscritura from '../components/JuegoEscritura';
import JuegoParejas from '../components/JuegoParejas';
import Cuestionario from '../components/Cuestionario';
import { generarQuizVocabulario, NIVELES_CEFR } from '../utils/vocabulario';
import './Vocabulario.css';

// Carta del juego: en modo inverso se muestra el español y hay que
// recordar la palabra en inglés (dificultad de niveles altos).
interface Carta {
  palabra: Palabra;
  invertida: boolean;
}

interface Props {
  categorias: Categoria[];
  palabras: Palabra[];
  nivel: number;
  // admin: puede crear/borrar contenido; estudiante: solo estudia y juega
  esAdmin: boolean;
  onCrearCategoria: (datos: Omit<Categoria, 'id'>) => void;
  onCrearPalabra: (datos: Omit<Palabra, 'id'>) => void;
  onBorrarPalabra: (palabra: Palabra) => void;
  // (cartas jugadas, ids falladas en la ronda, ids acertadas a la primera)
  onRondaTerminada: (cartasJugadas: number, falladas: string[], acertadas: string[]) => void;
  // Repaso inteligente: ids de palabras pendientes del personaje
  porRepasar: string[];
  onParejasTerminado: (pares: number, intentos: number) => void;
  // XP del modo escritura (spelling)
  onEscrituraTerminada: (aciertos: number, total: number) => void;
  onQuizTerminado: (aciertos: number, total: number) => void;
}

const COLORES_CATEGORIA = ['#2e9e63', '#e0b13e', '#ec6a55', '#2f6690', '#8a5a35', '#1f7a4d'];

export default function Vocabulario({
  categorias,
  palabras,
  nivel,
  esAdmin,
  onCrearCategoria,
  onCrearPalabra,
  onBorrarPalabra,
  onRondaTerminada,
  onEscrituraTerminada,
  onQuizTerminado,
  porRepasar,
  onParejasTerminado,
}: Props) {
  const [filtro, setFiltro] = useState<string>('todas');
  const [modal, setModal] = useState<'ninguno' | 'palabra' | 'categoria'>('ninguno');

  // formulario de palabra
  const [termino, setTermino] = useState('');
  const [significado, setSignificado] = useState('');
  const [categoriaId, setCategoriaId] = useState('');
  const [nivelPalabra, setNivelPalabra] = useState<Nivel>('A1');
  const [emojiPalabra, setEmojiPalabra] = useState('');
  const [ejemploEn, setEjemploEn] = useState('');
  const [ejemploEs, setEjemploEs] = useState('');

  // formulario de categoría
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [colorCategoria, setColorCategoria] = useState(COLORES_CATEGORIA[0]);

  // juego de tarjetas
  const [mazo, setMazo] = useState<Carta[] | null>(null);
  const [volteada, setVolteada] = useState(false);
  const [jugadas, setJugadas] = useState(0);

  // modo escritura (spelling)
  const [escribiendo, setEscribiendo] = useState(false);
  const [configurando, setConfigurando] = useState(false);
  const [jugandoParejas, setJugandoParejas] = useState(false);
  const falladasRonda = useRef<Set<string>>(new Set());
  // arrastre horizontal (con mouse) de la fila de categorías
  const chipsRef = useRef<HTMLDivElement>(null);
  const arrastre = useRef({ x: 0, scroll: 0, activo: false });

  function iniciarArrastre(e: React.PointerEvent) {
    if (e.pointerType !== 'mouse' || !chipsRef.current) return;
    arrastre.current = { x: e.clientX, scroll: chipsRef.current.scrollLeft, activo: true };
  }

  function moverArrastre(e: React.PointerEvent) {
    if (!arrastre.current.activo || !chipsRef.current) return;
    chipsRef.current.scrollLeft = arrastre.current.scroll - (e.clientX - arrastre.current.x);
  }

  function soltarArrastre() {
    arrastre.current.activo = false;
  }

  const idsRonda = useRef<string[]>([]);
  const [quiz, setQuiz] = useState<ReturnType<typeof generarQuizVocabulario> | null>(null);

  // Nivel de una categoría: el de sus palabras (la mayoría manda)
  const nivelDeCategoria = useMemo(() => {
    const mapa = new Map<string, string>();
    for (const cat of categorias) {
      const suyas = palabras.filter((p) => p.categoriaId === cat.id);
      const conteo = new Map<string, number>();
      for (const p of suyas) {
        const n = p.nivel ?? 'A1';
        conteo.set(n, (conteo.get(n) ?? 0) + 1);
      }
      let mejor = 'A1';
      let max = -1;
      for (const [n, cuantos] of conteo) {
        if (cuantos > max) {
          mejor = n;
          max = cuantos;
        }
      }
      mapa.set(cat.id, mejor);
    }
    return mapa;
  }, [categorias, palabras]);

  const categoriasOrdenadas = useMemo(
    () =>
      [...categorias].sort((a, b) => {
        const na = NIVELES_CEFR.indexOf((nivelDeCategoria.get(a.id) ?? 'A1') as (typeof NIVELES_CEFR)[number]);
        const nb = NIVELES_CEFR.indexOf((nivelDeCategoria.get(b.id) ?? 'A1') as (typeof NIVELES_CEFR)[number]);
        return na !== nb ? na - nb : a.nombre.localeCompare(b.nombre);
      }),
    [categorias, nivelDeCategoria],
  );

  const filtradas = useMemo(
    () => (filtro === 'todas' ? palabras : palabras.filter((p) => p.categoriaId === filtro)),
    [filtro, palabras],
  );

  const colorDe = (id: string) =>
    categorias.find((c) => c.id === id)?.color ?? 'var(--verde-700)';

  function guardarPalabra() {
    if (!termino.trim() || !significado.trim() || !categoriaId) return;
    const nueva: Omit<Palabra, 'id'> = {
      termino: termino.trim(),
      significado: significado.trim(),
      categoriaId,
      nivel: nivelPalabra,
      creadaEn: Date.now(),
    };
    if (emojiPalabra.trim()) nueva.emoji = emojiPalabra.trim();
    if (ejemploEn.trim() && ejemploEs.trim()) {
      nueva.ejemplo = { en: ejemploEn.trim(), es: ejemploEs.trim() };
    }
    onCrearPalabra(nueva);
    setTermino('');
    setSignificado('');
    setEmojiPalabra('');
    setEjemploEn('');
    setEjemploEs('');
    setModal('ninguno');
  }

  function guardarCategoria() {
    if (!nombreCategoria.trim()) return;
    onCrearCategoria({ nombre: nombreCategoria.trim(), color: colorCategoria });
    setNombreCategoria('');
    setModal('ninguno');
  }

  // ── Juego de tarjetas ──────────────────────────────
  // El estudiante decide cuántas tarjetas practicar; con una categoría
  // seleccionada, lo natural es estudiarla completa.
  function empezarJuego(cuantas: number) {
    const cantidad = Math.min(cuantas, filtradas.length);
    // A partir del nivel 3, una proporción viene en modo inverso (español → inglés).
    const cartas = barajar(filtradas)
      .slice(0, cantidad)
      .map((palabra) => ({ palabra, invertida: Math.random() < proporcionInversa(nivel) }));
    setConfigurando(false);
    falladasRonda.current = new Set();
    idsRonda.current = cartas.map((ct) => ct.palabra.id);
    setMazo(cartas);
    setVolteada(false);
    setJugadas(0);
  }

  // Ronda solo con las palabras que marcaste "Repasar" antes
  function empezarRepaso() {
    const pendientes = palabras.filter((p) => porRepasar.includes(p.id));
    const cartas = barajar(pendientes).map((palabra) => ({
      palabra,
      invertida: Math.random() < proporcionInversa(nivel),
    }));
    falladasRonda.current = new Set();
    idsRonda.current = cartas.map((ct) => ct.palabra.id);
    setMazo(cartas);
    setVolteada(false);
    setJugadas(0);
  }

  function rebarajar() {
    if (!mazo) return;
    setMazo(barajar(mazo));
    setVolteada(false);
  }

  function pasarCarta(laSabe: boolean) {
    if (!mazo) return;
    const [actual, ...resto] = mazo;
    // “Repasar” manda la carta al final del mazo; “La sé” la retira.
    if (!laSabe) falladasRonda.current.add(actual.palabra.id);
    const siguiente = laSabe ? resto : [...resto, actual];
    setJugadas(jugadas + 1);
    setVolteada(false);
    if (siguiente.length === 0) {
      setMazo([]);
      const falladas = [...falladasRonda.current];
      const acertadas = idsRonda.current.filter((id) => !falladasRonda.current.has(id));
      onRondaTerminada(jugadas + 1, falladas, acertadas);
    } else {
      setMazo(siguiente);
    }
  }

  // ── Juego de parejas (memoria) ─────────────────────
  if (jugandoParejas) {
    return (
      <JuegoParejas
        palabras={filtradas}
        onTerminar={onParejasTerminado}
        onSalir={() => setJugandoParejas(false)}
      />
    );
  }

  // ── Quiz de vocabulario (opción múltiple generada) ─
  if (quiz) {
    return (
      <div className="tarjeta">
        <div className="titulo-seccion">
          <h2>Quiz de vocabulario</h2>
          <button className="btn-contorno" onClick={() => setQuiz(null)}>
            Salir
          </button>
        </div>
        <Cuestionario
          ejercicios={quiz}
          onTerminar={(aciertos, total) => {
            onQuizTerminado(aciertos, total);
          }}
        />
      </div>
    );
  }

  // ── Modo escritura ─────────────────────────────────
  if (escribiendo) {
    return (
      <JuegoEscritura
        palabras={filtradas}
        cantidad={Math.min(cartasPorRonda(nivel), filtradas.length)}
        colorDe={colorDe}
        onTerminar={onEscrituraTerminada}
        onSalir={() => setEscribiendo(false)}
      />
    );
  }

  // ── Elegir cuántas tarjetas practicar ──────────────
  if (configurando) {
    const opciones = [10, 20].filter((n) => n < filtradas.length);
    return (
      <div className="tarjeta config-tarjetas">
        <h2>¿Cuántas tarjetas quieres practicar?</h2>
        <p className="texto-suave">
          {filtro === 'todas'
            ? `Hay ${filtradas.length} palabras en total.`
            : `Esta categoría tiene ${filtradas.length} palabras: estúdiala completa para dominarla.`}
        </p>
        <div className="config-opciones">
          {opciones.map((n) => (
            <button key={n} className="btn-contorno" onClick={() => empezarJuego(n)}>
              {n} tarjetas
            </button>
          ))}
          <button className="btn-primario" onClick={() => empezarJuego(filtradas.length)}>
            Todas ({filtradas.length})
          </button>
        </div>
        <button className="btn-icono" onClick={() => setConfigurando(false)}>
          Cancelar
        </button>
      </div>
    );
  }

  // ── Juego de tarjetas (pantallas) ──────────────────
  if (mazo !== null) {
    if (mazo.length === 0) {
      return createPortal(
        <div className="juego-full">
          <div className="tarjeta juego-final">
            <GatoSuerte mensaje="You did it!" />
            <h2>¡Ronda completada!</h2>
            <p className="texto-suave">Repasaste {jugadas} tarjetas. Tu personaje ganó XP.</p>
            <button className="btn-primario" onClick={() => setMazo(null)}>
              <RotateCcw size={18} />
              Volver al vocabulario
            </button>
          </div>
        </div>,
        document.body,
      );
    }
    const carta = mazo[0];
    const frente = carta.invertida ? carta.palabra.significado : carta.palabra.termino;
    const reverso = carta.invertida ? carta.palabra.termino : carta.palabra.significado;
    // El ejemplo acompaña sin delatar: en inglés solo cuando la palabra ya se ve
    const ejemplo = carta.palabra.ejemplo;
    const ejemploVisible = ejemplo
      ? carta.invertida
        ? volteada
          ? ejemplo.en
          : ejemplo.es
        : volteada
          ? ejemplo.es
          : ejemplo.en
      : null;
    return createPortal(
      <div className="juego juego-full">
        <div className="juego-estado">
          <span className="texto-suave">Quedan {mazo.length} tarjetas</span>
          <div className="juego-estado-acciones">
            <button className="btn-contorno" onClick={rebarajar}>
              <Shuffle size={18} />
              Barajar
            </button>
            <button className="btn-icono" onClick={() => setMazo(null)} aria-label="Salir del juego">
              <X size={20} />
            </button>
          </div>
        </div>
        <div
          className={`tarjeta carta${volteada ? ' volteada' : ''}`}
          style={{ '--cat-color': colorDe(carta.palabra.categoriaId) } as CSSProperties}
          onClick={() => setVolteada(!volteada)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'Enter' || e.key === ' ') setVolteada(!volteada);
          }}
        >
          {carta.palabra.emoji && (
            <span className="carta-emoji" aria-hidden="true">
              {carta.palabra.emoji}
            </span>
          )}
          <span className="carta-palabra">{volteada ? reverso : frente}</span>
          {ejemploVisible && <span className="carta-ejemplo">{ejemploVisible}</span>}
          <span className="carta-pista">
            {carta.invertida && !volteada
              ? 'Modo inverso: di la palabra en inglés y voltea'
              : volteada
                ? carta.invertida
                  ? 'Palabra en inglés'
                  : 'Significado en español'
                : 'Toca para ver el significado'}
          </span>
        </div>
        <div className="juego-botones">
          <button className="btn-contorno" onClick={() => pasarCarta(false)}>
            <RotateCcw size={18} />
            Repasar
          </button>
          <button className="btn-primario" onClick={() => pasarCarta(true)}>
            <Check size={18} />
            La sé
          </button>
        </div>
      </div>,
      document.body,
    );
  }

  // ── Lista y formularios ────────────────────────────
  return (
    <div>
      <div className="titulo-seccion">
        <h2>
          Vocabulario
          <span className="contador-seccion">{filtradas.length}</span>
        </h2>
        {esAdmin && (
          <button className="btn-contorno" onClick={() => setModal('categoria')}>
            <Plus size={18} />
            Categoría
          </button>
        )}
      </div>

      <div
        ref={chipsRef}
        className="fila-chips chips-arrastrables"
        onPointerDown={iniciarArrastre}
        onPointerMove={moverArrastre}
        onPointerUp={soltarArrastre}
        onPointerLeave={soltarArrastre}
      >
        <button
          className={`chip${filtro === 'todas' ? ' activo' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        {categoriasOrdenadas.map((c) => (
          <button
            key={c.id}
            className={`chip chip-categoria${filtro === c.id ? ' activo' : ''}`}
            style={{ '--cat-color': c.color } as CSSProperties}
            onClick={() => setFiltro(c.id)}
          >
            {c.nombre}
            <span className="chip-nivel">{nivelDeCategoria.get(c.id) ?? 'A1'}</span>
          </button>
        ))}
      </div>

      <div className="acciones-vocabulario">
        {esAdmin && (
          <button className="btn-contorno" onClick={() => setModal('palabra')}>
            <Plus size={18} />
            Nueva palabra
          </button>
        )}
        <button
          className="btn-primario"
          onClick={() => setConfigurando(true)}
          disabled={filtradas.length < 2}
        >
          <Play size={18} />
          Tarjetas
        </button>
        <button
          className="btn-primario"
          onClick={() => setEscribiendo(true)}
          disabled={filtradas.length < 2}
        >
          <Keyboard size={18} />
          Escribir
        </button>
        <button
          className="btn-primario"
          onClick={() => setQuiz(generarQuizVocabulario(filtradas, Math.min(10, filtradas.length)))}
          disabled={filtradas.length < 4}
        >
          <ListChecks size={18} />
          Quiz
        </button>
        <button
          className="btn-primario"
          onClick={() => setJugandoParejas(true)}
          disabled={filtradas.length < 4}
        >
          <LayoutGrid size={18} />
          Parejas
        </button>
        <button
          className="btn-contorno"
          onClick={empezarRepaso}
          disabled={porRepasar.length === 0}
        >
          <Brain size={18} />
          Repaso ({porRepasar.length})
        </button>
      </div>

      {filtradas.length === 0 ? (
        <p className="vacio">
          Aún no hay palabras aquí. Agrega tu primera palabra con “Nueva palabra”.
        </p>
      ) : (
        <ul className="palabras-lista">
          {[...filtradas].sort((a, b) => a.termino.localeCompare(b.termino)).map((p) => (
            <li
              key={p.id}
              className="tarjeta palabra-item"
              style={{ '--cat-color': colorDe(p.categoriaId) } as CSSProperties}
            >
              <div className="palabra-textos">
                <p className="palabra-termino">
                  {p.emoji && (
                    <span className="palabra-emoji" aria-hidden="true">
                      {p.emoji}{' '}
                    </span>
                  )}
                  {p.termino}
                </p>
                <p className="texto-suave">{p.significado}</p>
              </div>
              {esAdmin && (
                <button
                  className="btn-icono btn-peligro"
                  onClick={() => onBorrarPalabra(p)}
                  aria-label={`Borrar ${p.termino}`}
                >
                  <Trash2 size={18} />
                </button>
              )}
            </li>
          ))}
        </ul>
      )}

      {modal === 'palabra' && (
        <Modal titulo="Nueva palabra" onCerrar={() => setModal('ninguno')}>
          {categorias.length === 0 ? (
            <p className="vacio">Primero crea una categoría (por ejemplo: Cocina).</p>
          ) : (
            <>
              <div className="campo">
                <label htmlFor="palabra-termino">Palabra en inglés</label>
                <input
                  id="palabra-termino"
                  value={termino}
                  onChange={(e) => setTermino(e.target.value)}
                  placeholder="spoon"
                />
              </div>
              <div className="campo">
                <label htmlFor="palabra-significado">Significado en español</label>
                <input
                  id="palabra-significado"
                  value={significado}
                  onChange={(e) => setSignificado(e.target.value)}
                  placeholder="cuchara"
                />
              </div>
              <div className="campo">
                <label htmlFor="palabra-nivel">Nivel</label>
                <select
                  id="palabra-nivel"
                  value={nivelPalabra}
                  onChange={(e) => setNivelPalabra(e.target.value as Nivel)}
                >
                  {(['A1', 'A2', 'B1', 'B2', 'C1'] as Nivel[]).map((n) => (
                    <option key={n} value={n}>
                      {n}
                    </option>
                  ))}
                </select>
              </div>
              <div className="campo">
                <label htmlFor="palabra-categoria">Categoría</label>
                <select
                  id="palabra-categoria"
                  value={categoriaId}
                  onChange={(e) => setCategoriaId(e.target.value)}
                >
                  <option value="">Elige una categoría</option>
                  {categorias.map((c) => (
                    <option key={c.id} value={c.id}>
                      {c.nombre}
                    </option>
                  ))}
                </select>
              </div>
              <div className="campo">
                <label htmlFor="palabra-emoji">Emoji (opcional, el dibujo de la tarjeta)</label>
                <input
                  id="palabra-emoji"
                  value={emojiPalabra}
                  onChange={(e) => setEmojiPalabra(e.target.value)}
                  placeholder="🚆"
                />
              </div>
              <div className="campo">
                <label htmlFor="palabra-ejemplo-en">Ejemplo en inglés (opcional)</label>
                <input
                  id="palabra-ejemplo-en"
                  value={ejemploEn}
                  onChange={(e) => setEjemploEn(e.target.value)}
                  placeholder="I take the train to work."
                />
              </div>
              <div className="campo">
                <label htmlFor="palabra-ejemplo-es">Traducción del ejemplo</label>
                <input
                  id="palabra-ejemplo-es"
                  value={ejemploEs}
                  onChange={(e) => setEjemploEs(e.target.value)}
                  placeholder="Tomo el tren al trabajo."
                />
              </div>
              <div className="acciones-modal">
                <button
                  className="btn-primario"
                  onClick={guardarPalabra}
                  disabled={!termino.trim() || !significado.trim() || !categoriaId}
                >
                  Guardar palabra
                </button>
              </div>
            </>
          )}
        </Modal>
      )}

      {modal === 'categoria' && (
        <Modal titulo="Nueva categoría" onCerrar={() => setModal('ninguno')}>
          <div className="campo">
            <label htmlFor="categoria-nombre">Nombre</label>
            <input
              id="categoria-nombre"
              value={nombreCategoria}
              onChange={(e) => setNombreCategoria(e.target.value)}
              placeholder="Cocina, Actividades diarias…"
            />
          </div>
          <div className="campo">
            <label>Color</label>
            <div className="selector-botones">
              {COLORES_CATEGORIA.map((c) => (
                <button
                  key={c}
                  className={`selector-color${colorCategoria === c ? ' elegido' : ''}`}
                  style={{ '--muestra': c } as CSSProperties}
                  onClick={() => setColorCategoria(c)}
                  aria-label={`Elegir color ${c}`}
                  aria-pressed={colorCategoria === c}
                />
              ))}
            </div>
          </div>
          <div className="acciones-modal">
            <button
              className="btn-primario"
              onClick={guardarCategoria}
              disabled={!nombreCategoria.trim()}
            >
              Guardar categoría
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
