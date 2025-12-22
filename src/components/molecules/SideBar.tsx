import { Link, useLocation } from 'wouter';
import logo from '../../../images/logoDS.svg';

const SideBar = () => {
  const [location] = useLocation();

  return (
    <div className="sidebar">
      <Link to="/ds"><img src={logo} alt="" /></Link>
      <nav>
        <ul>
          <li>
            <Link to="/ds/atoms" className={location === '/ds/atoms' ? 'selected' : ''}>
              Atomos
            </Link>
          </li>
          <li>
            <Link to="/ds/molecules" className={location === '/ds/molecules' ? 'selected' : ''}>
              Moléculas
            </Link>
          </li>
          <li>
            <Link to="/ds/organisms" className={location === '/ds/organisms' ? 'selected' : ''}>
              Organismos
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default SideBar;