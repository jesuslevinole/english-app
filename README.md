# Aula Crear 🦉

App personal para practicar inglés: vocabulario por categorías con juego de
tarjetas, gramática con ejercicios y videos recomendados de YouTube (EN/ES),
listening con preguntas de comprensión, y avance tipo juego de rol con un
personaje personalizable y misiones diarias que escalan con tu nivel.

Stack: React 18 + TypeScript + Vite + Firebase (Firestore) + ESLint.

## Correr en local

```bash
npm install
npm run dev
```

## Verificaciones

```bash
npm run lint
npx tsc --noEmit -p tsconfig.app.json
npm run build
```

## Desplegar en Cloudflare Pages

Opción A — conectado a GitHub (recomendada):
1. Sube el repo a GitHub.
2. En Cloudflare → Workers & Pages → Create → Pages → conecta el repo.
3. Framework preset: **Vite**. Build command: `npm run build`. Output: `dist`
   (el `wrangler.jsonc` ya lo declara).
4. Cada push a `main` despliega solo.

Opción B — directo desde tu máquina:

```bash
npm run build
npx wrangler pages deploy
```

## Firebase

- La config web está en `src/firebase.ts` (esos valores son públicos por
  diseño; van en el bundle).
- **Pendiente importante:** las reglas actuales (`firestore.rules`) están
  abiertas — cualquiera que descubra el projectId puede leer/escribir.
  Para uso personal está bien mientras no compartas la URL; cuando quieras
  cerrarla, activa Firebase Auth (Google o Anonymous) y cambia la regla a
  `allow read, write: if request.auth != null;`.

### Ahorro de lecturas (cuota gratuita)

1. `persistentLocalCache` (IndexedDB): Firestore sirve del caché del
   dispositivo lo que no cambió.
2. Cada colección se lee **una vez por sesión** con `getDocs` y se cachea en
   `sessionStorage` con TTL de 10 min (`src/services/datos.ts`) — recargar la
   página no vuelve a leer.
3. Las mutaciones actualizan el estado de React localmente en `App.tsx`;
   nunca se re-fetchea una colección tras crear/editar/borrar.
4. No hay listeners `onSnapshot`: al ser una app de un solo usuario no hace
   falta tiempo real, y así no se consumen lecturas de fondo.

## Estructura

- `src/types/index.ts` — tipos canónicos (única fuente).
- `src/services/datos.ts` — acceso a Firestore + caché.
- `src/components/` — `Modal`, `Cuestionario` (quiz compartido por Gramática
  y Listening), `EditorEjercicios` (constructor de preguntas compartido),
  `Encabezado`, `NavInferior`.
- `src/views/` — `Inicio` (personaje + misiones), `Vocabulario` (categorías,
  palabras y juego de tarjetas), `Gramatica`, `Listening`.
- Cada componente tiene su `.css` hermano; lo compartido vive en
  `src/index.css` / `src/App.css`.
