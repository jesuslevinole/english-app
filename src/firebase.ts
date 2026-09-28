import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { initializeFirestore, persistentLocalCache } from 'firebase/firestore';

// Config web de Firebase. Estos valores son públicos por diseño (van en el
// bundle del navegador); la seguridad real vive en las reglas de Firestore.
const firebaseConfig = {
  apiKey: 'AIzaSyA_Ba_K4BVCdl6jMY_h7QR6nJnup0-u7FE',
  authDomain: 'english-app-c8ddd.firebaseapp.com',
  projectId: 'english-app-c8ddd',
  storageBucket: 'english-app-c8ddd.firebasestorage.app',
  messagingSenderId: '958371160944',
  appId: '1:958371160944:web:cb3988bb49864a35d0e5b5',
};

export const app = initializeApp(firebaseConfig);

// Caché local persistente (IndexedDB): las lecturas repetidas se sirven del
// dispositivo y solo se cobran los documentos nuevos/cambiados.
export const db = initializeFirestore(app, {
  localCache: persistentLocalCache(),
});

// Autenticación (correo y contraseña; se habilita en la consola de Firebase).
export const auth = getAuth(app);
