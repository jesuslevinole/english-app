import { useMemo, useState } from 'react';
import type { CSSProperties } from 'react';
import { Check, Keyboard, Play, Plus, RotateCcw, Shuffle, Trash2 } from 'lucide-react';
import GatoSuerte from '../components/GatoSuerte';
import type { Categoria, Palabra } from '../types';
import { barajar } from '../utils/barajar';
import { cartasPorRonda, proporcionInversa } from '../utils/dificultad';
import Modal from '../components/Modal';
import JuegoEscritura from '../components/JuegoEscritura';
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
  onRondaTerminada: (cartasJugadas: number) => void;
  // XP del modo escritura (spelling)
  onEscrituraTerminada: (aciertos: number, total: number) => void;
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
}: Props) {
  const [filtro, setFiltro] = useState<string>('todas');
  const [modal, setModal] = useState<'ninguno' | 'palabra' | 'categoria'>('ninguno');

  // formulario de palabra
  const [termino, setTermino] = useState('');
  const [significado, setSignificado] = useState('');
  const [categoriaId, setCategoriaId] = useState('');

  // formulario de categoría
  const [nombreCategoria, setNombreCategoria] = useState('');
  const [colorCategoria, setColorCategoria] = useState(COLORES_CATEGORIA[0]);

  // juego de tarjetas
  const [mazo, setMazo] = useState<Carta[] | null>(null);
  const [volteada, setVolteada] = useState(false);
  const [jugadas, setJugadas] = useState(0);

  // modo escritura (spelling)
  const [escribiendo, setEscribiendo] = useState(false);

  const filtradas = useMemo(
    () => (filtro === 'todas' ? palabras : palabras.filter((p) => p.categoriaId === filtro)),
    [filtro, palabras],
  );

  const colorDe = (id: string) =>
    categorias.find((c) => c.id === id)?.color ?? 'var(--verde-700)';

  function guardarPalabra() {
    if (!termino.trim() || !significado.trim() || !categoriaId) return;
    onCrearPalabra({
      termino: termino.trim(),
      significado: significado.trim(),
      categoriaId,
      creadaEn: Date.now(),
    });
    setTermino('');
    setSignificado('');
    setModal('ninguno');
  }

  function guardarCategoria() {
    if (!nombreCategoria.trim()) return;
    onCrearCategoria({ nombre: nombreCategoria.trim(), color: colorCategoria });
    setNombreCategoria('');
    setModal('ninguno');
  }

  // ── Juego de tarjetas ──────────────────────────────
  function empezarJuego() {
    // La ronda escala con el nivel: más tarjetas y, a partir del nivel 3,
    // una proporción viene en modo inverso (español → inglés).
    const cantidad = Math.min(cartasPorRonda(nivel), filtradas.length);
    const cartas = barajar(filtradas)
      .slice(0, cantidad)
      .map((palabra) => ({ palabra, invertida: Math.random() < proporcionInversa(nivel) }));
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
    const siguiente = laSabe ? resto : [...resto, actual];
    setJugadas(jugadas + 1);
    setVolteada(false);
    if (siguiente.length === 0) {
      setMazo([]);
      onRondaTerminada(jugadas + 1);
    } else {
      setMazo(siguiente);
    }
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

  // ── Juego de tarjetas (pantallas) ──────────────────
  if (mazo !== null) {
    if (mazo.length === 0) {
      return (
        <div className="tarjeta juego-final">
          <GatoSuerte mensaje="You did it!" />
          <h2>¡Ronda completada!</h2>
          <p className="texto-suave">Repasaste {jugadas} tarjetas. Tu personaje ganó XP.</p>
          <button className="btn-primario" onClick={() => setMazo(null)}>
            <RotateCcw size={18} />
            Volver al vocabulario
          </button>
        </div>
      );
    }
    const carta = mazo[0];
    const frente = carta.invertida ? carta.palabra.significado : carta.palabra.termino;
    const reverso = carta.invertida ? carta.palabra.termino : carta.palabra.significado;
    return (
      <div className="juego">
        <div className="juego-estado">
          <span className="texto-suave">Quedan {mazo.length} tarjetas</span>
          <button className="btn-contorno" onClick={rebarajar}>
            <Shuffle size={18} />
            Barajar
          </button>
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
          <span>{volteada ? reverso : frente}</span>
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
        <button className="btn-icono" onClick={() => setMazo(null)}>
          Salir del juego
        </button>
      </div>
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

      <div className="fila-chips">
        <button
          className={`chip${filtro === 'todas' ? ' activo' : ''}`}
          onClick={() => setFiltro('todas')}
        >
          Todas
        </button>
        {categorias.map((c) => (
          <button
            key={c.id}
            className={`chip chip-categoria${filtro === c.id ? ' activo' : ''}`}
            style={{ '--cat-color': c.color } as CSSProperties}
            onClick={() => setFiltro(c.id)}
          >
            {c.nombre}
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
        <button className="btn-primario" onClick={empezarJuego} disabled={filtradas.length < 2}>
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
      </div>

      {filtradas.length === 0 ? (
        <p className="vacio">
          Aún no hay palabras aquí. Agrega tu primera palabra con “Nueva palabra”.
        </p>
      ) : (
        <ul className="palabras-lista">
          {filtradas.map((p) => (
            <li
              key={p.id}
              className="tarjeta palabra-item"
              style={{ '--cat-color': colorDe(p.categoriaId) } as CSSProperties}
            >
              <div className="palabra-textos">
                <p className="palabra-termino">{p.termino}</p>
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
