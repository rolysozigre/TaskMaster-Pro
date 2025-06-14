import Navbar from './Navbar';
import Sidebar from './Sidebar';
import type { ReactNode } from 'react';

interface LayoutProps {
  children: ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className="d-flex">
      <Sidebar />
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
