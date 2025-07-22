
import React, { useState } from 'react';
import { Plus, Webhook, X, ExternalLink, Edit, Settings } from 'lucide-react';
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
  const [hoveredWebhookId, setHoveredWebhookId] = useState<string | null>(null);

  const handleCreateWebhook = (webhookData: any) => {
    const webhook: WebhookConfig = {
      id: Date.now().toString(),
      name: `Webhook ${webhooks.length + 1}`,
      url: webhookData.subscriberUrl,
      events: webhookData.eventTriggers,
      active: webhookData.enableWebhook
    };
    setWebhooks(prev => [...prev, webhook]);
    setShowCreateModal(false);
  };

  const handleEditWebhook = (webhookData: any) => {
    if (editingWebhook) {
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
      setShowCreateModal(false);
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

  const openEditModal = (webhook: WebhookConfig) => {
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
          <button onClick={() => setShowCreateModal(true)} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" style={{ fontSize: '14px' }}>
            Create Webhook
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Configured Webhooks</h3>
            <button onClick={() => setShowCreateModal(true)} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" style={{ fontSize: '14px' }}>
              <Plus className="h-4 w-4 mr-1" />
              Create Webhook
            </button>
          </div>

          <div className="space-y-3">
            {webhooks.map(webhook => (
              <div key={webhook.id} className="p-4 border border-gray-200 rounded-lg bg-white">
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center space-x-3 flex-1">
                    <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                      <Webhook className="h-4 w-4 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>{webhook.name}</h4>
                      <p style={{ fontSize: '12px', color: '#384252' }}>{webhook.url}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-3">
                    <Switch 
                      checked={webhook.active} 
                      onCheckedChange={() => toggleWebhook(webhook.id)}
                    />
                    <button 
                      onClick={() => openEditModal(webhook)}
                      className="text-blue-600 hover:text-blue-700 p-1"
                      title="Edit webhook"
                    >
                      <Edit className="h-4 w-4" />
                    </button>
                    <button 
                      onClick={() => deleteWebhook(webhook.id)} 
                      className="text-red-500 hover:text-red-700 p-1"
                      title="Delete webhook"
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2">
                  {webhook.events.slice(0, 3).map(event => (
                    <span key={event} className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full" style={{ fontSize: '12px' }}>
                      {event}
                    </span>
                  ))}
                  {webhook.events.length > 3 && (
                    <div className="relative">
                      <span 
                        className="px-2 py-1 bg-gray-100 text-gray-700 rounded-full cursor-help" 
                        style={{ fontSize: '12px' }}
                        onMouseEnter={() => setHoveredWebhookId(webhook.id)}
                        onMouseLeave={() => setHoveredWebhookId(null)}
                      >
                        +{webhook.events.length - 3} more
                      </span>
                      
                      {hoveredWebhookId === webhook.id && (
                        <div className="absolute bottom-full left-0 mb-2 p-3 bg-gray-900 text-white text-xs rounded-md shadow-lg z-50 min-w-max">
                          <div className="space-y-1">
                            {webhook.events.slice(3).map(event => (
                              <div key={event}>{event}</div>
                            ))}
                          </div>
                          <div className="absolute top-full left-4 border-4 border-transparent border-t-gray-900"></div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-6 pt-4 border-t border-gray-200">
            <p style={{ fontSize: '14px', color: '#384252' }}>
              If you wish to edit or manage your web hooks, please head over to{' '}
              <a 
                href="/settings/webhooks" 
                className="text-blue-600 hover:text-blue-700 hover:underline"
              >
                webhook settings
              </a>
            </p>
          </div>
        </div>
      )}

      <CreateWebhookModal 
        isOpen={showCreateModal} 
        onClose={closeModal} 
        onCreateWebhook={editingWebhook ? handleEditWebhook : handleCreateWebhook}
        editingWebhook={editingWebhook}
      />
    </div>
  );
};
