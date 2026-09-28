import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BookMarked, BookOpen, CheckCircle2, GraduationCap, Headphones, Pencil, Sprout } from 'lucide-react';
import type { Categoria, Cuento, Nivel, Palabra, Personaje, TemaGramatica, TipoActividad } from '../types';
import { fechaHoy, nivelDeXp, progresoDeNivel } from '../utils/nivelXp';
import { cartasPorRonda, descripcionReto } from '../utils/dificultad';
import GatoSuerte from '../components/GatoSuerte';
import SuperExamen from '../components/SuperExamen';
import Modal from '../components/Modal';
import './Inicio.css';

interface Props {
  personaje: Personaje;
  onGuardarPersonaje: (personaje: Personaje) => void;
  // Semilla del contenido del aula (aparece si falta material por cargar)
  mostrarSemilla: boolean;
  onSembrar: () => Promise<void>;
  // Material para armar el Super Examen de cada nivel
  temas: TemaGramatica[];
  palabras: Palabra[];
  cuentos: Cuento[];
  categorias: Categoria[];
  onExamenAprobado: (nivel: Nivel, puntaje: number) => void;
}

const NIVELES_EXAMEN: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

const EMOJIS = ['🦉', '🦊', '🐸', '🐻', '🐨', '🦁', '🐯', '🐼'];
const COLORES = ['#1f7a4d', '#2e9e63', '#e0b13e', '#ec6a55', '#2f6690', '#8a5a35'];

interface ActividadDia {
  id: TipoActividad;
  texto: string;
  xp: number;
  Icono: typeof BookOpen;
}

// Las metas diarias escalan con el nivel para poner siempre a prueba al usuario.
function actividadesDelDia(nivel: number): ActividadDia[] {
  return [
    {
      id: 'vocabulario',
      texto: `Termina una ronda de ${cartasPorRonda(nivel)} tarjetas de vocabulario`,
      xp: 10 + nivel * 2,
      Icono: BookOpen,
    },
    {
      id: 'gramatica',
      texto: 'Completa un cuestionario de gramática',
      xp: 15 + nivel * 2,
      Icono: GraduationCap,
    },
    {
      id: 'listening',
      texto: 'Haz una actividad de listening',
      xp: 15 + nivel * 2,
      Icono: Headphones,
    },
    {
      id: 'lectura',
      texto: 'Lee un cuento y responde sus preguntas',
      xp: 15 + nivel * 2,
      Icono: BookMarked,
    },
  ];
}

