import './Navbar.css';

function Navbar() {
  return (
    <header className="navbar">
      <a className="brand" href="/">
        <span className="brand-mark">☼</span>
        <span><strong>GAMAR GO</strong><small>— RESORT —</small></span>
      </a>
      <nav>
        <a className="active" href="/">INICIO</a>
        <a href="/clima">CLIMA</a>
        <a href="/bebidas">BAR &amp; BEBIDAS</a>
        <a href="/habitaciones">HABITACIONES</a>
        <a href="/intranet">INTRANET</a>
      </nav>
      <a className="nav-button" href="/intranet">♙ &nbsp; INTRANET</a>
    </header>
  );
}
export default Navbar;
