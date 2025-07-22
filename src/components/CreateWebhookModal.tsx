
import React, { useState, useEffect } from 'react';
import { X, Plus } from 'lucide-react';
import { Switch } from './ui/switch';

interface CreateWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (data: any) => void;
  editingWebhook?: any;
}

export const CreateWebhookModal: React.FC<CreateWebhookModalProps> = ({
  isOpen,
  onClose,
  onCreateWebhook,
  editingWebhook
}) => {
  const [formData, setFormData] = useState({
    subscriberUrl: '',
    eventTriggers: [] as string[],
    payloadTemplate: 'default',
    customPayload: '',
    showCustomPayload: false,
    enableWebhook: true
  });

  useEffect(() => {
    if (editingWebhook) {
      setFormData({
        subscriberUrl: editingWebhook.url,
        eventTriggers: editingWebhook.events,
        payloadTemplate: 'default',
        customPayload: '',
        showCustomPayload: false,
        enableWebhook: editingWebhook.active
      });
    } else {
      setFormData({
        subscriberUrl: '',
        eventTriggers: [],
        payloadTemplate: 'default',
        customPayload: '',
        showCustomPayload: false,
        enableWebhook: true
      });
    }
  }, [editingWebhook, isOpen]);

  const eventOptions = [
    'BOOKING_CREATED',
    'BOOKING_RESCHEDULED',
    'BOOKING_CANCELLED',
    'MEETING_ENDED',
    'FORM_SUBMITTED',
    'BOOKING_PAID',
    'BOOKING_REQUESTED'
  ];

  const handleEventToggle = (event: string) => {
    setFormData(prev => ({
      ...prev,
      eventTriggers: prev.eventTriggers.includes(event)
        ? prev.eventTriggers.filter(e => e !== event)
        : [...prev.eventTriggers, event]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWebhook(formData);
    onClose();
  };

  const handlePayloadTemplateChange = (template: string) => {
    setFormData(prev => ({
      ...prev,
      payloadTemplate: template,
      showCustomPayload: template === 'custom'
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">
            {editingWebhook ? 'Edit Webhook' : 'Create Webhook'}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Subscriber URL</label>
            <input
              type="url"
              value={formData.subscriberUrl}
              onChange={e => setFormData(prev => ({ ...prev, subscriberUrl: e.target.value }))}
              placeholder="https://example.com/webhook"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Triggers</label>
            <div className="space-y-2 max-h-32 overflow-y-auto">
              {eventOptions.map(event => (
                <div key={event} className="flex items-center">
                  <input
                    type="checkbox"
                    id={event}
                    checked={formData.eventTriggers.includes(event)}
                    onChange={() => handleEventToggle(event)}
                    className="mr-2"
                  />
                  <label htmlFor={event} className="text-sm">{event}</label>
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Payload Template</label>
            <div className="space-y-2">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="default"
                  name="payloadTemplate"
                  value="default"
                  checked={formData.payloadTemplate === 'default'}
                  onChange={e => handlePayloadTemplateChange(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="default" className="text-sm">Default</label>
              </div>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="custom"
                  name="payloadTemplate"
                  value="custom"
                  checked={formData.payloadTemplate === 'custom'}
                  onChange={e => handlePayloadTemplateChange(e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="custom" className="text-sm">Custom</label>
              </div>
            </div>
            
            {formData.showCustomPayload && (
              <div className="mt-3">
                <textarea
                  value={formData.customPayload}
                  onChange={e => setFormData(prev => ({ ...prev, customPayload: e.target.value }))}
                  placeholder="Enter your custom payload template..."
                  rows={4}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-webhook"
                checked={formData.enableWebhook}
                onCheckedChange={checked => setFormData(prev => ({ ...prev, enableWebhook: checked }))}
              />
              <label htmlFor="enable-webhook" className="text-sm">Enable Webhook</label>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
