
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
    <div className="p-0 max-w-none mx-auto space-y-6 text-sm" style={{ color: '#384252' }}>
      {webhooks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Webhook className="h-6 w-6 text-gray-400" />
          </div>
          <p className="text-gray-500 mb-4 text-sm">No webhooks configured</p>
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 text-sm font-medium">
            Create Webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-semibold" style={{ color: '#384252' }}>Configured Webhooks</h3>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center px-3 py-2 text-sm bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium">
              <Plus className="h-4 w-4 mr-1" />
              Create Webhook
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map(webhook => (
              <div key={webhook.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Webhook className="h-4 w-4 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-medium text-sm" style={{ color: '#384252' }}>{webhook.name}</h4>
                      <p className="text-xs text-gray-500">{webhook.url}</p>
                    </div>
                  </div>
                  <button onClick={() => deleteWebhook(webhook.id)} className="text-red-500 hover:text-red-700 p-1">
                    <X className="h-4 w-4" />
                  </button>
                </div>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.slice(0, 3).map(event => (
                    <span key={event} className="px-2 py-1 bg-gray-100 text-xs rounded-full" style={{ color: '#384252' }}>
                      {event}
                    </span>
                  ))}
                  {webhook.events.length > 3 && (
                    <span className="px-2 py-1 bg-gray-100 text-xs rounded-full" style={{ color: '#384252' }}>
                      +{webhook.events.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <CreateWebhookModal isOpen={showCreateModal} onClose={() => setShowCreateModal(false)} onCreateWebhook={handleCreateWebhook} />
    </div>
  );
};
