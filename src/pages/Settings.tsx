
import React, { useEffect } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import { SettingsSidebar } from '../components/SettingsSidebar';

export interface HeaderMeta {
  title: string;
  description?: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onTitleChange?: (title: string) => void;
}

export const Settings = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isRootSettings = location.pathname === '/settings';

  useEffect(() => {
    if (isRootSettings) {
      navigate('/settings/profile', { replace: true });
    }
  }, [isRootSettings, navigate]);

  return (
    <div className="min-h-screen bg-background text-foreground flex pb-16">
      <SettingsSidebar />
      <div className="flex-1 ml-64">       
        <main className="relative z-0">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
