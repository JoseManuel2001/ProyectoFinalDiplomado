import './Navbar.css';
import { useAuth } from '../../components/context/AuthContext.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useGamarGo } from '../../context/GamarGoContext.jsx';

function Navbar() {
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const [menuAbierto, setMenuAbierto] = useState(false);
  const menuRef = useRef(null);
  const { bebidasFavoritas, reservaciones } = useGamarGo();

  useEffect(() => {
    const cerrarMenu = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuAbierto(false);
      }
    };

    document.addEventListener('mousedown', cerrarMenu);

    return () => {
      document.removeEventListener('mousedown', cerrarMenu);
    };
  }, []);

  const handleLogout = () => {
    cerrarSesion();
    setMenuAbierto(false);
    navigate('/login');
  };

  const obtenerIniciales = () => {
    if (!usuario) return '';

    const nombre = usuario.nombre || usuario.usuario || '';
    const palabras = nombre.trim().split(' ');

    if (palabras.length >= 2) {
      return `${palabras[0][0]}${palabras[1][0]}`.toUpperCase();
    }

    return nombre.substring(0, 2).toUpperCase();
  };

  return (
    <header className="navbar">
      <Link className="brand" to="/">
        <span className="brand-mark">☼</span>

        <span className="brand-name">
          <strong>GAMAR GO</strong>
          <small>— RESORT —</small>
        </span>
      </Link>

      <nav className="navbar-links">
        <Link className="active" to="/">
          INICIO
        </Link>

        <Link to="/clima">
          CLIMA
        </Link>

        <Link to="/bebidas">
          BAR &amp; BEBIDAS
        </Link>

        <Link to="/habitaciones">
          HABITACIONES
        </Link>

        {!usuario && (
          <Link to="/login">
            INTRANET
          </Link>
        )}
      </nav>

      {!usuario ? (
        <Link className="nav-button" to="/login">
          <span>♙</span>
          INTRANET
        </Link>
      ) : (
        <div className="user-menu-container" ref={menuRef}>
          <button
            className={`user-menu-button ${menuAbierto ? 'user-menu-button-open' : ''
              }`}
            onClick={() => setMenuAbierto(!menuAbierto)}
          >
            <span className="user-avatar">
              {obtenerIniciales()}
            </span>

            <span className="user-info">
              <strong>{usuario.nombre || usuario.usuario}</strong>
              <small>{usuario.rol || 'Usuario'}</small>
            </span>

            <span className="user-arrow">
              {menuAbierto ? '⌃' : '⌄'}
            </span>
          </button>

          {menuAbierto && (
            <div className="user-dropdown">
              <div className="dropdown-header">
                <span className="dropdown-avatar">
                  {obtenerIniciales()}
                </span>

                <div>
                  <strong>{usuario.nombre || usuario.usuario}</strong>
                  <small>{usuario.correo || usuario.usuario}</small>
                </div>
              </div>

              <div className="dropdown-divider" />

              <Link
                className="dropdown-item"
                to="/habitaciones"
                onClick={() => setMenuAbierto(false)}
              >
                <span>▱</span>
                <div>
                  <strong>Mis habitaciones</strong>
                  <small>Consultar mis habitaciones</small>
                  <span className="favoritos">
                    {reservaciones.length}{' '}
                    {reservaciones.length === 1
                      ? 'reservación'
                      : 'reservaciones'}
                  </span>
                </div>
              </Link>

              <Link
                className="dropdown-item"
                to="/mis-bebidas"
                onClick={() => setMenuAbierto(false)}
              >
                <span>♜</span>
                <div>
                  <strong>Mis bebidas</strong>
                  <small>Consulta mis bebidas</small>
                  <span className="favoritos">
                      {bebidasFavoritas.length}{' '}
                      {bebidasFavoritas.length === 1
                        ? 'favorito'
                        : 'favoritos'}
                  </span>
                </div>
              </Link>

              <div className="dropdown-divider" />

              <button
                className="dropdown-item logout-item"
                onClick={handleLogout}
              >
                <span>↪</span>
                <div>
                  <strong>Cerrar sesión</strong>
                  <small>Salir de tu cuenta</small>
                </div>
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;