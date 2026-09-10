import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Bebidas.css';
import DetalleBebida from '../../components/DetalleBebida/DetalleBebida';

function Bebidas() {
    const [categorias, setCategorias] = useState([]);
    const [bebidas, setBebidas] = useState([]);
    const [categoriaSeleccionada, setCategoriaSeleccionada] =
        useState('Todas');

    const [busqueda, setBusqueda] = useState('');
    const [cargando, setCargando] = useState(true);
    const [error, setError] = useState('');
    const [bebidaSeleccionada, setBebidaSeleccionada] = useState(null);

    const bebidasFiltradas = bebidas.filter((bebida) => {
        const coincideCategoria =
            categoriaSeleccionada === 'Todas' ||
            bebida.categoria === categoriaSeleccionada;

        const textoBusqueda = busqueda.toLowerCase().trim();

        const coincideBusqueda =
            bebida.nombre.toLowerCase().includes(textoBusqueda) ||
            bebida.descripcion.toLowerCase().includes(textoBusqueda) ||
            bebida.categoria.toLowerCase().includes(textoBusqueda);

        return coincideCategoria && coincideBusqueda;
    });

    const obtenerCategorias = async () => {
        try {
            const respuesta = await fetch(
                'https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list'
            );
            const datos = await respuesta.json();
            const categoriasObtenidas = datos.drinks.map((categoria) => categoria.strCategory);
            console.log('Categorías obtenidas:', categoriasObtenidas);
            setCategorias(['Todas', ...categoriasObtenidas]);
        } catch (error) {
            console.error('Error al obtener categorías:', error);
        }
    };
    const comprobarRepeticionBebidas = (bebidas) => {
        const ids = new Set();
        return bebidas.filter((bebida) => {
            if (ids.has(bebida.id)) {
                return false;
            }
            ids.add(bebida.id);
            return true;
        });
    };

    const obtenerBebidas = async () => {
        try {
            setCargando(true);
            setError('');

            const respuestas = await Promise.all(
                Array.from({ length: 20 }, () =>
                    fetch(
                        'https://www.thecocktaildb.com/api/json/v1/1/random.php'
                    )
                )
            );

            const datos = await Promise.all(
                respuestas.map((respuesta) => respuesta.json())
            );

            const bebidasObtenidas = datos
                .filter((data) => data.drinks)
                .map((data) => {
                    const bebida = data.drinks[0];

                    return {
                        id: bebida.idDrink,
                        nombre: bebida.strDrink || 'Bebida sin nombre',
                        descripcion:
                            Array.from(
                                { length: 15 },
                                (_, i) => bebida[`strIngredient${i + 1}`]
                            )
                                .filter(Boolean)
                                .join(', ') || 'Sin descripción',
                        categoria: bebida.strCategory || 'Sin categoría',
                        imagen: bebida.strDrinkThumb,
                        precio: (Math.random() * (300 - 5) + 5).toFixed(2),
                        alcoholic: bebida.strAlcoholic,
                        strTags: bebida.strTags,
                        strGlass: bebida.strGlass,
                        strInstructions: bebida.strInstructions,
                        strInstructionsES: bebida.strInstructionsES,

                    };
                });

            const bebidasSinRepeticion = comprobarRepeticionBebidas(bebidasObtenidas);
            setBebidas(bebidasSinRepeticion);
        } catch (error) {
            console.error('Error al obtener bebidas:', error);
            setError('No fue posible cargar las bebidas.');
        } finally {
            setCargando(false);
        }
    };

    useEffect(() => {
        obtenerCategorias();
        obtenerBebidas();
    }, []);

    return (
        <main className="bebidas-page">
            <section className="bebidas-hero">
                <div className="bebidas-hero-overlay">
                    <div className="bebidas-hero-content">
                        <span className="bebidas-eyebrow">
                            GOOD DRINKS, BETTER MEMORIES
                        </span>

                        <h1>
                            BAR <span>&amp;</span> BEBIDAS
                        </h1>

                        <p>
                            Descubre nuestra selección de bebidas y disfruta
                            momentos únicos frente al mar.
                        </p>
                    </div>
                </div>
            </section>

            <section className="bebidas-content">

                <div className="bebidas-toolbar">
                    <div className="categorias">
                        {categorias.map((categoria) => (
                            <button
                                key={categoria}
                                className={
                                    categoriaSeleccionada === categoria
                                        ? 'categoria-button active'
                                        : 'categoria-button'
                                }
                                onClick={() => setCategoriaSeleccionada(categoria)}
                            >
                                {categoria}
                            </button>
                        ))}
                    </div>

                    <div className="bebidas-search">
                        <span>⌕</span>

                        <input
                            type="text"
                            placeholder="Buscar bebida..."
                            value={busqueda}
                            onChange={(event) => setBusqueda(event.target.value)}
                        />
                    </div>
                </div>

                <div className="bebidas-resultados">
                    <span>
                        {cargando
                            ? 'Cargando bebidas...'
                            : `${bebidasFiltradas.length} bebidas disponibles`}
                    </span>

                    {!cargando && busqueda && (
                        <button
                            className="limpiar-busqueda"
                            onClick={() => setBusqueda('')}
                        >
                            Limpiar búsqueda
                        </button>
                    )}
                </div>

                {cargando ? (
                    <div className="bebidas-loading">
                        <div className="bebidas-spinner"></div>

                        <h3>Preparando nuestras bebidas...</h3>

                        <p>
                            Estamos cargando la selección del Bar Aurea.
                        </p>
                    </div>
                ) : error ? (
                    <div className="bebidas-empty">
                        <span>⚠️</span>

                        <h3>{error}</h3>

                        <button onClick={obtenerBebidas}>
                            Intentar nuevamente
                        </button>
                    </div>
                ) : bebidasFiltradas.length > 0 ? (
                    <div className="bebidas-grid">
                        {bebidasFiltradas.map((bebida) => (
                            <article className="bebida-card" key={bebida.id}>
                                <div className="bebida-image-container">
                                    <img
                                        src={bebida.imagen}
                                        alt={bebida.nombre}
                                        className="bebida-image"
                                    />

                                    <span className="bebida-category">
                                        {bebida.categoria}
                                    </span>

                                    <button
                                        className="bebida-favorite"
                                        aria-label={`Agregar ${bebida.nombre} a favoritos`}
                                    >
                                        ♡
                                    </button>
                                </div>

                                <div className="bebida-card-content">
                                    <div className="bebida-card-title">
                                        <h3>{bebida.nombre}</h3>

                                        <span className="bebida-price">
                                            ${bebida.precio}
                                        </span>
                                    </div>

                                    <p>{bebida.descripcion}</p>

                                    <button className="bebida-order-button"
                                        onClick={() => setBebidaSeleccionada(bebida)}
                                    >
                                        Ver detalles
                                        <span>→</span>
                                    </button>
                                </div>
                            </article>
                        ))}
                    </div>
                ) : (
                    <div className="bebidas-empty">
                        <span>🍹</span>

                        <h3>No encontramos bebidas</h3>

                        <p>
                            Intenta cambiar la categoría o utilizar otra búsqueda.
                        </p>

                        <button
                            onClick={() => {
                                setBusqueda('');
                                setCategoriaSeleccionada('Todas');
                            }}
                        >
                            Ver todas las bebidas
                        </button>
                    </div>
                )}
            </section>

            {bebidaSeleccionada && (
                <DetalleBebida
                    bebida={bebidaSeleccionada}
                    onClose={() => setBebidaSeleccionada(null)}
                />
            )}

            <section className="bebidas-banner">
                <div className="bebidas-banner-content">
                    <span className="section-kicker">MOMENTOS GAMAR GO</span>

                    <h2>
                        El mejor sabor
                        <br />
                        se disfruta frente al mar.
                    </h2>

                    <p>
                        Relájate, brinda y crea recuerdos inolvidables
                        en nuestro Bar Aurea.
                    </p>

                    <Link to="/" className="bebidas-banner-button">
                        Regresar al inicio
                        <span>→</span>
                    </Link>
                </div>
            </section>

            <footer className="bebidas-footer">
                <div className="bebidas-footer-brand">
                    <span className="footer-brand-mark">☼</span>

                    <div>
                        <strong>GAMAR GO</strong>
                        <small>— RESORT —</small>
                    </div>
                </div>

                <p>GOOD DRINKS • BETTER MEMORIES</p>

                <span className="footer-copy">
                    © 2026 GAMAR GO Resort
                </span>
            </footer>
        </main>
    );
}

export default Bebidas;