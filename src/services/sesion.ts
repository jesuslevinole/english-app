// Sesión y cuentas: Firebase Auth (correo/contraseña) + colección usuarios.
// La PRIMERA cuenta registrada queda como admin; las demás, como estudiante
// (el admin puede cambiar roles en la vista Usuarios).
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import type { RolUsuario, Usuario } from '../types';

export function observarSesion(alCambiar: (uid: string | null) => void): () => void {
  return onAuthStateChanged(auth, (u) => alCambiar(u ? u.uid : null));
}

export async function entrar(correo: string, clave: string): Promise<void> {
  await signInWithEmailAndPassword(auth, correo.trim(), clave);
}

export async function registrar(correo: string, clave: string, nombre: string): Promise<void> {
  // Una lectura pequeña solo al registrar: si no hay usuarios, este es el admin.
  const existentes = await getDocs(collection(db, 'usuarios'));
  const credencial = await createUserWithEmailAndPassword(auth, correo.trim(), clave);
  const datos: Omit<Usuario, 'id'> = {
    nombre: nombre.trim(),
    correo: correo.trim(),
    rol: existentes.empty ? 'admin' : 'estudiante',
    creadoEn: Date.now(),
  };
  await setDoc(doc(db, 'usuarios', credencial.user.uid), datos);
}

export async function salir(): Promise<void> {
  await signOut(auth);
}

export async function cargarUsuario(uid: string): Promise<Usuario> {
  const ref = doc(db, 'usuarios', uid);
  const snap = await getDoc(ref);
  if (snap.exists()) return { id: uid, ...(snap.data() as Omit<Usuario, 'id'>) };
  // Cuenta de Auth sin documento (caso raro): se crea como estudiante.
  const datos: Omit<Usuario, 'id'> = {
    nombre: auth.currentUser?.email?.split('@')[0] ?? 'Estudiante',
    correo: auth.currentUser?.email ?? '',
    rol: 'estudiante',
    creadoEn: Date.now(),
  };
  await setDoc(ref, datos);
  return { id: uid, ...datos };
}

export async function cargarUsuarios(): Promise<Usuario[]> {
  const snap = await getDocs(collection(db, 'usuarios'));
  return snap.docs
    .map((d) => ({ id: d.id, ...(d.data() as Omit<Usuario, 'id'>) }))
    .sort((a, b) => a.creadoEn - b.creadoEn);
}

export async function cambiarRol(uid: string, rol: RolUsuario): Promise<void> {
  await updateDoc(doc(db, 'usuarios', uid), { rol });
}

// Mensajes de error de Auth en español
export function mensajeErrorSesion(error: unknown): string {
  const codigo = (error as { code?: string }).code ?? '';
  if (
    codigo.includes('invalid-credential') ||
    codigo.includes('wrong-password') ||
    codigo.includes('user-not-found')
  ) {
    return 'Correo o contraseña incorrectos.';
  }
  if (codigo.includes('email-already-in-use')) return 'Ese correo ya tiene una cuenta. Prueba entrar.';
  if (codigo.includes('weak-password')) return 'La contraseña debe tener al menos 6 caracteres.';
  if (codigo.includes('invalid-email')) return 'Ese correo no parece válido.';
  if (codigo.includes('too-many-requests')) return 'Demasiados intentos. Espera un momento y vuelve a probar.';
  if (codigo.includes('network')) return 'Sin conexión. Revisa tu internet e intenta de nuevo.';
  if (codigo.includes('operation-not-allowed')) {
    return 'Falta habilitar el acceso con correo/contraseña en la consola de Firebase (Authentication).';
  }
  return 'No se pudo completar. Intenta de nuevo.';
}
