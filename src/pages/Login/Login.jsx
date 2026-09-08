import { useState } from 'react';
import './Login.css';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../components/context/AuthContext.jsx';

function Login() {
  const [usuario, setUsuario] = useState('');
  const [password, setPassword] = useState('');
  const [mostrarPassword, setMostrarPassword] = useState(false);
  const [recordarme, setRecordarme] = useState(false);
  const [error, setError] = useState('');
  const [cargando, setCargando] = useState(false);
  const navigate = useNavigate();
  const { iniciarSesion } =  useAuth();

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Intentando iniciar sesión con:', usuario, password);

    setError('');
    setCargando(true);

    // Simulamos una pequeña validación
    setTimeout(() => {

      const resultado = iniciarSesion(usuario, password);

      if (!resultado.success) {
        setError(resultado.message);
        setCargando(false);
        return;
      }

      setCargando(false);

      // Por ahora mostramos un mensaje.
      // Después lo conectaremos con la página Intranet.
      alert(`¡Bienvenido, ${usuario}!`);

      // Cuando tengas React Router:
       navigate('/');
    }, 500);
  };

  return (
    <main className="login-page">

      {/* =========================================
          IMAGEN IZQUIERDA
      ========================================= */}

      <section className="login-image">
        <div className="login-overlay">

          <span className="login-eyebrow">
            BIENVENIDO DE NUEVO
          </span>

          <h1>GAMAR GO</h1>

          <div className="login-script">
            Resort
          </div>

          <div className="login-line" />

          <p>
            Accede a tu cuenta y continúa
            <br />
            viviendo la experiencia.
          </p>

          <span className="login-quote">
            “Más que un destino,
            <br />
            es una experiencia.”
          </span>

        </div>
      </section>


      {/* =========================================
          PANEL DERECHO
      ========================================= */}
      <section className="login-form-section">
        <div className="login-card">

          {/* LOGO */}
          <div className="login-logo">
            <span>☼</span>
            <div>
              <strong>GAMAR GO</strong>
              <small>— RESORT —</small>
            </div>
          </div>

          {/* TITULO */}
          <h2>
            Iniciar sesión
          </h2>
          <div className="login-title-line" />
          <p className="login-description">
            Accede a la plataforma interna de
            <br />
            GAMAR GO Resort
          </p>
          {/* FORMULARIO */}
          <form onSubmit={handleSubmit}>
            {/* USUARIO */}
            <div className="input-group">
              <label htmlFor="usuario">
                Usuario
              </label>
              <div className="input-wrapper">
                <span>♙</span>
                <input
                  id="usuario"
                  type="text"
                  placeholder="Ingresa tu usuario"
                  value={usuario}
                  onChange={(event) => {
                    setUsuario(event.target.value);
                    setError('');
                  }}
                  autoComplete="username"
                  required
                />
              </div>
            </div>

            {/* CONTRASEÑA */}
            <div className="input-group">
              <label htmlFor="password">
                Contraseña
              </label>
              <div className="input-wrapper">
                <span>▣</span>
                <input
                  id="password"
                  type={mostrarPassword ? 'text' : 'password'}
                  placeholder="Ingresa tu contraseña"
                  value={password}
                  onChange={(event) => {
                    setPassword(event.target.value);
                    setError('');
                  }}
                  autoComplete="current-password"
                  required
                />
                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setMostrarPassword(!mostrarPassword)
                  }
                  aria-label={
                    mostrarPassword
                      ? 'Ocultar contraseña'
                      : 'Mostrar contraseña'
                  }
                >
                  {mostrarPassword ? '◉' : '◌'}
                </button>
              </div>
            </div>
            {/* MENSAJE DE ERROR */}
            {error && (
              <p className="login-error">
                {error}
              </p>
            )}

            {/* OPCIONES */}
            <div className="login-options">
              <label>
                <input
                  type="checkbox"
                  checked={recordarme}
                  onChange={(event) =>
                    setRecordarme(event.target.checked)
                  }
                />
                <span>
                  Recordarme
                </span>
              </label>
              <a
                href="/"
                onClick={(event) => {
                  event.preventDefault();
                  alert('Funcionalidad próximamente');
                }}
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>
            {/* BOTON INICIAR SESION */}
            <button
              type="submit"
              className="login-button"
              disabled={cargando}
            >
              {cargando
                ? 'Validando...'
                : 'Iniciar sesión'}
              <span>→</span>
            </button>
            {/* DIVISOR */}
            <div className="login-divider">
              <span />
              <b>o</b>
              <span />
            </div>
            {/* MICROSOFT */}
            <button
              type="button"
              className="microsoft-button"
              onClick={() =>
                alert(
                  'Próximamente: inicio de sesión con Microsoft'
                )
              }
            >
              <span>▦</span>
              Iniciar sesión con Microsoft
            </button>
          </form>

          {/* FOOTER DEL LOGIN */}
          <div className="login-footer">
            <span>♙</span>
            Acceso exclusivo para visitantes registrados.
          </div>
        </div>
      </section>
    </main>
  );
}
export default Login;