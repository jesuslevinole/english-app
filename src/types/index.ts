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
  // Nivel CEFR de la palabra; las creadas antes de este campo cuentan como A1
  nivel?: Nivel;
  // Emoji representativo para las tarjetas (dibujo de la palabra)
  emoji?: string;
  // Frase de ejemplo corta con su traducción
  ejemplo?: EjemploFrase;
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

// Frase de ejemplo bilingüe dentro de una lección
export interface EjemploFrase {
  en: string;
  es: string;
}

// Sección de teoría de una lección (explicación simplificada en español)
export interface SeccionLeccion {
  titulo: string;
  contenido: string;
  ejemplos?: EjemploFrase[];
}

export interface LineaDialogo {
  hablante: string;
  texto: string;
}

export interface TemaGramatica {
  id: string;
  nombre: string;
  nivel: Nivel;
  notas: string;
  // Material de estudio (los temas creados a mano desde el formulario pueden no tenerlo)
  explicacion?: SeccionLeccion[];
  dialogo?: LineaDialogo[];
  // Oraciones para el juego de "ordenar palabras"
  oraciones?: string[];
  // Datos curiosos que el Profe Búho cuenta en la pestaña Aprender
  curiosidades?: string[];
  videos: VideoRef[];
  ejercicios: Ejercicio[];
}

// Cuento corto original por nivel, con glosario y comprensión lectora
export interface Cuento {
  id: string;
  titulo: string;
  nivel: Nivel;
  parrafos: string[]; // el cuento, en inglés
  glosario: EjemploFrase[]; // en = palabra/frase, es = significado
  preguntas: Ejercicio[];
}

export interface RecursoListening {
  id: string;
  titulo: string;
  url: string; // link de YouTube
  nivel: Nivel;
  preguntas: Ejercicio[];
}

export type RolUsuario = 'admin' | 'estudiante';

// Cuenta de la app (colección usuarios/{uid} de Firebase Auth)
export interface Usuario {
  id: string; // uid de Firebase Auth
  nombre: string;
  correo: string;
  rol: RolUsuario;
  creadoEn: number;
}

// Tipos de actividad diaria que suman XP al personaje
export type TipoActividad = 'vocabulario' | 'gramatica' | 'listening' | 'lectura';

export interface Personaje {
  nombre: string;
  emoji: string;
  color: string; // color del avatar, configurable → variable CSS
  xp: number;
  // registro por día: fecha ISO (YYYY-MM-DD) → actividades completadas
  diario: Record<string, TipoActividad[]>;
  // Super Exámenes aprobados por nivel CEFR (puntaje 0-100 y fecha ISO)
  examenes?: Partial<Record<Nivel, { puntaje: number; fecha: string }>>;
}

export type Vista = 'inicio' | 'vocabulario' | 'gramatica' | 'listening' | 'lectura' | 'usuarios';
