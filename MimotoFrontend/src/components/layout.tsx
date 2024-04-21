import React, { ReactNode } from 'react';
import Sidebar from './Sidebar';
import '../app/globals.css';

interface LayoutProps {
  children: ReactNode;
}

const Layout = ({ children }: LayoutProps) => {
  return (
    <div className="layout">
      <Sidebar />
      <main className="content">{children}</main>

      <style jsx>{`
        .layout {
          display: flex;
          flex-direction: row; // ensure items are laid out in a row
          min-height: 100vh;
        }
        .content {
          flex-grow: 1; // content takes up the remaining space
          margin-left: 210px; // same as the sidebar width
          padding: 2rem; // add padding for content
          overflow-y: auto; // in case of scrolling
        }
      `}</style>
    </div>
  );
};

export default Layout;
