import { useState } from 'react';
import type { CSSProperties } from 'react';
import { BookOpen, CheckCircle2, GraduationCap, Headphones, Pencil } from 'lucide-react';
import type { Personaje, TipoActividad } from '../types';
import { fechaHoy, nivelDeXp, progresoDeNivel } from '../utils/nivelXp';
import Modal from '../components/Modal';
import './Inicio.css';

interface Props {
  personaje: Personaje;
  onGuardarPersonaje: (personaje: Personaje) => void;
}

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
      texto: `Termina una ronda de ${5 + nivel * 2} tarjetas de vocabulario`,
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
  ];
}

export default function Inicio({ personaje, onGuardarPersonaje }: Props) {
  const [editando, setEditando] = useState(false);
  const [nombre, setNombre] = useState(personaje.nombre);
  const [emoji, setEmoji] = useState(personaje.emoji);
  const [color, setColor] = useState(personaje.color);

  const nivel = nivelDeXp(personaje.xp);
  const hechasHoy = personaje.diario[fechaHoy()] ?? [];
  const actividades = actividadesDelDia(nivel);

  function abrirEditor() {
    setNombre(personaje.nombre);
    setEmoji(personaje.emoji);
    setColor(personaje.color);
    setEditando(true);
  }

  function guardar() {
    onGuardarPersonaje({ ...personaje, nombre: nombre.trim() || 'Estudiante', emoji, color });
    setEditando(false);
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