export default function Inicio({
  personaje,
  onGuardarPersonaje,
  mostrarSemilla,
  onSembrar,
  temas,
  palabras,
  cuentos,
  categorias,
  onExamenAprobado,
}: Props) {
  const [editando, setEditando] = useState(false);
  const [examenNivel, setExamenNivel] = useState<Nivel | null>(null);
  const [sembrando, setSembrando] = useState(false);
  const [nombre, setNombre] = useState(personaje.nombre);
  const [emoji, setEmoji] = useState(personaje.emoji);
  const [color, setColor] = useState(personaje.color);

  const nivel = nivelDeXp(personaje.xp);
  const reto = descripcionReto(nivel);
  const hechasHoy = personaje.diario[fechaHoy()] ?? [];
  const actividades = actividadesDelDia(nivel);

  function abrirEditor() {
    setNombre(personaje.nombre);
    setEmoji(personaje.emoji);
    setColor(personaje.color);
    setEditando(true);
  }

  async function sembrar() {
    setSembrando(true);
    try {
      await onSembrar();
    } finally {
      setSembrando(false);
    }
  }

  function guardar() {
    onGuardarPersonaje({ ...personaje, nombre: nombre.trim() || 'Estudiante', emoji, color });
    setEditando(false);
  }

  const colorDe = (categoriaId: string) =>
    categorias.find((c) => c.id === categoriaId)?.color ?? '#2e9e63';

  if (examenNivel) {
    return (
      <SuperExamen
        nivel={examenNivel}
        temas={temas}
        palabras={palabras}
        cuentos={cuentos}
        colorDe={colorDe}
        onAprobado={onExamenAprobado}
        onSalir={() => setExamenNivel(null)}
      />
    );
  }

  return (
    <div>
      <section
        className="tarjeta personaje-tarjeta"
        style={{ '--avatar-color': personaje.color } as CSSProperties}
      >
        <div className="personaje-avatar" aria-hidden="true">
          {personaje.emoji}
        </div>
        <div className="personaje-datos">
          <p className="personaje-nombre">{personaje.nombre}</p>
          <p className="texto-suave">
            Nivel {nivel} · {personaje.xp} XP
          </p>
          <div
            className="barra-xp"
            role="progressbar"
            aria-valuenow={progresoDeNivel(personaje.xp)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label="Avance hacia el siguiente nivel"
          >
            <div
              className="barra-xp-relleno"
              style={{ '--avance': `${progresoDeNivel(personaje.xp)}%` } as CSSProperties}
            />
          </div>
        </div>
        <button className="btn-icono" onClick={abrirEditor} aria-label="Personalizar personaje">
          <Pencil size={20} />
        </button>
      </section>

      {mostrarSemilla && (
        <section className="tarjeta semilla">
          <Sprout size={28} />
          <div className="semilla-textos">
            <p className="semilla-titulo">Material del aula listo para cargar</p>
            <p className="texto-suave">
              7 lecciones de la academia con muchos más ejercicios, ~70 palabras, 9 cuentos
              originales por nivel (A1 a C1) con glosario y comprensión, y listening por nivel con
              enlaces gratuitos de British Council. Si ya cargaste contenido antes, se actualiza
              sin duplicar.
            </p>
          </div>
          <button className="btn-primario" onClick={sembrar} disabled={sembrando}>
            {sembrando ? 'Cargando…' : 'Cargar contenido del aula'}
          </button>
        </section>
      )}

      <div className="titulo-seccion">
        <h2>
          Misiones de hoy
          <span className="contador-seccion">
            {hechasHoy.length}/{actividades.length}
          </span>
        </h2>
      </div>

      <ul className="actividades-lista">
        {actividades.map(({ id, texto, xp, Icono }) => {
          const hecha = hechasHoy.includes(id);
          return (
            <li key={id} className={`tarjeta actividad${hecha ? ' hecha' : ''}`}>
              <span className="actividad-icono">
                {hecha ? <CheckCircle2 size={24} /> : <Icono size={24} />}
              </span>
              <span className="actividad-texto">{texto}</span>
              <span className="actividad-xp">+{xp} XP</span>
            </li>
          );
        })}
      </ul>

      {hechasHoy.length === actividades.length && (
        <div className="misiones-gato">
          <GatoSuerte mensaje="All missions complete!" />
        </div>
      )}

      <div className="titulo-seccion">
        <h2>Super Examen</h2>
      </div>

      <section className="tarjeta examen-tarjeta">
        <p className="texto-suave">
          Un examen por nivel que mezcla gramática, vocabulario, armar oraciones, escritura y
          lectura. Se aprueba con 80% y queda registrado en tu personaje.
        </p>
        <div className="fila-chips">
          {NIVELES_EXAMEN.map((n) => {
            const insignia = personaje.examenes?.[n];
            return (
              <button
                key={n}
                className={`chip${insignia ? ' aprobado' : ''}`}
                onClick={() => setExamenNivel(n)}
              >
                {insignia ? `${n} ✓ ${insignia.puntaje}%` : n}
              </button>
            );
          })}
        </div>
      </section>

      {reto && <p className="texto-suave nota-reto">{reto}</p>}

      {editando && (
        <Modal titulo="Personalizar personaje" onCerrar={() => setEditando(false)}>
          <div className="campo">
            <label htmlFor="personaje-nombre">Nombre</label>
            <input
              id="personaje-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
            />
          </div>

          <div className="campo">
            <label>Avatar</label>
            <div className="selector-botones">
              {EMOJIS.map((e) => (
                <button
                  key={e}
                  className={`selector-emoji${emoji === e ? ' elegido' : ''}`}
                  onClick={() => setEmoji(e)}
                  aria-label={`Elegir avatar ${e}`}
                  aria-pressed={emoji === e}
                >
                  {e}
                </button>
              ))}
            </div>
          </div>

          <div className="campo">
            <label>Color</label>
            <div className="selector-botones">
              {COLORES.map((c) => (
                <button
                  key={c}
                  className={`selector-color${color === c ? ' elegido' : ''}`}
                  style={{ '--muestra': c } as CSSProperties}
                  onClick={() => setColor(c)}
                  aria-label={`Elegir color ${c}`}
                  aria-pressed={color === c}
                />
              ))}
            </div>
          </div>

          <div className="acciones-modal">
            <button className="btn-contorno" onClick={() => setEditando(false)}>
              Cancelar
            </button>
            <button className="btn-primario" onClick={guardar}>
              Guardar cambios
            </button>
          </div>
        </Modal>
      )}
    </div>
  );
}
