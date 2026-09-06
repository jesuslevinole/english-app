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
// Carga las lecciones de src/data/nivel1.ts en un solo batch (solo
// escrituras). Es segura de repetir: no duplica lo que ya existe —
// categorías y palabras se agregan solo si faltan (por nombre/término), y
// los temas y recursos de listening con el mismo nombre se ACTUALIZAN con
// la versión nueva (así una semilla vieja se convierte en lecciones).
import { writeBatch } from 'firebase/firestore';
import { SEMILLA_NIVEL1 } from '../data/nivel1';
import type { Categoria, Palabra, RecursoListening, TemaGramatica } from '../types';

interface DatosExistentes {
  categorias: Categoria[];
  palabras: Palabra[];
  temas: TemaGramatica[];
  recursos: RecursoListening[];
}

export async function sembrarNivel1(existentes: DatosExistentes): Promise<void> {
  const lote = writeBatch(db);

  const clave = (t: string) => t.trim().toLowerCase();
  const categoriasPorNombre = new Map(existentes.categorias.map((c) => [clave(c.nombre), c]));
  const terminosExistentes = new Set(existentes.palabras.map((p) => clave(p.termino)));
  const temasPorNombre = new Map(existentes.temas.map((t) => [clave(t.nombre), t]));
  const recursosPorTitulo = new Map(existentes.recursos.map((r) => [clave(r.titulo), r]));

  for (const cat of SEMILLA_NIVEL1.categorias) {
    let idCategoria = categoriasPorNombre.get(clave(cat.nombre))?.id;
    if (!idCategoria) {
      const refCat = doc(collection(db, 'categorias'));
      lote.set(refCat, { nombre: cat.nombre, color: cat.color });
      idCategoria = refCat.id;
    }
    for (const p of cat.palabras) {
      if (terminosExistentes.has(clave(p.termino))) continue;
      const refPal = doc(collection(db, 'palabras'));
      lote.set(refPal, {
        termino: p.termino,
        significado: p.significado,
        categoriaId: idCategoria,
        creadaEn: Date.now(),
      });
    }
  }

  for (const t of SEMILLA_NIVEL1.temas) {
    const existente = temasPorNombre.get(clave(t.nombre));
    const ref = existente ? doc(db, 'temas', existente.id) : doc(collection(db, 'temas'));
    lote.set(ref, t);
  }

  for (const r of SEMILLA_NIVEL1.listening) {
    const existente = recursosPorTitulo.get(clave(r.titulo));
    const ref = existente ? doc(db, 'listening', existente.id) : doc(collection(db, 'listening'));
    lote.set(ref, r);
  }

  await lote.commit();
  for (const nombre of ['categorias', 'palabras', 'temas', 'listening']) invalidar(nombre);
}
