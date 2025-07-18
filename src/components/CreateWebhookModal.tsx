import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (webhookData: any) => void;
}

export const CreateWebhookModal: React.FC<CreateWebhookModalProps> = ({ isOpen, onClose, onCreateWebhook }) => {
  const [subscriberUrl, setSubscriberUrl] = useState('');
  const [eventTriggers, setEventTriggers] = useState<string[]>([]);
  const [enableWebhook, setEnableWebhook] = useState(true);

  const events = [
    'event.type.created',
    'event.type.updated',
    'event.type.deleted',
    'event.scheduled',
    'event.rescheduled',
    'event.canceled',
    'attendee.created',
    'attendee.updated',
    'attendee.deleted'
  ];

  const toggleEvent = (event: string) => {
    if (eventTriggers.includes(event)) {
      setEventTriggers(prev => prev.filter(e => e !== event));
    } else {
      setEventTriggers(prev => [...prev, event]);
    }
  };

  const handleSubmit = () => {
    const webhookData = {
      subscriberUrl,
      eventTriggers,
      enableWebhook
    };
    onCreateWebhook(webhookData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md max-h-[80vh] overflow-hidden flex flex-col" style={{ fontSize: '14px', color: '#384252' }}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <h2 className="font-semibold" style={{ fontSize: '16px', color: '#384252' }}>Create New Webhook</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Subscriber URL</label>
            <input
              type="url"
              value={subscriberUrl}
              onChange={e => setSubscriberUrl(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              placeholder="https://example.com/webhooks"
              style={{ fontSize: '14px', color: '#384252' }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Event Triggers</label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {events.map(event => (
                <label key={event} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={eventTriggers.includes(event)}
                    onChange={() => toggleEvent(event)}
                    className="rounded text-blue-500 focus:ring-blue-500"
                  />
                  <span style={{ fontSize: '14px', color: '#384252' }}>{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="checkbox"
              checked={enableWebhook}
              onChange={e => setEnableWebhook(e.target.checked)}
              className="rounded text-blue-500 focus:ring-blue-500"
            />
            <label className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Enable Webhook</label>
          </div>
        </div>
        
        <div className="border-t border-gray-200 p-4 flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50" style={{ fontSize: '14px' }}>
            Cancel
          </button>
          <button onClick={handleSubmit} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" style={{ fontSize: '14px' }}>
            Create Webhook
          </button>
        </div>
      </div>
    </div>
  );
};
