import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope } from '@fortawesome/free-regular-svg-icons';
import { faWhatsapp, faFacebookF, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Atención al Cliente</h4>
                    <ul>
                        <li>Lunes a Viernes de 9:00 a 20:00 hs</li>
                        <li>Sábado de 9:00 a 17:00 hs</li>
                        <li>
                            <a href="mailto:contacto@figucoleccion.com">
                                <FontAwesomeIcon icon={faEnvelope} /> contacto@figucoleccion.com
                            </a>
                        </li>
                        <li>
                            <a href="https://wa.me/5491112345678" target="_blank" rel="noopener noreferrer">
                                <FontAwesomeIcon icon={faWhatsapp} /> WhatsApp
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="footer-section footer-logo-section">
                    <img 
                        className="footer-logo" 
                        src="data:image/jpeg;base64,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" 
                        alt="Logo FiguColección" 
                    />
                    <p>© 2025 FiguColección</p>
                </div>

                <div className="footer-section">
                    <h4>Síguenos</h4>
                    <div className="social-links">
                        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faFacebookF} />
                        </a>
                        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faInstagram} />
                        </a>
                        <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                            <FontAwesomeIcon icon={faTwitter} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
