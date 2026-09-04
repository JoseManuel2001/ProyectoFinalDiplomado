import './Footer.css';

function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand"><h3>GAMAR GO</h3><span>— RESORT —</span><p>Tu destino comienza aquí.</p></div>
        <div className="footer-column"><h4>NAVEGACIÓN</h4><a href="/">Inicio</a><a href="/clima">Clima</a><a href="/bebidas">Bar &amp; Bebidas</a><a href="/habitaciones">Habitaciones</a></div>
        <div className="footer-column"><h4>CONTACTO</h4><a href="tel:+527221234567">+52 722 123 4567</a><a href="mailto:info@gamargo.com">info@gamargo.com</a><a href="/">Carretera al Paraíso Km 10</a></div>
        <div className="footer-column"><h4>INFORMACIÓN</h4><a href="/">Sobre nosotros</a><a href="/">Términos y condiciones</a><a href="/">Políticas de privacidad</a><a href="/">FAQ</a></div>
        <div className="footer-column"><h4>HORARIO</h4><a href="/">Recepción 24/7</a><a href="/">Check in: 15:00 hrs</a><a href="/">Check out: 12:00 hrs</a></div>
      </div>
      <div className="footer-bottom">© 2026 GAMAR GO Resort. Todos los derechos reservados.</div>
    </footer>
  );
}
export default Footer;
