
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Switch } from './ui/switch';

interface CreateWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (data: any) => void;
  editingWebhook?: any;
}

export const CreateWebhookModal = ({ isOpen, onClose, onCreateWebhook, editingWebhook }: CreateWebhookModalProps) => {
  const [subscriberUrl, setSubscriberUrl] = useState('');
  const [eventTriggers, setEventTriggers] = useState<string[]>([]);
  const [enableWebhook, setEnableWebhook] = useState(true);
  const [payloadTemplate, setPayloadTemplate] = useState('default');
  const [customPayload, setCustomPayload] = useState('');

  useEffect(() => {
    if (editingWebhook) {
      setSubscriberUrl(editingWebhook.url || '');
      setEventTriggers(editingWebhook.events || []);
      setEnableWebhook(editingWebhook.active ?? true);
    } else {
      setSubscriberUrl('');
      setEventTriggers([]);
      setEnableWebhook(true);
      setPayloadTemplate('default');
      setCustomPayload('');
    }
  }, [editingWebhook, isOpen]);

  const availableEvents = [
    'BOOKING_CREATED',
    'BOOKING_RESCHEDULED',
    'BOOKING_CANCELLED',
    'MEETING_ENDED',
    'BOOKING_CONFIRMED',
    'BOOKING_REJECTED',
    'FORM_SUBMITTED',
    'BOOKING_PAID'
  ];

  const handleEventToggle = (event: string) => {
    setEventTriggers(prev => 
      prev.includes(event) 
        ? prev.filter(e => e !== event)
        : [...prev, event]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWebhook({
      subscriberUrl,
      eventTriggers,
      enableWebhook,
      payloadTemplate,
      customPayload: payloadTemplate === 'custom' ? customPayload : ''
    });
    
    // Reset form
    setSubscriberUrl('');
    setEventTriggers([]);
    setEnableWebhook(true);
    setPayloadTemplate('default');
    setCustomPayload('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">
            {editingWebhook ? 'Edit Webhook' : 'Create New Webhook'}
          </h2>
          <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">
              Subscriber URL *
            </label>
            <input
              type="url"
              value={subscriberUrl}
              onChange={(e) => setSubscriberUrl(e.target.value)}
              placeholder="https://example.com/webhook"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              style={{ height: '40px' }}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Event Triggers *
            </label>
            <div className="grid grid-cols-2 gap-3">
              {availableEvents.map(event => (
                <label key={event} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={eventTriggers.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="rounded border-gray-300"
                  />
                  <span className="text-sm">{event}</span>
                </label>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">
              Payload Template
            </label>
            <div className="space-y-3">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payloadTemplate"
                  value="default"
                  checked={payloadTemplate === 'default'}
                  onChange={(e) => setPayloadTemplate(e.target.value)}
                />
                <span className="text-sm">Default</span>
              </label>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="payloadTemplate"
                  value="custom"
                  checked={payloadTemplate === 'custom'}
                  onChange={(e) => setPayloadTemplate(e.target.value)}
                />
                <span className="text-sm">Custom</span>
              </label>
            </div>
            
            {payloadTemplate === 'custom' && (
              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Custom Payload JSON
                </label>
                <textarea
                  value={customPayload}
                  onChange={(e) => setCustomPayload(e.target.value)}
                  placeholder='{"event": "{{event}}", "data": "{{data}}"}'
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 font-mono text-sm"
                  rows={6}
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <label className="flex items-center space-x-2 cursor-pointer">
              <Switch checked={enableWebhook} onCheckedChange={setEnableWebhook} />
              <span className="text-sm font-medium">Enable Webhook</span>
            </label>
          </div>

          <div className="flex items-center justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!subscriberUrl || eventTriggers.length === 0}
              className="px-4 py-2 bg-blue-600 text-white rounded-md text-sm font-medium hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
