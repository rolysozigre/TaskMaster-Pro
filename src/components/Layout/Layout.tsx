import { useUI } from '../../context/UIContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  const { isMenuOpen } = useUI(); 
  return (
    <div className="d-flex">
      <div className={`d-none d-md-block ${isMenuOpen ? 'd-block' : ''}`}>
      <Sidebar />
      </div>
      <div className="flex-grow-1">
        <div className="layout-page">
        <Navbar />
        <div className="content-wrapper" style={{ overflowY: 'auto', flex: 1, minHeight: 0 }}>{children}</div>
        </div>
      </div>
    </div>
  );
}

export default Layout;
