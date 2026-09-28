import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import type { Personaje } from '../types';

// Estrategia para ahorrar lecturas de Firestore:
// 1. Cada colección se lee UNA vez por sesión (getDocs) y se cachea en
//    sessionStorage con un TTL — recargar la página dentro del TTL no vuelve
//    a leer de la red.
// 2. Las mutaciones actualizan el estado de React localmente en App.tsx
//    (nunca se re-fetchea la colección tras crear/editar/borrar).
// 3. persistentLocalCache en firebase.ts hace que, aun cuando el TTL expira,
//    Firestore sirva del caché del dispositivo lo que no cambió.

const TTL_MS = 10 * 60 * 1000; // 10 minutos

interface Cacheado<T> {
  t: number;
  datos: T[];
}

export async function cargarColeccion<T>(nombre: string): Promise<T[]> {
  const clave = `aula-crear:${nombre}`;
  const bruto = sessionStorage.getItem(clave);
  if (bruto) {
    try {
      const cache = JSON.parse(bruto) as Cacheado<T>;
      if (Date.now() - cache.t < TTL_MS) return cache.datos;
    } catch {
      sessionStorage.removeItem(clave); // caché corrupta: se descarta
    }
  }
  const snap = await getDocs(collection(db, nombre));
  const datos = snap.docs.map((d) => ({ id: d.id, ...d.data() })) as T[];
  sessionStorage.setItem(clave, JSON.stringify({ t: Date.now(), datos } satisfies Cacheado<T>));
  return datos;
}

function invalidar(nombre: string) {
  sessionStorage.removeItem(`aula-crear:${nombre}`);
}

export async function crearDocumento(nombre: string, datos: object): Promise<string> {
  const ref = await addDoc(collection(db, nombre), datos);
  invalidar(nombre);
  return ref.id;
}

export async function actualizarDocumento(nombre: string, id: string, datos: object): Promise<void> {
  await updateDoc(doc(db, nombre, id), datos);
  invalidar(nombre);
}

export async function borrarDocumento(nombre: string, id: string): Promise<void> {
  await deleteDoc(doc(db, nombre, id));
  invalidar(nombre);
}

// El personaje vive en un único documento fijo: progreso/personaje (1 lectura).
const REF_PERSONAJE = ['progreso', 'personaje'] as const;

// Personaje por usuario: progreso/{uid}. La primera vez que entra el admin,
// hereda el personaje de la versión monousuario (progreso/personaje) para no
// perder el XP acumulado.
export async function cargarPersonaje(
  uid: string,
  nombre: string,
  heredarViejo: boolean,
): Promise<Personaje> {
  const ref = doc(db, 'progreso', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as Personaje;

  let inicial: Personaje = {
    nombre,
    emoji: '🦉',
    color: '#1f7a4d',
    xp: 0,
    diario: {},
  };
  if (heredarViejo) {
    const anterior = await getDoc(doc(db, ...REF_PERSONAJE));
    if (anterior.exists()) inicial = { ...(anterior.data() as Personaje), nombre };
  }
  await setDoc(ref, inicial);
  return inicial;
}

export async function guardarPersonaje(uid: string, personaje: Personaje): Promise<void> {
  await setDoc(doc(db, 'progreso', uid), personaje);
}

// ── Semilla del Nivel 1 ──────────────────────────────
// Carga el contenido de src/data/nivel1.ts en un solo batch de escrituras
// (0 lecturas). Es idempotente:
// - categorías y palabras que ya existen (mismo nombre/término) se saltan;
// - temas y recursos con el mismo nombre/título se ACTUALIZAN en el mismo
//   documento (así una versión nueva de la semilla enriquece lo ya cargado
//   sin duplicarlo).
import { writeBatch } from 'firebase/firestore';
import { SEMILLA_NIVEL1 } from '../data/nivel1';
import type { Categoria, Cuento, Palabra, RecursoListening, TemaGramatica } from '../types';

export interface EstadoActual {
  categorias: Categoria[];
  palabras: Palabra[];
  temas: TemaGramatica[];
  recursos: RecursoListening[];
  cuentos: Cuento[];
}

// Solo lo creado o actualizado por la semilla (para mezclar con el estado).
export interface ResultadoSemilla {
  categorias: Categoria[];
  palabras: Palabra[];
  temas: TemaGramatica[];
  recursos: RecursoListening[];
  cuentos: Cuento[];
}

export async function sembrarNivel1(actual: EstadoActual): Promise<ResultadoSemilla> {
  const lote = writeBatch(db);
  const categorias: Categoria[] = [];
  const palabras: Palabra[] = [];
  const temas: TemaGramatica[] = [];
  const recursos: RecursoListening[] = [];
  const cuentos: Cuento[] = [];

  for (const cat of SEMILLA_NIVEL1.categorias) {
    const existente = actual.categorias.find((c) => c.nombre === cat.nombre);
    let idCategoria: string;
    if (existente) {
      idCategoria = existente.id;
    } else {
      const ref = doc(collection(db, 'categorias'));
      const datos = { nombre: cat.nombre, color: cat.color };
      lote.set(ref, datos);
      categorias.push({ id: ref.id, ...datos });
      idCategoria = ref.id;
    }
    for (const p of cat.palabras) {
      if (actual.palabras.some((x) => x.termino === p.termino)) continue;
      const ref = doc(collection(db, 'palabras'));
      const datos = {
        termino: p.termino,
        significado: p.significado,
        categoriaId: idCategoria,
        creadaEn: Date.now(),
      };
      lote.set(ref, datos);
      palabras.push({ id: ref.id, ...datos });
    }
  }

  for (const t of SEMILLA_NIVEL1.temas) {
    const existente = actual.temas.find((x) => x.nombre === t.nombre);
    const ref = existente ? doc(db, 'temas', existente.id) : doc(collection(db, 'temas'));
    lote.set(ref, t);
    temas.push({ id: ref.id, ...t });
  }

  for (const r of SEMILLA_NIVEL1.listening) {
    const existente = actual.recursos.find((x) => x.titulo === r.titulo);
    const ref = existente ? doc(db, 'listening', existente.id) : doc(collection(db, 'listening'));
    lote.set(ref, r);
    recursos.push({ id: ref.id, ...r });
  }

  for (const cu of SEMILLA_NIVEL1.cuentos) {
    const existente = actual.cuentos.find((x) => x.titulo === cu.titulo);
    const ref = existente ? doc(db, 'cuentos', existente.id) : doc(collection(db, 'cuentos'));
    lote.set(ref, cu);
    cuentos.push({ id: ref.id, ...cu });
  }

  await lote.commit();
  for (const nombre of ['categorias', 'palabras', 'temas', 'listening', 'cuentos']) invalidar(nombre);
  return { categorias, palabras, temas, recursos, cuentos };
}
