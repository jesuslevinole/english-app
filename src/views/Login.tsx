import { useState } from 'react';
import { LogIn, UserPlus } from 'lucide-react';
import { entrar, mensajeErrorSesion, registrar, recuperarContrasena } from '../services/sesion';
import { MASCOTAS } from '../data/mascotas';
import GatoSuerte from '../components/GatoSuerte';
import './Login.css';

type Modo = 'entrar' | 'registro';

// Pantalla de entrada: Hoot (el búho de la app) da la bienvenida.
// Al entrar o registrarse, App detecta la sesión con observarSesion.
export default function Login() {
  const [modo, setModo] = useState<Modo>('entrar');
  const [nombre, setNombre] = useState('');
  const [correo, setCorreo] = useState('');
  const [clave, setClave] = useState('');
  const [ocupado, setOcupado] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);

  async function olvidoContrasena() {
    setError(null);
    setAviso(null);
    if (!correo.trim()) {
      setError('Escribe tu correo arriba y vuelve a tocar el enlace.');
      return;
    }
    try {
      await recuperarContrasena(correo);
      setAviso(
        'Si ese correo está registrado, te llegará un enlace para cambiar la contraseña. Revisa también la carpeta de spam.',
      );
    } catch (e) {
      setError(mensajeErrorSesion(e));
    }
  }

  const puedeEnviar =
    correo.trim() !== '' && clave !== '' && (modo === 'entrar' || nombre.trim() !== '');

  async function enviar() {
    if (!puedeEnviar || ocupado) return;
    setOcupado(true);
    setError(null);
    setAviso(null);
    try {
      if (modo === 'entrar') {
        await entrar(correo, clave);
      } else {
        await registrar(correo, clave, nombre);
      }
    } catch (e: unknown) {
      setError(mensajeErrorSesion(e));
      setOcupado(false);
    }
  }

  return (
    <div className="login">
      <div className="login-marca">
        <img
          className="login-logo"
          src="/logo.svg"
          alt={`${MASCOTAS.buho}, el búho de Aula Crear`}
        />
        <h1 className="login-titulo">Aula Crear</h1>
        <p className="login-burbuja">
          {modo === 'entrar'
            ? `¡Hola! Soy ${MASCOTAS.buho}, tu profe búho. ¡Qué bueno verte de nuevo!`
            : `¡Hola! Soy ${MASCOTAS.buho}, tu profe búho. Crea tu cuenta y empecemos a aprender inglés.`}
        </p>
      </div>

      <div className="tarjeta login-tarjeta">
        {modo === 'registro' && (
          <div className="campo">
            <label htmlFor="login-nombre">Tu nombre</label>
            <input
              id="login-nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="¿Cómo te llamas?"
              autoComplete="name"
            />
          </div>
        )}
        <div className="campo">
          <label htmlFor="login-correo">Correo</label>
          <input
            id="login-correo"
            type="email"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            placeholder="tucorreo@ejemplo.com"
            autoComplete="email"
            autoCapitalize="none"
          />
        </div>
        <div className="campo">
          <label htmlFor="login-clave">Contraseña</label>
          <input
            id="login-clave"
            type="password"
            value={clave}
            onChange={(e) => setClave(e.target.value)}
            placeholder="Mínimo 6 caracteres"
            autoComplete={modo === 'entrar' ? 'current-password' : 'new-password'}
            onKeyDown={(e) => {
              if (e.key === 'Enter') void enviar();
            }}
          />
        </div>

        {modo === 'entrar' && (
          <button className="login-olvido" onClick={() => void olvidoContrasena()}>
            ¿Olvidaste tu contraseña?
          </button>
        )}

        {error && <p className="login-error">{error}</p>}
        {aviso && <p className="login-aviso">{aviso}</p>}

        <button className="btn-primario" onClick={() => void enviar()} disabled={!puedeEnviar || ocupado}>
          {modo === 'entrar' ? <LogIn size={18} /> : <UserPlus size={18} />}
          {ocupado ? 'Un momento…' : modo === 'entrar' ? 'Entrar' : 'Crear cuenta'}
        </button>

        <p className="texto-suave login-cambio">
          {modo === 'entrar' ? '¿Primera vez aquí?' : '¿Ya tienes cuenta?'}{' '}
          <button
            className="btn-icono"
            onClick={() => {
              setModo(modo === 'entrar' ? 'registro' : 'entrar');
              setError(null);
            }}
          >
            {modo === 'entrar' ? 'Crear cuenta' : 'Entrar'}
          </button>
        </p>
      </div>

      <div className="login-gato">
        <GatoSuerte mensaje="Good luck!" />
      </div>
    </div>
  );
}
