
import React, { useState } from 'react';
import { Plus, ExternalLink } from 'lucide-react';
import { Switch } from './ui/switch';

const availableApps = [
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Video conferencing with Zoom',
    icon: '🎥',
    installed: true,
    enabled: true
  },
  {
    id: 'google-calendar',
    name: 'Google Calendar',
    description: 'Sync with Google Calendar',
    icon: '📅',
    installed: true,
    enabled: true
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Send notifications to Slack',
    icon: '💬',
    installed: false,
    enabled: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Connect with 3000+ apps',
    icon: '⚡',
    installed: false,
    enabled: false
  }
];

export const EventApps = () => {
  const [apps, setApps] = useState(availableApps);

  const toggleApp = (appId: string) => {
    setApps(prev => prev.map(app => 
      app.id === appId ? { ...app, enabled: !app.enabled } : app
    ));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Connected Apps</h3>
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Browse Apps
          </button>
        </div>

        <div className="space-y-3">
          {apps.map(app => (
            <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-3">
                <div className="w-10 h-10 rounded-lg bg-muted flex items-center justify-center">
                  <span className="text-lg">{app.icon}</span>
                </div>
                <div>
                  <h4 className="font-medium text-foreground">{app.name}</h4>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                {!app.installed ? (
                  <button className="flex items-center px-3 py-1 text-sm text-primary border border-primary rounded hover:bg-primary/10 transition-colors">
                    Install
                    <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                ) : (
                  <Switch 
                    checked={app.enabled} 
                    onCheckedChange={() => toggleApp(app.id)} 
                  />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
