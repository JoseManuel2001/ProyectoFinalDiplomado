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
    link: '/login',
    action: 'Iniciar sesión',
  },
];

function Home() {
  const [bebidas, setBebidas] = useState([]);

  useEffect(() => {
    const obtenerBebidas = async () => {
      const bebidas = await obtenerBebidasRandom();
      console.log('Bebidas obtenidas:', bebidas);
      const bebidasConIngredientes = await Promise.all(
        bebidas.map(async (bebida) => {
          const ingredientes = [];
          for (let i = 1; i <= 15; i++) {
            const ingrediente = bebida[`strIngredient${i}`];
            if (ingrediente) {
              ingredientes.push(ingrediente);
            }
          }
          return { ...bebida, ingredientes, cantidadIngredientes: ingredientes.length };
        })
      );
      const bebidasSinRepeticion = comprobarRepeticionBebidas(bebidasConIngredientes);
      setBebidas(bebidasSinRepeticion);
    };
    
    obtenerBebidas();
  }, []);

  const obtenerBebidasRandom = async () => {
  try {
    const peticiones = Array.from({ length: 5 }, () =>
      fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php")
    );

    const respuestas = await Promise.all(peticiones);

    const datos = await Promise.all(
      respuestas.map((respuesta) => respuesta.json())
    );

    const bebidas = datos.map((dato) => dato.drinks[0]);

    return bebidas;
  } catch (error) {
    console.error("Error al obtener bebidas:", error);
    return [];
  }
};

const comprobarRepeticionBebidas = (bebidas) => {
  const ids = new Set();
  return bebidas.filter((bebida) => {
    if (ids.has(bebida.idDrink)) {
      return false;
    }
    ids.add(bebida.idDrink);
    return true;
  });
};


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
          {bebidas.map((bebida) => (
            <a className="drink-card" href="/bebidas" key={bebida.strDrink} style={{ backgroundImage: `linear-gradient(0deg, rgba(0,0,0,.82), rgba(0,0,0,.05) 75%), url(${bebida.strDrinkThumb})` }}>
              <div><h3>{bebida.strDrink}</h3><span>♧ &nbsp;{bebida.cantidadIngredientes} ingredientes</span></div>
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
