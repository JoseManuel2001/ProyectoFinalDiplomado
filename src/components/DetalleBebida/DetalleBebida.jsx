import './DetalleBebida.css';
import { useEffect } from 'react';

function DetalleBebida({ bebida, onClose }) {
  if (!bebida) return null;

  const ingredientes = Array.from({ length: 15 }, (_, index) => {
    const ingrediente = bebida[`strIngredient${index + 1}`];
    const medida = bebida[`strMeasure${index + 1}`];

    if (!ingrediente) return null;

    return {
      nombre: ingrediente,
      medida: medida?.trim() || 'Al gusto',
    };
  }).filter(Boolean);

  const instrucciones =
    bebida.strInstructionsES ||
    bebida.strInstructions ||
    'No hay instrucciones disponibles para esta bebida.';

  const pasos = instrucciones
    .split(/\.\s+|\.\n/)
    .map((paso) => paso.trim())
    .filter(Boolean);

  const esSinAlcohol =
    bebida.alcoholic?.toLowerCase().includes('non alcoholic') ||
    bebida.alcoholic?.toLowerCase().includes('sin alcohol');

    useEffect(() => {
        console.log('Bebida seleccionada:', bebida);
    }, [bebida]);

  return (
    <div className="detalle-overlay" onClick={onClose}>
      <section
        className="detalle-modal"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className="detalle-close"
          onClick={onClose}
          aria-label="Cerrar detalle"
        >
          ×
        </button>

        <div className="detalle-imagen-container">
          <img
            src={bebida.imagen}
            alt={bebida.strDrink}
            className="detalle-imagen"
          />

          <div className="detalle-imagen-overlay"></div>

          <div className="detalle-brand">
            <span className="detalle-brand-icon">☼</span>
            <strong>GAMAR GO</strong>
            <small>— RESORT —</small>
          </div>

          <div className="detalle-frase">
            <p><span>“</span>Momentos simples saben mejor aquí<span>”</span></p>
          </div>
        </div>

        <div className="detalle-contenido">
          <div className="detalle-header">
            <div>
              <span className="detalle-categoria">
                {bebida.categoria || 'Bebida'}
              </span>

              <h2>{bebida.nombre}</h2>
            </div>

            <button
              className="detalle-favorito"
              aria-label="Agregar a favoritos"
            >
              ♡
            </button>
          </div>

          <div className="detalle-etiquetas">
            <span className="detalle-etiqueta">
              {esSinAlcohol ? '♧ Sin alcohol' : '🍸 Con alcohol'}
            </span>

            {bebida.strTags && (
              <span className="detalle-etiqueta">
                #{bebida.strTags.split(',')[0]}
              </span>
            )}
          </div>

          

          <div className="detalle-informacion">
            <div className="detalle-info-item">
              <span className="detalle-info-icon">🍷</span>
              <div>
                <small>Tipo de vaso</small>
                <strong>{bebida.strGlass || 'No especificado'}</strong>
              </div>
            </div>

            <div className="detalle-info-item">
              <span className="detalle-info-icon">▦</span>
              <div>
                <small>Categoría</small>
                <strong>{bebida.categoria || 'No especificada'}</strong>
              </div>
            </div>

            <div className="detalle-info-item">
              <span className="detalle-info-icon">◯</span>
              <div>
                <small>Alcohol</small>
                <strong>
                  {bebida.alcoholic || 'No especificado'}
                </strong>
              </div>
            </div>
          </div>

          <div className="detalle-seccion">
            <div className="detalle-titulo-seccion">
              <h3>Ingredientes</h3>
              <span></span>
            </div>

            <div className="detalle-ingredientes">
              {bebida.descripcion}
            </div>
          </div>

          <div className="detalle-seccion">
            <div className="detalle-titulo-seccion">
              <h3>Preparación</h3>
              <span></span>
            </div>

            <div className="detalle-preparacion">
              {pasos.map((paso, index) => (
                <div className="detalle-paso" key={index}>
                  <span className="detalle-paso-numero">{index + 1}</span>
                  <p>{paso}{paso.endsWith('.') ? '' : '.'}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default DetalleBebida;