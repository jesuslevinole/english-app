import type { IdiomaVideo } from '../types';

// Extrae el id de un link de YouTube (watch, youtu.be, shorts) y arma la URL embebible.
export function urlEmbed(url: string): string | null {
  const coincidencia = url.match(/(?:youtu\.be\/|v=|shorts\/|embed\/)([\w-]{11})/);
  return coincidencia ? `https://www.youtube.com/embed/${coincidencia[1]}` : null;
}

// Link de búsqueda en YouTube para un tema, en inglés o en español.
// Se usa como recomendación automática cuando el tema aún no tiene videos guardados.
export function urlBusqueda(tema: string, idioma: IdiomaVideo): string {
  const consulta =
    idioma === 'en'
      ? `${tema} english grammar lesson`
      : `${tema} gramática en inglés explicado en español`;
  return `https://www.youtube.com/results?search_query=${encodeURIComponent(consulta)}`;
}
