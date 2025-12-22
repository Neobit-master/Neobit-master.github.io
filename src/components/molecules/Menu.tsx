import { Link } from 'wouter';
import { cn } from '../../utils/cn';

interface MenuProps {
  dark?: boolean;
}

const Menu = ({ dark }: MenuProps) => {
  const menuClass = cn('menu', dark && 'menu-dark');
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