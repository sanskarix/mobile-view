
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
  const [formData, setFormData] = useState({
    subscriberUrl: '',
    enableWebhook: true,
    eventTriggers: [] as string[],
    secret: '',
    payloadTemplate: 'default',
    customPayload: '',
    waitTime: '24',
    waitUnit: 'mins'
  });

  const [showCustomPayload, setShowCustomPayload] = useState(false);

  const eventOptions = [
    'Booking Canceled', 'Booking Created', 'Booking Rejected', 'Booking Requested',
    'Booking Payment Initiated', 'Booking Rescheduled', 'Booking Paid', 'Booking No-Show Updated',
    'Meeting Ended', 'Meeting Started', 'Recording Download Link Ready', 'Out of Office Created',
    'Transcript Generated', 'After hosts didn\'t join cal video', 'After guests didn\'t join cal video'
  ];

  useEffect(() => {
    if (editingWebhook) {
      setFormData({
        subscriberUrl: editingWebhook.url || '',
        enableWebhook: editingWebhook.active || true,
        eventTriggers: editingWebhook.events || [],
        secret: '',
        payloadTemplate: 'default',
        customPayload: '',
        waitTime: '24',
        waitUnit: 'mins'
      });
    } else {
      setFormData({
        subscriberUrl: '',
        enableWebhook: true,
        eventTriggers: [],
        secret: '',
        payloadTemplate: 'default',
        customPayload: '',
        waitTime: '24',
        waitUnit: 'mins'
      });
    }
  }, [editingWebhook, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWebhook(formData);
    onClose();
  };

  const handleEventToggle = (event: string) => {
    setFormData(prev => ({
      ...prev,
      eventTriggers: prev.eventTriggers.includes(event)
        ? prev.eventTriggers.filter(e => e !== event)
        : [...prev.eventTriggers, event]
    }));
  };

  const removeEventTrigger = (event: string) => {
    setFormData(prev => ({
      ...prev,
      eventTriggers: prev.eventTriggers.filter(e => e !== event)
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-start justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl my-8">
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {editingWebhook ? 'Edit Webhook' : 'Create Webhook'}
            </h2>
            <p className="text-sm text-gray-500 mt-1">
              Create a webhook for this team event type
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X className="h-5 w-5 text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Subscriber URL
            </label>
            <input
              type="url"
              value={formData.subscriberUrl}
              onChange={e => setFormData(prev => ({ ...prev, subscriberUrl: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="https://example.com/webhook"
              required
            />
          </div>

          <div className="flex items-center space-x-3">
            <Switch
              checked={formData.enableWebhook}
              onCheckedChange={value => setFormData(prev => ({ ...prev, enableWebhook: value }))}
            />
            <label className="text-sm font-medium text-gray-700">
              Enable Webhook
            </label>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Event Triggers
            </label>
            
            {/* Selected Event Triggers */}
            {formData.eventTriggers.length > 0 && (
              <div className="mb-4 p-4 bg-gray-50 rounded-lg">
                <div className="flex flex-wrap gap-2">
                  {formData.eventTriggers.map(event => (
                    <span
                      key={event}
                      className="inline-flex items-center px-3 py-1 rounded-full text-sm bg-blue-100 text-blue-800"
                    >
                      {event}
                      <button
                        type="button"
                        onClick={() => removeEventTrigger(event)}
                        className="ml-2 p-0.5 hover:bg-blue-200 rounded-full"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* Event Options */}
            <div className="border border-gray-200 rounded-lg p-4 max-h-48 overflow-y-auto">
              <div className="space-y-2">
                {eventOptions.map(event => (
                  <label
                    key={event}
                    className="flex items-center space-x-3 p-2 hover:bg-gray-50 rounded cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      checked={formData.eventTriggers.includes(event)}
                      onChange={() => handleEventToggle(event)}
                      className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700">{event}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              How long after the users don't show up on cal video meeting?
            </label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.waitTime}
                onChange={e => setFormData(prev => ({ ...prev, waitTime: e.target.value }))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
              <select
                value={formData.waitUnit}
                onChange={e => setFormData(prev => ({ ...prev, waitUnit: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Secret
            </label>
            <input
              type="text"
              value={formData.secret}
              onChange={e => setFormData(prev => ({ ...prev, secret: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Optional webhook secret"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              Payload Template
            </label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, payloadTemplate: 'default' }));
                  setShowCustomPayload(false);
                }}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  formData.payloadTemplate === 'default'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => {
                  setFormData(prev => ({ ...prev, payloadTemplate: 'custom' }));
                  setShowCustomPayload(true);
                }}
                className={`px-4 py-2 rounded-lg border font-medium transition-colors ${
                  formData.payloadTemplate === 'custom'
                    ? 'bg-blue-50 border-blue-200 text-blue-700'
                    : 'bg-white border-gray-200 text-gray-700 hover:bg-gray-50'
                }`}
              >
                Custom
              </button>
            </div>

            {showCustomPayload && (
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Custom Payload
                </label>
                <textarea
                  value={formData.customPayload}
                  onChange={e => setFormData(prev => ({ ...prev, customPayload: e.target.value }))}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  rows={8}
                  placeholder="Enter your custom payload template here..."
                />
              </div>
            )}
          </div>

          <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-lg hover:bg-blue-700 transition-colors"
            >
              {editingWebhook ? 'Update Webhook' : 'Create Webhook'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
