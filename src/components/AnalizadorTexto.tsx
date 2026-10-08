import { useMemo, useState } from 'react';
import { ArrowLeft, Copy, FlaskConical, Sparkles } from 'lucide-react';
import type { Palabra } from '../types';
import {
  INDICE_VERBOS,
  STOPWORDS,
  detectarTiempos,
  partirOraciones,
  tokenizar,
} from '../utils/analizadorTexto';
import { EXPRESIONES } from '../data/expresiones';
import BuhoGuia from './BuhoGuia';
import './AnalizadorTexto.css';

interface Props {
  palabras: Palabra[];
  // XP por analizar un texto nuevo
  onAnalizado: () => void;
  onSalir: () => void;
}

function Resaltada({ texto, resalta }: { texto: string; resalta: string }) {
  const indice = texto.toLowerCase().indexOf(resalta.toLowerCase());
  if (indice < 0) return <>{texto}</>;
  return (
    <>
      {texto.slice(0, indice)}
      <mark>{texto.slice(indice, indice + resalta.length)}</mark>
      {texto.slice(indice + resalta.length)}
    </>
  );
}

// Laboratorio de textos: pega un cómic, una canción o un artículo y la app
// lo desarma gramaticalmente con el material del aula.
export default function AnalizadorTexto({ palabras, onAnalizado, onSalir }: Props) {
  const [texto, setTexto] = useState('');
  const [analizado, setAnalizado] = useState<string | null>(null);
  const [copiado, setCopiado] = useState(false);

  const resultado = useMemo(() => {
    if (!analizado) return null;
    const oraciones = partirOraciones(analizado);
    const tokens = tokenizar(analizado);
    const tiempos = detectarTiempos(oraciones);

    // verbos del entrenador presentes en el texto
    const verbos = new Map<string, { es: string; formas: Set<string>; veces: number }>();
    for (const token of tokens) {
      const info = INDICE_VERBOS.get(token);
      if (!info) continue;
      const entrada = verbos.get(info.base) ?? { es: info.es, formas: new Set<string>(), veces: 0 };
      entrada.formas.add(info.forma === 'base' ? token : `${token} (${info.forma})`);
      entrada.veces += 1;
      verbos.set(info.base, entrada);
    }

    // expresiones cotidianas presentes
    const baja = analizado.toLowerCase().replace(/\u2019/g, "'");
    const expresiones = EXPRESIONES.filter((e) => baja.includes(e.frase.toLowerCase())).map((e) => ({
      ...e,
      oracion: oraciones.find((o) => o.toLowerCase().includes(e.frase.toLowerCase())) ?? '',
    }));

    // vocabulario: lo que ya conoces vs lo nuevo
    const conocidas = palabras.filter((p) => baja.includes(p.termino.toLowerCase()));
    const terminosConocidos = new Set(conocidas.map((p) => p.termino.toLowerCase()));
    const frecuencia = new Map<string, number>();
    for (const token of tokens) {
      if (token.length < 3 || STOPWORDS.has(token) || INDICE_VERBOS.has(token)) continue;
      if (terminosConocidos.has(token)) continue;
      frecuencia.set(token, (frecuencia.get(token) ?? 0) + 1);
    }
    const nuevas = [...frecuencia.entries()]
      .sort((a, b) => b[1] - a[1] || b[0].length - a[0].length)
      .slice(0, 18)
      .map(([palabra]) => palabra);

    return { oraciones, tokens, tiempos, verbos, expresiones, conocidas, nuevas };
  }, [analizado, palabras]);

  function analizar() {
    const limpio = texto.trim();
    if (limpio.length < 20 || limpio === analizado) return;
    setAnalizado(limpio);
    setCopiado(false);
    onAnalizado();
  }

  async function copiarNuevas() {
    if (!resultado) return;
    try {
      await navigator.clipboard.writeText(resultado.nuevas.join(', '));
      setCopiado(true);
    } catch {
      setCopiado(false);
    }
  }

  return (
    <div className="laboratorio">
      <div className="titulo-seccion">
        <h2>
          <FlaskConical size={20} /> Laboratorio de textos
        </h2>
        <button className="btn-contorno" onClick={onSalir}>
          <ArrowLeft size={18} />
          Lectura
        </button>
      </div>

      <BuhoGuia
        curiosidades={[]}
        fallback="Pega aquí lo que estés leyendo o escuchando en inglés: los diálogos de un cómic, la letra de una canción, un artículo. Lo desarmo en tiempos verbales, verbos de tu tabla, expresiones de la calle y vocabulario nuevo para ti."
      />

      <textarea
        className="laboratorio-entrada"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder={'Pega el texto en inglés aquí…\n\nEjemplo: I was working when you called me. Don’t give up!'}
      />
      <button className="btn-primario" onClick={analizar} disabled={texto.trim().length < 20}>
        <Sparkles size={18} />
        Analizar texto
      </button>

      {resultado && (
        <>
          <section className="tarjeta lab-resumen">
            <span className="lab-dato">
              <strong>{resultado.tokens.length}</strong>
              <span>palabras</span>
            </span>
            <span className="lab-dato">
              <strong>{resultado.oraciones.length}</strong>
              <span>oraciones</span>
            </span>
            <span className="lab-dato">
              <strong>{resultado.verbos.size}</strong>
              <span>verbos de tu tabla</span>
            </span>
            <span className="lab-dato">
              <strong>{resultado.conocidas.length}</strong>
              <span>palabras que ya estudias</span>
            </span>
          </section>

          {resultado.tiempos.length > 0 && (
            <section className="tarjeta">
              <h3>Tiempos verbales encontrados</h3>
              {resultado.tiempos.map((t) => (
                <div key={t.nombre} className="lab-tiempo">
                  <p>
                    <strong>{t.nombre}</strong> <span className="texto-suave">— {t.pista}</span>
                  </p>
                  {t.oraciones.map((o) => (
                    <p key={o.texto} className="lab-oracion">
                      <Resaltada texto={o.texto} resalta={o.resalta} />
                    </p>
                  ))}
                </div>
              ))}
            </section>
          )}

          {resultado.expresiones.length > 0 && (
            <section className="tarjeta">
              <h3>Expresiones cotidianas</h3>
              <div className="lab-expresiones">
                {resultado.expresiones.map((e) => (
                  <div key={e.frase} className="lab-verbo-fila">
                    <span className="lab-verbo-forma">{e.frase}</span>
                    <span className="texto-suave">= {e.es}</span>
                    {e.registro !== 'neutral' && (
                      <span className={`lab-registro ${e.registro}`}>{e.registro}</span>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {resultado.verbos.size > 0 && (
            <section className="tarjeta">
              <h3>Verbos de tu tabla en acción</h3>
              <div className="lab-verbos-lista">
                {[...resultado.verbos.entries()]
                  .sort((a, b) => b[1].veces - a[1].veces)
                  .slice(0, 20)
                  .map(([base, info]) => (
                    <div key={base} className="lab-verbo-fila">
                      <span className="lab-verbo-forma">{[...info.formas].join(', ')}</span>
                      <span className="texto-suave">
                        → {base} ({info.es})
                      </span>
                    </div>
                  ))}
              </div>
            </section>
          )}

          <section className="tarjeta">
            <h3>Vocabulario nuevo para ti ({resultado.nuevas.length})</h3>
            {resultado.nuevas.length === 0 ? (
              <p className="texto-suave">¡Nada nuevo: este texto ya es tuyo! 🏆</p>
            ) : (
              <>
                <p className="texto-suave">
                  Toca una palabra para ver su significado y agrégala a tu Vocabulario con “Nueva
                  palabra”.
                </p>
                <div className="lab-chips-nuevas">
                  {resultado.nuevas.map((p) => (
                    <a
                      key={p}
                      className="chip"
                      href={`https://www.wordreference.com/es/translation.asp?tranword=${encodeURIComponent(p)}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {p}
                    </a>
                  ))}
                </div>
                <button className="btn-contorno" onClick={() => void copiarNuevas()}>
                  <Copy size={16} />
                  {copiado ? '¡Lista copiada!' : 'Copiar lista'}
                </button>
              </>
            )}
          </section>
        </>
      )}
    </div>
  );
}
