import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    FaHome,
    FaSearch,
    FaMapMarkerAlt,
    FaTint,
    FaWind,
    FaCloudRain,
    FaSun,
    FaCloudSun,
    FaCloud,
    FaCloudShowersHeavy,
} from 'react-icons/fa';

import './Clima.css';
import CIUDADES_POPULARES from '../../data/ciudadesPopulares.json';


const TRADUCCIONES_CLIMA = {
    clearday: 'Despejado',
    clearnight: 'Despejado',

    pcloudyday: 'Parcialmente nublado',
    pcloudynight: 'Parcialmente nublado',

    mcloudyday: 'Mayormente nublado',
    mcloudynight: 'Mayormente nublado',

    cloudyday: 'Nublado',
    cloudynight: 'Nublado',

    humidday: 'Húmedo',
    humidnight: 'Húmedo',

    lightrainday: 'Lluvia ligera',
    lightrainnight: 'Lluvia ligera',

    oshowerday: 'Lluvias ocasionales',
    oshowernight: 'Lluvias ocasionales',

    ishowerday: 'Chubascos aislados',
    ishowernight: 'Chubascos aislados',

    rainday: 'Lluvia',
    rainnight: 'Lluvia',

    snowday: 'Nieve',
    snownight: 'Nieve',

    tsday: 'Tormenta',
    tsnight: 'Tormenta',

    tsrainday: 'Tormenta con lluvia',
    tsrainnight: 'Tormenta con lluvia',
};

const obtenerIconoClima = (clima) => {
    if (!clima) return <FaSun />;

    if (clima.includes('rain') || clima.includes('shower')) {
        return <FaCloudShowersHeavy />;
    }

    if (clima.includes('cloudy')) {
        return <FaCloud />;
    }

    if (clima.includes('pcloudy')) {
        return <FaCloudSun />;
    }

    return <FaSun />;
};

const traducirClima = (clima) => {
    return TRADUCCIONES_CLIMA[clima] || 'Condición desconocida';
};

const obtenerNombreDia = (fecha) => {
    return new Intl.DateTimeFormat('es-MX', {
        weekday: 'short',
    }).format(fecha);
};

