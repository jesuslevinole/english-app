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

export async function cargarPersonaje(): Promise<Personaje> {
  const ref = doc(db, ...REF_PERSONAJE);
  const snap = await getDoc(ref);
  if (snap.exists()) return snap.data() as Personaje;
  const inicial: Personaje = {
    nombre: 'Estudiante',
    emoji: '🦉',
    color: '#1f7a4d',
    xp: 0,
    diario: {},
  };
  await setDoc(ref, inicial);
  return inicial;
}

export async function guardarPersonaje(personaje: Personaje): Promise<void> {
  await setDoc(doc(db, ...REF_PERSONAJE), personaje);
}

// ── Semilla del Nivel 1 ──────────────────────────────
// Carga todo el contenido de src/data/nivel1.ts en un solo batch
// (1 escritura por documento, 0 lecturas) y devuelve los objetos con
// sus ids para actualizar el estado de React sin re-fetchear.
import { writeBatch } from 'firebase/firestore';
import { SEMILLA_NIVEL1 } from '../data/nivel1';
import type { Categoria, Palabra, RecursoListening, TemaGramatica } from '../types';

export interface ResultadoSemilla {
  categorias: Categoria[];
  palabras: Palabra[];
  temas: TemaGramatica[];
  recursos: RecursoListening[];
}

export async function sembrarNivel1(): Promise<ResultadoSemilla> {
  const lote = writeBatch(db);
  const categorias: Categoria[] = [];
  const palabras: Palabra[] = [];
  const temas: TemaGramatica[] = [];
  const recursos: RecursoListening[] = [];

  for (const cat of SEMILLA_NIVEL1.categorias) {
    const refCat = doc(collection(db, 'categorias'));
    const datosCat = { nombre: cat.nombre, color: cat.color };
    lote.set(refCat, datosCat);
    categorias.push({ id: refCat.id, ...datosCat });
    for (const p of cat.palabras) {
      const refPal = doc(collection(db, 'palabras'));
      const datosPal = {
        termino: p.termino,
        significado: p.significado,
        categoriaId: refCat.id,
        creadaEn: Date.now(),
      };
      lote.set(refPal, datosPal);
      palabras.push({ id: refPal.id, ...datosPal });
    }
  }

  for (const t of SEMILLA_NIVEL1.temas) {
    const refTema = doc(collection(db, 'temas'));
    lote.set(refTema, t);
    temas.push({ id: refTema.id, ...t });
  }

  for (const r of SEMILLA_NIVEL1.listening) {
    const refRec = doc(collection(db, 'listening'));
    lote.set(refRec, r);
    recursos.push({ id: refRec.id, ...r });
  }

  await lote.commit();
  for (const nombre of ['categorias', 'palabras', 'temas', 'listening']) invalidar(nombre);
  return { categorias, palabras, temas, recursos };
}
