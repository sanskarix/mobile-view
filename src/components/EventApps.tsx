
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

interface App {
  id: string;
  name: string;
  description: string;
  category: string;
  enabled: boolean;
  installed: boolean;
}

export const EventApps = () => {
  const [apps, setApps] = useState<App[]>([
    {
      id: 'zoom',
      name: 'Zoom',
      description: 'Video conferencing with Zoom',
      category: 'Video',
      enabled: true,
      installed: true
    },
    {
      id: 'google-meet',
      name: 'Google Meet',
      description: 'Video conferencing with Google Meet',
      category: 'Video',
      enabled: false,
      installed: true
    },
    {
      id: 'calendly',
      name: 'Calendly',
      description: 'Import events from Calendly',
      category: 'Import',
      enabled: false,
      installed: false
    },
    {
      id: 'slack',
      name: 'Slack',
      description: 'Send notifications to Slack',
      category: 'Notifications',
      enabled: false,
      installed: true
    }
  ]);

  const toggleApp = (appId: string) => {
    setApps(apps.map(app => 
      app.id === appId ? { ...app, enabled: !app.enabled } : app
    ));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Apps</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Connect third-party applications to enhance your event type functionality.
          </p>
        </div>

        <div className="space-y-4">
          {apps.map((app) => (
            <div key={app.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-muted rounded-lg flex items-center justify-center">
                  <span className="text-lg font-semibold text-muted-foreground">
                    {app.name.charAt(0)}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-foreground">{app.name}</h4>
                    <Badge variant={app.installed ? "default" : "secondary"}>
                      {app.installed ? "Installed" : "Not Installed"}
                    </Badge>
                    <Badge variant="outline">{app.category}</Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{app.description}</p>
                </div>
              </div>

              <div className="flex items-center space-x-3">
                {app.installed ? (
                  <Switch
                    checked={app.enabled}
                    onCheckedChange={() => toggleApp(app.id)}
                  />
                ) : (
                  <button className="px-3 py-1 text-sm bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                    Install
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="border-t border-border pt-6">
          <div className="text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Looking for more apps?
            </p>
            <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
              Browse App Store
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