const Clima = () => {
    const navigate = useNavigate();

    const [ciudad, setCiudad] = useState('');
    const [clima, setClima] = useState(null);
    const [cargando, setCargando] = useState(false);
    const [error, setError] = useState('');

    const obtenerClima = async (nombreCiudad) => {
        if (!nombreCiudad.trim()) return;

        try {
            setCargando(true);
            setError('');

            // Buscar coordenadas de la ciudad
            const respuestaCiudad = await fetch(
                `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(
                    nombreCiudad
                )}&count=1&language=es&format=json`
            );

            if (!respuestaCiudad.ok) {
                throw new Error('No se pudo localizar la ciudad');
            }

            const datosCiudad = await respuestaCiudad.json();

            if (!datosCiudad.results?.length) {
                throw new Error('Ciudad no encontrada');
            }

            const ubicacion = datosCiudad.results[0];

            const respuestaClima = await fetch(
                `/api/clima?lon=${ubicacion.longitude}&lat=${ubicacion.latitude}&product=civil&output=json`
            );

            if (!respuestaClima.ok) {
                throw new Error('No se pudo obtener el clima');
            }

            const datosClima = await respuestaClima.json();

            setClima({
                ciudad: ubicacion.name,
                pais: ubicacion.country,
                latitud: ubicacion.latitude,
                longitud: ubicacion.longitude,
                datos: datosClima,
            });

            setCiudad(ubicacion.name);
        } catch (err) {
            console.error(err);
            setError(err.message || 'Ocurrió un error al consultar el clima');
            setClima(null);
        } finally {
            setCargando(false);
        }
    };

    const buscarClima = () => {
        obtenerClima(ciudad);
    };

    const seleccionarCiudad = (nombre) => {
        setCiudad(nombre);
        obtenerClima(nombre);
    };

    const manejarEnter = (e) => {
        if (e.key === 'Enter') {
            buscarClima();
        }
    };

    const datosActuales = clima?.datos?.dataseries?.[0];

    const temperatura = datosActuales?.temp2m ?? '--';
    const humedad = datosActuales?.rh2m ?? '--';
    const viento = datosActuales?.wind10m?.speed ?? '--';
    const condicion = datosActuales?.weather;

    const pronostico =
        clima?.datos?.dataseries?.slice(0, 7) || [];

    return (
        <div className="clima-page">

            {/* FONDO */}
            <div className="clima-overlay"></div>

            {/* HEADER */}
            <header className="clima-header">

                <button
                    className="clima-home-btn"
                    onClick={() => navigate('/')}
                >
                    <FaHome />
                    <span>Inicio</span>
                </button>

                <div className="clima-logo">
                    <div className="clima-logo-icon">
                        ☼
                    </div>

                    <div className="clima-logo-name">
                        GAMAR GO
                    </div>

                    <div className="clima-logo-subtitle">
                        VIVE GRANDES MOMENTOS
                    </div>
                </div>

            </header>

            <main className="clima-container">

                {/* HERO */}
                <section className="clima-hero">

                    <p className="clima-eyebrow">
                        EL CLIMA TAMBIÉN ES PARTE DE LA AVENTURA
                    </p>

                    <h1>
                        ¿A dónde vamos <span>hoy?</span>
                    </h1>

                    <p className="clima-description">
                        Descubre el clima y planea tu próxima experiencia.
                    </p>

                    {/* BUSCADOR */}
                    <div className="clima-search">

                        <FaSearch className="clima-search-icon" />

                        <input
                            type="text"
                            placeholder="Busca una ciudad..."
                            value={ciudad}
                            onChange={(e) => setCiudad(e.target.value)}
                            onKeyDown={manejarEnter}
                        />

                        <button
                            onClick={buscarClima}
                            disabled={cargando}
                        >
                            {cargando ? 'Buscando...' : 'Buscar'}
                        </button>

                    </div>

                </section>

                {/* CIUDADES POPULARES */}
                <section className="ciudades-section">

                    <div className="section-title">
                        Ciudades populares
                    </div>

                    <div className="ciudades-grid">

                        {CIUDADES_POPULARES.map((item) => (
                            <button
                                className="ciudad-card"
                                key={item.nombre}
                                onClick={() => seleccionarCiudad(item.nombre)}
                            >

                                <img
                                    src={item.imagen}
                                    alt={item.nombre}
                                />

                                <div className="ciudad-card-overlay"></div>

                                <div className="ciudad-card-content">
                                    <strong>{item.nombre}</strong>
                                    <span>{item.pais}</span>
                                </div>

                            </button>
                        ))}

                    </div>

                </section>

                {/* ERROR */}
                {error && (
                    <div className="clima-error">
                        {error}
                    </div>
                )}

                {/* INFORMACIÓN DEL CLIMA */}
                {clima && datosActuales && (
                    <>

                        <section className="clima-current">

                            {/* INFORMACIÓN */}
                            <div className="clima-info">

                                <div className="clima-location">

                                    <h2>
                                        {clima.ciudad}
                                    </h2>

                                    <p>
                                        <FaMapMarkerAlt />
                                        {clima.pais}
                                    </p>

                                    <span>
                                        {new Intl.DateTimeFormat('es-MX', {
                                            weekday: 'long',
                                            day: 'numeric',
                                            month: 'long',
                                            year: 'numeric',
                                        }).format(new Date())}
                                    </span>

                                </div>

                                <div className="clima-main-data">

                                    <div className="clima-weather-icon">
                                        {obtenerIconoClima(condicion)}
                                    </div>

                                    <div>

                                        <div className="temperatura">
                                            {temperatura}°C
                                        </div>

                                        <div className="condicion">
                                            {traducirClima(condicion)}
                                        </div>

                                        <div className="sensacion">
                                            Condición actual
                                        </div>

                                    </div>

                                </div>

                            </div>

                            {/* DETALLES */}
                            <div className="clima-details">

                                <div className="clima-detail">
                                    <FaTint />
                                    <span>Humedad</span>
                                    <strong>{humedad}%</strong>
                                </div>

                                <div className="clima-detail">
                                    <FaWind />
                                    <span>Viento</span>
                                    <strong>{viento} km/h</strong>
                                </div>

                                <div className="clima-detail">
                                    <FaCloudRain />
                                    <span>Precipitación</span>
                                    <strong>
                                        {datosActuales.prec_type === 'none'
                                            ? 'Sin lluvia'
                                            : datosActuales.prec_type}
                                    </strong>
                                </div>

                            </div>

                            {/* IMAGEN */}
                            <div className="clima-image">
                                <img
                                    src={
                                        CIUDADES_POPULARES.find(
                                            (item) =>
                                                item.nombre.toLowerCase() ===
                                                clima.ciudad.toLowerCase()
                                        )?.imagen ||
                                        '/CiudadEstandar.png'
                                    }
                                    alt={clima.ciudad}
                                />
                            </div>

                        </section>

                        {/* PRONÓSTICO */}
                        <section className="pronostico-section">

                            <h2>
                                Pronóstico para los próximos días
                            </h2>

                            <div className="pronostico-grid">

                                {pronostico.map((dia, index) => {

                                    const fecha = new Date();
                                    fecha.setDate(
                                        fecha.getDate() + index
                                    );

                                    return (
                                        <div
                                            className="pronostico-card"
                                            key={index}
                                        >

                                            <strong>
                                                {obtenerNombreDia(fecha)}
                                            </strong>

                                            <span>
                                                {fecha.getDate()} {new Intl.DateTimeFormat(
                                                    'es-MX',
                                                    { month: 'short' }
                                                ).format(fecha)}
                                            </span>

                                            <div className="pronostico-icon">
                                                {obtenerIconoClima(dia.weather)}
                                            </div>

                                            <div className="pronostico-temp">
                                                {dia.temp2m}°
                                            </div>

                                            <small>
                                                {traducirClima(dia.weather)}
                                            </small>

                                        </div>
                                    );
                                })}

                            </div>

                        </section>

                    </>
                )}

            </main>

        </div>
    );
};

export default Clima;