import classNames from 'classnames';
import { Link } from 'wouter';

interface MenuProps {
  dark?: boolean;
}

const Menu = ({ dark }: MenuProps) => {
  const menuClass = classNames({
    menu: true,
    'menu-dark': dark
  });
  return (
    <nav aria-label="Navegación principal">
      <ul className={menuClass} role="menubar">
        <li role="none"><Link to="/" role="menuitem">Inicio</Link></li>
        <li role="none"><Link to="/astheroids" role="menuitem">Descubre</Link></li>
        <li role="none"><Link to="/gallery" role="menuitem">Galería</Link></li>
      </ul>
    </nav>
  );
};

export default Menu;