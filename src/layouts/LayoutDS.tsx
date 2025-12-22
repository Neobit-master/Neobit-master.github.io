import { ReactNode } from 'react';
import SideBar from '../components/molecules/SideBar';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="designSystem">
      <SideBar />
      <section className="designSystem--content">
        {children}
      </section>
    </div>
  );
};

export default Layout;