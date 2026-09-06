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

export type TipoEjercicio = 'opciones' | 'ordenar' | 'escribir';

// Ejercicio con tres modos de juego. `tipo` ausente = 'opciones'
// (compatibilidad con documentos viejos y con el editor manual).
export interface Ejercicio {
  tipo?: TipoEjercicio;
  pregunta: string; // enunciado o instrucción
  // tipo 'opciones'
  opciones?: string[];
  respuesta?: number; // índice de la opción correcta
  // tipo 'ordenar': armar la oración palabra por palabra
  oracion?: string; // la oración correcta
  traduccion?: string; // pista en español
  // tipo 'escribir': teclear la respuesta
  respuestaTexto?: string;
  pista?: string;
}

// Bloques de lección (la parte de "aprender" de un tema)
export interface EjemploLeccion {
  en: string;
  es: string;
}

export interface TablaLeccion {
  encabezados: string[];
  filas: string[][];
}

export interface SeccionLeccion {
  titulo: string;
  explicacion: string;
  ejemplos: EjemploLeccion[];
  tabla?: TablaLeccion;
}

export interface LineaDialogo {
  hablante: string;
  texto: string;
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
  // Lección completa (opcional: los temas creados a mano pueden no tenerla)
  secciones?: SeccionLeccion[];
  dialogo?: LineaDialogo[];
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
