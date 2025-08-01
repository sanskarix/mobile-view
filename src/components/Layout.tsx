import React, { useState } from 'react';
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
  const [headerMeta, setHeaderMeta] = useState<HeaderMeta>({
    title: '',
    description: '',
  });  

  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header metaData={headerMeta} />
      <main className="pb-16 md:pb-0">
        <Outlet context={{ setHeaderMeta }} />
      </main>
      <BottomNavigation />
    </div>
  );
};
