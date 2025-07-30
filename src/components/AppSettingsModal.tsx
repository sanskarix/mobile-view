import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { X, ExternalLink } from 'lucide-react';

interface AppSettingsModalProps {
  app: {
    id: string;
    name: string;
    description: string;
    logo: string;
  };
  isOpen: boolean;
  onClose: () => void;
}

const appTemplates = {
  zapier: [
    { name: 'Email Automation', url: 'https://zapier.com/templates/email-automation' },
    { name: 'Slack Notifications', url: 'https://zapier.com/templates/slack-notifications' },
    { name: 'Google Sheets Integration', url: 'https://zapier.com/templates/google-sheets' },
    { name: 'CRM Sync', url: 'https://zapier.com/templates/crm-sync' },
  ],
  plausible: [
    { name: 'Analytics Dashboard', url: 'https://plausible.io/dashboard' },
    { name: 'Custom Events', url: 'https://plausible.io/docs/custom-events' },
    { name: 'Goal Tracking', url: 'https://plausible.io/docs/goal-conversions' },
  ],
  'google-analytics': [
    { name: 'GA4 Setup', url: 'https://analytics.google.com/analytics/web/' },
    { name: 'Conversion Tracking', url: 'https://support.google.com/analytics/answer/1032415' },
    { name: 'Custom Reports', url: 'https://support.google.com/analytics/answer/1151300' },
  ],
  default: [
    { name: 'Getting Started Guide', url: '#' },
    { name: 'Integration Templates', url: '#' },
    { name: 'Best Practices', url: '#' },
  ],
};

export const AppSettingsModal: React.FC<AppSettingsModalProps> = ({
  app,
  isOpen,
  onClose,
}) => {
  const templates = appTemplates[app.id] || appTemplates.default;

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle className="flex items-center justify-between">
            <span>Get started with {app.name} templates</span>
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="h-6 w-6 p-0"
            >
              <X className="h-4 w-4" />
            </Button>
          </DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 gap-3 mt-4">
          {templates.map((template, index) => (
            <Button
              key={index}
              variant="outline"
              className="justify-between h-auto p-4"
              onClick={() => window.open(template.url, '_blank')}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">{app.logo}</span>
                <span className="font-medium">{template.name}</span>
              </div>
              <ExternalLink className="h-4 w-4" />
            </Button>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
};