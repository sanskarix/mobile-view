
import React from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { BottomNavigation } from './BottomNavigation';

export interface HeaderMeta {
  title: string;
  description?: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onTitleChange?: (title: string) => void;
}

export const Layout = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main className="pb-16">
        <Outlet />
      </main>
      <BottomNavigation />
    </div>
  );
};
