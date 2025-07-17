
import React from 'react';
import { Plus, Webhook } from 'lucide-react';

export const EventWebhooks = () => {
  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Webhook className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No webhooks configured</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
          Set up webhooks to automatically send booking data to your applications and services.
        </p>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm mx-auto">
          <Plus className="h-4 w-4 mr-2" />
          Add Webhook
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Webhook events</h3>
        <p className="text-muted-foreground mb-6 text-sm">Configure which events should trigger your webhooks</p>
        
        <div className="space-y-3">
          {[
            {
              event: 'Booking Created',
              description: 'Triggered when a new booking is made',
              enabled: false
            },
            {
              event: 'Booking Cancelled',
              description: 'Triggered when a booking is cancelled',
              enabled: false
            },
            {
              event: 'Booking Rescheduled',
              description: 'Triggered when a booking is rescheduled',
              enabled: false
            },
            {
              event: 'Meeting Started',
              description: 'Triggered when a meeting begins',
              enabled: false
            },
            {
              event: 'Meeting Ended',
              description: 'Triggered when a meeting ends',
              enabled: false
            }
          ].map((webhook, index) => (
            <div key={index} className="flex items-center justify-between p-4 border border-border rounded-lg bg-card">
              <div>
                <h4 className="font-medium text-foreground text-sm">{webhook.event}</h4>
                <p className="text-muted-foreground text-xs">{webhook.description}</p>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-xs text-muted-foreground">
                  {webhook.enabled ? 'Enabled' : 'Disabled'}
                </span>
                <button className="px-3 py-1.5 text-xs text-foreground border border-border rounded-md hover:bg-muted transition-colors font-medium">
                  Configure
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
