// Contenido del Nivel 1 de la academia, adaptado a ejercicios propios de la app.
// Temas: verbo to be, contracciones, adjetivos posesivos, saludos y
// presentaciones, y descripción de personas; vocabulario de familia,
// descripciones, apariencia, saludos y animales.
// Se carga a Firestore una sola vez con el botón "Cargar contenido Nivel 1".

import type { Ejercicio, Nivel, VideoRef } from '../types';

interface SemillaPalabra {
  termino: string;
  significado: string;
}

interface SemillaCategoria {
  nombre: string;
  color: string;
  palabras: SemillaPalabra[];
}

interface SemillaTema {
  nombre: string;
  nivel: Nivel;
  notas: string;
  videos: VideoRef[];
  ejercicios: Ejercicio[];
}

interface SemillaListening {
  titulo: string;
  url: string;
  nivel: Nivel;
  preguntas: Ejercicio[];
}

export interface SemillaNivel1 {
  categorias: SemillaCategoria[];
  temas: SemillaTema[];
  listening: SemillaListening[];
}

export const SEMILLA_NIVEL1: SemillaNivel1 = {
  categorias: [
    {
      nombre: 'Familia',
      color: '#ec6a55',
      palabras: [
        { termino: 'father', significado: 'padre' },
        { termino: 'mother', significado: 'madre' },
        { termino: 'parents', significado: 'padres' },
        { termino: 'grandfather', significado: 'abuelo' },
        { termino: 'grandmother', significado: 'abuela' },
        { termino: 'brother', significado: 'hermano' },
        { termino: 'sister', significado: 'hermana' },
        { termino: 'uncle', significado: 'tío' },
        { termino: 'aunt', significado: 'tía' },
        { termino: 'cousin', significado: 'primo / prima' },
        { termino: 'son', significado: 'hijo' },
        { termino: 'daughter', significado: 'hija' },
        { termino: 'husband', significado: 'esposo' },
        { termino: 'wife', significado: 'esposa' },
        { termino: 'children', significado: 'hijos / niños' },
      ],
    },
    {
      nombre: 'Saludos y presentaciones',
      color: '#2e9e63',
      palabras: [
        { termino: 'hello', significado: 'hola' },
        { termino: 'good morning', significado: 'buenos días' },
        { termino: 'good afternoon', significado: 'buenas tardes' },
        { termino: 'good evening', significado: 'buenas noches (saludo)' },
        { termino: 'nice to meet you', significado: 'mucho gusto' },
        { termino: 'how are you?', significado: '¿cómo estás?' },
        { termino: 'fine, thanks', significado: 'bien, gracias' },
        { termino: 'friend', significado: 'amigo / amiga' },
        { termino: "what's your name?", significado: '¿cómo te llamas?' },
        { termino: 'my name is…', significado: 'me llamo…' },
        { termino: 'see you later', significado: 'hasta luego' },
      ],
    },
    {
      nombre: 'Descripciones',
      color: '#e0b13e',
      palabras: [
        { termino: 'tall', significado: 'alto' },
        { termino: 'short', significado: 'bajo / corto' },
        { termino: 'big', significado: 'grande' },
        { termino: 'small', significado: 'pequeño' },
        { termino: 'young', significado: 'joven' },
        { termino: 'old', significado: 'viejo / mayor' },
        { termino: 'pretty', significado: 'bonita' },
        { termino: 'handsome', significado: 'guapo' },
        { termino: 'beautiful', significado: 'hermosa' },
        { termino: 'intelligent', significado: 'inteligente' },
        { termino: 'funny', significado: 'divertido' },
        { termino: 'serious', significado: 'serio' },
        { termino: 'strong', significado: 'fuerte' },
        { termino: 'generous', significado: 'generoso' },
        { termino: 'sweet', significado: 'dulce / tierno' },
        { termino: 'shy', significado: 'tímido' },
        { termino: 'reserved', significado: 'reservado' },
        { termino: 'bald', significado: 'calvo' },
        { termino: 'married', significado: 'casado' },
        { termino: 'single', significado: 'soltero' },
      ],
    },
    {
      nombre: 'Apariencia',
      color: '#2f6690',
      palabras: [
        { termino: 'hair', significado: 'cabello' },
        { termino: 'eyes', significado: 'ojos' },
        { termino: 'curly hair', significado: 'cabello rizado' },
        { termino: 'straight hair', significado: 'cabello liso' },
        { termino: 'long hair', significado: 'cabello largo' },
        { termino: 'short hair', significado: 'cabello corto' },
        { termino: 'blond hair', significado: 'cabello rubio' },
        { termino: 'brown eyes', significado: 'ojos marrones' },
        { termino: 'blue eyes', significado: 'ojos azules' },
        { termino: 'glasses', significado: 'lentes / gafas' },
      ],
    },
    {
      nombre: 'Animales',
      color: '#8a5a35',
      palabras: [
        { termino: 'lion', significado: 'león' },
        { termino: 'polar bear', significado: 'oso polar' },
        { termino: 'gorilla', significado: 'gorila' },
        { termino: 'meerkat', significado: 'suricata' },
        { termino: 'dolphin', significado: 'delfín' },
        { termino: 'wolf', significado: 'lobo' },
        { termino: 'rhino', significado: 'rinoceronte' },
        { termino: 'sloth', significado: 'perezoso' },
      ],
    },
  ],

  temas: [
    {
      nombre: 'Verbo to be (am / is / are)',
      nivel: 'A1',
      notas:
        'am / is / are según el sujeto: I am · he/she/it is · you/we/they are.\nSe usa para decir nombre, edad, origen y descripciones: I am from Venezuela. She is my sister.',
      videos: [
        {
          titulo: "Introduction to the Verb 'To Be' — EasyTeaching",
          url: 'https://www.youtube.com/watch?v=Rstjd4ipXvc',
          idioma: 'en',
        },
      ],
      ejercicios: [
        { pregunta: 'I ___ from Venezuela.', opciones: ['am', 'is', 'are'], respuesta: 0 },
        { pregunta: 'She ___ my sister.', opciones: ['are', 'is', 'am'], respuesta: 1 },
        { pregunta: 'They ___ my parents.', opciones: ['is', 'are', 'am'], respuesta: 1 },
        { pregunta: 'He ___ twenty-nine years old.', opciones: ['is', 'am', 'are'], respuesta: 0 },
        { pregunta: 'We ___ good friends.', opciones: ['is', 'am', 'are'], respuesta: 2 },
        { pregunta: 'My name ___ Ana.', opciones: ['are', 'am', 'is'], respuesta: 2 },
      ],
    },
    {
      nombre: 'Contracciones del verbo to be',
      nivel: 'A1',
      notas:
        "I am → I'm · you are → you're · he is → he's · she is → she's · it is → it's · we are → we're · they are → they're.",
      videos: [
        {
          titulo: 'Contractions of the Verb TO BE',
          url: 'https://www.youtube.com/watch?v=_-9L6CTba3o',
          idioma: 'en',
        },
      ],
      ejercicios: [
        { pregunta: '___ my cousin. (Ella)', opciones: ["She's", 'Shes', "Her's"], respuesta: 0 },
        { pregunta: '"I am" en forma corta es…', opciones: ['Im', "I'm", "I's"], respuesta: 1 },
        { pregunta: '___ from Mexico. (Ellos)', opciones: ['Their', "They're", 'Theys'], respuesta: 1 },
        { pregunta: '"You are" en forma corta es…', opciones: ["You're", 'Your', 'Youre'], respuesta: 0 },
        { pregunta: '___ ten years old. (Él)', opciones: ['Hes', "He're", "He's"], respuesta: 2 },
        { pregunta: '"It is" en forma corta es…', opciones: ['Its', "It's", "Is'"], respuesta: 1 },
      ],
    },
    {
      nombre: 'Adjetivos posesivos (my, your, his, her…)',
      nivel: 'A1',
      notas:
        'my, your, his, her, its, our, their — dicen de quién es algo y van antes del sustantivo: This is my aunt. Her name is Carla.',
      videos: [
        {
          titulo: 'Possessive adjectives',
          url: 'https://www.youtube.com/watch?v=XhV_534yiOk&t=79s',
          idioma: 'en',
        },
      ],
      ejercicios: [
        { pregunta: 'This is my aunt. ___ name is Carla.', opciones: ['His', 'Her', 'Its'], respuesta: 1 },
        { pregunta: 'This is my uncle. ___ name is Pedro.', opciones: ['His', 'Her', 'Their'], respuesta: 0 },
        { pregunta: 'We love ___ grandmother.', opciones: ['us', 'our', 'we'], respuesta: 1 },
        { pregunta: 'The dog eats ___ food.', opciones: ["it's", 'its', 'his'], respuesta: 1 },
        { pregunta: '___ name is Jesús. (hablando de ti mismo)', opciones: ['My', 'Me', 'I'], respuesta: 0 },
        { pregunta: 'They live with ___ parents.', opciones: ['there', 'their', "they're"], respuesta: 1 },
      ],
    },
    {
      nombre: 'Saludar y presentar personas',
      nivel: 'A1',
      notas:
        "Formal: Good morning / Good afternoon / Good evening. Informal: Hi! How's it going?\nPara presentar a alguien: This is my friend…",
      videos: [],
      ejercicios: [
        { pregunta: '— Nice to meet you. — Nice to meet you, ___.', opciones: ['too', 'two', 'to'], respuesta: 0 },
        { pregunta: "What's your ___? — My name is Ana.", opciones: ['name', 'age', 'family'], respuesta: 0 },
        { pregunta: 'How are you? — ___, thanks.', opciones: ['Fine', 'Nice', 'Meet'], respuesta: 0 },
        { pregunta: 'Saludo formal por la mañana:', opciones: ['Good night', 'Good morning', 'Bye'], respuesta: 1 },
        { pregunta: '___ is my friend Hiro. (presentando)', opciones: ['This', 'These', 'Those'], respuesta: 0 },
        { pregunta: 'Saludo informal:', opciones: ['Good evening', 'Hi!', 'Goodbye'], respuesta: 1 },
      ],
    },
    {
      nombre: 'Describir personas',
      nivel: 'A1',
      notas:
        "be + adjetivo: She is tall. He is funny.\nPara rasgos físicos se usa with: She's short with long curly hair and brown eyes.",
      videos: [],
      ejercicios: [
        { pregunta: "She's short ___ long curly hair.", opciones: ['with', 'of', 'in'], respuesta: 0 },
        { pregunta: 'He has no hair. He is ___.', opciones: ['tall', 'bald', 'old'], respuesta: 1 },
        { pregunta: "Is he married? — No, he's ___.", opciones: ['single', 'simple', 'alone'], respuesta: 0 },
        { pregunta: 'My grandfather is 80 years old. He is ___.', opciones: ['young', 'new', 'old'], respuesta: 2 },
        { pregunta: 'She tells jokes. She is ___.', opciones: ['funny', 'serious', 'shy'], respuesta: 0 },
        { pregunta: 'Lo contrario de "tall" es:', opciones: ['short', 'small', 'low'], respuesta: 0 },
      ],
    },
  ],

  listening: [
    {
      titulo: 'Escucha: el verbo to be',
      url: 'https://www.youtube.com/watch?v=Rstjd4ipXvc',
      nivel: 'A1',
      preguntas: [
        { pregunta: 'Según el video, ¿cuál es correcto?', opciones: ['I is', 'I am', 'I are'], respuesta: 1 },
        { pregunta: 'He, she, it van con…', opciones: ['am', 'are', 'is'], respuesta: 2 },
        { pregunta: 'We, you, they van con…', opciones: ['are', 'is', 'am'], respuesta: 0 },
      ],
    },
    {
      titulo: 'Escucha: contracciones del to be',
      url: 'https://www.youtube.com/watch?v=_-9L6CTba3o',
      nivel: 'A1',
      preguntas: [
        { pregunta: '"She is" en forma corta suena como…', opciones: ["She's", 'Shes', "Sh'is"], respuesta: 0 },
        { pregunta: '"They are" se contrae a…', opciones: ["They're", 'Theyre', 'Their'], respuesta: 0 },
        { pregunta: '"I am not" se dice…', opciones: ["I amn't", "I'm not", 'I not'], respuesta: 1 },
      ],
    },
    {
      titulo: 'Escucha: adjetivos posesivos',
      url: 'https://www.youtube.com/watch?v=XhV_534yiOk&t=79s',
      nivel: 'A1',
      preguntas: [
        { pregunta: 'El posesivo de "he" es…', opciones: ['him', 'his', "he's"], respuesta: 1 },
        { pregunta: 'El posesivo de "they" es…', opciones: ['their', 'there', "they're"], respuesta: 0 },
        { pregunta: 'El posesivo de "I" es…', opciones: ['me', 'mine', 'my'], respuesta: 2 },
      ],
    },
  ],
};
