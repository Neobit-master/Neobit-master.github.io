import classNames from 'classnames';
import { Link } from 'react-router-dom';
import logoWhite from '../../../images/logoWhite.svg';
import logoBlack from '../../../images/logoBlack.svg';
import Menu from '../molecules/Menu';

interface HeaderProps {
  dark?: boolean;
}

const Header = ({ dark }: HeaderProps) => {
  const headerClass = classNames({
    header: true,
    'header-dark': dark
  });
  return (
    <header className={headerClass}>
      <Link to="/"><img src={(dark && logoWhite) || logoBlack} alt="Neobit logo" /></Link>
      <Menu dark={dark} />
    </header>
  );
};

export default Header;