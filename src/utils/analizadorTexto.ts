// Motor del Laboratorio de textos: índices de verbos, detección de tiempos
// verbales por oración y tokenización de textos en inglés.
import { VERBOS } from '../data/verbos';

interface FormaVerbo {
  base: string;
  es: string;
  forma: string;
}

export const INDICE_VERBOS = (() => {
  const indice = new Map<string, FormaVerbo>();
  const poner = (texto: string, base: string, es: string, forma: string) => {
    for (const variante of texto.toLowerCase().split('/')) {
      const limpia = variante.trim();
      if (limpia && !indice.has(limpia)) indice.set(limpia, { base, es, forma });
    }
  };
  for (const v of VERBOS) {
    poner(v.base, v.base, v.es, 'base');
    poner(v.tercera, v.base, v.es, '3ª persona');
    poner(v.gerundio, v.base, v.es, '-ing');
    // habla relajada de canciones/cómics: goin', workin'
    poner(v.gerundio.replace(/ing$/, "in'"), v.base, v.es, '-ing (relajado)');
    poner(v.pasado, v.base, v.es, 'pasado');
    poner(v.participio, v.base, v.es, 'participio');
  }
  return indice;
})();

const PASADOS = new Set(
  VERBOS.flatMap((v) => v.pasado.toLowerCase().split('/')).filter((p) => !p.endsWith('ed')),
);
const PARTICIPIOS = new Set(VERBOS.flatMap((v) => v.participio.toLowerCase().split('/')));

export const STOPWORDS = new Set(
  'the a an to of in on at and or but so if as i you he she it we they me him her them us my your his its our their this that these those there here what who when where why how not no yes just now then up down out back all any some very really there’s i’m i’ve i’ll you’re it’s don’t didn’t doesn’t can’t won’t isn’t aren’t wasn’t weren’t from with for because'.split(
    ' ',
  ),
);

interface Tiempo {
  nombre: string;
  pista: string;
  oraciones: { texto: string; resalta: string }[];
}

export function tokenizar(texto: string): string[] {
  return (texto.toLowerCase().match(/[a-z’']+/g) ?? []).map((t) =>
    t.replace(/^['’]+|['’]+$/g, ''),
  );
}

export function partirOraciones(texto: string): string[] {
  return texto
    .split(/(?<=[.!?])\s+|\n+/)
    .map((o) => o.trim())
    .filter((o) => o.length > 2);
}

function agregar(mapa: Map<string, Tiempo>, clave: string, pista: string, oracion: string, resalta: string) {
  const entrada = mapa.get(clave) ?? { nombre: clave, pista, oraciones: [] };
  if (entrada.oraciones.length < 4 && !entrada.oraciones.some((o) => o.texto === oracion)) {
    entrada.oraciones.push({ texto: oracion, resalta });
  }
  mapa.set(clave, entrada);
}

// Detecta las estructuras verbales presentes en cada oración del texto.
export function detectarTiempos(oraciones: string[]): Tiempo[] {
  const mapa = new Map<string, Tiempo>();
  for (const oracion of oraciones) {
    const baja = oracion.toLowerCase().replace(/\u2019/g, "'");
    let m: RegExpMatchArray | null;
    if ((m = baja.match(/\b(was|were)\s+(\w+(?:ing|in'))/))) {
      agregar(mapa, 'Pasado continuo', 'was/were + -ing: la escena que estaba en progreso', oracion, m[0]);
    }
    if ((m = baja.match(/\b(am|is|are|’m|’re|’s|'m|'re|'s)\s+(\w+(?:ing|in'))/))) {
      agregar(mapa, 'Presente continuo', 'be + -ing: pasa ahora mismo', oracion, m[0]);
    }
    if ((m = baja.match(/\b(going\s+to|gonna)\s+\w+/))) {
      agregar(mapa, 'Futuro con going to', 'plan decidido o algo evidente que viene', oracion, m[0]);
    }
    if ((m = baja.match(/\b(will|won't|won’t)\s+\w+|\w+[’']ll\s+\w+/))) {
      agregar(mapa, 'Futuro con will', 'predicción, promesa o decisión del momento', oracion, m[0]);
    }
    if ((m = baja.match(/\b(have|has|[’']ve)\s+(\w+)/)) && (PARTICIPIOS.has(m[2]) || m[2].endsWith('ed'))) {
      agregar(mapa, 'Presente perfecto', 'have/has + participio: pasado que toca el presente', oracion, m[0]);
    }
    if ((m = baja.match(/\bhad\s+(\w+)/)) && (PARTICIPIOS.has(m[1]) || m[1].endsWith('ed'))) {
      agregar(mapa, 'Pasado perfecto', 'had + participio: lo anterior a otro pasado', oracion, m[0]);
    }
    if ((m = baja.match(/\b(can|can't|can’t|could|couldn't|must|should|shouldn't|would|wouldn't|may|might)\s+\w+/))) {
      agregar(mapa, 'Modales', 'can, could, must, should…: posibilidad, consejo, obligación', oracion, m[0]);
    }
    // pasado simple: un token de la lista de pasados irregulares o -ed suelto
    for (const token of tokenizar(oracion)) {
      if (PASADOS.has(token) || (token.endsWith('ed') && INDICE_VERBOS.get(token)?.forma === 'pasado')) {
        if (!baja.match(new RegExp(`\\b(have|has|had|[’']ve)\\s+${token}`))) {
          agregar(mapa, 'Pasado simple', 'acción terminada en el pasado', oracion, token);
          break;
        }
      }
    }
    // presente simple: do/does o una 3ª persona conocida
    if ((m = baja.match(/\b(do|does|don't|don’t|doesn't|doesn’t)\b/))) {
      agregar(mapa, 'Presente simple', 'hábitos y verdades generales', oracion, m[0]);
    } else {
      for (const token of tokenizar(oracion)) {
        const info = INDICE_VERBOS.get(token);
        if (info && info.forma === '3ª persona' && token !== 'is' && token !== 'has') {
          agregar(mapa, 'Presente simple', 'hábitos y verdades generales', oracion, token);
          break;
        }
      }
    }
  }
  return [...mapa.values()].sort((a, b) => b.oraciones.length - a.oraciones.length);
}

