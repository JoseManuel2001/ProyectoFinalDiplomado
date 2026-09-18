import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
    FaArrowLeft,
    FaSearch,
    FaHeart,
    FaTrash,
    FaGlassMartiniAlt,
    FaFilter,
} from 'react-icons/fa';

import { useGamarGo } from '../../context/GamarGoContext';

import './MisBebidas.css';


const MisBebidas = () => {

    const navigate = useNavigate();

    const {
        bebidasFavoritas,
        eliminarFavorito,
    } = useGamarGo();


    const [busqueda, setBusqueda] = useState('');
    const [orden, setOrden] = useState('recientes');


    const bebidasFiltradas = useMemo(() => {

        let resultado = [...bebidasFavoritas];

        if (busqueda.trim()) {

            const texto = busqueda
                .toLowerCase()
                .trim();

            resultado = resultado.filter((bebida) =>
                bebida.nombre
                    ?.toLowerCase()
                    .includes(texto)
            );

        }


        if (orden === 'nombre') {

            resultado.sort((a, b) =>
                a.nombre.localeCompare(b.nombre)
            );

        }


        if (orden === 'precio-menor') {

            resultado.sort(
                (a, b) =>
                    Number(a.precio || 0) -
                    Number(b.precio || 0)
            );

        }


        if (orden === 'precio-mayor') {

            resultado.sort(
                (a, b) =>
                    Number(b.precio || 0) -
                    Number(a.precio || 0)
            );

        }


        return resultado;

    }, [
        bebidasFavoritas,
        busqueda,
        orden,
    ]);


    const formatoPrecio = (precio) => {

        if (!precio) {
            return '$0.00';
        }

        return `$${Number(precio).toFixed(2)} MXN`;

    };



    const quitarFavorito = (id) => {

        eliminarFavorito(id);

    };


    return (

        <div className="mis-bebidas-page">

            <div className="mis-bebidas-overlay"></div>


            <main className="mis-bebidas-container">



                <button
                    className="mis-bebidas-volver"
                    onClick={() => navigate('/')}
                >

                    <FaArrowLeft />

                    <span>
                        Volver
                    </span>

                </button>


                <section className="mis-bebidas-hero">


                    <div className="mis-bebidas-hero-text">

                        <p className="mis-bebidas-eyebrow">
                            TUS FAVORITOS
                        </p>


                        <h1>

                            Mis bebidas

                            <span>
                                favoritas
                            </span>

                        </h1>


                        <p className="mis-bebidas-description">

                            Aquí encontrarás las bebidas que más te gustan.

                            <br />

                            Disfruta nuevamente tus favoritos en GAMAR GO Resort.

                        </p>

                    </div>


                    <div className="mis-bebidas-hero-icon">

                        <FaGlassMartiniAlt />

                    </div>


                </section>



                <section className="mis-bebidas-toolbar">

                    <div className="mis-bebidas-search">

                        <FaSearch />

                        <input
                            type="text"
                            placeholder="Buscar en mis favoritos..."
                            value={busqueda}
                            onChange={(e) =>
                                setBusqueda(e.target.value)
                            }
                        />

                    </div>


                    <div className="mis-bebidas-sort">

                        <FaFilter />

                        <div>

                            <span>
                                Ordenar por
                            </span>

                            <select
                                value={orden}
                                onChange={(e) =>
                                    setOrden(e.target.value)
                                }
                            >

                                <option value="recientes">
                                    Más recientes
                                </option>

                                <option value="nombre">
                                    Nombre
                                </option>

                                <option value="precio-menor">
                                    Precio menor
                                </option>

                                <option value="precio-mayor">
                                    Precio mayor
                                </option>

                            </select>

                        </div>

                    </div>

                    <div className="mis-bebidas-counter">

                        <FaHeart />

                        <strong>
                            {bebidasFavoritas.length}
                        </strong>

                        <span>

                            {bebidasFavoritas.length === 1
                                ? 'bebida favorita'
                                : 'bebidas favoritas'}

                        </span>

                    </div>


                </section>


                {bebidasFiltradas.length > 0 ? (

                    <section className="mis-bebidas-grid">


                        {bebidasFiltradas.map((bebida) => (

                            <article
                                className="mis-bebida-card"
                                key={bebida.id}
                            >

                                <div className="mis-bebida-image">


                                    <img
                                        src={
                                            bebida.imagen ||
                                            '/images/clima-no-disponible.png'
                                        }
                                        alt={bebida.nombre}
                                        onError={(e) => {

                                            e.currentTarget.src =
                                                '/images/clima-no-disponible.png';

                                        }}
                                    />

                                    <div className="mis-bebida-favorite">

                                        <FaHeart />

                                    </div>


                                </div>



                                <div className="mis-bebida-content">


                                    <h2>
                                        {bebida.nombre}
                                    </h2>


                                    <p className="mis-bebida-description">

                                        {bebida.descripcion ||
                                            'Una deliciosa bebida de GAMAR GO Resort.'}

                                    </p>

                                    {bebida.categoria && (

                                        <span className="mis-bebida-category">

                                            {bebida.categoria}

                                        </span>

                                    )}




                                    <div className="mis-bebida-footer">


                                        <div className="mis-bebida-price">

                                            <strong>
                                                {formatoPrecio(
                                                    bebida.precio
                                                )}
                                            </strong>

                                        </div>



                                        <div className="mis-bebida-actions">

                                            <button
                                                className="mis-bebida-delete-btn"
                                                title="Quitar de favoritos"
                                                onClick={() =>
                                                    quitarFavorito(
                                                        bebida.id
                                                    )
                                                }
                                            >

                                                <FaTrash />

                                                <span>
                                                    Quitar
                                                </span>

                                            </button>


                                        </div>


                                    </div>


                                </div>


                            </article>

                        ))}


                    </section>

                ) : (


                    <section className="mis-bebidas-empty">


                        <div className="empty-icon">

                            <FaHeart />

                        </div>


                        <h2>

                            {bebidasFavoritas.length === 0
                                ? 'Aún no tienes bebidas favoritas'
                                : 'No encontramos bebidas'}

                        </h2>


                        <p>

                            {bebidasFavoritas.length === 0

                                ? 'Explora nuestro menú de bebidas y guarda tus favoritas para encontrarlas fácilmente aquí.'

                                : 'Prueba con otro nombre de bebida.'}

                        </p>


                        {bebidasFavoritas.length === 0 && (

                            <button
                                onClick={() =>
                                    navigate('/bebidas')
                                }
                            >

                                Explorar bebidas

                                <span>
                                    →
                                </span>

                            </button>

                        )}


                    </section>

                )}


                {bebidasFavoritas.length > 0 && (

                    <section className="mis-bebidas-promo">


                        <div className="promo-icon">

                            <FaHeart />

                        </div>


                        <div className="promo-text">

                            <h3>
                                ¿Quieres descubrir algo nuevo?
                            </h3>

                            <p>
                                Explora nuestro menú de bebidas
                                y encuentra tu próximo favorito.
                            </p>

                        </div>


                        <button
                            onClick={() =>
                                navigate('/bebidas')
                            }
                        >

                            Explorar bebidas

                            <span>
                                →
                            </span>

                        </button>


                    </section>

                )}


            </main>


        </div>

    );

};


export default MisBebidas;