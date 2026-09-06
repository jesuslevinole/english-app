// Nivel 1 de la academia — Unidad "Amigos y familia", adaptada como material
// propio de la app: explicaciones simplificadas en español, diálogos modelo,
// oraciones para el juego de ordenar, ejercicios y videos recomendados.
// Se carga/actualiza en Firestore con el botón de Inicio.

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
      ],
    },
    {
      nombre: 'Verbo to be (am / is / are)',
      nivel: 'A1',
      notas: '',
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
      ],
    },
    {
      nombre: 'Contracciones del verbo to be',
      nivel: 'A1',
      notas: '',
      explicacion: [
        {
          titulo: 'Por qué existen',
          contenido:
            "Al hablar, casi nadie dice 'I am' completo: se dice I'm. La contracción une el pronombre y el verbo con un apóstrofo ('). Usarlas hace que suenes natural.",
          ejemplos: [{ en: "I'm your teacher.", es: 'Soy tu profesor.' }],
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
          ejemplos: [{ en: "He isn't married.", es: 'Él no está casado.' }],
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
        { pregunta: '"She is not" también se dice…', opciones: ["She isn't", "She aren't", "She no is"], respuesta: 0 },
        { pregunta: '"Ellos son mis padres" →', opciones: ["They're my parents", 'Their my parents', 'There my parents'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Adjetivos posesivos (my, your, his, her…)',
      nivel: 'A1',
      notas: '',
      explicacion: [
        {
          titulo: 'Para qué sirven',
          contenido:
            'Dicen de quién es algo. Van SIEMPRE antes del sustantivo y nunca cambian, aunque la cosa sea plural: my book, my books.',
          ejemplos: [{ en: 'My parents are generous.', es: 'Mis padres son generosos.' }],
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
      ],
    },
    {
      nombre: 'La familia (árbol familiar)',
      nivel: 'A1',
      notas: '',
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
      ],
    },
    {
      nombre: 'Describir personas',
      nivel: 'A1',
      notas: '',
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
          ejemplos: [{ en: "— Is she married? — No, she's single.", es: '— ¿Está casada? — No, es soltera.' }],
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
      ],
    },
    {
      nombre: 'Familias de animales (video)',
      nivel: 'A1',
      notas: '',
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
      ],
      videos: [],
      ejercicios: [
        { pregunta: 'Lions live in family ___.', opciones: ['groups', 'houses', 'waters'], respuesta: 0 },
        { pregunta: 'Polar bears live ___.', opciones: ['in groups', 'alone', 'together'], respuesta: 1 },
        { pregunta: 'Meerkats are ___ animals.', opciones: ['big', 'small', 'tall'], respuesta: 1 },
        { pregunta: 'The ___ gorilla is the leader of the family.', opciones: ['small', 'male', 'short'], respuesta: 1 },
        { pregunta: 'A male lion has ___ hair on his neck.', opciones: ['long', 'blue', 'no'], respuesta: 0 },
        { pregunta: 'Gorillas are big and ___.', opciones: ['strong', 'single', 'married'], respuesta: 0 },
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
