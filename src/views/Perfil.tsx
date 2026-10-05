import { useMemo } from 'react';
import { BookMarked, BookOpen, Brain, GraduationCap, Headphones } from 'lucide-react';
import type { Palabra, Personaje, TipoActividad, Usuario } from '../types';
import { nivelDeXp } from '../utils/nivelXp';
import './Perfil.css';

interface Props {
  usuario: Usuario;
  personaje: Personaje;
  palabras: Palabra[];
}

const ETIQUETAS: Record<TipoActividad, { texto: string; Icono: typeof BookOpen }> = {
  vocabulario: { texto: 'Vocabulario', Icono: BookOpen },
  gramatica: { texto: 'Gramática', Icono: GraduationCap },
  listening: { texto: 'Listening', Icono: Headphones },
  lectura: { texto: 'Lectura', Icono: BookMarked },
};

// Mi perfil: identidad, progreso, lo último estudiado y dónde reforzar.
export default function Perfil({ usuario, personaje, palabras }: Props) {
  const nivel = nivelDeXp(personaje.xp);

  // Últimos días con actividad, del más reciente al más viejo
  const actividadReciente = useMemo(
    () =>
      Object.entries(personaje.diario)
        .filter(([, actividades]) => actividades.length > 0)
        .sort(([a], [b]) => b.localeCompare(a))
        .slice(0, 7),
    [personaje.diario],
  );

  // Dónde más errores: las palabras marcadas "Repasar" que siguen pendientes
  const porReforzar = useMemo(
    () => palabras.filter((p) => (personaje.porRepasar ?? []).includes(p.id)),
    [palabras, personaje.porRepasar],
  );

  const examenes = Object.entries(personaje.examenes ?? {});

  return (
    <div className="perfil">
      <div className="titulo-seccion">
        <h2>Mi perfil</h2>
      </div>

      <section className="tarjeta perfil-identidad">
        <span className="perfil-avatar" aria-hidden="true">
          {personaje.emoji}
        </span>
        <div className="perfil-datos">
          <p className="perfil-nombre">{usuario.nombre}</p>
          <p className="texto-suave">{usuario.correo}</p>
          <p className="texto-suave">
            {usuario.rol === 'admin' ? 'Admin del aula' : 'Estudiante'} · Nivel {nivel} ·{' '}
            {personaje.xp} XP
          </p>
        </div>
      </section>

      {examenes.length > 0 && (
        <section className="tarjeta">
          <h3>Super Exámenes aprobados</h3>
          <div className="fila-chips">
            {examenes.map(([nivelCefr, dato]) => (
              <span key={nivelCefr} className="chip aprobado">
                {nivelCefr} ✓ {dato.puntaje}%
              </span>
            ))}
          </div>
        </section>
      )}

      <section className="tarjeta">
        <h3>Lo más reciente que estudiaste</h3>
        {actividadReciente.length === 0 ? (
          <p className="vacio">Aún no hay actividad registrada. ¡Hoy es un gran día para empezar!</p>
        ) : (
          <ul className="actividad-lista">
            {actividadReciente.map(([fecha, actividades]) => (
              <li key={fecha} className="actividad-dia">
                <span className="actividad-fecha">{fecha}</span>
                <span className="fila-chips">
                  {[...new Set(actividades)].map((a) => {
                    const { texto, Icono } = ETIQUETAS[a];
                    const veces = actividades.filter((x) => x === a).length;
                    return (
                      <span key={a} className="chip">
                        <Icono size={14} /> {texto}
                        {veces > 1 ? ` ×${veces}` : ''}
                      </span>
                    );
                  })}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>

      <section className="tarjeta">
        <h3>
          <Brain size={18} /> Dónde reforzar ({porReforzar.length})
        </h3>
        {porReforzar.length === 0 ? (
          <p className="texto-suave">
            ¡Nada pendiente! Las palabras que marques “Repasar” en las tarjetas aparecerán aquí
            para atacarlas con el Repaso inteligente.
          </p>
        ) : (
          <>
            <p className="texto-suave">
              Estas palabras se te han resistido en las tarjetas. El botón “Repaso” de Vocabulario
              arma una ronda solo con ellas.
            </p>
            <ul className="reforzar-lista">
              {porReforzar.slice(0, 12).map((p) => (
                <li key={p.id} className="ejemplo">
                  <p className="ejemplo-en">
                    {p.emoji ? `${p.emoji} ` : ''}
                    {p.termino}
                  </p>
                  <p className="texto-suave">{p.significado}</p>
                </li>
              ))}
            </ul>
            {porReforzar.length > 12 && (
              <p className="texto-suave">…y {porReforzar.length - 12} más esperándote.</p>
            )}
          </>
        )}
      </section>
    </div>
  );
}
