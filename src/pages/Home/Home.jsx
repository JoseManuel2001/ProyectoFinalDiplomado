 import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import habitaciones from '../../data/habitaciones.json';
import './Home.css';
import { useState, useEffect } from 'react';

const services = [
  {
    icon: '☼',
    title: 'Clima en vivo',
    description: 'Consulta el clima de cualquier ciudad.',
    link: '/clima',
    action: 'Ver clima',
  },
  {
    icon: '♜',
    title: 'Bar Aurea',
    description: 'Descubre bebidas únicas y su preparación.',
    link: '/bebidas',
    action: 'Explorar bebidas',
  },
  {
    icon: '▱',
    title: 'Habitaciones',
    description: 'Encuentra tu habitación ideal para una estancia inolvidable.',
    link: '/habitaciones',
    action: 'Ver habitaciones',
  },
  {
    icon: '♙',
    title: 'Intranet',
    description: 'Acceso exclusivo para visitantes registrados.',
    link: '/intranet',
    action: 'Iniciar sesión',
  },
];

const rooms = [
  {
    name: 'Deluxe Twin',
    image: 'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=900&q=85',
    tag: 'CON BALCÓN',
    guests: '2 huéspedes',
    beds: '2 camas individuales',
  },
  {
    name: 'Premium King',
    image: 'https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=900&q=85',
    tag: 'MÁS POPULAR',
    guests: '3 huéspedes',
    beds: '1 cama King Size',
  },
  {
    name: 'Suite Familiar',
    image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=900&q=85',
    tag: 'FAMILIAR',
    guests: '4 huéspedes',
    beds: '2 camas matrimoniales',
  },
];

const drinks = [
  ['Margarita Clásica', '4 ingredientes', 'https://images.unsplash.com/photo-1556855810-ac404aa91e85?auto=format&fit=crop&w=600&q=85'],
  ['Mojito Tropical', '5 ingredientes', 'https://images.unsplash.com/photo-1551538827-9c037cb4f32a?auto=format&fit=crop&w=600&q=85'],
  ['Piña Colada', '5 ingredientes', 'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?auto=format&fit=crop&w=600&q=85'],
  ['Sunset Spritz', '4 ingredientes', 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=85'],
  ['Blue Ocean', '4 ingredientes', 'https://images.unsplash.com/photo-1536935338788-846bb9981813?auto=format&fit=crop&w=600&q=85'],
];

function Home() {

  useEffect(() => {
    // Simulación de carga de datos desde un archivo JSON
    const cargarDatos = async () => {
      try {
        // Aquí podrías hacer una solicitud fetch si los datos estuvieran en un servidor
        // const response = await fetch('/data/habitaciones.json');
        // const data = await response.json();
        // setRooms(data);
        console.log('Datos de habitaciones cargados:', habitaciones);
      } catch (error) {
        console.error('Error al cargar los datos de habitaciones:', error);
      }
    };

    cargarDatos();
  }, []);

  return (
    <main className="home">
      <section className="hero">
        <Navbar />
        <div className="hero-content">
          <span className="eyebrow">TU ESCAPADA PERFECTA</span>
          <h1>GAMAR GO</h1>
          <div className="script-title">Resort</div>
          <div className="hero-line" />
          <h2>Tu destino comienza aquí.</h2>
          <p>
            Vive experiencias únicas donde el confort,<br />
            la naturaleza y el lujo se encuentran<br />
            para crear momentos inolvidables.
          </p>
          <a className="primary-button" href="/habitaciones">
            EXPLORAR RESORT <span>→</span>
          </a>
        </div>
        <div className="hero-bottom-wave" />
      </section>

      <section className="quick-access">
        {services.map((service) => (
          <a className="quick-item" href={service.link} key={service.title}>
            <span className="quick-icon">{service.icon}</span>
            <span>
              <strong>{service.title}</strong>
              <small>{service.description}</small>
            </span>
          </a>
        ))}
      </section>

      <section className="services-section page-section">
        <div className="center-heading">
          <span className="section-eyebrow">TODO LO QUE NECESITAS</span>
          <h2>Explora nuestros servicios</h2>
          <i />
        </div>
        <div className="service-grid">
          {services.map((service) => (
            <a className="service-card" href={service.link} key={service.title}>
              <span className="service-card-icon">{service.icon}</span>
              <h3>{service.title.replace(' en vivo', '')}</h3>
              <p>{service.description}</p>
              <span className="card-link">{service.action} <b>→</b></span>
            </a>
          ))}
        </div>
      </section>

      <section className="rooms-section page-section">
        <div className="section-top">
          <div>
            <span className="section-eyebrow">HABITACIONES DESTACADAS</span>
            <h2>Elige tu próxima experiencia</h2>
          </div>
          <div className="slider-buttons"><button>‹</button><button>›</button></div>
        </div>
        <div className="rooms-grid">
          {habitaciones.map((room) => (
            <article className="room-card" key={room.numero}>
              <div className="room-image" style={{ backgroundImage: `url(${room.imagen})` }}>
                <span className="room-tag">{room.balcon}</span>
                <button className="favorite">♡</button>
              </div>
              <div className="room-body">
                <h3>{room.name}</h3>
                <div className="room-meta"><span>♙ {room.numeroHuespedesMaximo}</span><span>▱ {room.tipoCama}</span></div>
                <a href="/habitaciones">Ver detalles <b>→</b></a>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="drinks-section page-section">
        <div className="section-top">
          <div>
            <span className="section-eyebrow">BAR AUREA</span>
            <h2>Sabores que elevan tu experiencia</h2>
          </div>
          <a className="all-link" href="/bebidas">Ver todas las bebidas →</a>
        </div>
        <div className="drinks-grid">
          {drinks.map(([name, ingredients, image]) => (
            <a className="drink-card" href="/bebidas" key={name} style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.82), rgba(0,0,0,.05) 75%), url(${image})` }}>
              <div><h3>{name}</h3><span>♧ &nbsp;{ingredients}</span></div>
            </a>
          ))}
        </div>
      </section>

      <section className="newsletter">
        <div className="newsletter-icon">✉</div>
        <div><span>OFERTAS EXCLUSIVAS</span><h2>Únete y recibe beneficios</h2><p>Suscríbete a nuestro newsletter y recibe promociones especiales para tu próxima visita.</p></div>
        <form onSubmit={(event) => event.preventDefault()}><input type="email" placeholder="Tu correo electrónico" /><button>→</button></form>
      </section>

      <Footer />
    </main>
  );
}

export default Home;
