// Reglas de dificultad según el nivel del personaje.
// Al subir de nivel: más tarjetas por ronda, tarjetas en modo inverso
// (español → inglés) y cuestionarios con más preguntas.

export function cartasPorRonda(nivel: number): number {
  return 5 + nivel * 2;
}

// Proporción de tarjetas que se muestran al revés (ves el español y debes
// recordar la palabra en inglés — más difícil que reconocerla).
export function proporcionInversa(nivel: number): number {
  if (nivel < 3) return 0;
  if (nivel < 5) return 0.3;
  if (nivel < 8) return 0.5;
  return 0.7;
}

export function preguntasPorCuestionario(nivel: number): number {
  return 4 + nivel;
}

// Texto corto para mostrar el reto vigente en Inicio.
export function descripcionReto(nivel: number): string | null {
  if (nivel < 3) return null;
  const porcentaje = Math.round(proporcionInversa(nivel) * 100);
  return `Reto de nivel ${nivel}: ~${porcentaje}% de las tarjetas vienen en modo inverso (español → inglés).`;
}
