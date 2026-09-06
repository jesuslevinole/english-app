// Progresión del personaje: cada nivel cuesta 100 XP.
export const XP_POR_NIVEL = 100;

export function nivelDeXp(xp: number): number {
  return Math.floor(xp / XP_POR_NIVEL) + 1;
}

// Porcentaje de avance dentro del nivel actual (0–100), para la barra de XP.
export function progresoDeNivel(xp: number): number {
  return Math.round(((xp % XP_POR_NIVEL) / XP_POR_NIVEL) * 100);
}

export function fechaHoy(): string {
  return new Date().toISOString().slice(0, 10);
}
