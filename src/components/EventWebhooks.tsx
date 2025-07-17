
import React, { useState } from 'react';
import { Plus, Webhook, X, ExternalLink } from 'lucide-react';
import { CreateWebhookModal } from './CreateWebhookModal';

interface WebhookConfig {
  id: string;
  name: string;
  url: string;
  events: string[];
  active: boolean;
}

export const EventWebhooks = () => {
  const [webhooks, setWebhooks] = useState<WebhookConfig[]>([]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleCreateWebhook = (webhookData: any) => {
    const webhook: WebhookConfig = {
      id: Date.now().toString(),
      name: `Webhook ${webhooks.length + 1}`,
      url: webhookData.subscriberUrl,
      events: webhookData.eventTriggers,
      active: webhookData.enableWebhook
    };
    setWebhooks(prev => [...prev, webhook]);
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Webhooks</h3>
            <p className="text-sm text-muted-foreground">
              Configure webhooks to receive real-time notifications when events occur.
            </p>
          </div>
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Webhook
          </button>
        </div>

        {webhooks.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Webhook className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium text-foreground">No webhooks configured</h4>
              <p className="text-sm text-muted-foreground">
                Create your first webhook to receive event notifications.
              </p>
              <button
                onClick={() => setShowCreateModal(true)}
                className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
              >
                Create Webhook
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {webhooks.map(webhook => (
              <div key={webhook.id} className="p-4 border border-border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-lg flex items-center justify-center">
                      <Webhook className="h-4 w-4 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-medium text-foreground text-sm">{webhook.name}</h4>
                      <p className="text-xs text-muted-foreground">{webhook.url}</p>
                    </div>
                  </div>
                  <button
                    onClick={() => deleteWebhook(webhook.id)}
                    className="text-destructive hover:text-destructive/80 p-1"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.slice(0, 3).map(event => (
                    <span key={event} className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      {event}
                    </span>
                  ))}
                  {webhook.events.length > 3 && (
                    <span className="px-2 py-1 bg-muted text-muted-foreground text-xs rounded-full">
                      +{webhook.events.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        <CreateWebhookModal
          isOpen={showCreateModal}
          onClose={() => setShowCreateModal(false)}
          onCreateWebhook={handleCreateWebhook}
        />
      </div>
    </div>
  );
};
