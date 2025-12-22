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
    <ul className={menuClass}>
      <li><Link to="/">Inicio</Link></li>
      <li><Link to="/astheroids">Descubre</Link></li>
      <li><Link to="/gallery">Galería</Link></li>
    </ul>
  );
};

export default Menu;