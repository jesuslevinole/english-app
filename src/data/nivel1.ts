// Contenido del aula, adaptado como material propio de la app.
// Incluye: la unidad del Nivel 1 de la academia (temas A1 con lecciones,
// curiosidades, diálogos y muchos ejercicios con enfoques variados),
// cuentos originales por nivel CEFR (A1→C1) con glosario y comprensión,
// y recursos de listening por nivel (British Council gratuito + búsquedas
// de YouTube por nivel). Se carga/actualiza con el botón de Inicio.

import type { Ejercicio, EjemploFrase, LineaDialogo, Nivel, SeccionLeccion, VideoRef } from '../types';

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
  curiosidades: string[];
  explicacion: SeccionLeccion[];
  dialogo?: LineaDialogo[];
  oraciones: string[];
  videos: VideoRef[];
  ejercicios: Ejercicio[];
}

interface SemillaListening {
  titulo: string;
  url: string;
  nivel: Nivel;
  preguntas: Ejercicio[];
}

interface SemillaCuento {
  titulo: string;
  nivel: Nivel;
  parrafos: string[];
  glosario: EjemploFrase[];
  preguntas: Ejercicio[];
}

export interface SemillaNivel1 {
  categorias: SemillaCategoria[];
  temas: SemillaTema[];
  listening: SemillaListening[];
  cuentos: SemillaCuento[];
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
        { termino: 'grandparents', significado: 'abuelos' },
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
        { termino: 'good evening', significado: 'buenas noches (al llegar)' },
        { termino: 'good night', significado: 'buenas noches (al despedirse)' },
        { termino: 'nice to meet you', significado: 'mucho gusto' },
        { termino: 'how are you?', significado: '¿cómo estás?' },
        { termino: 'fine, thanks', significado: 'bien, gracias' },
        { termino: 'friend', significado: 'amigo / amiga' },
        { termino: "what's your name?", significado: '¿cómo te llamas?' },
        { termino: 'my name is…', significado: 'me llamo…' },
        { termino: 'see you later', significado: 'hasta luego' },
        { termino: 'how do you spell…?', significado: '¿cómo se deletrea…?' },
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
        { termino: 'black hair', significado: 'cabello negro' },
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
        { termino: 'live in groups', significado: 'viven en grupos' },
        { termino: 'live alone', significado: 'viven solos' },
      ],
    },
  ],

  temas: [
    {
      nombre: 'Saludar y presentar personas',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        'How are you? en EE. UU. es un saludo, no una pregunta de verdad: se responde Fine, thanks aunque tengas un mal día.',
        'Good night NO es para saludar: solo para despedirse. Si llegas de noche a un lugar, se dice Good evening.',
        'En EE. UU. te van a pedir deletrear tu nombre todo el tiempo: en el banco, por teléfono, en el doctor. Por eso el abecedario vale oro.',
      ],
      explicacion: [
        {
          titulo: 'Saludos formales e informales',
          contenido:
            'Formal (trabajo, personas mayores, desconocidos): Good morning (mañana), Good afternoon (tarde), Good evening (noche al llegar).\nInformal (amigos): Hi!, Hello!, How\u2019s it going?\nPara despedirte: Goodbye, See you later. Good night SOLO se usa al despedirse de noche, no al llegar.',
          ejemplos: [
            { en: 'Good morning, Mr. Lopez.', es: 'Buenos días, Sr. López.' },
            { en: "Hi, Ana! How's it going?", es: '¡Hola, Ana! ¿Cómo va todo?' },
            { en: 'Good night! See you tomorrow.', es: '¡Buenas noches! Nos vemos mañana.' },
          ],
        },
        {
          titulo: 'Presentarte y presentar a otros',
          contenido:
            'Para ti: My name is… o I\u2019m…\nPara presentar a otra persona: This is my friend…\nCuando te presentan a alguien respondes Nice to meet you, y la otra persona contesta Nice to meet you, too.',
          ejemplos: [
            { en: "My name is Jesús. I'm from Venezuela.", es: 'Me llamo Jesús. Soy de Venezuela.' },
            { en: 'This is my friend Marta.', es: 'Esta es mi amiga Marta.' },
            { en: '— Nice to meet you. — Nice to meet you, too.', es: '— Mucho gusto. — Mucho gusto también.' },
          ],
        },
        {
          titulo: 'Deletrear tu nombre (spelling)',
          contenido:
            'En inglés es muy común deletrear el nombre letra por letra cuando no se entiende. La pregunta es: How do you spell your name?\nPractica el abecedario en voz alta: A B C D E F G H I J K L M N O P Q R S T U V W X Y Z.',
          ejemplos: [
            { en: '— How do you spell your name? — J-E-S-U-S.', es: '— ¿Cómo se deletrea tu nombre? — J-E-S-U-S.' },
            { en: "— How do you spell Molero? — M-O-L-E-R-O.", es: "— ¿Cómo se deletrea Molero? — M-O-L-E-R-O." },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Ana', texto: 'Hi, Leo. How are you?' },
        { hablante: 'Leo', texto: 'Great, thanks. And you?' },
        { hablante: 'Ana', texto: 'Fine. Leo, this is my friend Marta.' },
        { hablante: 'Leo', texto: 'Nice to meet you, Marta.' },
        { hablante: 'Marta', texto: 'Nice to meet you, too.' },
        { hablante: 'Leo', texto: 'Sorry, how do you spell your name?' },
        { hablante: 'Marta', texto: 'M-A-R-T-A.' },
      ],
      oraciones: [
        'This is my friend Marta.',
        'Nice to meet you, too.',
        'How do you spell your name?',
        'My name is Leo.',
        'How are you today?',
        'Good morning, Mr. Lopez.',
        'See you later, my friend.',
        'Where are you from?',
      ],
      videos: [],
      ejercicios: [
        { pregunta: '— Nice to meet you. — Nice to meet you, ___.', opciones: ['too', 'two', 'to'], respuesta: 0 },
        { pregunta: "What's your ___? — My name is Ana.", opciones: ['name', 'age', 'family'], respuesta: 0 },
        { pregunta: 'How are you? — ___, thanks.', opciones: ['Fine', 'Nice', 'Meet'], respuesta: 0 },
        { pregunta: 'Saludo formal por la mañana:', opciones: ['Good night', 'Good morning', 'Bye'], respuesta: 1 },
        { pregunta: '___ is my friend Hiro. (presentando)', opciones: ['This', 'These', 'Those'], respuesta: 0 },
        { pregunta: 'Saludo informal:', opciones: ['Good evening', 'Hi!', 'Goodbye'], respuesta: 1 },
        { pregunta: 'How do you ___ your name? — A-N-A.', opciones: ['spell', 'say', 'write'], respuesta: 0 },
        { pregunta: 'Al despedirte de noche dices:', opciones: ['Good evening', 'Good night', 'Good morning'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL escrita?', opciones: ['I am Ana.', 'This is my friend.', 'Nice too meet you.'], respuesta: 2 },
        { pregunta: '— See you later! — ___', opciones: ['See you!', 'Nice name!', 'I am fine you.'], respuesta: 0 },
        { pregunta: 'Traducción de "¿Cómo te llamas?":', opciones: ['How are you?', "What's your name?", 'Who is this?'], respuesta: 1 },
        { pregunta: "— ___? — I'm from Venezuela.", opciones: ['Where are you from', 'How old are you', 'How are you'], respuesta: 0 },
        { pregunta: 'Completa: "Hello, ___ name is Carla."', opciones: ['my', 'me', 'I'], respuesta: 0 },
        { pregunta: 'Llegas a una cena a las 8 pm. Saludas con:', opciones: ['Good night', 'Good evening', 'Good morning'], respuesta: 1 },
      ],
    },
    {
      nombre: 'Verbo to be (am / is / are)',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        'to be hace el trabajo de DOS verbos del español a la vez: ser y estar. Por eso es el verbo más usado del inglés.',
        "La edad se dice con to be, no con tener: I am 29 years old, literalmente 'yo SOY 29 años'. A todo hispanohablante le suena raro al principio.",
        "Para el clima el sujeto it es obligatorio: It is hot in Texas. Decir solo 'Is hot' es uno de los errores más comunes de los hispanohablantes.",
      ],
      explicacion: [
        {
          titulo: 'Qué es y para qué sirve',
          contenido:
            'to be = ser o estar. Es el verbo más importante del inglés: lo usas para decir tu nombre, tu edad, tu origen y cómo es o cómo está alguien.',
          ejemplos: [
            { en: 'I am Jesús.', es: 'Yo soy Jesús.' },
            { en: 'She is from Venezuela.', es: 'Ella es de Venezuela.' },
            { en: 'They are happy.', es: 'Ellos están felices.' },
          ],
        },
        {
          titulo: 'Solo tiene 3 formas en presente',
          contenido:
            'am → solo con I.\nis → con he, she, it (una persona o cosa que no eres tú).\nare → con you, we, they.\nTruco: una sola persona que no eres tú → is; más de una persona, o "you" → are.',
          ejemplos: [
            { en: 'I am a student.', es: 'Yo soy estudiante.' },
            { en: 'My sister is 17 years old.', es: 'Mi hermana tiene 17 años.' },
            { en: 'We are from Killeen.', es: 'Nosotros somos de Killeen.' },
          ],
        },
        {
          titulo: 'Negación y pregunta',
          contenido:
            'Negativo: agrega not después del verbo → She is not my sister.\nPregunta: el verbo pasa adelante → Is she your sister? Se responde corto: Yes, she is. / No, she isn\u2019t.',
          ejemplos: [
            { en: 'He is not my brother.', es: 'Él no es mi hermano.' },
            { en: '— Is she your aunt? — Yes, she is.', es: '— ¿Es ella tu tía? — Sí.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Carla', texto: 'Is he your brother?' },
        { hablante: 'Omar', texto: "No, he isn't. He is my cousin." },
        { hablante: 'Carla', texto: 'Oh! How old is he?' },
        { hablante: 'Omar', texto: 'He is twenty years old.' },
        { hablante: 'Carla', texto: 'Is he a student?' },
        { hablante: 'Omar', texto: 'Yes, he is.' },
      ],
      oraciones: [
        'He is my cousin.',
        'Is she your sister?',
        'They are from Venezuela.',
        'I am twenty-nine years old.',
        'We are not brothers.',
        'It is hot in Texas.',
        'My name is Ana.',
        'Are you a student?',
      ],
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
        { pregunta: '— Is she your aunt? — Yes, she ___.', opciones: ['is', 'are', 'am'], respuesta: 0 },
        { pregunta: 'They ___ not my parents.', opciones: ['is', 'are', 'am'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL escrita?', opciones: ['She is tall.', 'They is my parents.', 'I am from Texas.'], respuesta: 1 },
        { pregunta: '— How old are you? — I ___ twenty-nine.', opciones: ['am', 'is', 'have'], respuesta: 0 },
        { pregunta: 'Traducción de "Ellos están felices.":', opciones: ['They are happy.', 'They is happy.', 'They happy.'], respuesta: 0 },
        { pregunta: 'El clima: "___ hot in Texas."', opciones: ['Is', 'It is', 'Are'], respuesta: 1 },
        { pregunta: '— Are you a student? — Yes, ___.', opciones: ['I am', 'I is', 'you are'], respuesta: 0 },
        { pregunta: 'Negativo de "He is my uncle.":', opciones: ['He is not my uncle.', 'He not is my uncle.', 'He no is my uncle.'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Contracciones del verbo to be',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        "En canciones y películas casi todo va contraído: busca la letra de tu canción favorita en inglés y cuenta cuántos I'm encuentras.",
        "El apóstrofo marca exactamente la letra que se borró: I'm es I am sin la a.",
        'En textos formales (contratos, ensayos académicos) se evitan las contracciones; al hablar, no usarlas suena robótico.',
      ],
      explicacion: [
        {
          titulo: 'Por qué existen',
          contenido:
            "Al hablar, casi nadie dice 'I am' completo: se dice I'm. La contracción une el pronombre y el verbo con un apóstrofo ('). Usarlas hace que suenes natural.",
          ejemplos: [
            { en: "I'm your teacher.", es: 'Soy tu profesor.' },
            { en: "She's my sister and he's my brother.", es: 'Ella es mi hermana y él es mi hermano.' },
          ],
        },
        {
          titulo: 'Todas las contracciones del to be',
          contenido:
            "I am → I'm\nyou are → you're\nhe is → he's\nshe is → she's\nit is → it's\nwe are → we're\nthey are → they're",
          ejemplos: [
            { en: "She's my favorite aunt.", es: 'Ella es mi tía favorita.' },
            { en: "We're from Texas.", es: 'Somos de Texas.' },
          ],
        },
        {
          titulo: 'Negativas',
          contenido:
            "isn't = is not · aren't = are not.\nTambién puedes decir She's not = She isn't; las dos son correctas.",
          ejemplos: [
            { en: "He isn't married.", es: 'Él no está casado.' },
            { en: "They aren't from Texas. They're from Venezuela.", es: 'Ellos no son de Texas. Son de Venezuela.' },
          ],
        },
        {
          titulo: 'Ojo con los sonidos parecidos',
          contenido:
            "you're (tú eres) ≠ your (tu, posesivo)\nthey're (ellos son) ≠ their (su, de ellos) ≠ there (allí)\nit's (eso es) ≠ its (su, de una cosa o animal)",
          ejemplos: [{ en: "They're happy with their family.", es: 'Ellos están felices con su familia.' }],
        },
      ],
      dialogo: [
        { hablante: 'Rosa', texto: "Who's this in the photo?" },
        { hablante: 'Iván', texto: "She's my aunt. Her name is Carla." },
        { hablante: 'Rosa', texto: "She's very pretty. And who's he?" },
        { hablante: 'Iván', texto: "He's my uncle. They're from Maracay." },
      ],
      oraciones: [
        "She's my favorite aunt.",
        "They're from Maracay.",
        "I'm a student.",
        "He isn't married.",
        "We're good friends.",
        "It's hot today.",
        "You're my best friend.",
      ],
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
        { pregunta: '"She is not" también se dice…', opciones: ["She isn't", "She aren't", 'She no is'], respuesta: 0 },
        { pregunta: '"Ellos son mis padres" →', opciones: ["They're my parents", 'Their my parents', 'There my parents'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL escrita?', opciones: ["They're happy.", 'Im a student.', "She's my aunt."], respuesta: 1 },
        { pregunta: '"We are not" en forma corta:', opciones: ['We arent', "We aren't", "Wearen't"], respuesta: 1 },
        { pregunta: 'Traducción de "Él es mi primo.":', opciones: ["He's my cousin.", 'His my cousin.', 'He my cousin.'], respuesta: 0 },
        { pregunta: '___ hot today. (contracción)', opciones: ['Its', "It's", "Is'"], respuesta: 1 },
        { pregunta: '¿your o you\u2019re? "___ my best friend."', opciones: ['Your', "You're", 'Youre'], respuesta: 1 },
        { pregunta: '¿their o they\u2019re? "___ from Maracay."', opciones: ['Their', 'There', "They're"], respuesta: 2 },
      ],
    },
    {
      nombre: 'Adjetivos posesivos (my, your, his, her…)',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        "En español 'su nombre' sirve para él y para ella; el inglés te obliga a decidir: his name o her name. Es el error #1 de los hispanohablantes en este tema.",
        "its (sin apóstrofo) es posesivo; it's (con apóstrofo) es it is. Hasta los nativos lo escriben mal.",
        "Los posesivos nunca cambian con el plural: my book, my books. Nada de 'mys'.",
      ],
      explicacion: [
        {
          titulo: 'Para qué sirven',
          contenido:
            'Dicen de quién es algo. Van SIEMPRE antes del sustantivo y nunca cambian, aunque la cosa sea plural: my book, my books.',
          ejemplos: [
            { en: 'My parents are generous.', es: 'Mis padres son generosos.' },
            { en: 'Your English is very good.', es: 'Tu inglés es muy bueno.' },
          ],
        },
        {
          titulo: 'La lista completa',
          contenido:
            'my → mi\nyour → tu\nhis → su (de él)\nher → su (de ella)\nits → su (de una cosa o animal)\nour → nuestro/a\ntheir → su (de ellos)',
          ejemplos: [
            { en: 'Our house is in Valencia.', es: 'Nuestra casa está en Valencia.' },
            { en: 'Their parents are doctors.', es: 'Sus padres (de ellos) son doctores.' },
          ],
        },
        {
          titulo: 'El truco de his / her',
          contenido:
            'En inglés el posesivo depende del DUEÑO, no de la cosa.\nEl nombre de tu tío → his name (el dueño es él).\nEl nombre de tu tía → her name (la dueña es ella).',
          ejemplos: [
            { en: 'This is my uncle. His name is Pedro.', es: 'Este es mi tío. Su nombre es Pedro.' },
            { en: 'This is my aunt. Her name is Carla.', es: 'Esta es mi tía. Su nombre es Carla.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Vera', texto: 'Is this your family?' },
        { hablante: 'Tomás', texto: 'Yes! This is my mother. Her name is Elsa.' },
        { hablante: 'Vera', texto: 'And the boy?' },
        { hablante: 'Tomás', texto: "He's my brother. His name is Dani." },
        { hablante: 'Vera', texto: 'Your family is beautiful.' },
        { hablante: 'Tomás', texto: 'Thanks! Our house is in Valencia.' },
      ],
      oraciones: [
        'Her name is Elsa.',
        'His name is Dani.',
        'Our house is in Valencia.',
        'Their parents are doctors.',
        'This is my mother.',
        'Your English is very good.',
        'The dog eats its food.',
      ],
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
        { pregunta: 'Mi hermana y yo amamos a ___ padres.', opciones: ['our', 'us', 'my'], respuesta: 0 },
        { pregunta: 'El posesivo para una mascota o cosa es…', opciones: ["it's", 'its', 'his'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL escrita?', opciones: ['Her name is Ana.', 'His name is Pedro.', 'Him name is Luis.'], respuesta: 2 },
        { pregunta: 'La mochila de María: "___ backpack"', opciones: ['her', 'his', 'she'], respuesta: 0 },
        { pregunta: 'Traducción de "nuestro perro":', opciones: ['our dog', 'us dog', 'we dog'], respuesta: 0 },
        { pregunta: 'This is Ana and Luis. ___ house is big.', opciones: ['Their', "They're", 'There'], respuesta: 0 },
        { pregunta: "— Is this your book? — Yes, it's ___ book.", opciones: ['my', 'I', 'me'], respuesta: 0 },
        { pregunta: 'El gato lame ___ pata.', opciones: ["it's", 'its', 'his'], respuesta: 1 },
      ],
    },
    {
      nombre: 'La familia (árbol familiar)',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        'En inglés no hay palabras distintas para primo y prima: cousin sirve para los dos.',
        'parents son SOLO papá y mamá. Todos los demás parientes son relatives.',
        "La familia política se dice con -in-law (literal: 'en la ley'): mother-in-law es suegra, brother-in-law es cuñado.",
      ],
      explicacion: [
        {
          titulo: 'El árbol familiar, de arriba hacia abajo',
          contenido:
            'grandfather + grandmother = tus abuelos (grandparents).\nSus hijos: tu father y tu mother (juntos: parents).\nLos hijos de tus padres: tú, tu brother y tu sister.\nLos hermanos de tus padres: tu uncle y tu aunt. Sus hijos: tus cousins.',
          ejemplos: [
            { en: 'Rosa is my grandmother. She is my father\u2019s mother.', es: 'Rosa es mi abuela. Es la madre de mi padre.' },
          ],
        },
        {
          titulo: 'Tu propia familia',
          contenido:
            'Si estás casado: husband (esposo) / wife (esposa).\nTus hijos: son (hijo) y daughter (hija). En general: children.',
          ejemplos: [{ en: 'They have one son and two daughters.', es: 'Tienen un hijo y dos hijas.' }],
        },
        {
          titulo: 'Presentar a tu familia',
          contenido:
            'El patrón es siempre el mismo:\nThis is my + [familiar]. His/Her name is + [nombre].\nRecuerda el truco: familiar hombre → his, familiar mujer → her.',
          ejemplos: [
            { en: 'This is my grandmother. Her name is Rosa.', es: 'Esta es mi abuela. Su nombre es Rosa.' },
            { en: 'This is my brother. His name is Luis.', es: 'Este es mi hermano. Su nombre es Luis.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Nina', texto: "Who's this?" },
        { hablante: 'Raúl', texto: "She's my grandmother. Her name is Rosa." },
        { hablante: 'Nina', texto: 'And this man?' },
        { hablante: 'Raúl', texto: "He's my father. Rosa is his mother." },
        { hablante: 'Nina', texto: 'I see! And the girl?' },
        { hablante: 'Raúl', texto: "She's my sister. Her name is Lucía." },
      ],
      oraciones: [
        'She is my grandmother.',
        'Rosa is his mother.',
        'This is my sister Lucía.',
        'My cousins are from Caracas.',
        'My aunt is very sweet.',
        'They have one son and two daughters.',
        'My parents are from Venezuela.',
      ],
      videos: [],
      ejercicios: [
        { pregunta: 'La madre de tu madre es tu…', opciones: ['grandmother', 'aunt', 'sister'], respuesta: 0 },
        { pregunta: 'El hermano de tu padre es tu…', opciones: ['cousin', 'uncle', 'grandfather'], respuesta: 1 },
        { pregunta: 'Los hijos de tus tíos son tus…', opciones: ['brothers', 'children', 'cousins'], respuesta: 2 },
        { pregunta: 'father + mother =', opciones: ['parents', 'children', 'cousins'], respuesta: 0 },
        { pregunta: 'Si estás casada, tu esposo es tu…', opciones: ['husband', 'wife', 'son'], respuesta: 0 },
        { pregunta: 'Tu hija es tu…', opciones: ['daughter', 'sister', 'son'], respuesta: 0 },
        { pregunta: 'grandfather y grandmother juntos son tus…', opciones: ['grandparents', 'parents', 'uncles'], respuesta: 0 },
        { pregunta: 'En general, tus hijos e hijas son tus…', opciones: ['childs', 'children', 'sons'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL?', opciones: ["My mother's brother is my uncle.", "My cousins are my aunt's children.", 'My sister is my father.'], respuesta: 2 },
        { pregunta: 'Tu abuelo es el ___ de tu madre.', opciones: ['father', 'brother', 'son'], respuesta: 0 },
        { pregunta: 'Traducción de "hijos" (en general):', opciones: ['childs', 'children', 'sons'], respuesta: 1 },
        { pregunta: "— Who is Rosa? — She is my father's ___.", opciones: ['mother', 'sister', 'daughter'], respuesta: 0 },
        { pregunta: 'Tus padres y tus hermanos son tu ___ cercana.', opciones: ['family', 'house', 'group'], respuesta: 0 },
        { pregunta: 'Marta y su husband tienen una niña. La niña es su…', opciones: ['daughter', 'sister', 'aunt'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Describir personas',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        'El orden de los adjetivos importa: long curly black hair suena natural; black curly long hair le suena rarísimo a un nativo.',
        'handsome se usa casi solo para hombres y pretty casi solo para mujeres; beautiful y good-looking sirven para todos.',
        'Decir que alguien es old puede sonar duro en inglés; se suaviza con older o elderly.',
      ],
      explicacion: [
        {
          titulo: 'be + adjetivo',
          contenido:
            'Para describir se usa el verbo to be + un adjetivo: She is tall. He is funny.\nEl adjetivo NUNCA lleva plural en inglés: They are talls ❌ → They are tall ✅.',
          ejemplos: [
            { en: 'My uncle is strong and serious.', es: 'Mi tío es fuerte y serio.' },
            { en: 'They are intelligent.', es: 'Ellos son inteligentes.' },
          ],
        },
        {
          titulo: 'Rasgos físicos con with',
          contenido:
            'Cabello y ojos se agregan con with:\nShe\u2019s short with long curly hair and brown eyes.\nOrden del cabello: largo/corto + forma + color + hair → long curly black hair.',
          ejemplos: [
            { en: 'He is tall with curly black hair.', es: 'Él es alto, con cabello negro rizado.' },
            { en: 'She is short with straight hair and brown eyes.', es: 'Ella es baja, con cabello liso y ojos marrones.' },
          ],
        },
        {
          titulo: 'Preguntar por alguien en una foto',
          contenido:
            "Who's this? → ¿Quién es? — It's my brother.\nWhat's his name? — His name is Mario.\nIs he married? — Yes, he is. / No, he's single.",
          ejemplos: [
            { en: "— Is she married? — No, she's single.", es: '— ¿Está casada? — No, es soltera.' },
            { en: "— Who's this? — It's my father. He's bald and very funny.", es: '— ¿Quién es? — Es mi papá. Es calvo y muy divertido.' },
          ],
        },
        {
          titulo: 'La fórmula para describir a tu familia',
          contenido:
            'Con esta plantilla puedes describir a cualquier familiar (es el formato del examen de la academia):\nThis is my [familiar]. His/Her name is [nombre]. He\u2019s/She\u2019s [edad] years old. He\u2019s/She\u2019s [adjetivos] with [cabello] and [ojos].',
          ejemplos: [
            {
              en: "This is my aunt. Her name is Sonia. She's forty years old. She's generous and funny, with straight hair and brown eyes.",
              es: 'Esta es mi tía. Se llama Sonia. Tiene cuarenta años. Es generosa y divertida, con cabello liso y ojos marrones.',
            },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Sara', texto: "Who's this in the photo?" },
        { hablante: 'Beto', texto: "It's my cousin. Her name is Eva." },
        { hablante: 'Sara', texto: 'Is she a student?' },
        { hablante: 'Beto', texto: "Yes. She's eighteen years old. She's funny and very intelligent." },
        { hablante: 'Sara', texto: 'Is she tall?' },
        { hablante: 'Beto', texto: "No, she's short with long curly hair." },
      ],
      oraciones: [
        'He is tall with curly black hair.',
        'She is short with brown eyes.',
        'My uncle is strong and serious.',
        'He is young and handsome.',
        'My aunt is generous and sweet.',
        'She wears glasses.',
        'My grandfather is bald and funny.',
      ],
      videos: [],
      ejercicios: [
        { pregunta: "She's short ___ long curly hair.", opciones: ['with', 'of', 'in'], respuesta: 0 },
        { pregunta: 'He has no hair. He is ___.', opciones: ['tall', 'bald', 'old'], respuesta: 1 },
        { pregunta: "Is he married? — No, he's ___.", opciones: ['single', 'simple', 'alone'], respuesta: 0 },
        { pregunta: 'My grandfather is 80 years old. He is ___.', opciones: ['young', 'new', 'old'], respuesta: 2 },
        { pregunta: 'She tells jokes. She is ___.', opciones: ['funny', 'serious', 'shy'], respuesta: 0 },
        { pregunta: 'Lo contrario de "tall" es:', opciones: ['short', 'small', 'low'], respuesta: 0 },
        { pregunta: 'They are very ___ . (inteligentes)', opciones: ['intelligent', 'intelligents', 'intelligences'], respuesta: 0 },
        { pregunta: "He's tall ___ blue eyes.", opciones: ['with', 'and', 'of'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['They are talls.', 'She is short.', 'He is funny.'], respuesta: 0 },
        { pregunta: 'Orden correcto del cabello:', opciones: ['long curly black hair', 'black long curly hair', 'curly black long hair'], respuesta: 0 },
        { pregunta: 'Traducción de "Ella es tímida.":', opciones: ['She is shy.', 'She is sly.', 'She is show.'], respuesta: 0 },
        { pregunta: "— What's he like? — He's ___ and generous.", opciones: ['sweet', 'with', 'hair'], respuesta: 0 },
        { pregunta: 'Para hombres se usa más:', opciones: ['handsome', 'pretty', 'beautifull'], respuesta: 0 },
        { pregunta: 'He wears ___ . (lentes)', opciones: ['glasses', 'glass', 'eyes'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Familias de animales (video)',
      nivel: 'A1',
      notas: '',
      curiosidades: [
        "Un grupo de leones se llama pride, la misma palabra que 'orgullo'.",
        'Las suricatas ponen un vigilante que se para en dos patas y avisa del peligro mientras las demás comen.',
        'El oso polar es un cazador solitario: puede caminar miles de kilómetros solo sobre el hielo. Por eso polar bears live alone.',
      ],
      explicacion: [
        {
          titulo: 'Animales en grupos y animales solitarios',
          contenido:
            'live in groups = viven en grupos · live alone = viven solos.\nEn grupos familiares: lions (leones), meerkats (suricatas), gorillas (gorilas).\nSolitarios: polar bears (osos polares), sloths (perezosos).',
          ejemplos: [
            { en: 'Lions live in family groups.', es: 'Los leones viven en grupos familiares.' },
            { en: 'Polar bears live alone.', es: 'Los osos polares viven solos.' },
          ],
        },
        {
          titulo: 'Describir animales (igual que personas)',
          contenido:
            'Se usa el mismo be + adjetivo: Gorillas are big and strong. Meerkats are small.\nDatos útiles del video de la unidad: el gorila macho es el líder de la familia; el león macho tiene pelo largo en el cuello (la melena).',
          ejemplos: [
            { en: 'The male gorilla is the leader of the family.', es: 'El gorila macho es el líder de la familia.' },
            { en: 'A male lion has long hair on his neck.', es: 'El león macho tiene pelo largo en el cuello.' },
          ],
        },
      ],
      oraciones: [
        'Lions live in family groups.',
        'Polar bears live alone.',
        'Meerkats are small animals.',
        'The gorilla is the leader.',
        'A male lion has long hair.',
        'The dolphin is intelligent.',
        'Wolves live in groups too.',
      ],
      videos: [],
      ejercicios: [
        { pregunta: 'Lions live in family ___.', opciones: ['groups', 'houses', 'waters'], respuesta: 0 },
        { pregunta: 'Polar bears live ___.', opciones: ['in groups', 'alone', 'together'], respuesta: 1 },
        { pregunta: 'Meerkats are ___ animals.', opciones: ['big', 'small', 'tall'], respuesta: 1 },
        { pregunta: 'The ___ gorilla is the leader of the family.', opciones: ['small', 'male', 'short'], respuesta: 1 },
        { pregunta: 'A male lion has ___ hair on his neck.', opciones: ['long', 'blue', 'no'], respuesta: 0 },
        { pregunta: 'Gorillas are big and ___.', opciones: ['strong', 'single', 'married'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['Lions live in groups.', 'Polar bears lives alone.', 'Meerkats are small.'], respuesta: 1 },
        { pregunta: 'Un grupo de leones es un…', opciones: ['pride', 'price', 'prize'], respuesta: 0 },
        { pregunta: 'Traducción de "El delfín es inteligente.":', opciones: ['The dolphin is intelligent.', 'The dolphin are intelligent.', 'Dolphin is intelligents.'], respuesta: 0 },
        { pregunta: 'The sloth is very ___ . (lento)', opciones: ['slow', 'fast', 'tall'], respuesta: 0 },
        { pregunta: 'Gorillas ___ in family groups.', opciones: ['live', 'lives', 'living'], respuesta: 0 },
        { pregunta: 'The meerkat ___ small, but the rhino ___ big.', opciones: ['is / is', 'are / are', 'is / are'], respuesta: 0 },
      ],
    },
  ],

  cuentos: [
    {
      titulo: 'My New Friend',
      nivel: 'A1',
      parrafos: [
        'My name is Diego. I am from Venezuela, but now I live in Texas. I am a student at an English academy.',
        'Today is my first day. A tall man says hello to me. His name is Sam. He is from Killeen. He is funny and very generous.',
        'Sam says: "This is my sister. Her name is Kate." Kate is short with long curly hair and blue eyes. She is a teacher.',
        'Now Sam and Kate are my friends. I am very happy in my new school.',
      ],
      glosario: [
        { en: 'now', es: 'ahora' },
        { en: 'today', es: 'hoy' },
        { en: 'first day', es: 'primer día' },
        { en: 'says', es: 'dice' },
        { en: 'teacher', es: 'maestro / maestra' },
        { en: 'happy', es: 'feliz' },
      ],
      preguntas: [
        { pregunta: 'Where is Diego from?', opciones: ['Texas', 'Venezuela', 'Mexico'], respuesta: 1 },
        { pregunta: 'Who is Kate?', opciones: ["Sam's sister", "Sam's mother", "Diego's aunt"], respuesta: 0 },
        { pregunta: 'What is Kate like?', opciones: ['Tall with short hair', 'Short with long curly hair', 'Bald'], respuesta: 1 },
        { pregunta: 'Is Diego happy?', opciones: ['Yes, he is.', "No, he isn't.", 'We don\u2019t know.'], respuesta: 0 },
      ],
    },
    {
      titulo: 'A Day at the Zoo',
      nivel: 'A1',
      parrafos: [
        'It is Saturday. Lola and her brother Max are at the zoo with their grandmother.',
        '"Look, Max! The lions!" says Lola. The lions live in a big family group. The male lion has long hair on his neck. He is the leader.',
        'Max likes the meerkats. They are small and funny. One meerkat is the guard: it stands and looks for danger.',
        'The polar bear is alone in the water. "Polar bears live alone," says Grandmother. "But we are a family, and we are together!"',
      ],
      glosario: [
        { en: 'Saturday', es: 'sábado' },
        { en: 'look!', es: '¡mira!' },
        { en: 'guard', es: 'vigilante / guardia' },
        { en: 'stands', es: 'se para (de pie)' },
        { en: 'danger', es: 'peligro' },
        { en: 'together', es: 'juntos' },
      ],
      preguntas: [
        { pregunta: 'Who is with Lola and Max?', opciones: ['Their mother', 'Their grandmother', 'Their aunt'], respuesta: 1 },
        { pregunta: 'The male lion is…', opciones: ['the guard', 'the leader', 'alone'], respuesta: 1 },
        { pregunta: 'What does the meerkat guard do?', opciones: ['It sleeps', 'It looks for danger', 'It swims'], respuesta: 1 },
        { pregunta: 'Which animal lives alone?', opciones: ['The lion', 'The meerkat', 'The polar bear'], respuesta: 2 },
      ],
    },
    {
      titulo: 'The Photo on the Wall',
      nivel: 'A1',
      parrafos: [
        'Ana is at her friend Pablo\u2019s house. There is a big photo on the wall.',
        '"Who\u2019s this?" asks Ana. "It\u2019s my grandfather," says Pablo. "His name is Tomás. He is eighty years old. He is bald and very funny."',
        '"And the woman with straight hair?" "She\u2019s my grandmother, Rosa. She is sweet and generous. Tomás is her husband."',
        '"Your family is beautiful," says Ana. "Thanks!" says Pablo. "Family is my favorite thing in the world."',
      ],
      glosario: [
        { en: 'wall', es: 'pared' },
        { en: 'asks', es: 'pregunta' },
        { en: 'woman', es: 'mujer' },
        { en: 'favorite', es: 'favorito' },
        { en: 'thing', es: 'cosa' },
        { en: 'world', es: 'mundo' },
      ],
      preguntas: [
        { pregunta: 'Where is the photo?', opciones: ['On the table', 'On the wall', 'In a book'], respuesta: 1 },
        { pregunta: 'How old is Tomás?', opciones: ['Eight', 'Eighteen', 'Eighty'], respuesta: 2 },
        { pregunta: 'Who is Rosa?', opciones: ["Pablo's mother", "Tomás's wife", "Ana's aunt"], respuesta: 1 },
        { pregunta: 'Tomás is…', opciones: ['bald and funny', 'tall and serious', 'young and shy'], respuesta: 0 },
      ],
    },
    {
      titulo: 'The Lost Phone',
      nivel: 'A2',
      parrafos: [
        'Last Friday, Marcos lost his phone. He looked everywhere: in his car, in the kitchen, under the sofa. Nothing.',
        'He called the phone from his wife\u2019s number. They listened carefully… and heard music in the garden!',
        'The phone was inside his son\u2019s toy box, next to a plastic dinosaur. Little Leo put it there in the morning.',
        '"Well," laughed Marcos, "at least the dinosaur didn\u2019t answer my calls." Now he always leaves his phone on the shelf, far from little hands.',
      ],
      glosario: [
        { en: 'lost (lose)', es: 'perdió (perder)' },
        { en: 'everywhere', es: 'por todas partes' },
        { en: 'carefully', es: 'con cuidado / atentamente' },
        { en: 'toy box', es: 'caja de juguetes' },
        { en: 'at least', es: 'al menos' },
        { en: 'shelf', es: 'repisa / estante' },
      ],
      preguntas: [
        { pregunta: 'When did Marcos lose his phone?', opciones: ['Last Friday', 'Yesterday morning', 'Last month'], respuesta: 0 },
        { pregunta: 'How did they find it?', opciones: ['They saw it under the sofa', 'They called it and heard music', 'Leo gave it back'], respuesta: 1 },
        { pregunta: 'Where was the phone?', opciones: ['In the car', 'In the kitchen', "In the toy box"], respuesta: 2 },
        { pregunta: 'Who put the phone there?', opciones: ['His wife', 'His son Leo', 'Marcos'], respuesta: 1 },
        { pregunta: 'Where does Marcos leave his phone now?', opciones: ['On the shelf', 'In the garden', 'In the toy box'], respuesta: 0 },
      ],
    },
    {
      titulo: 'A Trip to San Antonio',
      nivel: 'A2',
      parrafos: [
        'Last month, Carla and her cousins visited San Antonio. They drove for three hours and arrived at noon.',
        'First, they walked along the River Walk and took a lot of photos. Then they ate Mexican food at a small restaurant near the water. Carla ordered tacos; her cousin Luis wanted enchiladas.',
        'In the afternoon, they visited the Alamo and learned about the history of Texas. Luis bought a little souvenir for his mother.',
        'They returned home very tired but happy. "Next year," said Carla, "we\u2019re going to the beach!"',
      ],
      glosario: [
        { en: 'trip', es: 'viaje' },
        { en: 'drove (drive)', es: 'manejaron (manejar)' },
        { en: 'at noon', es: 'al mediodía' },
        { en: 'along', es: 'a lo largo de' },
        { en: 'ordered', es: 'pidió (en un restaurante)' },
        { en: 'souvenir', es: 'recuerdo (objeto)' },
        { en: 'returned', es: 'regresaron' },
      ],
      preguntas: [
        { pregunta: 'How long was the drive?', opciones: ['One hour', 'Three hours', 'Five hours'], respuesta: 1 },
        { pregunta: 'What did Carla order?', opciones: ['Enchiladas', 'Tacos', 'Pizza'], respuesta: 1 },
        { pregunta: 'What did they visit in the afternoon?', opciones: ['The beach', 'The Alamo', 'A museum in Austin'], respuesta: 1 },
        { pregunta: 'Who bought a souvenir?', opciones: ['Carla', 'Luis', 'Their mother'], respuesta: 1 },
        { pregunta: 'How did they feel at the end?', opciones: ['Tired but happy', 'Angry', 'Bored'], respuesta: 0 },
      ],
    },
    {
      titulo: 'The Job Interview',
      nivel: 'B1',
      parrafos: [
        'Daniela has wanted to work as a graphic designer since she finished school. This morning, she finally had an interview at a design studio downtown.',
        'She arrived twenty minutes early, which gave her time to calm down. The manager, Mr. Ortiz, asked about her experience. "I have designed logos for three small businesses," she explained, "and I have been learning animation for a year."',
        'Then came the difficult question: "Why should we choose you?" Daniela took a breath. "Because I never stop learning, and I always deliver on time."',
        'Two days later, her phone rang. She got the job. Her first project starts on Monday, and she has already filled a notebook with ideas.',
      ],
      glosario: [
        { en: 'interview', es: 'entrevista' },
        { en: 'downtown', es: 'en el centro (de la ciudad)' },
        { en: 'calm down', es: 'calmarse' },
        { en: 'take a breath', es: 'respirar hondo' },
        { en: 'deliver on time', es: 'entregar a tiempo' },
        { en: 'rang (ring)', es: 'sonó (sonar)' },
      ],
      preguntas: [
        { pregunta: 'What job does Daniela want?', opciones: ['Teacher', 'Graphic designer', 'Manager'], respuesta: 1 },
        { pregunta: 'Why did arriving early help her?', opciones: ['She met the manager first', 'It gave her time to calm down', 'She practiced animation'], respuesta: 1 },
        { pregunta: 'How much design experience does she mention?', opciones: ['None', 'Logos for three businesses', 'Ten years in a studio'], respuesta: 1 },
        { pregunta: 'What was her answer to the difficult question?', opciones: ['She works for free', 'She never stops learning and delivers on time', 'She knows the manager'], respuesta: 1 },
        { pregunta: 'When does her first project start?', opciones: ['On Monday', 'In a year', 'Two days later'], respuesta: 0 },
      ],
    },
    {
      titulo: 'The Night Market',
      nivel: 'B1',
      parrafos: [
        'When my grandmother visited us from Venezuela, I took her to the night market on the edge of town. I had been telling her about it for months, and she didn\u2019t believe half of what I said.',
        'The market was louder and brighter than she expected. There were food trucks from five different countries, a man selling hand-made guitars, and a stall where an old woman read fortunes in coffee cups.',
        'My grandmother tried Korean corn dogs, Texas barbecue, and a mango dessert that made her close her eyes and smile. "This tastes like home," she said quietly, "but also like somewhere completely new."',
        'On the way back, she held the little guitar she had bought and hummed an old song. I realized that night that sharing a place you love is one of the best gifts you can give.',
      ],
      glosario: [
        { en: 'edge of town', es: 'las afueras del pueblo' },
        { en: 'louder', es: 'más ruidoso' },
        { en: 'stall', es: 'puesto (de mercado)' },
        { en: 'read fortunes', es: 'leer la suerte' },
        { en: 'hummed', es: 'tarareó' },
        { en: 'realized', es: 'me di cuenta' },
      ],
      preguntas: [
        { pregunta: 'Who visited from Venezuela?', opciones: ['The narrator\u2019s aunt', 'The narrator\u2019s grandmother', 'A friend'], respuesta: 1 },
        { pregunta: 'How was the market compared to her expectations?', opciones: ['Smaller and quieter', 'Louder and brighter', 'Exactly as described'], respuesta: 1 },
        { pregunta: 'What did the mango dessert make her feel?', opciones: ['Homesick and curious at the same time', 'Sick', 'Bored'], respuesta: 0 },
        { pregunta: 'What did she buy?', opciones: ['A coffee cup', 'A little guitar', 'A corn dog'], respuesta: 1 },
        { pregunta: 'What did the narrator learn?', opciones: ['Markets are expensive', 'Sharing a place you love is a great gift', 'Grandmothers prefer quiet places'], respuesta: 1 },
      ],
    },
    {
      titulo: 'The Deadline',
      nivel: 'B2',
      parrafos: [
        'By the time Sofía noticed the mistake, the report had already been sent to the client. A whole column of figures — the wrong quarter. If she had double-checked the spreadsheet, none of this would have happened.',
        'Her first instinct was to say nothing and hope nobody noticed. Her second, better instinct was to walk straight into her manager\u2019s office. "I\u2019ve sent the wrong numbers," she said. "I\u2019m correcting them now, and I\u2019ll call the client myself."',
        'The call was uncomfortable, but shorter than she feared. The client, as it turned out, valued the honesty more than the error. "Mistakes get made," he said. "What matters is who owns them."',
        'That evening, Sofía set up an extra review step for every future report. She had learned that a reputation isn\u2019t built by never failing, but by how quickly and honestly you repair what breaks.',
      ],
      glosario: [
        { en: 'deadline', es: 'fecha límite' },
        { en: 'figures', es: 'cifras' },
        { en: 'double-check', es: 'revisar dos veces' },
        { en: 'instinct', es: 'instinto / impulso' },
        { en: 'as it turned out', es: 'al final resultó que' },
        { en: 'own (a mistake)', es: 'asumir (un error)' },
      ],
      preguntas: [
        { pregunta: 'What was wrong with the report?', opciones: ['It was late', 'It had figures from the wrong quarter', 'It was sent to the wrong client'], respuesta: 1 },
        { pregunta: 'What was her first instinct?', opciones: ['To tell her manager', 'To say nothing', 'To call the client'], respuesta: 1 },
        { pregunta: 'What did she actually do?', opciones: ['She hid the mistake', 'She admitted it and offered to fix it', 'She blamed the spreadsheet'], respuesta: 1 },
        { pregunta: 'How did the client react?', opciones: ['He ended the contract', 'He valued her honesty', 'He never noticed'], respuesta: 1 },
        { pregunta: 'What lesson does the story suggest?', opciones: ['Never admit mistakes', 'Reputation depends on honest repair, not perfection', 'Reports don\u2019t matter'], respuesta: 1 },
      ],
    },
    {
      titulo: "The Lighthouse Keeper's Notebook",
      nivel: 'C1',
      parrafos: [
        'The lighthouse had been automated for decades, yet Elena\u2019s grandfather still climbed its spiral staircase every evening, notebook in hand, as though the lamp might somehow fail without a witness. Whatever he wrote up there, he never showed a soul.',
        'When he passed away last spring, Elena inherited the notebook. She expected weather logs, perhaps shipping schedules; what she found instead was a meticulous record of arrivals that no harbor authority would ever have registered: the first swallow of March, a stranger\u2019s umbrella abandoned on the pier, the precise shade of green the sea turns before a storm.',
        'Entry by entry, it dawned on her that her grandfather had not been guarding the coast at all. He had been guarding attention itself — the stubborn, unfashionable discipline of noticing things that nobody pays you to notice.',
        'Elena keeps the notebook on her desk now, half-filled. On difficult days, she adds a line of her own and finds, to her quiet astonishment, that the world grows slightly larger each time she does.',
      ],
      glosario: [
        { en: 'lighthouse keeper', es: 'farero (cuidador del faro)' },
        { en: 'as though', es: 'como si' },
        { en: 'witness', es: 'testigo' },
        { en: 'meticulous', es: 'meticuloso' },
        { en: 'it dawned on her', es: 'cayó en cuenta / comprendió' },
        { en: 'stubborn', es: 'terco / obstinado' },
        { en: 'astonishment', es: 'asombro' },
      ],
      preguntas: [
        { pregunta: 'Why did the grandfather\u2019s nightly climb seem unnecessary?', opciones: ['The lighthouse was automated', 'He was too old', 'The staircase was closed'], respuesta: 0 },
        { pregunta: 'What did Elena expect to find in the notebook?', opciones: ['Poems', 'Weather logs or schedules', 'Letters to her'], respuesta: 1 },
        { pregunta: 'What had he actually recorded?', opciones: ['Ship registrations', 'Small, unnoticed details of daily life', 'Family history'], respuesta: 1 },
        { pregunta: 'What was he "guarding", according to Elena?', opciones: ['The coast', 'Attention itself', 'The harbor authority'], respuesta: 1 },
        { pregunta: 'What effect does writing in the notebook have on Elena?', opciones: ['The world feels slightly larger', 'She feels obligated', 'She misses the sea'], respuesta: 0 },
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
    { titulo: 'Práctica libre A1 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/a1', nivel: 'A1', preguntas: [] },
    { titulo: 'Práctica libre A1 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+a1+beginner', nivel: 'A1', preguntas: [] },
    { titulo: 'Canal oficial de British Council en YouTube', url: 'https://youtube.com/@BritishCouncilEnglish', nivel: 'A1', preguntas: [] },
    { titulo: 'Práctica libre A2 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/a2', nivel: 'A2', preguntas: [] },
    { titulo: 'Práctica libre A2 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+a2+elementary', nivel: 'A2', preguntas: [] },
    { titulo: 'Práctica libre B1 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/b1', nivel: 'B1', preguntas: [] },
    { titulo: 'Práctica libre B1 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+b1+intermediate', nivel: 'B1', preguntas: [] },
    { titulo: 'Práctica libre B2 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/b2', nivel: 'B2', preguntas: [] },
    { titulo: 'Práctica libre B2 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+b2+upper+intermediate', nivel: 'B2', preguntas: [] },
    { titulo: 'Práctica libre C1 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/c1', nivel: 'C1', preguntas: [] },
    { titulo: 'Práctica libre C1 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+c1+advanced', nivel: 'C1', preguntas: [] },
  ],
};
