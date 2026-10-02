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
  emoji?: string;
  ejemplo?: EjemploFrase;
}

interface SemillaCategoria {
  nombre: string;
  color: string;
  // Nivel CEFR de las palabras de esta categoría (default A1)
  nivel?: Nivel;
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
        { termino: 'father', significado: 'padre', emoji: '👨', ejemplo: { en: 'My father is tall.', es: 'Mi padre es alto.' } },
        { termino: 'mother', significado: 'madre', emoji: '👩', ejemplo: { en: 'My mother is sweet.', es: 'Mi madre es dulce.' } },
        { termino: 'parents', significado: 'padres', emoji: '👫', ejemplo: { en: 'My parents are from Venezuela.', es: 'Mis padres son de Venezuela.' } },
        { termino: 'grandfather', significado: 'abuelo', emoji: '👴', ejemplo: { en: 'My grandfather is eighty.', es: 'Mi abuelo tiene ochenta años.' } },
        { termino: 'grandmother', significado: 'abuela', emoji: '👵', ejemplo: { en: 'My grandmother cooks very well.', es: 'Mi abuela cocina muy bien.' } },
        { termino: 'grandparents', significado: 'abuelos', emoji: '👴👵', ejemplo: { en: 'My grandparents live in Caracas.', es: 'Mis abuelos viven en Caracas.' } },
        { termino: 'brother', significado: 'hermano', emoji: '👦', ejemplo: { en: 'My brother is funny.', es: 'Mi hermano es divertido.' } },
        { termino: 'sister', significado: 'hermana', emoji: '👧', ejemplo: { en: 'My sister is seventeen.', es: 'Mi hermana tiene diecisiete años.' } },
        { termino: 'uncle', significado: 'tío', emoji: '🧔', ejemplo: { en: 'My uncle is strong.', es: 'Mi tío es fuerte.' } },
        { termino: 'aunt', significado: 'tía', emoji: '💁‍♀️', ejemplo: { en: 'My aunt is very generous.', es: 'Mi tía es muy generosa.' } },
        { termino: 'cousin', significado: 'primo / prima', emoji: '🧑‍🤝‍🧑', ejemplo: { en: 'My cousin lives in Texas.', es: 'Mi primo vive en Texas.' } },
        { termino: 'son', significado: 'hijo', emoji: '👶', ejemplo: { en: 'Their son is two years old.', es: 'Su hijo tiene dos años.' } },
        { termino: 'daughter', significado: 'hija', emoji: '🎀', ejemplo: { en: 'Her daughter is a student.', es: 'Su hija es estudiante.' } },
        { termino: 'husband', significado: 'esposo', emoji: '🤵', ejemplo: { en: 'Her husband is a teacher.', es: 'Su esposo es maestro.' } },
        { termino: 'wife', significado: 'esposa', emoji: '👰', ejemplo: { en: 'His wife is a doctor.', es: 'Su esposa es doctora.' } },
        { termino: 'children', significado: 'hijos / niños', emoji: '👧👦', ejemplo: { en: 'They have three children.', es: 'Tienen tres hijos.' } },
      ],
    },
    {
      nombre: 'Saludos y presentaciones',
      color: '#2e9e63',
      palabras: [
        { termino: 'hello', significado: 'hola', emoji: '👋', ejemplo: { en: 'Hello! How are you?', es: '¡Hola! ¿Cómo estás?' } },
        { termino: 'good morning', significado: 'buenos días', emoji: '🌅', ejemplo: { en: 'Good morning, Mr. Lopez.', es: 'Buenos días, Sr. López.' } },
        { termino: 'good afternoon', significado: 'buenas tardes', emoji: '☀️', ejemplo: { en: 'Good afternoon, class.', es: 'Buenas tardes, clase.' } },
        { termino: 'good evening', significado: 'buenas noches (al llegar)', emoji: '🌆', ejemplo: { en: 'Good evening! Welcome.', es: '¡Buenas noches! Bienvenido.' } },
        { termino: 'good night', significado: 'buenas noches (al despedirse)', emoji: '🌙', ejemplo: { en: 'Good night! See you tomorrow.', es: '¡Buenas noches! Hasta mañana.' } },
        { termino: 'nice to meet you', significado: 'mucho gusto', emoji: '🤝', ejemplo: { en: 'Nice to meet you, Marta.', es: 'Mucho gusto, Marta.' } },
        { termino: 'how are you?', significado: '¿cómo estás?', emoji: '🙂', ejemplo: { en: 'Hi, Ana! How are you?', es: '¡Hola, Ana! ¿Cómo estás?' } },
        { termino: 'fine, thanks', significado: 'bien, gracias', emoji: '👍', ejemplo: { en: 'Fine, thanks. And you?', es: 'Bien, gracias. ¿Y tú?' } },
        { termino: 'friend', significado: 'amigo / amiga', emoji: '🧑‍🤝‍🧑', ejemplo: { en: 'This is my friend Hiro.', es: 'Este es mi amigo Hiro.' } },
        { termino: "what's your name?", significado: '¿cómo te llamas?', emoji: '❓', ejemplo: { en: "What's your name? — I'm Ana.", es: '¿Cómo te llamas? — Soy Ana.' } },
        { termino: 'my name is…', significado: 'me llamo…', emoji: '📛', ejemplo: { en: 'My name is Jesús.', es: 'Me llamo Jesús.' } },
        { termino: 'see you later', significado: 'hasta luego', emoji: '👋', ejemplo: { en: 'See you later, my friend!', es: '¡Hasta luego, amigo!' } },
        { termino: 'how do you spell…?', significado: '¿cómo se deletrea…?', emoji: '🔤', ejemplo: { en: 'How do you spell your name?', es: '¿Cómo se deletrea tu nombre?' } },
      ],
    },
    {
      nombre: 'Descripciones',
      color: '#e0b13e',
      palabras: [
        { termino: 'tall', significado: 'alto', emoji: '🦒', ejemplo: { en: 'My father is tall.', es: 'Mi padre es alto.' } },
        { termino: 'short', significado: 'bajo / corto', emoji: '🐜', ejemplo: { en: 'She is short.', es: 'Ella es baja.' } },
        { termino: 'big', significado: 'grande', emoji: '🐘', ejemplo: { en: 'Our house is big.', es: 'Nuestra casa es grande.' } },
        { termino: 'small', significado: 'pequeño', emoji: '🐭', ejemplo: { en: 'The cat is small.', es: 'El gato es pequeño.' } },
        { termino: 'young', significado: 'joven', emoji: '🧒', ejemplo: { en: 'My cousin is young.', es: 'Mi primo es joven.' } },
        { termino: 'old', significado: 'viejo / mayor', emoji: '🧓', ejemplo: { en: 'My grandfather is old.', es: 'Mi abuelo es mayor.' } },
        { termino: 'pretty', significado: 'bonita', emoji: '🌸', ejemplo: { en: 'Your sister is pretty.', es: 'Tu hermana es bonita.' } },
        { termino: 'handsome', significado: 'guapo', emoji: '😎', ejemplo: { en: 'He is young and handsome.', es: 'Él es joven y guapo.' } },
        { termino: 'beautiful', significado: 'hermosa', emoji: '✨', ejemplo: { en: 'Your family is beautiful.', es: 'Tu familia es hermosa.' } },
        { termino: 'intelligent', significado: 'inteligente', emoji: '🧠', ejemplo: { en: 'She is very intelligent.', es: 'Ella es muy inteligente.' } },
        { termino: 'funny', significado: 'divertido', emoji: '😂', ejemplo: { en: 'My uncle is funny.', es: 'Mi tío es divertido.' } },
        { termino: 'serious', significado: 'serio', emoji: '😐', ejemplo: { en: 'The teacher is serious.', es: 'El profesor es serio.' } },
        { termino: 'strong', significado: 'fuerte', emoji: '💪', ejemplo: { en: 'The gorilla is strong.', es: 'El gorila es fuerte.' } },
        { termino: 'generous', significado: 'generoso', emoji: '🎁', ejemplo: { en: 'My aunt is generous.', es: 'Mi tía es generosa.' } },
        { termino: 'sweet', significado: 'dulce / tierno', emoji: '🍬', ejemplo: { en: 'My grandmother is sweet.', es: 'Mi abuela es dulce.' } },
        { termino: 'shy', significado: 'tímido', emoji: '😊', ejemplo: { en: 'The boy is shy.', es: 'El niño es tímido.' } },
        { termino: 'reserved', significado: 'reservado', emoji: '🤫', ejemplo: { en: 'My brother is reserved.', es: 'Mi hermano es reservado.' } },
        { termino: 'bald', significado: 'calvo', emoji: '👨‍🦲', ejemplo: { en: 'My grandfather is bald.', es: 'Mi abuelo es calvo.' } },
        { termino: 'married', significado: 'casado', emoji: '💍', ejemplo: { en: 'They are married.', es: 'Ellos están casados.' } },
        { termino: 'single', significado: 'soltero', emoji: '🙋', ejemplo: { en: "He isn't married. He's single.", es: 'No está casado. Es soltero.' } },
      ],
    },
    {
      nombre: 'Apariencia',
      color: '#2f6690',
      palabras: [
        { termino: 'hair', significado: 'cabello', emoji: '💇', ejemplo: { en: 'Her hair is long.', es: 'Su cabello es largo.' } },
        { termino: 'eyes', significado: 'ojos', emoji: '👀', ejemplo: { en: 'His eyes are brown.', es: 'Sus ojos son marrones.' } },
        { termino: 'curly hair', significado: 'cabello rizado', emoji: '➰', ejemplo: { en: 'She has curly hair.', es: 'Ella tiene cabello rizado.' } },
        { termino: 'straight hair', significado: 'cabello liso', emoji: '📏', ejemplo: { en: 'My aunt has straight hair.', es: 'Mi tía tiene cabello liso.' } },
        { termino: 'long hair', significado: 'cabello largo', emoji: '👱‍♀️', ejemplo: { en: 'Eva has long hair.', es: 'Eva tiene cabello largo.' } },
        { termino: 'short hair', significado: 'cabello corto', emoji: '💇‍♂️', ejemplo: { en: 'He has short hair.', es: 'Él tiene cabello corto.' } },
        { termino: 'blond hair', significado: 'cabello rubio', emoji: '👱', ejemplo: { en: 'The baby has blond hair.', es: 'El bebé tiene cabello rubio.' } },
        { termino: 'black hair', significado: 'cabello negro', emoji: '🖤', ejemplo: { en: 'He is tall with black hair.', es: 'Él es alto, de cabello negro.' } },
        { termino: 'brown eyes', significado: 'ojos marrones', emoji: '🟤', ejemplo: { en: 'She has brown eyes.', es: 'Ella tiene ojos marrones.' } },
        { termino: 'blue eyes', significado: 'ojos azules', emoji: '🔵', ejemplo: { en: 'Kate has blue eyes.', es: 'Kate tiene ojos azules.' } },
        { termino: 'glasses', significado: 'lentes / gafas', emoji: '👓', ejemplo: { en: 'He wears glasses.', es: 'Él usa lentes.' } },
      ],
    },
    {
      nombre: 'Animales',
      color: '#8a5a35',
      palabras: [
        { termino: 'lion', significado: 'león', emoji: '🦁', ejemplo: { en: 'Lions live in family groups.', es: 'Los leones viven en grupos familiares.' } },
        { termino: 'polar bear', significado: 'oso polar', emoji: '🐻‍❄️', ejemplo: { en: 'Polar bears live alone.', es: 'Los osos polares viven solos.' } },
        { termino: 'gorilla', significado: 'gorila', emoji: '🦍', ejemplo: { en: 'Gorillas are big and strong.', es: 'Los gorilas son grandes y fuertes.' } },
        { termino: 'meerkat', significado: 'suricata', emoji: '🐿️', ejemplo: { en: 'Meerkats are small animals.', es: 'Las suricatas son animales pequeños.' } },
        { termino: 'dolphin', significado: 'delfín', emoji: '🐬', ejemplo: { en: 'The dolphin is intelligent.', es: 'El delfín es inteligente.' } },
        { termino: 'wolf', significado: 'lobo', emoji: '🐺', ejemplo: { en: 'Wolves live in groups too.', es: 'Los lobos también viven en grupos.' } },
        { termino: 'rhino', significado: 'rinoceronte', emoji: '🦏', ejemplo: { en: 'The rhino is very big.', es: 'El rinoceronte es muy grande.' } },
        { termino: 'sloth', significado: 'perezoso', emoji: '🦥', ejemplo: { en: 'The sloth is slow.', es: 'El perezoso es lento.' } },
        { termino: 'live in groups', significado: 'viven en grupos', emoji: '👥', ejemplo: { en: 'Lions live in groups.', es: 'Los leones viven en grupos.' } },
        { termino: 'live alone', significado: 'viven solos', emoji: '1️⃣', ejemplo: { en: 'Polar bears live alone.', es: 'Los osos polares viven solos.' } },
      ],
    },
    {
      nombre: 'Rutina diaria',
      color: '#2e9e63',
      nivel: 'A2',
      palabras: [
        { termino: 'get up', significado: 'levantarse', emoji: '⏰', ejemplo: { en: 'I get up at six.', es: 'Me levanto a las seis.' } },
        { termino: 'take a shower', significado: 'ducharse', emoji: '🚿', ejemplo: { en: 'He takes a shower every morning.', es: 'Él se ducha cada mañana.' } },
        { termino: 'get dressed', significado: 'vestirse', emoji: '👕', ejemplo: { en: 'I get dressed in the morning.', es: 'Me visto en la mañana.' } },
        { termino: 'brush my teeth', significado: 'cepillarme los dientes', emoji: '🪥', ejemplo: { en: 'I brush my teeth after lunch.', es: 'Me cepillo los dientes después de almorzar.' } },
        { termino: 'have breakfast', significado: 'desayunar', emoji: '🍳', ejemplo: { en: 'We have breakfast at eight.', es: 'Desayunamos a las ocho.' } },
        { termino: 'have lunch', significado: 'almorzar', emoji: '🥪', ejemplo: { en: 'She has lunch at noon.', es: 'Ella almuerza al mediodía.' } },
        { termino: 'have dinner', significado: 'cenar', emoji: '🍽️', ejemplo: { en: 'They have dinner at eight.', es: 'Ellos cenan a las ocho.' } },
        { termino: 'go to work', significado: 'ir al trabajo', emoji: '💼', ejemplo: { en: 'He goes to work by bus.', es: 'Él va al trabajo en autobús.' } },
        { termino: 'start work', significado: 'empezar a trabajar', emoji: '🏁', ejemplo: { en: 'I start work at nine.', es: 'Empiezo a trabajar a las nueve.' } },
        { termino: 'take public transportation', significado: 'tomar transporte público', emoji: '🚌', ejemplo: { en: 'We take public transportation.', es: 'Tomamos transporte público.' } },
        { termino: 'cook', significado: 'cocinar', emoji: '👨‍🍳', ejemplo: { en: 'I cook dinner every evening.', es: 'Cocino la cena cada noche.' } },
        { termino: 'clean the house', significado: 'limpiar la casa', emoji: '🧹', ejemplo: { en: 'She cleans the house on Sundays.', es: 'Ella limpia la casa los domingos.' } },
        { termino: 'go shopping', significado: 'ir de compras', emoji: '🛒', ejemplo: { en: 'We go shopping on Saturdays.', es: 'Vamos de compras los sábados.' } },
        { termino: 'watch TV', significado: 'ver televisión', emoji: '📺', ejemplo: { en: 'They watch TV at night.', es: 'Ellos ven televisión en la noche.' } },
        { termino: 'take a nap', significado: 'tomar una siesta', emoji: '😴', ejemplo: { en: 'I take a nap in the afternoon.', es: 'Tomo una siesta en la tarde.' } },
        { termino: 'go back home', significado: 'regresar a casa', emoji: '🏠', ejemplo: { en: 'He goes back home at five.', es: 'Él regresa a casa a las cinco.' } },
        { termino: 'go to bed', significado: 'acostarse', emoji: '🛏️', ejemplo: { en: 'I go to bed at eleven.', es: 'Me acuesto a las once.' } },
      ],
    },
    {
      nombre: 'La hora',
      color: '#e0b13e',
      nivel: 'A2',
      palabras: [
        { termino: 'What time is it?', significado: '¿Qué hora es?', emoji: '🕐', ejemplo: { en: "What time is it? — It's two.", es: '¿Qué hora es? — Son las dos.' } },
        { termino: "o'clock", significado: 'en punto', emoji: '🕛', ejemplo: { en: "It's four o'clock.", es: 'Son las cuatro en punto.' } },
        { termino: 'half past five', significado: 'cinco y media', emoji: '🕠', ejemplo: { en: "It's half past five.", es: 'Son las cinco y media.' } },
        { termino: 'a quarter after six', significado: 'seis y cuarto', emoji: '🕕', ejemplo: { en: "It's a quarter after six.", es: 'Son las seis y cuarto.' } },
        { termino: 'a quarter to six', significado: 'un cuarto para las seis', emoji: '🕔', ejemplo: { en: "It's a quarter to six.", es: 'Es un cuarto para las seis.' } },
        { termino: 'noon', significado: 'mediodía', emoji: '🌞', ejemplo: { en: 'We have lunch at noon.', es: 'Almorzamos al mediodía.' } },
        { termino: 'midnight', significado: 'medianoche', emoji: '🌌', ejemplo: { en: 'He goes to bed at midnight.', es: 'Él se acuesta a medianoche.' } },
        { termino: 'every day', significado: 'todos los días', emoji: '📆', ejemplo: { en: 'I work every day.', es: 'Trabajo todos los días.' } },
        { termino: 'in the morning', significado: 'en la mañana', emoji: '🌅', ejemplo: { en: 'I study in the morning.', es: 'Estudio en la mañana.' } },
        { termino: 'in the afternoon', significado: 'en la tarde', emoji: '☀️', ejemplo: { en: 'She rests in the afternoon.', es: 'Ella descansa en la tarde.' } },
        { termino: 'in the evening', significado: 'en la noche (temprano)', emoji: '🌇', ejemplo: { en: 'We cook in the evening.', es: 'Cocinamos en la noche.' } },
        { termino: 'at night', significado: 'en la noche', emoji: '🌙', ejemplo: { en: 'I watch TV at night.', es: 'Veo televisión en la noche.' } },
        { termino: 'on the weekend', significado: 'el fin de semana', emoji: '🎉', ejemplo: { en: 'We relax on the weekend.', es: 'Descansamos el fin de semana.' } },
        { termino: 'weekdays', significado: 'días de semana', emoji: '🗓️', ejemplo: { en: 'I get up early on weekdays.', es: 'Me levanto temprano entre semana.' } },
      ],
    },
    {
      nombre: 'Lugares de la ciudad',
      color: '#2f6690',
      nivel: 'A2',
      palabras: [
        { termino: 'tourist office', significado: 'oficina de turismo', emoji: 'ℹ️', ejemplo: { en: 'Ask at the tourist office.', es: 'Pregunta en la oficina de turismo.' } },
        { termino: 'restaurant', significado: 'restaurante', emoji: '🍽️', ejemplo: { en: 'The restaurant is near the hotel.', es: 'El restaurante está cerca del hotel.' } },
        { termino: 'art gallery', significado: 'galería de arte', emoji: '🖼️', ejemplo: { en: 'The art gallery opens at ten.', es: 'La galería abre a las diez.' } },
        { termino: 'train station', significado: 'estación de tren', emoji: '🚉', ejemplo: { en: 'The train station is far.', es: 'La estación de tren queda lejos.' } },
        { termino: 'hotel', significado: 'hotel', emoji: '🏨', ejemplo: { en: 'Our hotel is on the corner.', es: 'Nuestro hotel está en la esquina.' } },
        { termino: 'bus station', significado: 'terminal de autobuses', emoji: '🚏', ejemplo: { en: 'The bus station is big.', es: 'La terminal es grande.' } },
        { termino: 'supermarket', significado: 'supermercado', emoji: '🛒', ejemplo: { en: 'Go past the supermarket.', es: 'Pasa el supermercado.' } },
        { termino: 'park', significado: 'parque', emoji: '🌳', ejemplo: { en: 'We walk in the park.', es: 'Caminamos en el parque.' } },
        { termino: 'movie theater', significado: 'cine', emoji: '🎬', ejemplo: { en: 'The movie theater is full.', es: 'El cine está lleno.' } },
        { termino: 'post office', significado: 'oficina de correos', emoji: '📮', ejemplo: { en: 'The post office closes at five.', es: 'El correo cierra a las cinco.' } },
        { termino: 'museum', significado: 'museo', emoji: '🏛️', ejemplo: { en: 'The museum is opposite the park.', es: 'El museo está frente al parque.' } },
        { termino: 'shopping mall', significado: 'centro comercial', emoji: '🏬', ejemplo: { en: 'She works at the shopping mall.', es: 'Ella trabaja en el centro comercial.' } },
        { termino: 'library', significado: 'biblioteca', emoji: '📚', ejemplo: { en: 'I study at the library.', es: 'Estudio en la biblioteca.' } },
        { termino: 'bank', significado: 'banco', emoji: '🏦', ejemplo: { en: 'The bank is next to the store.', es: 'El banco está al lado de la tienda.' } },
        { termino: 'pharmacy', significado: 'farmacia', emoji: '💊', ejemplo: { en: 'Is there a pharmacy near here?', es: '¿Hay una farmacia cerca?' } },
        { termino: 'traffic light', significado: 'semáforo', emoji: '🚦', ejemplo: { en: 'Turn left at the traffic light.', es: 'Gira a la izquierda en el semáforo.' } },
        { termino: 'parking lot', significado: 'estacionamiento', emoji: '🅿️', ejemplo: { en: 'The parking lot is behind the mall.', es: 'El estacionamiento está detrás del centro comercial.' } },
        { termino: 'store', significado: 'tienda', emoji: '🏪', ejemplo: { en: 'The store opens at nine.', es: 'La tienda abre a las nueve.' } },
      ],
    },
    {
      nombre: 'Transporte',
      color: '#8a5a35',
      nivel: 'A2',
      palabras: [
        { termino: 'train', significado: 'tren (va sobre rieles)', emoji: '🚆', ejemplo: { en: 'The train goes on rails.', es: 'El tren va sobre rieles.' } },
        { termino: 'subway', significado: 'metro (va bajo tierra)', emoji: '🚇', ejemplo: { en: 'The subway goes underground.', es: 'El metro va bajo tierra.' } },
        { termino: 'bus', significado: 'autobús', emoji: '🚌', ejemplo: { en: 'I take the bus to work.', es: 'Tomo el autobús al trabajo.' } },
        { termino: 'taxi', significado: 'taxi', emoji: '🚕', ejemplo: { en: 'We can take a taxi.', es: 'Podemos tomar un taxi.' } },
        { termino: 'rental car', significado: 'carro alquilado', emoji: '🚗', ejemplo: { en: 'They have a rental car.', es: 'Tienen un carro alquilado.' } },
        { termino: 'car', significado: 'carro', emoji: '🚙', ejemplo: { en: 'Get in the car!', es: '¡Súbete al carro!' } },
        { termino: 'airport shuttle bus', significado: 'autobús del aeropuerto al hotel', emoji: '🛬', ejemplo: { en: 'The shuttle bus goes to the hotel.', es: 'El shuttle va al hotel.' } },
        { termino: 'ticket', significado: 'boleto', emoji: '🎫', ejemplo: { en: 'I need a ticket for the train.', es: 'Necesito un boleto para el tren.' } },
        { termino: 'bus stop', significado: 'parada de autobús', emoji: '🚏', ejemplo: { en: 'Wait at the bus stop.', es: 'Espera en la parada.' } },
        { termino: 'subway station', significado: 'estación del metro', emoji: '🚉', ejemplo: { en: 'The subway station is close.', es: 'La estación del metro está cerca.' } },
        { termino: 'motorcycle', significado: 'motocicleta', emoji: '🏍️', ejemplo: { en: 'He goes to work by motorcycle.', es: 'Él va al trabajo en moto.' } },
        { termino: 'bike', significado: 'bicicleta', emoji: '🚲', ejemplo: { en: 'She rides her bike every day.', es: 'Ella monta su bici todos los días.' } },
      ],
    },
    {
      nombre: 'Direcciones',
      color: '#ec6a55',
      nivel: 'A2',
      palabras: [
        { termino: 'go straight ahead', significado: 'sigue derecho', emoji: '⬆️', ejemplo: { en: 'Go straight ahead two blocks.', es: 'Sigue derecho dos cuadras.' } },
        { termino: 'turn left', significado: 'gira a la izquierda', emoji: '⬅️', ejemplo: { en: 'Turn left at the bank.', es: 'Gira a la izquierda en el banco.' } },
        { termino: 'turn right', significado: 'gira a la derecha', emoji: '➡️', ejemplo: { en: 'Turn right at the light.', es: 'Gira a la derecha en el semáforo.' } },
        { termino: 'take the second left', significado: 'toma la segunda a la izquierda', emoji: '2️⃣', ejemplo: { en: 'Take the second left.', es: 'Toma la segunda a la izquierda.' } },
        { termino: 'go past', significado: 'pasa de largo', emoji: '🏃', ejemplo: { en: 'Go past the museum.', es: 'Pasa el museo de largo.' } },
        { termino: 'make a U-turn', significado: 'da la vuelta en U', emoji: '↩️', ejemplo: { en: 'Make a U-turn here.', es: 'Da la vuelta en U aquí.' } },
        { termino: 'go back', significado: 'regresa', emoji: '🔙', ejemplo: { en: 'Go back to the corner.', es: 'Regresa a la esquina.' } },
        { termino: 'take a taxi', significado: 'toma un taxi', emoji: '🚕', ejemplo: { en: "It's far. Take a taxi.", es: 'Queda lejos. Toma un taxi.' } },
        { termino: 'get in', significado: 'subirse (a carros y camionetas)', emoji: '🚗', ejemplo: { en: 'Get in the taxi!', es: '¡Súbete al taxi!' } },
        { termino: 'get out', significado: 'bajarse (de carros y camionetas)', emoji: '🚪', ejemplo: { en: 'Get out of the car here.', es: 'Bájate del carro aquí.' } },
        { termino: 'get on', significado: 'subirse (a buses, trenes, motos, bicis)', emoji: '🚌', ejemplo: { en: 'Get on bus number 7.', es: 'Súbete al bus número 7.' } },
        { termino: 'get off', significado: 'bajarse (de buses, trenes, motos, bicis)', emoji: '🛑', ejemplo: { en: 'Get off at the park.', es: 'Bájate en el parque.' } },
        { termino: 'between', significado: 'entre', emoji: '↔️', ejemplo: { en: 'The bank is between two stores.', es: 'El banco está entre dos tiendas.' } },
        { termino: 'opposite', significado: 'enfrente de', emoji: '🔄', ejemplo: { en: 'The museum is opposite the park.', es: 'El museo está frente al parque.' } },
        { termino: 'next to', significado: 'al lado de', emoji: '🤝', ejemplo: { en: 'The pharmacy is next to the bank.', es: 'La farmacia está al lado del banco.' } },
        { termino: 'on the corner', significado: 'en la esquina', emoji: '📍', ejemplo: { en: 'The hotel is on the corner.', es: 'El hotel está en la esquina.' } },
      ],
    },
    {
      nombre: 'Phrasal verbs',
      color: '#2e9e63',
      nivel: 'B1',
      palabras: [
        { termino: 'set out', significado: 'emprender un viaje', emoji: '🧭', ejemplo: { en: 'They set out at six.', es: 'Emprendieron el viaje a las seis.' } },
        { termino: 'give up', significado: 'rendirse / dejar de intentar', emoji: '🏳️', ejemplo: { en: "Don't give up!", es: '¡No te rindas!' } },
        { termino: 'watch out', significado: 'tener cuidado (¡cuidado!)', emoji: '⚠️', ejemplo: { en: 'Watch out! The floor is wet.', es: '¡Cuidado! El piso está mojado.' } },
        { termino: 'grow up', significado: 'crecer (de niño a adulto)', emoji: '🌱', ejemplo: { en: 'I grew up in Venezuela.', es: 'Crecí en Venezuela.' } },
        { termino: 'keep on', significado: 'seguir / persistir', emoji: '🔁', ejemplo: { en: 'Keep on practicing!', es: '¡Sigue practicando!' } },
        { termino: 'run out of', significado: 'quedarse sin algo', emoji: '🪫', ejemplo: { en: 'We ran out of water.', es: 'Nos quedamos sin agua.' } },
        { termino: 'put up with', significado: 'aguantar / tolerar', emoji: '😤', ejemplo: { en: "I can't put up with this noise.", es: 'No aguanto este ruido.' } },
        { termino: 'go over', significado: 'revisar con cuidado', emoji: '🔍', ejemplo: { en: 'Go over your answers.', es: 'Revisa tus respuestas.' } },
        { termino: 'run into', significado: 'encontrarse con alguien por casualidad', emoji: '😮', ejemplo: { en: 'I ran into my old teacher.', es: 'Me topé con mi antigua profesora.' } },
        { termino: 'come across', significado: 'toparse con / hallar por azar', emoji: '🔎', ejemplo: { en: 'I came across an old photo.', es: 'Me topé con una foto vieja.' } },
        { termino: 'find out', significado: 'descubrir / enterarse', emoji: '💡', ejemplo: { en: 'I found out the exam is on Friday.', es: 'Me enteré de que el examen es el viernes.' } },
        { termino: 'pass away', significado: 'fallecer (forma suave de decir morir)', emoji: '🕊️', ejemplo: { en: 'His grandfather passed away.', es: 'Su abuelo falleció.' } },
        { termino: 'put off', significado: 'posponer / aplazar', emoji: '📅', ejemplo: { en: "Don't put off your homework.", es: 'No pospongas tu tarea.' } },
      ],
    },
    {
      nombre: 'Retos y aventuras',
      color: '#8a5a35',
      nivel: 'B1',
      palabras: [
        { termino: 'challenge', significado: 'reto / desafío', emoji: '🎯', ejemplo: { en: 'It was my biggest challenge.', es: 'Fue mi mayor reto.' } },
        { termino: 'face a challenge', significado: 'enfrentar un reto', emoji: '🥊', ejemplo: { en: 'We face a new challenge.', es: 'Enfrentamos un nuevo reto.' } },
        { termino: 'goal', significado: 'meta', emoji: '🏁', ejemplo: { en: 'My goal is to pass the exam.', es: 'Mi meta es aprobar el examen.' } },
        { termino: 'achieve', significado: 'lograr', emoji: '🏆', ejemplo: { en: 'You can achieve your goal.', es: 'Puedes lograr tu meta.' } },
        { termino: 'make progress', significado: 'avanzar / progresar', emoji: '📈', ejemplo: { en: "You're making a lot of progress!", es: '¡Estás progresando mucho!' } },
        { termino: 'get used to', significado: 'acostumbrarse a', emoji: '🔄', ejemplo: { en: 'Getting used to a new school is hard.', es: 'Acostumbrarse a una escuela nueva es difícil.' } },
        { termino: 'equipment', significado: 'equipo (material)', emoji: '🎒', ejemplo: { en: "You don't need special equipment.", es: 'No necesitas equipo especial.' } },
        { termino: 'climb', significado: 'escalar / subir', emoji: '🧗', ejemplo: { en: 'I want to climb Black Mountain.', es: 'Quiero escalar Black Mountain.' } },
        { termino: 'go hiking', significado: 'ir de excursión (senderismo)', emoji: '🥾', ejemplo: { en: "I'll go hiking every weekend.", es: 'Iré de excursión cada fin de semana.' } },
        { termino: 'expedition', significado: 'expedición', emoji: '🗺️', ejemplo: { en: 'The expedition walked for months.', es: 'La expedición caminó por meses.' } },
        { termino: 'rainforest', significado: 'selva tropical', emoji: '🌴', ejemplo: { en: 'They crossed the rainforest.', es: 'Cruzaron la selva tropical.' } },
        { termino: 'waterfall', significado: 'cascada', emoji: '💦', ejemplo: { en: 'We saw a huge waterfall.', es: 'Vimos una cascada enorme.' } },
        { termino: 'fit', significado: 'en forma', emoji: '🏃', ejemplo: { en: "I'll be fit enough to climb.", es: 'Estaré en forma para escalar.' } },
        { termino: 'brave', significado: 'valiente', emoji: '🦁', ejemplo: { en: 'She was brave during the storm.', es: 'Fue valiente durante la tormenta.' } },
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
        {
          titulo: 'Conversación completa de la vida real',
          contenido:
            'Así suena un primer encuentro de principio a fin. Memoriza el flujo: saludo → nombre → origen → despedida. Con estas cuatro jugadas sobrevives cualquier presentación.',
          ejemplos: [
            { en: '— Hi! My name is Omar. — Hello, Omar. I\u2019m Kate.', es: '— ¡Hola! Me llamo Omar. — Hola, Omar. Soy Kate.' },
            { en: '— Where are you from? — I\u2019m from Venezuela. And you?', es: '— ¿De dónde eres? — Soy de Venezuela. ¿Y tú?' },
            { en: '— Nice to meet you! — Nice to meet you, too.', es: '— ¡Mucho gusto! — Mucho gusto también.' },
            { en: '— See you later! — Bye! Have a good day.', es: '— ¡Hasta luego! — ¡Chao! Que tengas buen día.' },
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
        {
          titulo: 'Un truco por pronombre (tabla mental)',
          contenido:
            'Repite esta escalera hasta que salga sola: I am · you are · he is · she is · it is · we are · they are.\nFíjate: solo I usa am; todo lo que sea UNA persona o cosa (que no seas tú) usa is; todo lo plural y "you" usa are.',
          ejemplos: [
            { en: 'I am a student. You are my teacher.', es: 'Yo soy estudiante. Tú eres mi profesor.' },
            { en: 'He is tall. She is funny. It is big.', es: 'Él es alto. Ella es divertida. Eso es grande.' },
            { en: 'We are friends. They are cousins.', es: 'Nosotros somos amigos. Ellos son primos.' },
            { en: 'My dog is small, but my cats are fast.', es: 'Mi perro es pequeño, pero mis gatos son rápidos.' },
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
        {
          titulo: 'Entrena el oído: así suenan de verdad',
          contenido:
            'En conversación real casi nunca escucharás "she is": escucharás "she\u2019s". Lee estos pares en voz alta, primero la forma larga y luego la corta, y nota cómo la corta suena más natural.',
          ejemplos: [
            { en: 'I am tired → I\u2019m tired.', es: 'Estoy cansado. (la corta suena natural)' },
            { en: 'He is my cousin → He\u2019s my cousin.', es: 'Él es mi primo.' },
            { en: 'We are not ready → We aren\u2019t ready.', es: 'No estamos listos.' },
            { en: 'It is hot → It\u2019s hot.', es: 'Hace calor.' },
          ],
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
        {
          titulo: 'Practica con una foto de tu familia',
          contenido:
            'El examen oral de la academia casi siempre es describir una foto. Arma oraciones con el patrón: This is my ___ + His/Her name is ___ y repítelas con TU familia real: así nunca se te olvida qué posesivo toca.',
          ejemplos: [
            { en: 'This is my mother. Her name is Elsa.', es: 'Esta es mi madre. Su nombre es Elsa.' },
            { en: 'These are my cousins. Their names are Dani and Eva.', es: 'Estos son mis primos. Sus nombres son Dani y Eva.' },
            { en: 'Our family is from Valencia.', es: 'Nuestra familia es de Valencia.' },
            { en: 'The dog is happy with its new house.', es: 'El perro está feliz con su casa nueva.' },
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
        {
          titulo: 'El árbol en cadena (para no perderte)',
          contenido:
            'Lee la cadena completa en voz alta: My grandparents have two children: my father and my uncle. My uncle\u2019s children are my cousins. Si puedes recorrer el árbol así, dominaste el tema.',
          ejemplos: [
            { en: 'My father\u2019s mother is my grandmother.', es: 'La madre de mi padre es mi abuela.' },
            { en: 'My uncle\u2019s children are my cousins.', es: 'Los hijos de mi tío son mis primos.' },
            { en: 'My wife\u2019s father is 70 years old.', es: 'El padre de mi esposa tiene 70 años.' },
            { en: 'Our son and our daughter are our children.', es: 'Nuestro hijo y nuestra hija son nuestros hijos.' },
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
        {
          titulo: 'Retratos exprés (combina 3 rasgos)',
          contenido:
            'El secreto para sonar fluido: personalidad + físico + cabello/ojos en una sola oración con and y with. Practica armando retratos de tres personas que conozcas.',
          ejemplos: [
            { en: 'My boss is serious but generous, with short black hair.', es: 'Mi jefe es serio pero generoso, de cabello negro corto.' },
            { en: 'Her sister is young and funny, with blue eyes.', es: 'Su hermana es joven y divertida, de ojos azules.' },
            { en: 'My grandfather is old and sweet. He is bald.', es: 'Mi abuelo es mayor y tierno. Es calvo.' },
            { en: 'The new student is shy, with long straight hair.', es: 'La estudiante nueva es tímida, de cabello largo y liso.' },
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
        {
          titulo: 'Compara animales (el puente al siguiente nivel)',
          contenido:
            'Combina lo aprendido: be + adjetivo + live in groups / alone. Comparar dos animales en una oración es un mini ensayo de examen.',
          ejemplos: [
            { en: 'The meerkat is small, but the rhino is big.', es: 'La suricata es pequeña, pero el rinoceronte es grande.' },
            { en: 'Lions live in groups; polar bears live alone.', es: 'Los leones viven en grupos; los osos polares viven solos.' },
            { en: 'The dolphin is intelligent and fast.', es: 'El delfín es inteligente y rápido.' },
            { en: 'Wolves are strong and they live in family groups.', es: 'Los lobos son fuertes y viven en grupos familiares.' },
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
    {
      nombre: 'Rutina diaria y presente simple',
      nivel: 'A2',
      notas: '',
      curiosidades: [
        'La -s de la tercera persona (he gets up) es la regla que más olvidan TODOS los estudiantes del mundo. Si la dominas, suenas de otro nivel.',
        'En inglés se dice have breakfast/lunch/dinner, sin artículo: nada de "have A breakfast".',
        'take a nap (tomar una siesta) viene del inglés antiguo hnappian, dormitar. ¡La siesta también es universal!',
      ],
      explicacion: [
        {
          titulo: 'El presente simple: tu día de todos los días',
          contenido:
            'El presente simple describe rutinas y hábitos: lo que haces todos los días o casi siempre.\nCon I, you, we, they el verbo va tal cual: I get up at six. They watch TV.\nLas acciones de la rutina: get up, take a shower, get dressed, have breakfast, go to work, go back home, go to bed.',
          ejemplos: [
            { en: 'I get up at six o\u2019clock every day.', es: 'Me levanto a las seis todos los días.' },
            { en: 'We have dinner at eight.', es: 'Cenamos a las ocho.' },
            { en: 'They take public transportation.', es: 'Ellos toman transporte público.' },
          ],
        },
        {
          titulo: 'La -s de he / she / it',
          contenido:
            'Con he, she, it el verbo lleva -s: He gets up. She works. It starts.\nOjo con los especiales: go → goes, watch → watches, brush → brushes, have → has.',
          ejemplos: [
            { en: 'My wife gets up at five.', es: 'Mi esposa se levanta a las cinco.' },
            { en: 'He goes to work by bus.', es: 'Él va al trabajo en autobús.' },
            { en: 'She has breakfast at home.', es: 'Ella desayuna en casa.' },
          ],
        },
        {
          titulo: 'Negar y preguntar: don\u2019t / doesn\u2019t y do / does',
          contenido:
            'Negativo: I don\u2019t cook. / He doesn\u2019t cook. (con doesn\u2019t, el verbo pierde la -s).\nPregunta: Do you work on Sundays? / Does she clean the house?\nRespuestas cortas: Yes, I do. / No, she doesn\u2019t.',
          ejemplos: [
            { en: 'I don\u2019t watch TV in the morning.', es: 'No veo televisión en la mañana.' },
            { en: '— Does he cook? — No, he doesn\u2019t.', es: '— ¿Él cocina? — No.' },
          ],
        },
        {
          titulo: 'Tu día completo en 6 oraciones',
          contenido:
            'Narrar tu rutina de corrido es LA pregunta del examen oral. Plantilla: hora + acción, de la mañana a la noche. Cámbiala por tu rutina real y repítela en el shadowing.',
          ejemplos: [
            { en: 'I get up at six and take a shower.', es: 'Me levanto a las seis y me ducho.' },
            { en: 'I have breakfast and go to work at eight.', es: 'Desayuno y voy al trabajo a las ocho.' },
            { en: 'I have lunch at noon with my team.', es: 'Almuerzo al mediodía con mi equipo.' },
            { en: 'In the evening, I cook dinner and watch TV. I go to bed at eleven.', es: 'En la noche cocino y veo televisión. Me acuesto a las once.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Mila', texto: 'What time do you get up?' },
        { hablante: 'Hugo', texto: 'I get up at six on weekdays.' },
        { hablante: 'Mila', texto: 'And your wife?' },
        { hablante: 'Hugo', texto: 'She gets up at five. She starts work very early.' },
        { hablante: 'Mila', texto: 'Do you cook at home?' },
        { hablante: 'Hugo', texto: 'Yes, I do. I cook dinner every evening.' },
      ],
      oraciones: [
        'I get up at six every day.',
        'She gets up at five.',
        'He goes to work by bus.',
        'We have dinner at eight.',
        'I brush my teeth every morning.',
        'She cleans the house on Sundays.',
        'They watch TV in the evening.',
        'Do you work on Saturdays?',
      ],
      videos: [
        { titulo: 'Tutorial de gramática del Cevaz (1)', url: 'https://www.youtube.com/watch?v=L9AWrJnhsRI', idioma: 'en' },
        { titulo: 'Tutorial de gramática del Cevaz (2)', url: 'https://www.youtube.com/watch?v=OG3VyTSzgPI', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: 'I ___ up at six o\u2019clock.', opciones: ['get', 'gets', 'getting'], respuesta: 0 },
        { pregunta: 'She ___ breakfast at home.', opciones: ['have', 'has', 'haves'], respuesta: 1 },
        { pregunta: 'He ___ to work by bus.', opciones: ['go', 'gos', 'goes'], respuesta: 2 },
        { pregunta: 'They ___ TV in the evening.', opciones: ['watch', 'watches', 'watchs'], respuesta: 0 },
        { pregunta: 'My brother ___ his teeth after lunch.', opciones: ['brush', 'brushes', 'brushs'], respuesta: 1 },
        { pregunta: 'I ___ cook on Fridays. (negativo)', opciones: ["don't", "doesn't", 'not'], respuesta: 0 },
        { pregunta: 'She ___ clean the house on weekdays. (negativo)', opciones: ["don't", "doesn't", 'no'], respuesta: 1 },
        { pregunta: '___ you work on Sundays?', opciones: ['Do', 'Does', 'Are'], respuesta: 0 },
        { pregunta: '___ she take a nap?', opciones: ['Do', 'Does', 'Is'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL?', opciones: ['He gets up early.', 'She works at a bank.', 'He cook dinner.'], respuesta: 2 },
        { pregunta: 'Traducción de "Ella se viste en la mañana.":', opciones: ['She gets dressed in the morning.', 'She get dressed in the morning.', 'She is dressed morning.'], respuesta: 0 },
        { pregunta: '— Does he watch TV? — No, he ___.', opciones: ["doesn't", "don't", "isn't"], respuesta: 0 },
        { pregunta: 'Con "doesn\u2019t", el verbo…', opciones: ['pierde la -s', 'lleva -s', 'va en pasado'], respuesta: 0 },
        { pregunta: 'After work, I ___ back home and ___ dinner.', opciones: ['go / cook', 'goes / cooks', 'going / cooking'], respuesta: 0 },
      ],
    },
    {
      nombre: 'La hora (What time is it?)',
      nivel: 'A2',
      notas: '',
      curiosidades: [
        'o\u2019clock es la abreviatura de "of the clock" (del reloj). Solo se usa con horas en punto: five o\u2019clock, nunca five thirty o\u2019clock.',
        'En EE. UU. casi no se usa el reloj de 24 horas: las 18:00 son 6 pm. El formato de 24 horas se llama "military time" porque lo usan los militares.',
        'a quarter = un cuarto (15 minutos) y half = media (30). Igualito al español: y cuarto, y media.',
      ],
      explicacion: [
        {
          titulo: 'Preguntar y decir la hora',
          contenido:
            'La pregunta: What time is it? Se responde con It\u2019s…\nIt\u2019s four o\u2019clock (en punto) · It\u2019s five thirty / half past five (y media) · It\u2019s six fifteen / a quarter after six (y cuarto) · It\u2019s five forty-five / a quarter to six (un cuarto para las seis).',
          ejemplos: [
            { en: '— What time is it? — It\u2019s half past five.', es: '— ¿Qué hora es? — Son las cinco y media.' },
            { en: 'It\u2019s a quarter after six.', es: 'Son las seis y cuarto.' },
          ],
        },
        {
          titulo: 'am, pm y las partes del día',
          contenido:
            'am = de medianoche a mediodía · pm = de mediodía a medianoche.\n6:00 am es en la mañana; 6:00 pm es en la tarde-noche.\nnoon = mediodía · midnight = medianoche.',
          ejemplos: [
            { en: 'I start work at 8:00 am.', es: 'Empiezo a trabajar a las 8 de la mañana.' },
            { en: 'The movie is at 9 pm.', es: 'La película es a las 9 de la noche.' },
          ],
        },
        {
          titulo: 'Preguntar por la rutina: What time do you…?',
          contenido:
            'Para la rutina se combina la hora con el presente simple:\nWhat time do you get up? — I get up at six.\nWhat time does she start work? — She starts at nine.',
          ejemplos: [
            { en: '— What time do you go to bed? — At eleven.', es: '— ¿A qué hora te acuestas? — A las once.' },
            { en: 'What time does the bus arrive?', es: '¿A qué hora llega el autobús?' },
          ],
        },
        {
          titulo: 'El reloj en 4 jugadas',
          contenido:
            'Toda hora se dice con una de estas 4 piezas: o\u2019clock (en punto), half past (y media), a quarter after (y cuarto), a quarter to (cuarto para). Si dudas, di los números directos: 6:45 = six forty-five. ¡También es correcto!',
          ejemplos: [
            { en: '3:00 → It\u2019s three o\u2019clock.', es: 'Son las tres en punto.' },
            { en: '3:30 → It\u2019s half past three.', es: 'Son las tres y media.' },
            { en: '3:15 → It\u2019s a quarter after three.', es: 'Son las tres y cuarto.' },
            { en: '3:45 → It\u2019s a quarter to four (three forty-five).', es: 'Es un cuarto para las cuatro.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Leo', texto: 'What time is it?' },
        { hablante: 'Ana', texto: 'It\u2019s a quarter after six.' },
        { hablante: 'Leo', texto: 'Oh no! My class starts at six thirty.' },
        { hablante: 'Ana', texto: 'What time do you usually get there?' },
        { hablante: 'Leo', texto: 'At a quarter to seven… I\u2019m always late!' },
      ],
      oraciones: [
        'What time is it?',
        'It is half past five.',
        'It is a quarter after six.',
        'I get up at six o\u2019clock.',
        'I have breakfast at eight.',
        'She starts work at nine.',
        'What time do you go to bed?',
        'The movie starts at noon.',
      ],
      videos: [
        { titulo: 'Tutorial de gramática del Cevaz (3)', url: 'https://www.youtube.com/watch?v=zNDIhOXy3IU', idioma: 'en' },
        { titulo: 'Tutorial de gramática del Cevaz (4)', url: 'https://www.youtube.com/watch?v=2UzjHbcK2Wo', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: '5:30 se dice…', opciones: ['half past five', 'five o\u2019clock', 'a quarter after five'], respuesta: 0 },
        { pregunta: '6:15 se dice…', opciones: ['a quarter to six', 'a quarter after six', 'half past six'], respuesta: 1 },
        { pregunta: '5:45 se dice…', opciones: ['a quarter to six', 'a quarter after five', 'five thirty'], respuesta: 0 },
        { pregunta: '4:00 se dice…', opciones: ['four o\u2019clock', 'four thirty', 'a quarter four'], respuesta: 0 },
        { pregunta: '"¿Qué hora es?" se pregunta…', opciones: ['What time is it?', 'What hour is?', 'How time is it?'], respuesta: 0 },
        { pregunta: 'Las 6 de la tarde son…', opciones: ['6:00 am', '6:00 pm', 'noon'], respuesta: 1 },
        { pregunta: 'El mediodía es…', opciones: ['midnight', 'noon', 'morning'], respuesta: 1 },
        { pregunta: '— What time ___ you get up? — At six.', opciones: ['do', 'does', 'is'], respuesta: 0 },
        { pregunta: '— What time ___ she start work? — At nine.', opciones: ['do', 'does', 'are'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL?', opciones: ['It\u2019s five thirty.', 'It\u2019s half past five.', 'It\u2019s five thirty o\u2019clock.'], respuesta: 2 },
        { pregunta: 'Traducción de "Me acuesto a las once.":', opciones: ['I go to bed at eleven.', 'I go to bed in eleven.', 'I sleep eleven.'], respuesta: 0 },
        { pregunta: 'It\u2019s 11:45. En palabras:', opciones: ['a quarter to twelve', 'a quarter after eleven', 'half past eleven'], respuesta: 0 },
        { pregunta: '— ___? — It\u2019s ten o\u2019clock.', opciones: ['What time is it', 'What time do you', 'When is you'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Preposiciones de tiempo: in / on / at',
      nivel: 'A2',
      notas: '',
      curiosidades: [
        'Truco de la pirámide: AT es lo más exacto (horas), ON es el día, IN es lo más grande (meses, años, estaciones).',
        'night es la excepción famosa: se dice at night, aunque morning/afternoon/evening van con in the.',
        'Con weekend, en EE. UU. dicen on the weekend y en Reino Unido at the weekend. ¡Los dos son correctos!',
      ],
      explicacion: [
        {
          titulo: 'AT: horas y momentos exactos',
          contenido:
            'at + hora exacta: at 9 o\u2019clock, at 6:15, at noon, at midnight.\nY la excepción estrella: at night.',
          ejemplos: [
            { en: 'I have breakfast at 8:00.', es: 'Desayuno a las 8.' },
            { en: 'I watch TV at night.', es: 'Veo televisión en la noche.' },
          ],
        },
        {
          titulo: 'ON: días y fechas',
          contenido:
            'on + día de la semana o fecha: on Sunday, on Mondays, on April 17, on Christmas Day, on the weekend (EE. UU.).',
          ejemplos: [
            { en: 'I clean the house on Sundays.', es: 'Limpio la casa los domingos.' },
            { en: 'Her birthday is on March 2nd.', es: 'Su cumpleaños es el 2 de marzo.' },
          ],
        },
        {
          titulo: 'IN: partes del día, meses, años y estaciones',
          contenido:
            'in + parte del día: in the morning, in the afternoon, in the evening.\nin + mes, año o estación: in June, in 2013, in winter.',
          ejemplos: [
            { en: 'I get dressed in the morning.', es: 'Me visto en la mañana.' },
            { en: 'We travel in December.', es: 'Viajamos en diciembre.' },
          ],
        },
        {
          titulo: 'La pirámide completa, de un vistazo',
          contenido:
            'AT (punta, lo exacto): at 9:00, at noon, at midnight, at night.\nON (medio, el día): on Monday, on April 17, on Christmas Day, on the weekend.\nIN (base, lo grande): in the morning/afternoon/evening, in June, in 2013, in winter.\nUna oración puede usar varias a la vez.',
          ejemplos: [
            { en: 'The class is on Monday at 7:00 in the evening.', es: 'La clase es el lunes a las 7 de la noche.' },
            { en: 'My birthday is on March 2nd.', es: 'Mi cumpleaños es el 2 de marzo.' },
            { en: 'We work in the morning and rest at night.', es: 'Trabajamos en la mañana y descansamos en la noche.' },
            { en: 'She was born in 1991, in the winter.', es: 'Ella nació en 1991, en el invierno.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Rita', texto: 'Do you work on Saturdays?' },
        { hablante: 'Omar', texto: 'Yes, but only in the morning.' },
        { hablante: 'Rita', texto: 'What time do you finish?' },
        { hablante: 'Omar', texto: 'At noon. Then I take a nap in the afternoon!' },
      ],
      oraciones: [
        'I work every day in the morning.',
        'I clean the house on Sundays.',
        'We have dinner at eight.',
        'She was born in 1991.',
        'The class is on Monday.',
        'I watch TV at night.',
        'My birthday is in June.',
        'The bus arrives at noon.',
      ],
      videos: [
        { titulo: 'Tutorial de gramática del Cevaz (5)', url: 'https://www.youtube.com/watch?v=uG5QfF9k_I0', idioma: 'en' },
        { titulo: 'Tutorial de gramática del Cevaz (6)', url: 'https://www.youtube.com/watch?v=DPYJQSA-x50', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: '___ 9 o\u2019clock', opciones: ['at', 'on', 'in'], respuesta: 0 },
        { pregunta: '___ Wednesday', opciones: ['at', 'on', 'in'], respuesta: 1 },
        { pregunta: '___ June', opciones: ['at', 'on', 'in'], respuesta: 2 },
        { pregunta: '___ the morning', opciones: ['at', 'on', 'in'], respuesta: 2 },
        { pregunta: '___ night', opciones: ['at', 'on', 'in'], respuesta: 0 },
        { pregunta: '___ 2013', opciones: ['at', 'on', 'in'], respuesta: 2 },
        { pregunta: '___ the weekend (EE. UU.)', opciones: ['at', 'on', 'in'], respuesta: 1 },
        { pregunta: '___ winter', opciones: ['at', 'on', 'in'], respuesta: 2 },
        { pregunta: '___ Christmas Day', opciones: ['at', 'on', 'in'], respuesta: 1 },
        { pregunta: '___ half past eleven', opciones: ['at', 'on', 'in'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['on Friday', 'in the evening', 'at the morning'], respuesta: 2 },
        { pregunta: 'Traducción de "Limpio la casa los domingos.":', opciones: ['I clean the house on Sundays.', 'I clean the house in Sundays.', 'I clean the house at Sundays.'], respuesta: 0 },
        { pregunta: 'I have breakfast ___ 8:00 ___ the morning.', opciones: ['at / in', 'in / at', 'on / in'], respuesta: 0 },
        { pregunta: 'Her birthday is ___ April 17.', opciones: ['at', 'on', 'in'], respuesta: 1 },
      ],
    },
    {
      nombre: 'Lugares de la ciudad y direcciones',
      nivel: 'A2',
      notas: '',
      curiosidades: [
        'get in/out es para carros y camionetas, pero get on/off es para buses, trenes, motos y bicis. La lógica: si puedes caminar dentro o montarte encima, es on.',
        'En EE. UU. se dice movie theater y parking lot; en Reino Unido, cinema y car park.',
        'U-turn se llama así porque el giro dibuja una letra U en el pavimento.',
      ],
      explicacion: [
        {
          titulo: 'Preguntar dónde queda algo',
          contenido:
            'Where is the bank? / Is there a pharmacy near here?\nPara ubicar: next to (al lado de), between (entre), opposite (enfrente de), on the corner (en la esquina).',
          ejemplos: [
            { en: 'The bank is next to the supermarket.', es: 'El banco está al lado del supermercado.' },
            { en: 'The pharmacy is between the store and the park.', es: 'La farmacia está entre la tienda y el parque.' },
          ],
        },
        {
          titulo: 'Dar direcciones con imperativos',
          contenido:
            'Las instrucciones van sin sujeto (imperativo): Go straight ahead. Turn left. Turn right. Take the second left. Go past the museum. Make a U-turn. Go back.',
          ejemplos: [
            { en: 'Go straight ahead and turn left at the traffic light.', es: 'Sigue derecho y gira a la izquierda en el semáforo.' },
            { en: 'Take the second right. The hotel is on the corner.', es: 'Toma la segunda a la derecha. El hotel está en la esquina.' },
          ],
        },
        {
          titulo: 'Subirse y bajarse: get in/out vs get on/off',
          contenido:
            'Carros, camionetas y taxis: get in / get out.\nBuses, trenes, metro, motos y bicis: get on / get off.',
          ejemplos: [
            { en: 'Get in the taxi!', es: '¡Súbete al taxi!' },
            { en: 'Get off the bus at the museum.', es: 'Bájate del autobús en el museo.' },
          ],
        },
        {
          titulo: 'Guía a alguien de principio a fin',
          contenido:
            'Una indicación real encadena 3 o 4 instrucciones. Practica dando la ruta de tu casa a un lugar que conozcas, paso a paso, como si hablaras con un turista.',
          ejemplos: [
            { en: 'Go straight ahead two blocks and turn right at the bank.', es: 'Sigue derecho dos cuadras y gira a la derecha en el banco.' },
            { en: 'Go past the supermarket. The pharmacy is next to the park.', es: 'Pasa el supermercado. La farmacia está al lado del parque.' },
            { en: 'Take bus 7, get off at the mall, and walk to the corner.', es: 'Toma el bus 7, bájate en el centro comercial y camina a la esquina.' },
            { en: 'It\u2019s opposite the train station. You can\u2019t miss it!', es: 'Está frente a la estación de tren. ¡No tiene pérdida!' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Turista', texto: 'Excuse me, where is the museum?' },
        { hablante: 'Nora', texto: 'Go straight ahead and turn left at the traffic light.' },
        { hablante: 'Turista', texto: 'Is it far?' },
        { hablante: 'Nora', texto: 'A little. You can take the bus and get off at the park.' },
        { hablante: 'Turista', texto: 'Thank you so much!' },
        { hablante: 'Nora', texto: 'You\u2019re welcome. It\u2019s opposite the art gallery.' },
      ],
      oraciones: [
        'Go straight ahead and turn left.',
        'The bank is next to the supermarket.',
        'Turn right at the traffic light.',
        'The hotel is on the corner.',
        'Get off the bus at the museum.',
        'Take the second left.',
        'The pharmacy is opposite the park.',
        'Get in the taxi, please.',
      ],
      videos: [
        { titulo: 'Tutorial de gramática del Cevaz (7)', url: 'https://www.youtube.com/watch?v=GBywlLE5-9I', idioma: 'en' },
        { titulo: 'Tutorial de gramática del Cevaz (8)', url: 'https://www.youtube.com/watch?v=hUapoBLmu3s', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: '"Gira a la izquierda" es…', opciones: ['Turn left', 'Turn right', 'Go back'], respuesta: 0 },
        { pregunta: '"Sigue derecho" es…', opciones: ['Go past', 'Go straight ahead', 'Make a U-turn'], respuesta: 1 },
        { pregunta: 'The bank is ___ the supermarket. (al lado de)', opciones: ['next to', 'between', 'opposite'], respuesta: 0 },
        { pregunta: 'The pharmacy is ___ the store and the park. (entre)', opciones: ['next to', 'between', 'on'], respuesta: 1 },
        { pregunta: 'El lugar para ver películas es…', opciones: ['library', 'movie theater', 'post office'], respuesta: 1 },
        { pregunta: 'El metro va…', opciones: ['on rails in the sky', 'underground', 'on the water'], respuesta: 1 },
        { pregunta: 'Para el bus: ___ the bus.', opciones: ['get in', 'get on', 'get up'], respuesta: 1 },
        { pregunta: 'Para un carro: ___ the car.', opciones: ['get on', 'get in', 'get off'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL?', opciones: ['Get off the bus.', 'Get out of the car.', 'Get off the car.'], respuesta: 2 },
        { pregunta: 'Esperas el bus en…', opciones: ['the bus stop', 'the parking lot', 'the bank'], respuesta: 0 },
        { pregunta: 'Traducción de "El hotel está en la esquina.":', opciones: ['The hotel is on the corner.', 'The hotel is in the corner.', 'The hotel is at corner.'], respuesta: 0 },
        { pregunta: '— Where is the library? — ___ the second right.', opciones: ['Take', 'Get', 'Go'], respuesta: 0 },
        { pregunta: 'Compras el ___ para entrar al tren.', opciones: ['ticket', 'traffic light', 'corner'], respuesta: 0 },
        { pregunta: 'Lo contrario de "turn left" es…', opciones: ['turn right', 'go back', 'go past'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Have to / has to (obligaciones)',
      nivel: 'A2',
      notas: '',
      curiosidades: [
        'have to suena como "hafta" cuando los nativos hablan rápido: I hafta go. ¡Entrena el oído!',
        'don\u2019t have to NO es prohibición: significa que no es necesario. "You don\u2019t have to cook" = puedes cocinar si quieres, pero no hace falta.',
        'La pregunta usa do/does igual que el presente simple: Do you have to work today?',
      ],
      explicacion: [
        {
          titulo: 'Obligaciones con have to',
          contenido:
            'have to + verbo = tener que hacer algo.\nI have to work. / They have to write a test. / We have to do our homework.',
          ejemplos: [
            { en: 'I have to clean the house today.', es: 'Tengo que limpiar la casa hoy.' },
            { en: 'We have to get up early.', es: 'Tenemos que levantarnos temprano.' },
          ],
        },
        {
          titulo: 'has to con he / she / it',
          contenido:
            'Con tercera persona: has to.\nShe has to clean her desk. / Andy has to help his brother.',
          ejemplos: [
            { en: 'She has to start work at eight.', es: 'Ella tiene que empezar a trabajar a las ocho.' },
            { en: 'He has to take the bus.', es: 'Él tiene que tomar el autobús.' },
          ],
        },
        {
          titulo: 'Negativo y pregunta',
          contenido:
            'No es necesario: don\u2019t / doesn\u2019t have to → You don\u2019t have to cook today.\nPregunta: Do you have to work on Sundays? / Does she have to travel?',
          ejemplos: [
            { en: 'I don\u2019t have to work on the weekend.', es: 'No tengo que trabajar el fin de semana.' },
            { en: '— Does he have to study? — Yes, he does.', es: '— ¿Él tiene que estudiar? — Sí.' },
          ],
        },
        {
          titulo: 'Tus obligaciones reales de la semana',
          contenido:
            'La forma más rápida de fijar have to es usarlo con TU semana: trabajo, casa, estudio. Arma tres obligaciones tuyas y una que NO tengas (don\u2019t have to) y repítelas.',
          ejemplos: [
            { en: 'I have to answer emails every morning.', es: 'Tengo que responder correos cada mañana.' },
            { en: 'She has to open the store at nine.', es: 'Ella tiene que abrir la tienda a las nueve.' },
            { en: 'We have to study for the Cevaz exam.', es: 'Tenemos que estudiar para el examen del Cevaz.' },
            { en: 'I don\u2019t have to work on Sundays.', es: 'No tengo que trabajar los domingos.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Eva', texto: 'Can you come to the park?' },
        { hablante: 'Dani', texto: 'No, I have to clean the house.' },
        { hablante: 'Eva', texto: 'And your sister?' },
        { hablante: 'Dani', texto: 'She has to do her homework. Maybe on Sunday!' },
      ],
      oraciones: [
        'I have to work today.',
        'She has to clean her desk.',
        'They have to write a test.',
        'We have to do our homework.',
        'He has to help his brother.',
        'I don\u2019t have to work on Sundays.',
        'Do you have to get up early?',
      ],
      videos: [
        { titulo: 'Tutorial de gramática del Cevaz (9)', url: 'https://www.youtube.com/watch?v=b-PUmI4wsg8', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: 'They ___ write a test.', opciones: ['have to', 'has to', 'having to'], respuesta: 0 },
        { pregunta: 'She ___ clean her desk.', opciones: ['have to', 'has to', 'haves to'], respuesta: 1 },
        { pregunta: 'Ken and Liz ___ learn English words.', opciones: ['have to', 'has to', 'is to'], respuesta: 0 },
        { pregunta: 'Andy ___ help his brother.', opciones: ['have to', 'has to', 'are to'], respuesta: 1 },
        { pregunta: 'We ___ do our homework.', opciones: ['have to', 'has to', 'do to'], respuesta: 0 },
        { pregunta: 'I ___ work on Sundays. (no es necesario)', opciones: ["don't have to", "doesn't have to", 'have not'], respuesta: 0 },
        { pregunta: 'He ___ cook today. (no es necesario)', opciones: ["don't have to", "doesn't have to", 'no has to'], respuesta: 1 },
        { pregunta: '___ you have to get up early?', opciones: ['Do', 'Does', 'Are'], respuesta: 0 },
        { pregunta: '___ she have to travel?', opciones: ['Do', 'Does', 'Is'], respuesta: 1 },
        { pregunta: '¿Cuál está MAL?', opciones: ['She has to study.', 'They have to work.', 'He have to go.'], respuesta: 2 },
        { pregunta: 'Traducción de "Tengo que tomar el autobús.":', opciones: ['I have to take the bus.', 'I has to take the bus.', 'I have take the bus.'], respuesta: 0 },
        { pregunta: '"You don\u2019t have to cook" significa…', opciones: ['Está prohibido cocinar', 'No es necesario cocinar', 'Debes cocinar'], respuesta: 1 },
      ],
    },
    {
      nombre: 'Pasado continuo (was / were + -ing)',
      nivel: 'B1',
      notas: '',
      curiosidades: [
        'El pasado continuo es el tiempo de las películas: pinta la escena de fondo mientras algo más pasa. Por eso abunda en cuentos y novelas.',
        'Solo hay dos formas: was (I, he, she, it) y were (you, we, they). ¡Las mismas parejas del verbo to be en pasado!',
        'Los verbos de estado casi nunca van en continuo: se dice I knew the answer, no I was knowing.',
      ],
      explicacion: [
        {
          titulo: 'Qué cuenta el pasado continuo',
          contenido:
            'Describe una acción que estaba EN PROGRESO en un momento del pasado: ayer a las 8, yo estaba estudiando.\nForma: was / were + verbo con -ing.\nI/he/she/it was working · you/we/they were working.',
          ejemplos: [
            { en: 'I was studying at the library last night.', es: 'Anoche estaba estudiando en la biblioteca.' },
            { en: 'They were climbing the mountain at noon.', es: 'Al mediodía estaban escalando la montaña.' },
          ],
        },
        {
          titulo: 'Negación y pregunta',
          contenido:
            'Negativo: wasn\u2019t / weren\u2019t + -ing → She wasn\u2019t sleeping.\nPregunta: Was she sleeping? / What were you doing at eight?\nRespuestas cortas: Yes, she was. / No, they weren\u2019t.',
          ejemplos: [
            { en: '— What were you doing at eight? — I was having dinner.', es: '— ¿Qué estabas haciendo a las ocho? — Estaba cenando.' },
            { en: 'He wasn\u2019t listening to the teacher.', es: 'Él no estaba escuchando a la profesora.' },
          ],
        },
        {
          titulo: 'Dos acciones largas a la vez: while',
          contenido:
            'Cuando dos acciones ocurrían en paralelo, las une while y ambas van en continuo:\nWhile Henry was having a drink, his wife was swimming in the sea.',
          ejemplos: [
            { en: 'While I was cooking, my kids were watching TV.', es: 'Mientras yo cocinaba, mis hijos veían televisión.' },
          ],
        },
        {
          titulo: 'Reglas del -ing y errores típicos',
          contenido:
            'Para formar el -ing: la mayoría solo agrega -ing (work → working). Si termina en e muda, se quita (make → making). Si es corta con consonante-vocal-consonante, se dobla la última (swim → swimming, run → running). Y study NO cambia la y: studying.\nErrores de hispanohablantes: (1) olvidar was/were → "I studying" ❌; (2) usar it sin sujeto → "Was raining" ❌ → It was raining ✅; (3) poner -ing en la acción corta → "when you were calling" ❌ si fue una llamada puntual.',
          ejemplos: [
            { en: 'make → making · swim → swimming · study → studying', es: 'Las tres reglas del -ing en acción.' },
            { en: 'It was raining when I got home.', es: 'Estaba lloviendo cuando llegué a casa. (it obligatorio)' },
            { en: 'I was working, not "I working".', es: 'Nunca olvides was/were antes del -ing.' },
            { en: 'At 9 pm I was driving back home.', es: 'A las 9 pm yo venía manejando a casa. (frase lista para tu examen oral)' },
            { en: 'They were living in Texas in 2020.', es: 'Ellos vivían en Texas en 2020.' },
            { en: 'What was she doing at noon? She was having lunch.', es: '¿Qué estaba haciendo ella al mediodía? Estaba almorzando.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Paula', texto: 'I called you last night, but you didn\u2019t answer.' },
        { hablante: 'Nico', texto: 'Sorry! I was studying at the library, so my phone was off.' },
        { hablante: 'Paula', texto: 'At ten o\u2019clock? Wow.' },
        { hablante: 'Nico', texto: 'Yes. While I was reading, my classmates were finishing the project.' },
      ],
      oraciones: [
        'I was studying at the library last night.',
        'They were climbing the mountain.',
        'What were you doing at eight?',
        'She was not sleeping at ten.',
        'While I was cooking, they were watching TV.',
        'He was walking in the rainforest.',
        'We were making progress.',
      ],
      videos: [
        { titulo: 'Tutorial del Cevaz Nivel 8 (1)', url: 'https://www.youtube.com/watch?v=_cSLlBMmOlw', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: 'I ___ studying at eight last night.', opciones: ['was', 'were', 'am'], respuesta: 0 },
        { pregunta: 'They ___ climbing the mountain at noon.', opciones: ['was', 'were', 'are'], respuesta: 1 },
        { pregunta: 'She ___ sleeping when I arrived.', opciones: ['was', 'were', 'is'], respuesta: 0 },
        { pregunta: 'What ___ you doing at ten?', opciones: ['was', 'were', 'did'], respuesta: 1 },
        { pregunta: 'El -ing de "swim" es…', opciones: ['swiming', 'swimming', 'swimying'], respuesta: 1 },
        { pregunta: 'He ___ listening to the teacher. (negativo)', opciones: ["wasn't", "weren't", "didn't"], respuesta: 0 },
        { pregunta: '— Was she working? — Yes, she ___.', opciones: ['was', 'were', 'did'], respuesta: 0 },
        { pregunta: 'While I was cooking, my kids ___ TV.', opciones: ['were watching', 'was watching', 'watched always'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['They were running.', 'He were sleeping.', 'I was reading.'], respuesta: 1 },
        { pregunta: 'Traducción de "Estábamos cenando a las nueve.":', opciones: ['We were having dinner at nine.', 'We was having dinner at nine.', 'We are having dinner at nine.'], respuesta: 0 },
        { pregunta: '— What were you doing? — I ___ my homework.', opciones: ['was doing', 'were doing', 'did doing'], respuesta: 0 },
        { pregunta: 'El pasado continuo se forma con…', opciones: ['was/were + -ing', 'do/does + verbo', 'have + -ed'], respuesta: 0 },
        { pregunta: 'My parents ___ traveling in December.', opciones: ['were', 'was', 'is'], respuesta: 0 },
        { pregunta: 'El -ing de "make" es…', opciones: ['makeing', 'making', 'makking'], respuesta: 1 },
        { pregunta: 'El -ing de "run" es…', opciones: ['runing', 'runnying', 'running'], respuesta: 2 },
        { pregunta: 'El -ing de "study" es…', opciones: ['studying', 'studing', 'studiing'], respuesta: 0 },
        { pregunta: '___ raining when I got home.', opciones: ['It was', 'Was', 'It were'], respuesta: 0 },
        { pregunta: 'We ___ watching the game at nine.', opciones: ['were', 'was', 'be'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['I was working.', 'I working at nine.', 'She was sleeping.'], respuesta: 1 },
      ],
    },
    {
      nombre: 'Pasado continuo vs pasado simple (when / while)',
      nivel: 'B1',
      notas: '',
      curiosidades: [
        'Truco de la foto y el flash: el pasado continuo es la foto (la escena larga) y el pasado simple es el flash (la acción corta que interrumpe).',
        'while suele ir con el continuo (while I was studying) y when con el simple (when you called). No es ley, pero es el patrón del 90% de los casos.',
        'En los exámenes del Cevaz este es EL tema estrella: casi siempre hay una oración con dos espacios, uno para cada tiempo.',
      ],
      explicacion: [
        {
          titulo: 'La escena y la interrupción',
          contenido:
            'La acción larga (escena) va en pasado continuo; la acción corta que la interrumpe va en pasado simple:\nI was studying when you called. (Estaba estudiando → escena; llamaste → interrupción.)',
          ejemplos: [
            { en: 'I was taking a shower when the phone rang.', es: 'Me estaba duchando cuando sonó el teléfono.' },
            { en: 'It started to rain while she was watering the flowers.', es: 'Empezó a llover mientras ella regaba las flores.' },
          ],
        },
        {
          titulo: 'when + simple · while + continuo',
          contenido:
            'When I opened the door, it was raining. (when + acción corta)\nWhile Henry was having a drink, his wife was swimming. (while + acciones largas)\nLa coma va cuando when/while abren la oración.',
          ejemplos: [
            { en: 'When I opened the door, it was raining.', es: 'Cuando abrí la puerta, estaba lloviendo.' },
            { en: 'He heard a loud bang while he was talking to his friend.', es: 'Oyó un estallido mientras hablaba con su amigo.' },
          ],
        },
        {
          titulo: 'Contar una anécdota completa',
          contenido:
            'Las historias mezclan los dos: el continuo pinta el fondo y el simple mueve la acción.\nI was hiking on Black Mountain. The sun was shining. Suddenly, I saw a wolf. I didn\u2019t move…',
          ejemplos: [
            { en: 'We were walking home when we ran into our teacher.', es: 'Íbamos caminando a casa cuando nos topamos con nuestra profesora.' },
          ],
        },
        {
          titulo: 'Estrategia para el examen (los dos espacios)',
          contenido:
            'Cuando el ejercicio trae DOS espacios en una oración, pregúntate: ¿cuál acción duraba (la escena) y cuál fue puntual (el flash)? La que duraba → was/were + -ing; la puntual → pasado simple.\nPistas rápidas: el verbo pegado a while casi siempre va en continuo; el verbo pegado a when casi siempre va en simple. Verbos "flash" típicos: rang, arrived, started, heard, saw, dropped, opened.\nY ojo: dos acciones largas en paralelo → las DOS en continuo (While Henry was having a drink, his wife was swimming).',
          ejemplos: [
            { en: 'The phone rang while I was cooking.', es: 'El teléfono sonó mientras yo cocinaba. (flash + escena)' },
            { en: 'When the teacher arrived, we were talking.', es: 'Cuando llegó el profesor, estábamos hablando.' },
            { en: 'She was reading when the lights went out.', es: 'Ella estaba leyendo cuando se fue la luz.' },
            { en: 'While I was waiting for the bus, I saw an accident.', es: 'Mientras esperaba el bus, vi un accidente.' },
            { en: 'He broke his leg while he was playing soccer.', es: 'Se rompió la pierna mientras jugaba fútbol.' },
            { en: 'When the movie ended, everyone was crying.', es: 'Cuando terminó la película, todos estaban llorando.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Sara', texto: 'What was the most difficult thing you did last year?' },
        { hablante: 'Beto', texto: 'Getting used to a new school. And you?' },
        { hablante: 'Sara', texto: 'Learning to swim. One day, while I was practicing, I swallowed a lot of water!' },
        { hablante: 'Beto', texto: 'What did you do?' },
        { hablante: 'Sara', texto: 'I kept on practicing. I didn\u2019t give up!' },
      ],
      oraciones: [
        'I was studying when you called.',
        'It started to rain while she was watering the flowers.',
        'When I opened the door, it was raining.',
        'He heard a loud bang while he was talking.',
        'We were walking home when we ran into our teacher.',
        'While he was taking a shower, his dogs ate his steaks.',
        'She was swimming while Henry was having a drink.',
        'Suddenly, I saw a wolf.',
      ],
      videos: [
        { titulo: 'Tutorial del Cevaz Nivel 8 (2)', url: 'https://www.youtube.com/watch?v=q4xfTdojGEM', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: 'I ___ when you called.', opciones: ['was studying', 'studied', 'study'], respuesta: 0 },
        { pregunta: 'I was studying when you ___.', opciones: ['called', 'were calling', 'call'], respuesta: 0 },
        { pregunta: 'It ___ to rain while she ___ the flowers.', opciones: ['started / was watering', 'was starting / watered', 'start / water'], respuesta: 0 },
        { pregunta: 'When I ___ the door, it was raining.', opciones: ['opened', 'was opening', 'open'], respuesta: 0 },
        { pregunta: 'While Henry ___ a drink, his wife ___ in the sea.', opciones: ['was having / was swimming', 'had / swam always', 'has / swims'], respuesta: 0 },
        { pregunta: 'He ___ a loud bang while he was talking.', opciones: ['heard', 'was hearing', 'hears'], respuesta: 0 },
        { pregunta: 'While he was taking a shower, his dogs ___ his steaks.', opciones: ['ate', 'were eat', 'eats'], respuesta: 0 },
        { pregunta: 'La acción corta que interrumpe va en…', opciones: ['pasado simple', 'pasado continuo', 'presente'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['I was reading when he arrived.', 'When he was arriving, I read.', 'While I was reading, he was cooking.'], respuesta: 1 },
        { pregunta: 'Traducción de "Me estaba duchando cuando sonó el teléfono.":', opciones: ['I was taking a shower when the phone rang.', 'I took a shower when the phone was ringing.', 'I was taking a shower when the phone was rang.'], respuesta: 0 },
        { pregunta: 'We ___ home when we ran into our teacher.', opciones: ['were walking', 'walked', 'walk'], respuesta: 0 },
        { pregunta: '___ I was practicing, I swallowed a lot of water.', opciones: ['While', 'When', 'What'], respuesta: 0 },
        { pregunta: 'Suddenly, I ___ a wolf.', opciones: ['saw', 'was seeing', 'see'], respuesta: 0 },
        { pregunta: 'El pasado continuo pinta…', opciones: ['la escena de fondo', 'la acción corta', 'el futuro'], respuesta: 0 },
        { pregunta: 'The phone ___ while I ___ dinner.', opciones: ['rang / was cooking', 'was ringing / cooked', 'ring / was cook'], respuesta: 0 },
        { pregunta: 'When the teacher ___, we ___ about the game.', opciones: ['arrived / were talking', 'was arriving / talked', 'arrive / talking'], respuesta: 0 },
        { pregunta: 'She ___ a book when the lights ___ out.', opciones: ['was reading / went', 'read / were going', 'reads / go'], respuesta: 0 },
        { pregunta: 'While I ___ for the bus, I ___ an accident.', opciones: ['was waiting / saw', 'waited / was seeing', 'wait / see'], respuesta: 0 },
        { pregunta: 'My dog ___ while I ___ a shower.', opciones: ['escaped / was taking', 'was escaping / took hard', 'escape / taking'], respuesta: 0 },
        { pregunta: 'El verbo pegado a "while" casi siempre va en…', opciones: ['pasado continuo', 'pasado simple', 'presente'], respuesta: 0 },
        { pregunta: 'We ___ at the breakfast table when the doorbell ___.', opciones: ['were sitting / rang', 'sat / was ringing', 'sitting / rang'], respuesta: 0 },
        { pregunta: 'He ___ a lot of friendly people while he ___ in California.', opciones: ['met / was working', 'was meeting / worked', 'meets / works'], respuesta: 0 },
        { pregunta: 'When they ___ the museum, the sun ___.', opciones: ['left / was shining', 'were leaving / shone', 'leave / shines'], respuesta: 0 },
        { pregunta: 'The students ___ cards when the teacher ___ in.', opciones: ['were playing / came', 'played / was coming', 'play / came'], respuesta: 0 },
        { pregunta: 'While the children ___, their parents ___ TV.', opciones: ['were sleeping / were watching', 'slept / watched suddenly', 'sleep / watch'], respuesta: 0 },
        { pregunta: 'Dos acciones largas en paralelo (con while) van…', opciones: ['las dos en pasado continuo', 'las dos en pasado simple', 'una en presente'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Too y enough (hablar de habilidades)',
      nivel: 'B1',
      notas: '',
      curiosidades: [
        'too siempre suena negativo: too hard = tan difícil que NO se puede. Si quieres decir "muy", usa very.',
        'El orden es la trampa del examen: too va ANTES del adjetivo (too hard), pero enough va DESPUÉS del adjetivo (strong enough) y ANTES del sustantivo (enough money).',
        'too y to suenan igual pero too lleva doble o, como si fuera "demasiada" o.',
      ],
      explicacion: [
        {
          titulo: 'too + adjetivo: demasiado',
          contenido:
            'too indica exceso, con idea negativa: no se puede o no conviene.\nBlack Mountain is too hard to climb. · This backpack is too heavy.',
          ejemplos: [
            { en: 'The mountain is too hard to climb.', es: 'La montaña es demasiado difícil de escalar.' },
            { en: 'It\u2019s too cold to swim today.', es: 'Hace demasiado frío para nadar hoy.' },
          ],
        },
        {
          titulo: 'adjetivo + enough: lo suficiente',
          contenido:
            'enough después del adjetivo = suficientemente:\nI\u2019m fit enough to climb. · En negativo: You\u2019re not strong enough to lift that.',
          ejemplos: [
            { en: 'Next summer, I\u2019ll be fit enough to climb the mountain.', es: 'El próximo verano estaré lo bastante en forma para escalar la montaña.' },
            { en: 'He isn\u2019t old enough to drive.', es: 'Él no tiene edad suficiente para manejar.' },
          ],
        },
        {
          titulo: 'enough + sustantivo',
          contenido:
            'Antes de un sustantivo, enough va primero: enough money, enough time, enough equipment.\nY con to + verbo se arma el patrón completo: too tired to run · strong enough to win.',
          ejemplos: [
            { en: 'We don\u2019t have enough equipment for the expedition.', es: 'No tenemos suficiente equipo para la expedición.' },
            { en: 'I just need good boots and enough water.', es: 'Solo necesito buenas botas y suficiente agua.' },
          ],
        },
        {
          titulo: 'Fórmulas listas para usar',
          contenido:
            'Memoriza las tres fórmulas y rellena los huecos:\n1) too + adjetivo + to + verbo → too tired to run, too expensive to buy, too hard to climb.\n2) (not) + adjetivo + enough + to + verbo → strong enough to win, not old enough to drive, fit enough to climb.\n3) enough + sustantivo → enough time, enough money, enough water, enough equipment.\nTruco final para el examen: si la oración suena negativa o imposible, la respuesta casi siempre es too; si habla de alcanzar o no alcanzar el requisito, es enough.',
          ejemplos: [
            { en: "I'm too busy to watch TV.", es: 'Estoy demasiado ocupado para ver televisión.' },
            { en: "She's not old enough to vote.", es: 'Ella no tiene edad suficiente para votar.' },
            { en: "We don't have enough time to visit the museum.", es: 'No tenemos tiempo suficiente para visitar el museo.' },
            { en: 'This coffee is too hot to drink.', es: 'Este café está demasiado caliente para beberlo.' },
            { en: 'There aren\u2019t enough chairs for everyone.', es: 'No hay suficientes sillas para todos.' },
            { en: 'He didn\u2019t work hard enough to pass.', es: 'No trabajó lo suficientemente duro para aprobar.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Lisa', texto: 'I want to climb Black Mountain next summer.' },
        { hablante: 'Mari', texto: 'Are you serious? It\u2019s too hard to climb!' },
        { hablante: 'Lisa', texto: 'You\u2019re right, I can\u2019t do it now. But I\u2019ll go hiking every weekend.' },
        { hablante: 'Mari', texto: 'And you\u2019re not strong enough yet…' },
        { hablante: 'Lisa', texto: 'Next summer, I\u2019ll be fit enough. I won\u2019t give up!' },
      ],
      oraciones: [
        'The mountain is too hard to climb.',
        'I am not strong enough yet.',
        'Next summer, I will be fit enough.',
        'It is too cold to swim today.',
        'We do not have enough equipment.',
        'He is not old enough to drive.',
        'I just need good boots.',
      ],
      videos: [
        { titulo: 'Tutorial del Cevaz Nivel 8 (3)', url: 'https://www.youtube.com/watch?v=7gQljxeaNuM', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: 'Black Mountain is ___ hard to climb.', opciones: ['too', 'enough', 'very enough'], respuesta: 0 },
        { pregunta: 'I\u2019m not strong ___ to climb it.', opciones: ['too', 'enough', 'much'], respuesta: 1 },
        { pregunta: 'We don\u2019t have ___ equipment.', opciones: ['enough', 'too', 'to'], respuesta: 0 },
        { pregunta: 'It\u2019s ___ cold to swim today.', opciones: ['too', 'enough', 'so much'], respuesta: 0 },
        { pregunta: 'El orden correcto es…', opciones: ['strong enough', 'enough strong', 'too strong enough'], respuesta: 0 },
        { pregunta: 'Con sustantivos: ___ money.', opciones: ['enough', 'money enough', 'too'], respuesta: 0 },
        { pregunta: 'He isn\u2019t old ___ to drive.', opciones: ['enough', 'too', 'very'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['She is fit enough.', 'She is enough fit.', 'She is too tired.'], respuesta: 1 },
        { pregunta: 'Traducción de "Estoy demasiado cansado para correr.":', opciones: ['I\u2019m too tired to run.', 'I\u2019m tired enough to run.', 'I\u2019m very tired for run.'], respuesta: 0 },
        { pregunta: '"too" da una idea…', opciones: ['negativa (exceso)', 'positiva', 'neutra'], respuesta: 0 },
        { pregunta: 'Next summer, I\u2019ll be fit ___ to climb the mountain.', opciones: ['enough', 'too', 'much'], respuesta: 0 },
        { pregunta: 'I just need good boots and ___ water.', opciones: ['enough', 'too', 'water enough'], respuesta: 0 },
        { pregunta: "I'm ___ busy to watch TV.", opciones: ['too', 'enough', 'to'], respuesta: 0 },
        { pregunta: "She's not old ___ to vote.", opciones: ['enough', 'too', 'much'], respuesta: 0 },
        { pregunta: "We don't have ___ time to visit the museum.", opciones: ['enough', 'too', 'many'], respuesta: 0 },
        { pregunta: 'This coffee is too hot ___ drink.', opciones: ['to', 'for', 'enough'], respuesta: 0 },
        { pregunta: 'La fórmula correcta es…', opciones: ['too + adjetivo + to + verbo', 'too + to + adjetivo', 'adjetivo + too + verbo'], respuesta: 0 },
        { pregunta: 'Si la oración suena a requisito que se alcanza o no, usa…', opciones: ['enough', 'too', 'very'], respuesta: 0 },
        { pregunta: "I didn't buy the car because it was ___ expensive.", opciones: ['too', 'enough', 'to'], respuesta: 0 },
        { pregunta: "He wasn't strong ___ to lift that heavy box.", opciones: ['enough', 'too', 'much'], respuesta: 0 },
        { pregunta: "There aren't ___ policemen in our town.", opciones: ['enough', 'too', 'too many'], respuesta: 0 },
        { pregunta: 'Do you have ___ information to help me?', opciones: ['enough', 'too', 'to'], respuesta: 0 },
        { pregunta: "He didn't work hard ___ to pass the exam.", opciones: ['enough', 'too', 'very'], respuesta: 0 },
        { pregunta: "My mum can't sleep because she drinks ___ much coffee.", opciones: ['too', 'enough', 'so enough'], respuesta: 0 },
        { pregunta: "She isn't old ___ to start driving.", opciones: ['enough', 'too', 'much'], respuesta: 0 },
      ],
    },
    {
      nombre: 'Phrasal verbs (desafíos y vida diaria)',
      nivel: 'B1',
      notas: '',
      curiosidades: [
        'Un phrasal verb es un verbo + partícula cuyo significado cambia por completo: give = dar, pero give up = rendirse. Hay que aprenderlos como palabras nuevas.',
        'pass away es el eufemismo educado para "morir", igual que en español decimos "falleció" en vez de "murió".',
        'get on / get off ya los conoces del transporte (A2): ¡los phrasal verbs se repiten por todos los niveles!',
      ],
      explicacion: [
        {
          titulo: 'Para no rendirse (los del esfuerzo)',
          contenido:
            'give up = rendirse · keep on = seguir intentando · put up with = aguantar con paciencia · watch out = ¡cuidado! · set out = emprender un viaje.',
          ejemplos: [
            { en: 'Don\u2019t give up! Keep on practicing.', es: '¡No te rindas! Sigue practicando.' },
            { en: 'They set out at six in the morning.', es: 'Emprendieron el viaje a las seis de la mañana.' },
          ],
        },
        {
          titulo: 'Para descubrir y encontrar',
          contenido:
            'find out = enterarse/descubrir · come across = toparse por casualidad (cosas) · run into = encontrarse por casualidad (personas) · go over = revisar con cuidado.',
          ejemplos: [
            { en: 'I ran into my old teacher at the mall.', es: 'Me topé con mi antigua profesora en el centro comercial.' },
            { en: 'Go over your answers before the exam ends.', es: 'Revisa tus respuestas antes de que termine el examen.' },
          ],
        },
        {
          titulo: 'Los de la vida diaria',
          contenido:
            'grow up = crecer · run out of = quedarse sin algo · put off = posponer · pass away = fallecer · get on / get off = subirse / bajarse (bus, tren, avión).',
          ejemplos: [
            { en: 'We ran out of water on the hill.', es: 'Nos quedamos sin agua en la colina.' },
            { en: 'Don\u2019t put off your homework until Sunday.', es: 'No pospongas tu tarea hasta el domingo.' },
          ],
        },
        {
          titulo: 'Trucos para memorizarlos',
          contenido:
            'Agrúpalos por partícula y cobran lógica: UP suele cerrar procesos (give up rendirse, grow up crecer, put up with aguantar hasta el final). OUT apunta hacia afuera o a descubrir (find out, watch out, set out, run out of, get out). OVER pasa por encima revisando (go over).\nOtro truco: crea una mini historia con varios a la vez y repítela en el shadowing: "I set out early, ran out of coffee, ran into my boss… but I didn\u2019t give up: I kept on working."',
          ejemplos: [
            { en: 'I set out early and ran out of coffee.', es: 'Salí temprano y me quedé sin café.' },
            { en: 'I ran into my boss at the pharmacy.', es: 'Me topé con mi jefe en la farmacia.' },
            { en: "I didn't give up: I kept on working.", es: 'No me rendí: seguí trabajando.' },
            { en: 'Before the test, go over the phrasal verbs.', es: 'Antes del examen, repasa los phrasal verbs.' },
            { en: 'She grew up in Maracay and set out for Texas at 25.', es: 'Creció en Maracay y partió a Texas a los 25.' },
            { en: 'Watch out! We\u2019re running out of time.', es: '¡Cuidado! Se nos acaba el tiempo.' },
          ],
        },
      ],
      dialogo: [
        { hablante: 'Omar', texto: 'I found out the exam is on Friday!' },
        { hablante: 'Rita', texto: 'Oh no. I have to go over the phrasal verbs.' },
        { hablante: 'Omar', texto: 'Don\u2019t put it off. Let\u2019s study today.' },
        { hablante: 'Rita', texto: 'OK. If we keep on practicing, we won\u2019t give up on Friday!' },
      ],
      oraciones: [
        'Don\u2019t give up! Keep on practicing.',
        'They set out at six in the morning.',
        'I ran into my old teacher.',
        'We ran out of water.',
        'Go over your answers.',
        'Don\u2019t put off your homework.',
        'Watch out! The floor is wet.',
        'I grew up in Venezuela.',
      ],
      videos: [
        { titulo: 'Tutorial del Cevaz Nivel 8 (4)', url: 'https://www.youtube.com/watch?v=WIxrIM3dGuQ', idioma: 'en' },
      ],
      ejercicios: [
        { pregunta: '"Rendirse" es…', opciones: ['give up', 'grow up', 'get up'], respuesta: 0 },
        { pregunta: '"Emprender un viaje" es…', opciones: ['set out', 'put off', 'find out'], respuesta: 0 },
        { pregunta: 'We ___ water. ¡No queda nada! (quedarse sin)', opciones: ['ran out of', 'ran into', 'put up with'], respuesta: 0 },
        { pregunta: 'I ___ my old teacher at the mall. (por casualidad)', opciones: ['ran into', 'ran out of', 'grew up'], respuesta: 0 },
        { pregunta: '"Revisar con cuidado" es…', opciones: ['go over', 'get over', 'go out'], respuesta: 0 },
        { pregunta: '"Posponer" es…', opciones: ['put off', 'put up with', 'put on'], respuesta: 0 },
        { pregunta: '"Enterarse / descubrir" es…', opciones: ['find out', 'watch out', 'get off'], respuesta: 0 },
        { pregunta: 'I can\u2019t ___ this noise! (aguantar)', opciones: ['put up with', 'put off', 'keep on'], respuesta: 0 },
        { pregunta: '___! The floor is wet. (¡cuidado!)', opciones: ['Watch out', 'Find out', 'Set out'], respuesta: 0 },
        { pregunta: 'Para el bus: ___ the bus en tu parada. (bajarse)', opciones: ['get off', 'get on', 'get in'], respuesta: 0 },
        { pregunta: '¿Cuál está MAL?', opciones: ['Don\u2019t give up.', 'Keep on practicing.', 'He passed off last year.'], respuesta: 2 },
        { pregunta: 'Traducción de "Crecí en Venezuela.":', opciones: ['I grew up in Venezuela.', 'I grow up in Venezuela.', 'I got up in Venezuela.'], respuesta: 0 },
        { pregunta: 'My grandfather ___ last year. (falleció, forma suave)', opciones: ['passed away', 'passed out', 'put off'], respuesta: 0 },
        { pregunta: 'I ___ an old photo while I was cleaning. (me topé con)', opciones: ['came across', 'came back', 'kept on'], respuesta: 0 },
        { pregunta: 'We ___ early for the beach. (emprendimos el viaje)', opciones: ['set out', 'set off the table', 'put off'], respuesta: 0 },
        { pregunta: 'My car ___ gas on the highway.', opciones: ['ran out of', 'ran into', 'came across'], respuesta: 0 },
        { pregunta: 'She ___ in Killeen, Texas. (creció)', opciones: ['grew up', 'got up', 'gave up'], respuesta: 0 },
        { pregunta: 'They ___ the meeting until Friday. (pospusieron)', opciones: ['put off', 'put up with', 'passed away'], respuesta: 0 },
        { pregunta: 'How did you ___ about the party? (enterarte)', opciones: ['find out', 'watch out', 'go over'], respuesta: 0 },
        { pregunta: 'UP suele indicar…', opciones: ['cerrar o completar un proceso', 'ir hacia abajo', 'el futuro'], respuesta: 0 },
        { pregunta: 'To accept someone or something unpleasant in a patient way:', opciones: ['put up with', 'put off', 'give up'], respuesta: 0 },
        { pregunta: 'To check something carefully:', opciones: ['go over', 'get on', 'grow up'], respuesta: 0 },
        { pregunta: 'To get into a bus, plane, or train:', opciones: ['get on', 'get off', 'get out'], respuesta: 0 },
        { pregunta: "To die (used to avoid saying 'die'):", opciones: ['pass away', 'run out', 'set out'], respuesta: 0 },
        { pregunta: 'To get or discover information about something:', opciones: ['find out', 'watch out', 'keep on'], respuesta: 0 },
        { pregunta: 'To persist, continue:', opciones: ['keep on', 'give up', 'put off'], respuesta: 0 },
        { pregunta: 'To have no more of something:', opciones: ['run out of', 'run into', 'go over'], respuesta: 0 },
        { pregunta: 'The process of going from childhood to adulthood:', opciones: ['grow up', 'get up', 'set out'], respuesta: 0 },
        { pregunta: 'To begin a journey:', opciones: ['set out', 'find out', 'watch out'], respuesta: 0 },
        { pregunta: 'Used to leave a bus, plane, or train:', opciones: ['get off', 'get on', 'get in'], respuesta: 0 },
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
    {
      titulo: 'A Busy Monday',
      nivel: 'A2',
      parrafos: [
        'Rosa gets up at five thirty every Monday. She takes a shower, gets dressed and has breakfast at six: coffee and bread. Her husband gets up later, at a quarter after six, because he starts work at nine.',
        'At half past six, Rosa goes to the bus stop next to the pharmacy. She gets on the bus and reads on her phone. She starts work at eight o\u2019clock.',
        'Today she has to clean the office kitchen and answer many emails. She doesn\u2019t have lunch at noon; she has lunch at one, in the park opposite her office.',
        'In the evening, she goes back home, cooks dinner and watches TV with her husband. She goes to bed at ten. On Mondays, Rosa doesn\u2019t take a nap… but she dreams about Sunday!',
      ],
      glosario: [
        { en: 'busy', es: 'ocupado / ajetreado' },
        { en: 'later', es: 'más tarde' },
        { en: 'reads on her phone', es: 'lee en su teléfono' },
        { en: 'answer emails', es: 'responder correos' },
        { en: 'dreams about', es: 'sueña con' },
      ],
      preguntas: [
        { pregunta: 'What time does Rosa get up on Mondays?', opciones: ['At five thirty', 'At six fifteen', 'At nine'], respuesta: 0 },
        { pregunta: 'Where is the bus stop?', opciones: ['Next to the pharmacy', 'Opposite the park', 'On the corner of her street'], respuesta: 0 },
        { pregunta: 'What does she have to do today?', opciones: ['Cook dinner at work', 'Clean the office kitchen and answer emails', 'Take a nap'], respuesta: 1 },
        { pregunta: 'What time does she have lunch?', opciones: ['At noon', 'At one', 'At half past six'], respuesta: 1 },
        { pregunta: 'Her husband starts work at…', opciones: ['eight', 'nine', 'ten'], respuesta: 1 },
      ],
    },
    {
      titulo: 'The Way to the Museum',
      nivel: 'A2',
      parrafos: [
        'Tom is a tourist. He wants to visit the city museum, but he doesn\u2019t have a map. He goes to the tourist office next to the train station.',
        '"Excuse me, where is the museum?" he asks. The woman smiles: "Go straight ahead, turn left at the traffic light, and go past the supermarket. The museum is on the corner, opposite the art gallery."',
        'Tom walks and walks… and turns right at the traffic light! Now he is at the bus station. A driver helps him: "Get on bus number 7 and get off at the park. The museum is between the park and the library."',
        'At eleven o\u2019clock, Tom finally gets to the museum. The ticket costs five dollars. "Next time," he thinks, "I have to turn LEFT!"',
      ],
      glosario: [
        { en: 'tourist', es: 'turista' },
        { en: 'map', es: 'mapa' },
        { en: 'smiles', es: 'sonríe' },
        { en: 'driver', es: 'conductor' },
        { en: 'costs', es: 'cuesta' },
        { en: 'finally', es: 'por fin' },
      ],
      preguntas: [
        { pregunta: 'Where is the tourist office?', opciones: ['Next to the train station', 'Opposite the museum', 'Between the park and the library'], respuesta: 0 },
        { pregunta: 'What is Tom\u2019s mistake?', opciones: ['He turns right instead of left', 'He takes the wrong bus', 'He goes to the pharmacy'], respuesta: 0 },
        { pregunta: 'Where does the driver tell him to get off?', opciones: ['At the park', 'At the supermarket', 'At the hotel'], respuesta: 0 },
        { pregunta: 'Where is the museum?', opciones: ['Between the park and the library', 'Next to the bus station', 'Opposite the supermarket'], respuesta: 0 },
        { pregunta: 'What time does Tom get to the museum?', opciones: ['At eleven', 'At seven', 'At noon'], respuesta: 0 },
      ],
    },
    {
      titulo: 'The Storm on Black Mountain',
      nivel: 'B1',
      parrafos: [
        'Last October, my cousin Vera and I set out to climb Black Mountain. Everyone said it was too hard for beginners, but we had trained for months and we felt fit enough to try.',
        'While we were walking up the first hill, the sun was shining and the birds were singing. Then, around noon, everything changed. Dark clouds were covering the sky when we reached the waterfall, and suddenly it started to rain very hard.',
        '"Watch out!" Vera shouted. While I was crossing the rocks, I slipped and dropped my backpack into the river. We ran out of food, and my boots were full of water. I wanted to give up and go back.',
        'But Vera kept on walking and I followed her. We put up with the cold for two more hours, and at four o\u2019clock we finally reached the top. While we were taking the photo, the rain stopped and a rainbow appeared. We didn\u2019t give up — and that challenge is now our favorite story.',
      ],
      glosario: [
        { en: 'storm', es: 'tormenta' },
        { en: 'beginners', es: 'principiantes' },
        { en: 'dark clouds', es: 'nubes oscuras' },
        { en: 'shouted', es: 'gritó' },
        { en: 'slipped', es: 'me resbalé' },
        { en: 'rainbow', es: 'arcoíris' },
      ],
      preguntas: [
        { pregunta: 'Why did people say the climb was a bad idea?', opciones: ['It was too hard for beginners', 'It was too expensive', 'The mountain was closed'], respuesta: 0 },
        { pregunta: 'What was the weather like while they were walking up the first hill?', opciones: ['The sun was shining', 'It was raining', 'It was snowing'], respuesta: 0 },
        { pregunta: 'What happened while the narrator was crossing the rocks?', opciones: ['She slipped and dropped her backpack', 'She found a map', 'She ran into a friend'], respuesta: 0 },
        { pregunta: 'What did they run out of?', opciones: ['Food', 'Water', 'Time'], respuesta: 0 },
        { pregunta: 'What does the story show about challenges?', opciones: ['Keeping on matters more than perfect conditions', 'Beginners should never climb', 'Storms always ruin everything'], respuesta: 0 },
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
    { titulo: 'Video de práctica del Cevaz (1)', url: 'https://www.youtube.com/watch?v=L31ExXwlsVc', nivel: 'A2', preguntas: [] },
    { titulo: 'Video de práctica del Cevaz (2)', url: 'https://www.youtube.com/watch?v=ncYGofl_tdM', nivel: 'A2', preguntas: [] },
    { titulo: 'Video de práctica del Cevaz (3)', url: 'https://www.youtube.com/watch?v=v035HQHtnrs', nivel: 'A2', preguntas: [] },
    { titulo: 'Clips oficiales de Disney en inglés (búsqueda en YouTube)', url: 'https://www.youtube.com/results?search_query=disney+official+movie+clips+english', nivel: 'A1', preguntas: [] },
    { titulo: 'Clips oficiales de Pixar en inglés (búsqueda en YouTube)', url: 'https://www.youtube.com/results?search_query=pixar+official+movie+clips+english', nivel: 'A2', preguntas: [] },
    { titulo: 'Práctica libre C1 — British Council (audios con ejercicios)', url: 'https://learnenglish.britishcouncil.org/free-resources/listening/c1', nivel: 'C1', preguntas: [] },
    { titulo: 'Práctica libre C1 — videos de YouTube para tu nivel', url: 'https://www.youtube.com/results?search_query=english+listening+practice+c1+advanced', nivel: 'C1', preguntas: [] },
  ],
};
