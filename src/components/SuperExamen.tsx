import { useMemo, useState } from 'react';
import { ArrowRight, RotateCcw, X } from 'lucide-react';
import type { Cuento, Ejercicio, Nivel, Palabra, TemaGramatica } from '../types';
import { barajar } from '../utils/barajar';
import Cuestionario from './Cuestionario';
import OrdenarOracion from './OrdenarOracion';
import JuegoEscritura from './JuegoEscritura';
import BuhoGuia from './BuhoGuia';
import GatoSuerte from './GatoSuerte';
import './SuperExamen.css';

interface Props {
  nivel: Nivel;
  temas: TemaGramatica[];
  palabras: Palabra[];
  cuentos: Cuento[];
  colorDe: (categoriaId: string) => string;
  // Se llama una sola vez si aprueba (puntaje 0-100)
  onAprobado: (nivel: Nivel, puntaje: number) => void;
  onSalir: () => void;
}

const NOTA_MINIMA = 80;

interface Fase {
  id: string;
  titulo: string;
}

// Genera preguntas de vocabulario (término↔significado) con distractores
// tomados de otras palabras del mismo nivel.
function generarVocabulario(palabras: Palabra[], cantidad: number): Ejercicio[] {
  const pool = barajar(palabras);
  return pool.slice(0, cantidad).map((palabra, i) => {
    const alReves = i % 2 === 1; // mitad inglés→español, mitad español→inglés
    const otras = barajar(pool.filter((p) => p.id !== palabra.id)).slice(0, 2);
    const correcta = alReves ? palabra.termino : palabra.significado;
    const opciones = barajar([correcta, ...otras.map((o) => (alReves ? o.termino : o.significado))]);
    return {
      pregunta: alReves
        ? `¿Cómo se dice "${palabra.significado}" en inglés?`
        : `¿Qué significa "${palabra.termino}"?`,
      opciones,
      respuesta: opciones.indexOf(correcta),
    };
  });
}

