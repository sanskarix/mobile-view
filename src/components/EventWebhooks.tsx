
import React, { useState } from 'react';
import { Plus, ExternalLink, Trash2, Edit } from 'lucide-react';

const webhookEvents = [
  'booking.created',
  'booking.cancelled',
  'booking.rescheduled',
  'booking.completed',
  'meeting.started',
  'meeting.ended'
];

const sampleWebhooks = [
  {
    id: '1',
    name: 'Slack Notifications',
    url: 'https://hooks.slack.com/services/T00000000/B00000000/XXXXXXXXXXXXXXXXXXXXXXXX',
    events: ['booking.created', 'booking.cancelled'],
    active: true
  },
  {
    id: '2',
    name: 'CRM Integration',
    url: 'https://api.example.com/webhooks/calendar',
    events: ['booking.created', 'booking.completed'],
    active: false
  }
];

export const EventWebhooks = () => {
  const [webhooks, setWebhooks] = useState(sampleWebhooks);
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-foreground">Webhooks</h3>
          <button 
            onClick={() => setShowForm(true)}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </button>
        </div>

        {webhooks.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <p>No webhooks configured yet.</p>
            <p className="text-sm">Add a webhook to receive real-time notifications about booking events.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {webhooks.map(webhook => (
              <div key={webhook.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <h4 className="font-medium text-foreground">{webhook.name}</h4>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        webhook.active 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-gray-100 text-gray-800'
                      }`}>
                        {webhook.active ? 'Active' : 'Inactive'}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground mb-2 font-mono">{webhook.url}</p>
                    <div className="flex flex-wrap gap-1">
                      {webhook.events.map(event => (
                        <span key={event} className="inline-flex items-center px-2 py-1 rounded-md text-xs bg-muted text-muted-foreground">
                          {event}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button className="p-2 text-muted-foreground hover:text-foreground transition-colors">
                      <Edit className="h-4 w-4" />
                    </button>
                    <button className="p-2 text-muted-foreground hover:text-destructive transition-colors">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {showForm && (
          <div className="p-4 border border-border rounded-lg bg-muted/30">
            <h4 className="font-medium text-foreground mb-4">Add New Webhook</h4>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Name</label>
                <input 
                  type="text" 
                  placeholder="My Webhook"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">URL</label>
                <input 
                  type="url" 
                  placeholder="https://example.com/webhook"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">Events</label>
                <div className="grid grid-cols-2 gap-2">
                  {webhookEvents.map(event => (
                    <label key={event} className="flex items-center space-x-2">
                      <input type="checkbox" className="rounded" />
                      <span className="text-sm">{event}</span>
                    </label>
                  ))}
                </div>
              </div>
              <div className="flex justify-end space-x-3">
                <button 
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-sm border border-border rounded-lg hover:bg-muted transition-colors"
                >
                  Cancel
                </button>
                <button className="px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors">
                  Add Webhook
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
