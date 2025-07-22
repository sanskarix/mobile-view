
import React, { useState } from 'react';
import { Plus, Webhook, Trash2, Edit, MoreHorizontal } from 'lucide-react';
import { Switch } from './ui/switch';
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
  const [editingWebhook, setEditingWebhook] = useState<WebhookConfig | null>(null);
  const [hoveredWebhook, setHoveredWebhook] = useState<string | null>(null);

  const handleCreateWebhook = (webhookData: any) => {
    if (editingWebhook) {
      // Update existing webhook
      setWebhooks(prev => prev.map(w => 
        w.id === editingWebhook.id 
          ? {
              ...w,
              url: webhookData.subscriberUrl,
              events: webhookData.eventTriggers,
              active: webhookData.enableWebhook
            }
          : w
      ));
      setEditingWebhook(null);
    } else {
      // Create new webhook
      const webhook: WebhookConfig = {
        id: Date.now().toString(),
        name: `Webhook ${webhooks.length + 1}`,
        url: webhookData.subscriberUrl,
        events: webhookData.eventTriggers,
        active: webhookData.enableWebhook
      };
      setWebhooks(prev => [...prev, webhook]);
    }
  };

  const deleteWebhook = (id: string) => {
    setWebhooks(prev => prev.filter(w => w.id !== id));
  };

  const toggleWebhook = (id: string) => {
    setWebhooks(prev => prev.map(w => 
      w.id === id ? { ...w, active: !w.active } : w
    ));
  };

  const editWebhook = (webhook: WebhookConfig) => {
    setEditingWebhook(webhook);
    setShowCreateModal(true);
  };

  const closeModal = () => {
    setShowCreateModal(false);
    setEditingWebhook(null);
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6" style={{ fontSize: '14px', color: '#384252' }}>
      {webhooks.length === 0 ? (
        <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
            <Webhook className="h-6 w-6 text-gray-400" />
          </div>
          <p className="mb-4" style={{ fontSize: '14px', color: '#384252' }}>No webhooks configured</p>
          <button 
            onClick={() => setShowCreateModal(true)} 
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" 
            style={{ fontSize: '14px' }}
          >
            Create Webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Configured Webhooks</h3>
            <button 
              onClick={() => setShowCreateModal(true)} 
              className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" 
              style={{ fontSize: '14px' }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Create Webhook
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map(webhook => (
              <div 
                key={webhook.id} 
                className={`p-4 border rounded-lg transition-colors ${
                  webhook.active 
                    ? 'border-emerald-200 bg-emerald-50' 
                    : 'border-gray-200 bg-white'
                }`}
                onMouseEnter={() => setHoveredWebhook(webhook.id)}
                onMouseLeave={() => setHoveredWebhook(null)}
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                      webhook.active ? 'bg-emerald-100' : 'bg-blue-100'
                    }`}>
                      <Webhook className={`h-4 w-4 ${
                        webhook.active ? 'text-emerald-600' : 'text-blue-600'
                      }`} />
                    </div>
                    <div>
                      <h4 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                        {webhook.name}
                      </h4>
                      <p style={{ fontSize: '12px', color: '#384252' }}>{webhook.url}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-3">
                    <Switch
                      checked={webhook.active}
                      onCheckedChange={() => toggleWebhook(webhook.id)}
                    />
                    <button
                      onClick={() => editWebhook(webhook)}
                      className="px-3 py-1 text-sm text-blue-600 hover:text-blue-700 hover:bg-blue-50 rounded font-medium transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteWebhook(webhook.id)}
                      className="p-1 hover:bg-gray-200 rounded text-red-500 hover:text-red-700"
                      title="Delete webhook"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 relative">
                  {webhook.events.slice(0, 3).map(event => (
                    <span 
                      key={event} 
                      className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full" 
                      style={{ fontSize: '12px' }}
                    >
                      {event}
                    </span>
                  ))}
                  {webhook.events.length > 3 && (
                    <div className="relative">
                      <span 
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full cursor-help" 
                        style={{ fontSize: '12px' }}
                      >
                        +{webhook.events.length - 3} more
                      </span>
                      {hoveredWebhook === webhook.id && (
                        <div className="absolute bottom-full left-0 mb-2 p-2 bg-gray-800 text-white text-xs rounded shadow-lg z-10 whitespace-nowrap">
                          {webhook.events.slice(3).join(', ')}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="text-center pt-4 border-t border-gray-200">
            <p style={{ fontSize: '14px', color: '#384252' }}>
              If you wish to edit or manage your webhooks, please head over to{' '}
              <a href="/settings/webhooks" className="text-blue-600 hover:text-blue-700 underline">
                webhook settings
              </a>
            </p>
          </div>
        </div>
      )}

      <CreateWebhookModal 
        isOpen={showCreateModal} 
        onClose={closeModal} 
        onCreateWebhook={handleCreateWebhook}
        editingWebhook={editingWebhook}
      />
    </div>
  );
};
