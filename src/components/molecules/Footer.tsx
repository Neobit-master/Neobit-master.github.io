import { FaGithub } from 'react-icons/fa';
import { Link } from 'wouter';
import IsoDS from '../../../images/DS.svg';
import IsoAPI from '../../../images/API.svg';

const Footer = () => {
  return (
    <footer className="footer-social">
      <p>Copyrigth © By Platzi Master</p>
      <div className="social">
        <a target="_blank" rel="noopener noreferrer" href="https://github.com/WS-Jedp/NeoBit">
          <FaGithub />
        </a>
        <Link to="/ds/">
          <img src={IsoDS} alt="Isotipo del sistema de diseño" />
        </Link>
        <a target="_blank" rel="noopener noreferrer" href="http://ec2-54-234-62-6.compute-1.amazonaws.com:8080/public/docs/">
          <img src={IsoAPI} alt="Isotipo de la API" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;