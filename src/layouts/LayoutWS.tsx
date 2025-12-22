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
      <Header dark={dark} />
      <section>
        {children}
      </section>
      <Footer />
    </div>
  );
};

export default Layout;