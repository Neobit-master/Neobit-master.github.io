import { ReactNode } from 'react';
import { useLocation } from 'wouter';
import Header from '../components/organisms/Header';
import Footer from '../components/molecules/Footer';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  const [location] = useLocation();
  const dark = location === '/';
  return (
    <div className="layoutWS">
      <a href="#main-content" className="skip-link">
        Saltar al contenido principal
      </a>
      <Header dark={dark} />
      <main id="main-content" role="main">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;