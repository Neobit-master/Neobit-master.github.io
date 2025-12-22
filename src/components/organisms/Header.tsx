import { Link } from 'wouter';
import logoWhite from '../../../images/logoWhite.svg';
import logoBlack from '../../../images/logoBlack.svg';
import Menu from '../molecules/Menu';
import { cn } from '../../utils/cn';

interface HeaderProps {
  dark?: boolean;
}

const Header = ({ dark }: HeaderProps) => {
  const headerClass = cn('header', dark && 'header-dark');
  return (
    <header className={headerClass} role="banner">
      <Link to="/" aria-label="Ir al inicio">
        <img src={(dark && logoWhite) || logoBlack} alt="Neobit logo" />
      </Link>
      <Menu dark={dark} />
    </header>
  );
};

export default Header;