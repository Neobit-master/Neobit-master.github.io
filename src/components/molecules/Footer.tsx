import { FaGithub } from 'react-icons/fa';
import { Link } from 'wouter';
import IsoDS from '../../../images/DS.svg';
import IsoAPI from '../../../images/API.svg';

const Footer = () => {
  return (
    <footer className="footer-social" role="contentinfo">
      <p>Copyrigth © By Platzi Master</p>
      <nav className="social" aria-label="Enlaces externos">
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="https://github.com/WS-Jedp/NeoBit"
          aria-label="Repositorio de GitHub"
        >
          <FaGithub aria-hidden="true" />
        </a>
        <Link to="/ds/" aria-label="Sistema de diseño">
          <img src={IsoDS} alt="" aria-hidden="true" />
        </Link>
        <a
          target="_blank"
          rel="noopener noreferrer"
          href="http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/public/docs/"
          aria-label="Documentación de la API"
        >
          <img src={IsoAPI} alt="" aria-hidden="true" />
        </a>
      </nav>
    </footer>
  );
};

export default Footer;