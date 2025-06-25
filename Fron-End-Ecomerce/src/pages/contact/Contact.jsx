import './ContactPage.css';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faMapMarkerAlt, faUser } from '@fortawesome/free-solid-svg-icons';

const ContactPage = () => {

  const handleSubmit = (e) => {
    e.preventDefault();
    toast.success('Mensaje enviado correctamente');
  };

  return (
    <main className="main-containers">
      <section className="main-contact">
        <div className="contact-form-wrapper">
          <form className="form-containers" onSubmit={handleSubmit}>
            <h2 className="form-title">Formulario de Contacto</h2>

            <div className="input-groups">
              <label htmlFor="fullname">
                <FontAwesomeIcon icon={faUser} /> Nombre Completo
              </label>
              <input
                type="text"
                name="fullname"
                placeholder="Juan Pérez"
                required
                minLength="5"
                maxLength="150"
              />
            </div>

            <div className="input-groups">
              <label htmlFor="email">
                <FontAwesomeIcon icon={faEnvelope} /> Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="correo@ejemplo.com"
                required
                minLength="5"
                maxLength="150"
                pattern="[A-Za-z0-9._+\-']+@[A-Za-z0-9.\-]+\.[A-Za-z]{2,}$"
              />
            </div>

            <div className="input-groups">
              <label htmlFor="message">
                Mensaje
              </label>
              <textarea
                name="message"
                id="message"
                placeholder="Ingrese su mensaje aquí..."
                required
                minLength="20"
                maxLength="500"
              ></textarea>
            </div>

            <button type="submit" className="form-buttons">
              Enviar
            </button>
          </form>
        </div>

        <section className="contact-map-wrapper">
          <h2>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> ¿Dónde nos encontramos?
          </h2>
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3977.158953885094!2d-74.0973326!3d4.5654328!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3f98945780f37f%3A0x3b704147fa00f5fa!2sPortal%2020%20de%20Julio%20TransMilenio!5e0!3m2!1ses-419!2sco!4v1750807353019!5m2!1ses-419!2sco"
            width="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          ></iframe>
        </section>
      </section>
    </main>
  );
};

export default ContactPage;
