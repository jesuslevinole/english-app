import type { Ejercicio, Nivel, Palabra } from '../types';
import { barajar } from './barajar';

export const NIVELES_CEFR: Nivel[] = ['A1', 'A2', 'B1', 'B2', 'C1'];

// Niveles que entran en una práctica acumulativa: el actual y todos los anteriores.
export function nivelesHasta(nivel: Nivel): Nivel[] {
  return NIVELES_CEFR.slice(0, NIVELES_CEFR.indexOf(nivel) + 1);
}

// Mezcla material del nivel con ~30% de repaso de niveles anteriores,
// para que lo aprendido antes se siga reforzando.
export function tomarConRepaso<T>(delNivel: T[], anteriores: T[], cantidad: number): T[] {
  const nRepaso = Math.min(Math.round(cantidad * 0.3), anteriores.length);
  const nNivel = Math.min(cantidad - nRepaso, delNivel.length);
  return barajar([
    ...barajar(delNivel).slice(0, nNivel),
    ...barajar(anteriores).slice(0, nRepaso),
  ]);
}

// Genera preguntas de vocabulario (término↔significado) con distractores
// tomados de las demás palabras disponibles.
export function generarQuizVocabulario(palabras: Palabra[], cantidad: number): Ejercicio[] {
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
