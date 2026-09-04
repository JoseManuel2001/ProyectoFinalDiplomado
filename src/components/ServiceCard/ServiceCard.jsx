import './ServiceCard.css';

function ServiceCard({ icon, title, description, link }) {
  return (
    <a href={link} className="service-card">

      <div className="service-icon">
        {icon}
      </div>

      <h3>{title}</h3>

      <p>{description}</p>

      <span className="service-link">
        Explorar <span>→</span>
      </span>

    </a>
  );
}

export default ServiceCard;