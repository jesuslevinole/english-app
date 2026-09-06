// Tipos canónicos del proyecto. Única fuente de verdad (no crear types.ts paralelos).

export interface Categoria {
  id: string;
  nombre: string;
  color: string; // hex configurable por el usuario → se aplica vía variable CSS
}

export interface Palabra {
  id: string;
  termino: string; // en inglés
  significado: string; // en español
  categoriaId: string;
  creadaEn: number;
}

export interface Ejercicio {
  pregunta: string;
  opciones: string[];
  respuesta: number; // índice de la opción correcta
}

export type IdiomaVideo = 'en' | 'es';

export interface VideoRef {
  titulo: string;
  url: string;
  idioma: IdiomaVideo;
}

export type Nivel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export interface TemaGramatica {
  id: string;
  nombre: string;
  nivel: Nivel;
  notas: string;
  videos: VideoRef[];
  ejercicios: Ejercicio[];
}

export interface RecursoListening {
  id: string;
  titulo: string;
  url: string; // link de YouTube
  nivel: Nivel;
  preguntas: Ejercicio[];
}

// Tipos de actividad diaria que suman XP al personaje
export type TipoActividad = 'vocabulario' | 'gramatica' | 'listening';

export interface Personaje {
  nombre: string;
  emoji: string;
  color: string; // color del avatar, configurable → variable CSS
  xp: number;
  // registro por día: fecha ISO (YYYY-MM-DD) → actividades completadas
  diario: Record<string, TipoActividad[]>;
}

export type Vista = 'inicio' | 'vocabulario' | 'gramatica' | 'listening';
