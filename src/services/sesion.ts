// Sesión y cuentas: Firebase Auth (correo/contraseña) + colección usuarios.
// La PRIMERA cuenta registrada queda como admin; las demás, como estudiante
// (el admin puede cambiar roles en la vista Usuarios).
import { getApps, initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth';
import { collection, doc, getDoc, getDocs, setDoc, updateDoc } from 'firebase/firestore';
import { auth, db, firebaseConfig } from '../firebase';
import type { ModuloApp, RolUsuario, Usuario } from '../types';

export function observarSesion(alCambiar: (uid: string | null) => void): () => void {
  return onAuthStateChanged(auth, (u) => alCambiar(u ? u.uid : null));
}

export async function entrar(correo: string, clave: string): Promise<void> {
  // trim + minúsculas: los teclados móviles meten espacios y mayúsculas solos
  await signInWithEmailAndPassword(auth, correo.trim().toLowerCase(), clave);
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

// Crea una cuenta nueva SIN cerrar la sesión del admin: usa una instancia
// secundaria de Firebase Auth con contraseña aleatoria y envía al correo el
// enlace para que la persona establezca la suya (plantilla de restablecer).
export async function crearUsuarioInvitado(
  nombre: string,
  correo: string,
  rol: RolUsuario,
): Promise<Usuario> {
  const secundaria =
    getApps().find((a) => a.name === 'secundaria') ?? initializeApp(firebaseConfig, 'secundaria');
  const authSecundaria = getAuth(secundaria);
  const claveTemporal = crypto.randomUUID();
  const credencial = await createUserWithEmailAndPassword(
    authSecundaria,
    correo.trim(),
    claveTemporal,
  );
  const datos: Omit<Usuario, 'id'> = {
    nombre: nombre.trim(),
    correo: correo.trim(),
    rol,
    creadoEn: Date.now(),
  };
  // El doc lo escribe el ADMIN desde su sesión principal (regla esAdmin)
  await setDoc(doc(db, 'usuarios', credencial.user.uid), datos);
  await signOut(authSecundaria);
  await sendPasswordResetEmail(auth, correo.trim());
  return { id: credencial.user.uid, ...datos };
}

// Reenvía la invitación (enlace para establecer contraseña), las veces que haga falta.
export async function reenviarInvitacion(correo: string): Promise<void> {
  await sendPasswordResetEmail(auth, correo.trim());
}

// Guarda qué módulos puede ver un usuario (ausente = todos).
export async function guardarModulos(uid: string, modulos: ModuloApp[]): Promise<void> {
  await updateDoc(doc(db, 'usuarios', uid), { modulos });
}

export async function cambiarRol(uid: string, rol: RolUsuario): Promise<void> {
  await updateDoc(doc(db, 'usuarios', uid), { rol });
}

// Mensajes de error de Auth en español
// Envía el correo de Firebase para restablecer la contraseña.
export async function recuperarContrasena(correo: string): Promise<void> {
  await sendPasswordResetEmail(auth, correo.trim());
}

export function mensajeErrorSesion(error: unknown): string {
  const codigo = (error as { code?: string }).code ?? '';
  if (
    codigo.includes('invalid-credential') ||
    codigo.includes('wrong-password') ||
    codigo.includes('user-not-found')
  ) {
    return 'Correo o contraseña incorrectos. Si te invitaron al aula y aún no creaste tu contraseña, toca "¿Olvidaste tu contraseña?" para establecerla con tu correo.';
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
