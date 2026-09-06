// Normaliza respuestas escritas para compararlas con tolerancia:
// mayúsculas, espacios repetidos, apóstrofes tipográficos y puntuación final.
export function normalizarRespuesta(texto: string): string {
  return texto
    .trim()
    .toLowerCase()
    .replace(/[’‘`]/g, "'")
    .replace(/\s+/g, ' ')
    .replace(/[.!?,;]+$/, '');
}
