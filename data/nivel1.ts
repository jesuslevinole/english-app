// Lecciones del Nivel 1 de la academia (unidad "Friends and Family"),
// simplificadas y adaptadas al formato de la app: cada tema trae una
// lección para APRENDER (explicación en español, ejemplos, tablas y una
// conversación para practicar) y ejercicios para JUGAR en tres modos:
// elegir opción, ordenar palabras y escribir.
// Se cargan/actualizan con el botón "Cargar lecciones Nivel 1" en Inicio.

import type { Ejercicio, LineaDialogo, Nivel, SeccionLeccion, VideoRef } from '../types';

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
  secciones: SeccionLeccion[];
  dialogo?: LineaDialogo[];
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
    // ── Lección A ──────────────────────────────────────
    {
      nombre: 'Saludar y presentar personas',
      nivel: 'A1',
      notas: 'Lección A del Nivel 1: saludos, presentaciones y deletrear nombres.',
      videos: [],
      secciones: [
        {
          titulo: 'Saludos formales e informales',
          explicacion:
            'Con desconocidos o en situaciones formales usa los saludos con "Good…". Con amigos usa los informales. Para responder a "How are you?" basta con: Fine / OK / Great, thanks.',
          ejemplos: [
            { en: 'Good morning. How are you?', es: 'Buenos días. ¿Cómo está?' },
            { en: "Hi! How's it going?", es: '¡Hola! ¿Qué tal?' },
            { en: 'Fine, thanks. And you?', es: 'Bien, gracias. ¿Y tú?' },
          ],
          tabla: {
            encabezados: ['Momento', 'Formal', 'Informal'],
            filas: [
              ['Mañana', 'Good morning', 'Hi / Hello'],
              ['Tarde', 'Good afternoon', 'Hi / Hello'],
              ['Noche (saludo)', 'Good evening', 'Hi / Hello'],
              ['Despedida', 'Goodbye', 'Bye / See you later'],
            ],
          },
        },
        {
          titulo: 'Presentar a alguien',
          explicacion:
            'Para presentar a una persona usa "This is…". La respuesta típica es "Nice to meet you", y la otra persona contesta agregando "too" (también).',
          ejemplos: [
            { en: 'This is my friend Marta.', es: 'Te presento a mi amiga Marta.' },
            { en: 'Nice to meet you, Marta.', es: 'Mucho gusto, Marta.' },
            { en: 'Nice to meet you too.', es: 'Mucho gusto también.' },
          ],
        },
        {
          titulo: 'El alfabeto y deletrear nombres',
          explicacion:
            'En inglés es normal deletrear el nombre cuando no se entiende. Se pregunta con "How do you spell…?" y se responde letra por letra: M-A-R-T-A. Practica el alfabeto: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.',
          ejemplos: [
            { en: 'How do you spell your name?', es: '¿Cómo se deletrea tu nombre?' },
            { en: "It's Marta. M-A-R-T-A.", es: 'Es Marta. M-A-R-T-A.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Ana', texto: 'Hi, Leo. How are you?' },
        { hablante: 'Leo', texto: 'Great. And you?' },
        { hablante: 'Ana', texto: 'Fine, thanks.' },
        { hablante: 'Leo', texto: 'Ana, this is my friend Marta.' },
        { hablante: 'Ana', texto: 'Nice to meet you, Marta. Sorry, how do you spell your name?' },
        { hablante: 'Marta', texto: "It's M-A-R-T-A. Nice to meet you too, Ana." },
      ],
      ejercicios: [
        { pregunta: '— Nice to meet you. — Nice to meet you, ___.', opciones: ['too', 'two', 'to'], respuesta: 0 },
        { pregunta: "What's your ___? — My name is Ana.", opciones: ['name', 'age', 'family'], respuesta: 0 },
        { pregunta: 'How are you? — ___, thanks.', opciones: ['Fine', 'Nice', 'Meet'], respuesta: 0 },
        { pregunta: 'Saludo formal por la mañana:', opciones: ['Good night', 'Good morning', 'Bye'], respuesta: 1 },
        { pregunta: '___ is my friend Hiro. (presentando)', opciones: ['This', 'These', 'Those'], respuesta: 0 },
        { pregunta: 'Saludo informal:', opciones: ['Good evening', 'Hi!', 'Goodbye'], respuesta: 1 },
        { tipo: 'ordenar', pregunta: 'Ordena la presentación:', oracion: 'This is my friend Carlos', traduccion: 'Te presento a mi amigo Carlos' },
        { tipo: 'ordenar', pregunta: 'Ordena la respuesta:', oracion: 'Nice to meet you too', traduccion: 'Mucho gusto también' },
        { tipo: 'escribir', pregunta: '¿Cómo se dice "buenos días"?', respuestaTexto: 'good morning' },
        { tipo: 'escribir', pregunta: 'Completa: How do you ___ your name? (deletrear)', respuestaTexto: 'spell', pista: 'Empieza con s' },
      ],
    },

    // ── Lección B ──────────────────────────────────────
    {
      nombre: 'Verbo to be (am / is / are)',
      nivel: 'A1',
      notas: 'Lección B del Nivel 1: el verbo to be y los miembros de la familia.',
      videos: [
        {
          titulo: "Introduction to the Verb 'To Be' — EasyTeaching",
          url: 'https://www.youtube.com/watch?v=Rstjd4ipXvc',
          idioma: 'en',
        },
      ],
      secciones: [
        {
          titulo: 'Cómo se conjuga',
          explicacion:
            'To be significa "ser" o "estar" y cambia según el sujeto. Es el verbo más usado del inglés: apréndete esta tabla de memoria.',
          ejemplos: [
            { en: 'I am Jesús.', es: 'Yo soy Jesús.' },
            { en: 'She is my sister.', es: 'Ella es mi hermana.' },
            { en: 'They are my parents.', es: 'Ellos son mis padres.' },
          ],
          tabla: {
            encabezados: ['Sujeto', 'Verbo', 'Ejemplo'],
            filas: [
              ['I', 'am', 'I am from Venezuela.'],
              ['He / She / It', 'is', 'She is my aunt.'],
              ['You / We / They', 'are', 'We are friends.'],
            ],
          },
        },
        {
          titulo: 'Para qué se usa',
          explicacion:
            'Con to be dices tu nombre, tu edad, tu origen y presentas a tu familia. Ojo con la edad: en inglés se usa to be, no "tener" — I am 29 years old (nunca "I have 29 years").',
          ejemplos: [
            { en: 'My name is Ana.', es: 'Mi nombre es Ana.' },
            { en: 'I am twenty-nine years old.', es: 'Tengo veintinueve años.' },
            { en: 'I am from Venezuela.', es: 'Soy de Venezuela.' },
            { en: 'He is my uncle.', es: 'Él es mi tío.' },
          ],
        },
        {
          titulo: 'La familia',
          explicacion:
            'Combina to be con el vocabulario de familia (categoría "Familia" en Vocabulario) para presentar a los tuyos. Para preguntar quién es alguien: Who is this?',
          ejemplos: [
            { en: 'Who is this? — It is my grandmother.', es: '¿Quién es? — Es mi abuela.' },
            { en: 'They are my cousins.', es: 'Ellos son mis primos.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Ana', texto: "Who's this in the photo?" },
        { hablante: 'Leo', texto: "It's my grandmother. Her name is Rosa." },
        { hablante: 'Ana', texto: 'And who are they?' },
        { hablante: 'Leo', texto: "They're my parents. And this is my sister." },
        { hablante: 'Ana', texto: 'Nice family!' },
      ],
      ejercicios: [
        { pregunta: 'I ___ from Venezuela.', opciones: ['am', 'is', 'are'], respuesta: 0 },
        { pregunta: 'She ___ my sister.', opciones: ['are', 'is', 'am'], respuesta: 1 },
        { pregunta: 'They ___ my parents.', opciones: ['is', 'are', 'am'], respuesta: 1 },
        { pregunta: 'He ___ twenty-nine years old.', opciones: ['is', 'am', 'are'], respuesta: 0 },
        { pregunta: 'My name ___ Ana.', opciones: ['are', 'am', 'is'], respuesta: 2 },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'She is my sister', traduccion: 'Ella es mi hermana' },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'They are my parents', traduccion: 'Ellos son mis padres' },
        { tipo: 'escribir', pregunta: 'Completa: We ___ good friends.', respuestaTexto: 'are' },
        { tipo: 'escribir', pregunta: '¿Cómo se dice "abuela"?', respuestaTexto: 'grandmother' },
        { tipo: 'escribir', pregunta: 'Completa: I ___ from Venezuela.', respuestaTexto: 'am' },
      ],
    },

    // ── Lección C ──────────────────────────────────────
    {
      nombre: 'Contracciones del verbo to be',
      nivel: 'A1',
      notas: 'Lección C del Nivel 1: formas cortas del verbo to be.',
      videos: [
        {
          titulo: 'Contractions of the Verb TO BE',
          url: 'https://www.youtube.com/watch?v=_-9L6CTba3o',
          idioma: 'en',
        },
      ],
      secciones: [
        {
          titulo: 'Las formas cortas',
          explicacion:
            'En inglés hablado casi siempre se usan las contracciones: el sujeto y el verbo se unen con un apóstrofe. Suenan más naturales que la forma larga.',
          ejemplos: [
            { en: "I'm Jesús.", es: 'Soy Jesús.' },
            { en: "She's my cousin.", es: 'Ella es mi prima.' },
            { en: "They're from Mexico.", es: 'Ellos son de México.' },
          ],
          tabla: {
            encabezados: ['Forma larga', 'Contracción'],
            filas: [
              ['I am', "I'm"],
              ['You are', "You're"],
              ['He is', "He's"],
              ['She is', "She's"],
              ['It is', "It's"],
              ['We are', "We're"],
              ['They are', "They're"],
            ],
          },
        },
        {
          titulo: 'Negaciones',
          explicacion:
            'Para negar se agrega not. También se puede contraer: is not → isn\'t, are not → aren\'t. Con "I" la única forma es I\'m not.',
          ejemplos: [
            { en: "I'm not married.", es: 'No estoy casado.' },
            { en: "He isn't my brother.", es: 'Él no es mi hermano.' },
            { en: "They aren't from Chile.", es: 'Ellos no son de Chile.' },
          ],
        },
      ],
      ejercicios: [
        { pregunta: '___ my cousin. (Ella)', opciones: ["She's", 'Shes', "Her's"], respuesta: 0 },
        { pregunta: '"I am" en forma corta es…', opciones: ['Im', "I'm", "I's"], respuesta: 1 },
        { pregunta: '___ from Mexico. (Ellos)', opciones: ['Their', "They're", 'Theys'], respuesta: 1 },
        { pregunta: '"You are" en forma corta es…', opciones: ["You're", 'Your', 'Youre'], respuesta: 0 },
        { pregunta: '___ ten years old. (Él)', opciones: ['Hes', "He're", "He's"], respuesta: 2 },
        { pregunta: '"It is" en forma corta es…', opciones: ['Its', "It's", "Is'"], respuesta: 1 },
        { tipo: 'escribir', pregunta: 'Escribe "She is" en forma corta:', respuestaTexto: "she's" },
        { tipo: 'escribir', pregunta: 'Escribe "They are" en forma corta:', respuestaTexto: "they're" },
        { tipo: 'ordenar', pregunta: 'Arma la negación:', oracion: "I'm not from Canada", traduccion: 'No soy de Canadá' },
      ],
    },

    // ── Lección D ──────────────────────────────────────
    {
      nombre: 'Adjetivos posesivos (my, your, his, her…)',
      nivel: 'A1',
      notas: 'Lección D del Nivel 1: decir de quién es algo.',
      videos: [
        {
          titulo: 'Possessive adjectives',
          url: 'https://www.youtube.com/watch?v=XhV_534yiOk&t=79s',
          idioma: 'en',
        },
      ],
      secciones: [
        {
          titulo: 'Uno por cada persona',
          explicacion:
            'Los posesivos van SIEMPRE antes del sustantivo (my name, her book) y dependen del dueño, no del objeto. Cuidado con los clásicos errores: his = de él, her = de ella; its (sin apóstrofe) = posesivo, it\'s = "it is"; their = posesivo, they\'re = "they are".',
          ejemplos: [
            { en: 'This is my aunt. Her name is Carla.', es: 'Esta es mi tía. Su nombre es Carla.' },
            { en: 'This is my uncle. His name is Pedro.', es: 'Este es mi tío. Su nombre es Pedro.' },
            { en: 'The dog eats its food.', es: 'El perro come su comida.' },
          ],
          tabla: {
            encabezados: ['Sujeto', 'Posesivo', 'Ejemplo'],
            filas: [
              ['I', 'my', 'My name is Jesús.'],
              ['You', 'your', 'Your family is big.'],
              ['He', 'his', 'His name is Pedro.'],
              ['She', 'her', 'Her name is Carla.'],
              ['It', 'its', 'Its name is Rex.'],
              ['We', 'our', 'Our grandmother is sweet.'],
              ['They', 'their', 'Their parents are young.'],
            ],
          },
        },
      ],
      dialogo: [
        { hablante: 'Ana', texto: 'Is this your cousin?' },
        { hablante: 'Leo', texto: 'Yes. Her name is Eva. And this is her brother.' },
        { hablante: 'Ana', texto: "What's his name?" },
        { hablante: 'Leo', texto: 'His name is David. Their parents are my uncle and aunt.' },
      ],
      ejercicios: [
        { pregunta: 'This is my aunt. ___ name is Carla.', opciones: ['His', 'Her', 'Its'], respuesta: 1 },
        { pregunta: 'We love ___ grandmother.', opciones: ['us', 'our', 'we'], respuesta: 1 },
        { pregunta: 'The dog eats ___ food.', opciones: ["it's", 'its', 'his'], respuesta: 1 },
        { pregunta: '___ name is Jesús. (hablando de ti mismo)', opciones: ['My', 'Me', 'I'], respuesta: 0 },
        { pregunta: 'They live with ___ parents.', opciones: ['there', 'their', "they're"], respuesta: 1 },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'Her name is Carla', traduccion: 'Su nombre (de ella) es Carla' },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'This is our house', traduccion: 'Esta es nuestra casa' },
        { tipo: 'escribir', pregunta: 'Completa: This is my uncle. ___ name is Pedro.', respuestaTexto: 'his' },
        { tipo: 'escribir', pregunta: 'El posesivo de "they" es…', respuestaTexto: 'their' },
      ],
    },

    // ── Lección E ──────────────────────────────────────
    {
      nombre: 'Describir personas',
      nivel: 'A1',
      notas: 'Lección E del Nivel 1: describir a tu familia y dar información personal.',
      videos: [],
      secciones: [
        {
          titulo: 'be + adjetivo',
          explicacion:
            'Para describir carácter y aspecto se usa to be + adjetivo. El adjetivo NO cambia con el género ni con el plural, y puedes encadenar varios con comas y "and".',
          ejemplos: [
            { en: 'She is intelligent and funny.', es: 'Ella es inteligente y divertida.' },
            { en: 'He is strong, serious, and reserved.', es: 'Él es fuerte, serio y reservado.' },
          ],
        },
        {
          titulo: 'Rasgos físicos con "with"',
          explicacion:
            'Para el cabello y los ojos se usa with: primero cómo es la persona, luego with + sus rasgos. El orden típico del cabello es largo/corto + forma + color: long curly brown hair.',
          ejemplos: [
            { en: "She's short with long curly hair.", es: 'Es baja, con cabello largo y rizado.' },
            { en: "He's tall with brown eyes.", es: 'Es alto, de ojos marrones.' },
            { en: "He's bald.", es: 'Es calvo.' },
          ],
        },
        {
          titulo: 'Edad y estado civil',
          explicacion:
            'La edad va con to be: She is eighteen years old. El estado civil también: married (casado) o single (soltero). Para preguntar: Is he married? — Yes, he is. / No, he isn\'t.',
          ejemplos: [
            { en: 'My aunt is forty-nine years old.', es: 'Mi tía tiene cuarenta y nueve años.' },
            { en: "Is he married? — No, he's single.", es: '¿Está casado? — No, es soltero.' },
          ],
        },
        {
          titulo: 'Escribe sobre tu familia',
          explicacion:
            'Junta todo con esta plantilla (como la tarea de la academia). Cámbiala con tus datos y practica escribirla de memoria:',
          ejemplos: [
            { en: 'Hello, my name is ___. I am ___ years old. I am from ___.', es: 'Hola, me llamo ___. Tengo ___ años. Soy de ___.' },
            { en: 'This is my uncle. His name is ___.', es: 'Este es mi tío. Su nombre es ___.' },
            { en: 'He is ___ and ___ with ___ hair and ___ eyes.', es: 'Él es ___ y ___, con cabello ___ y ojos ___.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Ana', texto: "Who's this?" },
        { hablante: 'Leo', texto: "It's my brother." },
        { hablante: 'Ana', texto: "What's his name?" },
        { hablante: 'Leo', texto: 'David.' },
        { hablante: 'Ana', texto: 'Is he married?' },
        { hablante: 'Leo', texto: "No, he's single. He's tall with short curly hair." },
      ],
      ejercicios: [
        { pregunta: "She's short ___ long curly hair.", opciones: ['with', 'of', 'in'], respuesta: 0 },
        { pregunta: 'He has no hair. He is ___.', opciones: ['tall', 'bald', 'old'], respuesta: 1 },
        { pregunta: "Is he married? — No, he's ___.", opciones: ['single', 'simple', 'alone'], respuesta: 0 },
        { pregunta: 'My grandfather is 80 years old. He is ___.', opciones: ['young', 'new', 'old'], respuesta: 2 },
        { pregunta: 'She tells jokes. She is ___.', opciones: ['funny', 'serious', 'shy'], respuesta: 0 },
        { pregunta: 'Lo contrario de "tall" es:', opciones: ['short', 'small', 'low'], respuesta: 0 },
        { tipo: 'ordenar', pregunta: 'Arma la descripción:', oracion: 'He is tall with curly hair', traduccion: 'Él es alto, con cabello rizado' },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'She is twenty years old', traduccion: 'Ella tiene veinte años' },
        { tipo: 'escribir', pregunta: "Completa: She's short ___ long hair.", respuestaTexto: 'with' },
        { tipo: 'escribir', pregunta: '¿Cómo se dice "calvo"?', respuestaTexto: 'bald' },
      ],
    },

    // ── Lección F ──────────────────────────────────────
    {
      nombre: 'Familias de animales',
      nivel: 'A1',
      notas: 'Lección F del Nivel 1 (video journal): describir animales y sus familias.',
      videos: [],
      secciones: [
        {
          titulo: 'Los animales también tienen familias',
          explicacion:
            'Con el mismo to be y los adjetivos big/small puedes hablar de animales. Frases clave: live in groups (viven en grupos) y live alone (viven solos).',
          ejemplos: [
            { en: 'Lions live in family groups.', es: 'Los leones viven en grupos familiares.' },
            { en: 'Polar bears usually live alone.', es: 'Los osos polares suelen vivir solos.' },
            { en: 'Meerkats are small.', es: 'Las suricatas son pequeñas.' },
            { en: 'The male gorilla is the leader of the family.', es: 'El gorila macho es el líder de la familia.' },
          ],
        },
      ],
      ejercicios: [
        { pregunta: 'Lions live in family ___.', opciones: ['groups', 'waters', 'cars'], respuesta: 0 },
        { pregunta: 'A meerkat is ___.', opciones: ['big', 'small', 'tall'], respuesta: 1 },
        { pregunta: 'Polar bears usually live ___.', opciones: ['alone', 'in big groups', 'in the desert'], respuesta: 0 },
        { pregunta: 'A gorilla is ___.', opciones: ['big', 'small', 'blue'], respuesta: 0 },
        { tipo: 'ordenar', pregunta: 'Arma la oración:', oracion: 'Lions live in groups', traduccion: 'Los leones viven en grupos' },
        { tipo: 'escribir', pregunta: '¿Cómo se dice "oso polar"?', respuestaTexto: 'polar bear' },
        { tipo: 'escribir', pregunta: 'Completa: Meerkats are ___. (pequeñas)', respuestaTexto: 'small' },
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
        { tipo: 'escribir', pregunta: 'Escribe el verbo que va con "I":', respuestaTexto: 'am' },
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
        { tipo: 'escribir', pregunta: 'Escribe "We are" en forma corta:', respuestaTexto: "we're" },
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
        { tipo: 'escribir', pregunta: 'Escribe el posesivo de "she":', respuestaTexto: 'her' },
      ],
    },
  ],
};
