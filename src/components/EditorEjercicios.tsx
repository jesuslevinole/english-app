import { useState } from 'react';
import { Plus, Trash2 } from 'lucide-react';
import type { Ejercicio } from '../types';
import './EditorEjercicios.css';

interface Props {
  valor: Ejercicio[];
  onCambiar: (ejercicios: Ejercicio[]) => void;
}

// Constructor de ejercicios de opción múltiple, compartido por los
// formularios de Gramática y de Listening.
export default function EditorEjercicios({ valor, onCambiar }: Props) {
  const [pregunta, setPregunta] = useState('');
  const [opciones, setOpciones] = useState(['', '', '']);
  const [respuesta, setRespuesta] = useState(0);

  const opcionesValidas = opciones.filter((o) => o.trim() !== '');
  const puedeAgregar = pregunta.trim() !== '' && opcionesValidas.length >= 2;

  function cambiarOpcion(indice: number, texto: string) {
    setOpciones(opciones.map((o, i) => (i === indice ? texto : o)));
  }

  function agregar() {
    if (!puedeAgregar) return;
    const nueva: Ejercicio = {
      pregunta: pregunta.trim(),
      opciones: opcionesValidas,
      // si la opción marcada quedó vacía y se filtró, cae a la primera válida
      respuesta: Math.min(respuesta, opcionesValidas.length - 1),
    };
    onCambiar([...valor, nueva]);
    setPregunta('');
    setOpciones(['', '', '']);
    setRespuesta(0);
  }

  function quitar(ejercicio: Ejercicio) {
    onCambiar(valor.filter((e) => e !== ejercicio));
  }

  return (
    <div className="editor-ejercicios">
      {valor.length > 0 && (
        <ul>
          {valor.map((e) => (
            <li key={e.pregunta} className="ejercicio-guardado">
              <span>{e.pregunta}</span>
              <button
                type="button"
                className="btn-icono btn-peligro"
                onClick={() => quitar(e)}
                aria-label={`Quitar ejercicio: ${e.pregunta}`}
              >
                <Trash2 size={18} />
              </button>
            </li>
          ))}
        </ul>
      )}

      <div className="campo">
        <label htmlFor="ejercicio-pregunta">Pregunta</label>
        <input
          id="ejercicio-pregunta"
          value={pregunta}
          onChange={(e) => setPregunta(e.target.value)}
          placeholder="She ___ to school every day."
        />
      </div>

      <div>
        <label>Opciones (marca la correcta)</label>
        {opciones.map((texto, i) => (
          <div key={i} className="editor-opcion">
            <input
              type="radio"
              name="respuesta-correcta"
              checked={respuesta === i}
              onChange={() => setRespuesta(i)}
              aria-label={`Marcar opción ${i + 1} como correcta`}
            />
            <input
              value={texto}
              onChange={(e) => cambiarOpcion(i, e.target.value)}
              placeholder={`Opción ${i + 1}`}
            />
          </div>
        ))}
        <p className="editor-nota texto-suave">Mínimo 2 opciones con texto.</p>
      </div>

      <button type="button" className="btn-contorno" onClick={agregar} disabled={!puedeAgregar}>
        <Plus size={18} />
        Agregar ejercicio
      </button>
    </div>
  );
}
