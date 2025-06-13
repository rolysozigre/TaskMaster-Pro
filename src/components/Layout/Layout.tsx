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
        <Navbar />
        <main className="p-4">{children}</main>
      </div>
    </div>
  );
}

export default Layout;