// Super Examen del nivel: mezcla gramática, vocabulario, ordenar oraciones,
// escritura y lectura. Se aprueba con NOTA_MINIMA% para asegurar retención.
export default function SuperExamen({
  nivel,
  temas,
  palabras,
  cuentos,
  colorDe,
  onAprobado,
  onSalir,
}: Props) {
  const temasNivel = useMemo(() => temas.filter((t) => t.nivel === nivel), [temas, nivel]);
  const palabrasNivel = useMemo(
    () => palabras.filter((p) => (p.nivel ?? 'A1') === nivel),
    [palabras, nivel],
  );
  const cuentosNivel = useMemo(
    () => cuentos.filter((c) => c.nivel === nivel && c.preguntas.length > 0),
    [cuentos, nivel],
  );

  const [intento, setIntento] = useState(0); // sube al reintentar → regenera todo
  const material = useMemo(() => {
    const gramatica = barajar(temasNivel.flatMap((t) => t.ejercicios)).slice(0, 12);
    const vocabulario = generarVocabulario(palabrasNivel, 10);
    const oraciones = barajar(temasNivel.flatMap((t) => t.oraciones ?? [])).slice(0, 5);
    const cuento = cuentosNivel.length > 0 ? barajar(cuentosNivel)[0] : null;
    return { gramatica, vocabulario, oraciones, cuento };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [temasNivel, palabrasNivel, cuentosNivel, intento]);

  const fases: Fase[] = useMemo(() => {
    const lista: Fase[] = [];
    if (material.gramatica.length > 0) lista.push({ id: 'gramatica', titulo: 'Gramática' });
    if (material.vocabulario.length >= 4) lista.push({ id: 'vocabulario', titulo: 'Vocabulario' });
    if (material.oraciones.length > 0) lista.push({ id: 'ordenar', titulo: 'Armar oraciones' });
    if (palabrasNivel.length >= 4) lista.push({ id: 'escritura', titulo: 'Escritura' });
    if (material.cuento) lista.push({ id: 'lectura', titulo: 'Lectura' });
    return lista;
  }, [material, palabrasNivel]);

  const [indiceFase, setIndiceFase] = useState(-1); // -1 = portada
  const [entreFases, setEntreFases] = useState<{ aciertos: number; total: number } | null>(null);
  const [aciertos, setAciertos] = useState(0);
  const [total, setTotal] = useState(0);
  const [aprobadoAvisado, setAprobadoAvisado] = useState(false);

  if (fases.length < 3) {
    return (
      <div className="tarjeta examen-intermedio">
        <p className="cuestionario-pregunta">
          Aún no hay suficiente contenido de nivel {nivel} para armar el Super Examen.
        </p>
        <p className="texto-suave">
          Se necesitan temas de gramática, palabras y cuentos de este nivel.
        </p>
        <button className="btn-contorno" onClick={onSalir}>
          Volver
        </button>
      </div>
    );
  }

  const terminado = indiceFase >= fases.length;
  const puntaje = total === 0 ? 0 : Math.round((aciertos / total) * 100);
  const aprobado = puntaje >= NOTA_MINIMA;

  function terminarFase(a: number, t: number) {
    setAciertos((previo) => previo + a);
    setTotal((previo) => previo + t);
    setEntreFases({ aciertos: a, total: t });
  }

  function siguienteFase() {
    setEntreFases(null);
    setIndiceFase((i) => i + 1);
  }

  function reintentar() {
    setIntento((i) => i + 1);
    setIndiceFase(-1);
    setEntreFases(null);
    setAciertos(0);
    setTotal(0);
    setAprobadoAvisado(false);
  }

  // ── Resultado final ────────────────────────────────
  if (terminado) {
    if (aprobado && !aprobadoAvisado) {
      setAprobadoAvisado(true);
      onAprobado(nivel, puntaje);
    }
    return (
      <div className="examen">
        <div className="tarjeta examen-intermedio">
          {aprobado ? <GatoSuerte mensaje="You passed!" /> : null}
          <p className={`examen-puntaje${aprobado ? '' : ' reprobado'}`}>{puntaje}%</p>
          <p className="cuestionario-pregunta">
            {aciertos} de {total} correctas · Nota mínima: {NOTA_MINIMA}%
          </p>
          {aprobado ? (
            <p className="texto-suave">
              ¡Super Examen {nivel} aprobado! Quedó registrado en tu personaje y ganaste XP extra.
            </p>
          ) : (
            <BuhoGuia
              curiosidades={[]}
              fallback={`¡Casi! Repasa las lecciones del nivel ${nivel} (y sus cuentos) y vuelve a intentarlo. Cada intento trae preguntas distintas.`}
            />
          )}
          <div className="examen-acciones">
            {!aprobado && (
              <button className="btn-primario" onClick={reintentar}>
                <RotateCcw size={18} />
                Intentar de nuevo
              </button>
            )}
            <button className="btn-contorno" onClick={onSalir}>
              Volver a Inicio
            </button>
          </div>
        </div>
      </div>
    );
  }

  // ── Portada ────────────────────────────────────────
  if (indiceFase === -1) {
    return (
      <div className="examen">
        <BuhoGuia
          curiosidades={[]}
          fallback={`Super Examen ${nivel}: ${fases.length} fases (${fases
            .map((f) => f.titulo.toLowerCase())
            .join(', ')}). Necesitas ${NOTA_MINIMA}% para aprobar. ¡Tú puedes!`}
        />
        <div className="examen-acciones">
          <button className="btn-primario" onClick={siguienteFase}>
            Comenzar
            <ArrowRight size={18} />
          </button>
          <button className="btn-contorno" onClick={onSalir}>
            <X size={18} />
            Cancelar
          </button>
        </div>
      </div>
    );
  }

  const fase = fases[indiceFase];

  return (
    <div className="examen">
      <div className="titulo-seccion">
        <h2>
          Super Examen {nivel} · {fase.titulo}
        </h2>
        <button className="btn-icono" onClick={onSalir}>
          Abandonar
        </button>
      </div>

      <div className="examen-progreso" aria-label="Progreso del examen">
        {fases.map((f, i) => (
          <span
            key={f.id}
            className={`examen-paso${i < indiceFase ? ' hecho' : ''}${i === indiceFase ? ' actual' : ''}`}
          />
        ))}
      </div>

      {entreFases ? (
        <div className="tarjeta examen-intermedio">
          <p className="cuestionario-puntaje">
            {entreFases.aciertos} / {entreFases.total}
          </p>
          <p className="texto-suave">Fase de {fase.titulo.toLowerCase()} completada.</p>
          <button className="btn-primario" onClick={siguienteFase}>
            {indiceFase + 1 < fases.length ? 'Siguiente fase' : 'Ver resultado'}
            <ArrowRight size={18} />
          </button>
        </div>
      ) : (
        <div className="tarjeta">
          {fase.id === 'gramatica' && (
            <Cuestionario key={`g${intento}`} ejercicios={material.gramatica} onTerminar={terminarFase} />
          )}
          {fase.id === 'vocabulario' && (
            <Cuestionario key={`v${intento}`} ejercicios={material.vocabulario} onTerminar={terminarFase} />
          )}
          {fase.id === 'ordenar' && (
            <OrdenarOracion
              key={`o${intento}`}
              oraciones={material.oraciones}
              maxOraciones={material.oraciones.length}
              onTerminar={terminarFase}
            />
          )}
          {fase.id === 'escritura' && (
            <JuegoEscritura
              key={`e${intento}`}
              palabras={palabrasNivel}
              cantidad={Math.min(6, palabrasNivel.length)}
              colorDe={colorDe}
              onTerminar={terminarFase}
              onSalir={onSalir}
            />
          )}
          {fase.id === 'lectura' && material.cuento && (
            <Cuestionario
              key={`l${intento}`}
              ejercicios={material.cuento.preguntas}
              onTerminar={terminarFase}
            />
          )}
        </div>
      )}
    </div>
  );
}
