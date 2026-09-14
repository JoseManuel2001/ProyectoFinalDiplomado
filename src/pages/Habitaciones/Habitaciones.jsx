import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  FaHome,
  FaCalendarAlt,
  FaUsers,
  FaSearch,
  FaWifi,
  FaCoffee,
  FaMountain,
  FaSnowflake,
  FaTv,
  FaSpa,
  FaUmbrellaBeach,
  FaBed,
  FaRulerCombined,
  FaTimes,
  FaCheck,
} from 'react-icons/fa';

import './Habitaciones.css';


const HABITACIONES = [
  {
    id: 1,
    nombre: 'Habitación Deluxe',
    descripcion:
      'Confort y elegancia con vistas impresionantes.',
    capacidad: '2-4 huéspedes',
    cama: '1 cama king size',
    metros: '35 m²',
    precio: 2800,
    etiqueta: 'MÁS POPULAR',
    imagen:
      'https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1200&q=85',

    amenidades: [
      'Wi-Fi gratuito',
      'Aire acondicionado',
      'TV inteligente',
      'Vista panorámica',
      'Desayuno incluido',
    ],
  },

  {
    id: 2,
    nombre: 'Suite Panorámica',
    descripcion:
      'Vive una experiencia única con la mejor vista.',
    capacidad: '2 huéspedes',
    cama: '1 cama king size',
    metros: '45 m²',
    precio: 3600,
    etiqueta: '',
    imagen:
      'https://images.unsplash.com/photo-1584132967334-10e028bd69f7?auto=format&fit=crop&w=1200&q=85',

    amenidades: [
      'Wi-Fi gratuito',
      'Aire acondicionado',
      'TV inteligente',
      'Vista panorámica',
      'Bañera',
    ],
  },

  {
    id: 3,
    nombre: 'Habitación Familiar',
    descripcion:
      'El espacio ideal para compartir momentos en familia.',
    capacidad: '4-6 huéspedes',
    cama: '2 camas queen',
    metros: '50 m²',
    precio: 4200,
    etiqueta: '',
    imagen:
      'https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=85',

    amenidades: [
      'Wi-Fi gratuito',
      'Aire acondicionado',
      'TV inteligente',
      '2 camas queen',
      'Balcón',
    ],
  },

  {
    id: 4,
    nombre: 'Suite Romance',
    descripcion:
      'El escenario perfecto para una escapada especial.',
    capacidad: '2 huéspedes',
    cama: '1 cama king size',
    metros: '40 m²',
    precio: 3900,
    etiqueta: 'ROMÁNTICA',
    imagen:
      'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1200&q=85',

    amenidades: [
      'Wi-Fi gratuito',
      'Aire acondicionado',
      'TV inteligente',
      'Bañera',
      'Spa privado',
    ],
  },
];


const AMENIDADES = [
  {
    icono: <FaWifi />,
    nombre: 'Wi-Fi',
  },
  {
    icono: <FaCoffee />,
    nombre: 'Desayuno incluido',
  },
  {
    icono: <FaMountain />,
    nombre: 'Vista panorámica',
  },
  {
    icono: <FaSnowflake />,
    nombre: 'Aire acondicionado',
  },
  {
    icono: <FaTv />,
    nombre: 'TV inteligente',
  },
  {
    icono: <FaSpa />,
    nombre: 'Spa',
  },
  {
    icono: <FaUmbrellaBeach />,
    nombre: 'Balcón o terraza',
  },
];


