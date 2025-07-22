
import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Header } from './Header';
import { useHeader } from '../contexts/HeaderContext';

export interface HeaderMeta {
  title: string;
  description?: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
}

export const Layout = () => {
  const [darkMode, setDarkMode] = useState(false);
  const { headerMeta } = useHeader();
  
  return (
    <div className={darkMode ? 'dark' : ''}>
      <div className="min-h-screen bg-background text-foreground flex">
        <Sidebar darkMode={darkMode} setDarkMode={setDarkMode} />
        <div className="flex-1 ml-64">
          <Header metaData={headerMeta}/>          
          <main className="relative z-0">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  );
};
