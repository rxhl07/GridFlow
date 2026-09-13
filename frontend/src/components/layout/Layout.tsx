import React from 'react';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
  title: string;
  noPadding?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ children, title, noPadding }) => {
  return (
    <div className="flex min-h-screen bg-[#F8F9FA]">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Header title={title} />
        <main className={`flex-1 overflow-y-auto ${noPadding ? '' : 'p-8'}`}>
          {children}
        </main>
      </div>
    </div>
  );
};

export default Layout;