const Habitaciones = () => {

  const navigate = useNavigate();

  const [entrada, setEntrada] = useState('');
  const [salida, setSalida] = useState('');
  const [huespedes, setHuespedes] = useState(2);

  const [habitacionSeleccionada, setHabitacionSeleccionada] =
    useState(null);


  const buscarHabitaciones = () => {

    console.log({
      entrada,
      salida,
      huespedes,
    });

  };


  const formatoPrecio = (precio) => {

    return new Intl.NumberFormat('es-MX').format(precio);

  };


  return (

    <div className="habitaciones-page">


      {/* FONDO */}

      <div className="habitaciones-overlay"></div>


      {/* HEADER */}

      <header className="habitaciones-header">


        <button
          className="habitaciones-home"
          onClick={() => navigate('/')}
        >

          <FaHome />

          <span>
            Inicio
          </span>

        </button>


        <div className="habitaciones-logo">

          <div className="habitaciones-logo-icon">
            ☼
          </div>

          <div className="habitaciones-logo-name">
            GAMAR GO
          </div>

          <div className="habitaciones-logo-subtitle">
            VIVE GRANDES MOMENTOS
          </div>

        </div>


      </header>



      <main className="habitaciones-container">


        {/* HERO */}

        <section className="habitaciones-hero">


          <div className="habitaciones-hero-content">

            <p className="habitaciones-eyebrow">
              DESCANSA, EXPLORA, VIVE
            </p>


            <h1>
              Habitaciones
              <br />
              para grandes
              <span> momentos</span>
            </h1>


            <p className="habitaciones-description">

              Encuentra el espacio perfecto para tu próxima aventura.
              Confort, estilo y vistas increíbles te esperan en GAMAR GO Resort.

            </p>


          </div>


        </section>



        {/* BUSCADOR */}

        <section className="reservacion-search">


          <div className="search-field">

            <FaCalendarAlt />

            <div>

              <span>
                Entrada
              </span>

              <input
                type="date"
                value={entrada}
                onChange={(e) =>
                  setEntrada(e.target.value)
                }
              />

            </div>

          </div>



          <div className="search-field">

            <FaCalendarAlt />

            <div>

              <span>
                Salida
              </span>

              <input
                type="date"
                value={salida}
                onChange={(e) =>
                  setSalida(e.target.value)
                }
              />

            </div>

          </div>



          <div className="search-field">

            <FaUsers />

            <div>

              <span>
                Huéspedes
              </span>

              <select
                value={huespedes}
                onChange={(e) =>
                  setHuespedes(e.target.value)
                }
              >

                <option value="1">
                  1 huésped
                </option>

                <option value="2">
                  2 huéspedes
                </option>

                <option value="3">
                  3 huéspedes
                </option>

                <option value="4">
                  4 huéspedes
                </option>

                <option value="5">
                  5 huéspedes
                </option>

                <option value="6">
                  6 huéspedes
                </option>

              </select>

            </div>

          </div>



          <button
            className="buscar-habitaciones"
            onClick={buscarHabitaciones}
          >

            <FaSearch />

            Buscar habitaciones

          </button>


        </section>



        {/* AMENIDADES */}

        <section className="amenidades-bar">


          {AMENIDADES.map((amenidad) => (

            <div
              className="amenidad"
              key={amenidad.nombre}
            >

              <span className="amenidad-icon">
                {amenidad.icono}
              </span>

              <span>
                {amenidad.nombre}
              </span>

            </div>

          ))}


        </section>



        {/* HABITACIONES */}

        <section className="habitaciones-section">


          <div className="habitaciones-grid">


            {HABITACIONES.map((habitacion) => (

              <article
                className="habitacion-card"
                key={habitacion.id}
              >


                {/* IMAGEN */}

                <div className="habitacion-image">


                  <img
                    src={habitacion.imagen}
                    alt={habitacion.nombre}
                    onError={(e) => {

                      e.currentTarget.src =
                        '/images/clima-no-disponible.png';

                    }}
                  />


                  {habitacion.etiqueta && (

                    <span className="habitacion-badge">
                      {habitacion.etiqueta}
                    </span>

                  )}


                </div>



                {/* INFORMACIÓN */}

                <div className="habitacion-content">


                  <h2>
                    {habitacion.nombre}
                  </h2>


                  <p className="habitacion-description">
                    {habitacion.descripcion}
                  </p>



                  {/* CARACTERÍSTICAS */}

                  <div className="habitacion-features">


                    <div>

                      <FaUsers />

                      <span>
                        {habitacion.capacidad}
                      </span>

                    </div>


                    <div>

                      <FaBed />

                      <span>
                        {habitacion.cama}
                      </span>

                    </div>


                    <div>

                      <FaRulerCombined />

                      <span>
                        {habitacion.metros}
                      </span>

                    </div>


                  </div>



                  {/* PRECIO */}

                  <div className="habitacion-footer">


                    <div className="habitacion-price">

                      <strong>
                        ${formatoPrecio(habitacion.precio)}
                      </strong>

                      <span>
                        MXN / noche
                      </span>

                    </div>



                    <button
                      className="habitacion-details-btn"
                      onClick={() =>
                        setHabitacionSeleccionada(habitacion)
                      }
                    >

                      Ver detalles

                    </button>


                  </div>


                </div>


              </article>

            ))}


          </div>


        </section>



        {/* BENEFICIOS */}

        <section className="beneficios-section">


          <div className="beneficio">

            <span>
              ★
            </span>

            <div>

              <strong>
                Mejor precio garantizado
              </strong>

              <p>
                Reserva al mejor precio en GAMAR GO.
              </p>

            </div>

          </div>



          <div className="beneficio">

            <span>
              ◫
            </span>

            <div>

              <strong>
                Cancelación flexible
              </strong>

              <p>
                Cambia tus planes sin preocupaciones.
              </p>

            </div>

          </div>



          <div className="beneficio">

            <span>
              ✓
            </span>

            <div>

              <strong>
                Pago seguro
              </strong>

              <p>
                Tus datos siempre protegidos.
              </p>

            </div>

          </div>



          <div className="beneficio">

            <span>
              ♫
            </span>

            <div>

              <strong>
                Atención personalizada
              </strong>

              <p>
                Estamos contigo en cada paso.
              </p>

            </div>

          </div>


        </section>


      </main>



      {/* MODAL */}

      {habitacionSeleccionada && (

        <div
          className="habitacion-modal-overlay"
          onClick={() =>
            setHabitacionSeleccionada(null)
          }
        >


          <div
            className="habitacion-modal"
            onClick={(e) =>
              e.stopPropagation()
            }
          >


            <button
              className="modal-close"
              onClick={() =>
                setHabitacionSeleccionada(null)
              }
            >

              <FaTimes />

            </button>



            <div className="modal-image">

              <img
                src={habitacionSeleccionada.imagen}
                alt={habitacionSeleccionada.nombre}
              />

            </div>



            <div className="modal-content">


              <p className="modal-eyebrow">
                GAMAR GO RESORT
              </p>


              <h2>
                {habitacionSeleccionada.nombre}
              </h2>


              <p className="modal-description">

                {habitacionSeleccionada.descripcion}

              </p>



              <div className="modal-info">


                <div>

                  <FaUsers />

                  <span>
                    {habitacionSeleccionada.capacidad}
                  </span>

                </div>


                <div>

                  <FaBed />

                  <span>
                    {habitacionSeleccionada.cama}
                  </span>

                </div>


                <div>

                  <FaRulerCombined />

                  <span>
                    {habitacionSeleccionada.metros}
                  </span>

                </div>


              </div>



              <h3>
                Amenidades
              </h3>


              <div className="modal-amenidades">

                {habitacionSeleccionada.amenidades.map(
                  (amenidad) => (

                    <div
                      key={amenidad}
                    >

                      <FaCheck />

                      {amenidad}

                    </div>

                  )
                )}

              </div>



              <div className="modal-price">

                <div>

                  <strong>
                    ${formatoPrecio(
                      habitacionSeleccionada.precio
                    )}
                  </strong>

                  <span>
                    MXN / noche
                  </span>

                </div>


                <button
                  onClick={() => {

                    alert(
                      `Has seleccionado ${habitacionSeleccionada.nombre}`
                    );

                  }}
                >

                  Reservar

                </button>

              </div>


            </div>


          </div>


        </div>

      )}


    </div>

  );

};


export default Habitaciones;