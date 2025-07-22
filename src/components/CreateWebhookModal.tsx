
import React, { useState, useEffect, useRef } from 'react';
import { X, Plus, Activity } from 'lucide-react';
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
    eventTriggersInput: '',
    showEventTriggerDropdown: false,
    payloadTemplate: 'default',
    customPayload: '',
    enableWebhook: true,
    secret: '',
    noShowDuration: '24',
    noShowUnit: 'mins',
    testResponse: ''
  });

  const dropdownRef = useRef<HTMLDivElement>(null);

  const availableEventTriggers = [
    'Booking Canceled',
    'Booking Created', 
    'Booking Rejected',
    'Booking Requested',
    'Booking Payment Initiated',
    'Booking Rescheduled',
    'Booking Paid',
    'Booking No-Show Updated',
    'Meeting Ended',
    'Meeting Started',
    'Recording Download Link Ready',
    'Out of Office Created',
    'Transcript Generated',
    'After hosts didn\'t join cal video',
    'After guests didn\'t join cal video'
  ];

  useEffect(() => {
    if (editingWebhook) {
      setFormData({
        subscriberUrl: editingWebhook.url,
        eventTriggers: editingWebhook.events,
        eventTriggersInput: '',
        showEventTriggerDropdown: false,
        payloadTemplate: 'default',
        customPayload: '',
        enableWebhook: editingWebhook.active,
        secret: '',
        noShowDuration: '24',
        noShowUnit: 'mins',
        testResponse: ''
      });
    } else {
      setFormData({
        subscriberUrl: '',
        eventTriggers: [],
        eventTriggersInput: '',
        showEventTriggerDropdown: false,
        payloadTemplate: 'default',
        customPayload: '',
        enableWebhook: true,
        secret: '',
        noShowDuration: '24',
        noShowUnit: 'mins',
        testResponse: ''
      });
    }
  }, [editingWebhook, isOpen]);

  const addEventTrigger = (trigger: string) => {
    if (trigger && !formData.eventTriggers.includes(trigger)) {
      setFormData(prev => ({
        ...prev,
        eventTriggers: [...prev.eventTriggers, trigger],
        showEventTriggerDropdown: false
      }));
    }
  };

  const removeEventTrigger = (trigger: string) => {
    setFormData(prev => ({
      ...prev,
      eventTriggers: prev.eventTriggers.filter(t => t !== trigger)
    }));
  };

  const getAvailableTriggers = () => {
    return availableEventTriggers.filter(trigger => 
      !formData.eventTriggers.includes(trigger) &&
      trigger.toLowerCase().includes(formData.eventTriggersInput.toLowerCase())
    );
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setFormData(prev => ({ ...prev, showEventTriggerDropdown: false }));
      }
    };

    if (formData.showEventTriggerDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [formData.showEventTriggerDropdown]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreateWebhook(formData);
    onClose();
  };

  const handlePingTest = () => {
    // Simulate ping test
    setFormData(prev => ({
      ...prev,
      testResponse: 'No data yet'
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold">Create Webhook</h2>
            <p className="text-sm text-gray-600">Create a webhook for this team event type</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Subscriber URL</label>
            <input
              type="url"
              value={formData.subscriberUrl}
              onChange={e => setFormData(prev => ({ ...prev, subscriberUrl: e.target.value }))}
              placeholder=""
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Switch
                id="enable-webhook"
                checked={formData.enableWebhook}
                onCheckedChange={checked => setFormData(prev => ({ ...prev, enableWebhook: checked }))}
              />
              <label htmlFor="enable-webhook" className="text-sm font-medium">Enable Webhook</label>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Event Triggers</label>
            
            {/* Event Triggers Input Field with Tags */}
            <div className="relative" ref={dropdownRef}>
              <div 
                className="w-full min-h-[120px] px-3 py-2 border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-blue-500 bg-white flex flex-wrap content-start gap-2"
              >
                {/* Selected Event Trigger Tags */}
                {formData.eventTriggers.map(trigger => (
                  <span
                    key={trigger}
                    className="inline-flex items-center px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded border"
                  >
                    {trigger}
                    <button
                      type="button"
                      onClick={() => removeEventTrigger(trigger)}
                      className="ml-1 text-gray-500 hover:text-gray-600"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  </span>
                ))}
                
                {/* Input for typing */}
                <input
                  type="text"
                  value={formData.eventTriggersInput}
                  onChange={e => setFormData(prev => ({ 
                    ...prev, 
                    eventTriggersInput: e.target.value,
                    showEventTriggerDropdown: true
                  }))}
                  onFocus={() => setFormData(prev => ({ ...prev, showEventTriggerDropdown: true }))}
                  placeholder={formData.eventTriggers.length === 0 ? "Type to search event triggers..." : ""}
                  className="flex-1 min-w-[200px] outline-none text-sm"
                />
              </div>
              
              {/* Dropdown for available triggers */}
              {formData.showEventTriggerDropdown && getAvailableTriggers().length > 0 && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-48 overflow-y-auto">
                  {getAvailableTriggers().map(trigger => (
                    <button
                      key={trigger}
                      type="button"
                      onClick={() => addEventTrigger(trigger)}
                      className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm"
                    >
                      {trigger}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">How long after the users don't show up on cal video meeting?</label>
            <div className="flex items-center space-x-2">
              <input
                type="number"
                value={formData.noShowDuration}
                onChange={e => setFormData(prev => ({ ...prev, noShowDuration: e.target.value }))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <select
                value={formData.noShowUnit}
                onChange={e => setFormData(prev => ({ ...prev, noShowUnit: e.target.value }))}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
              >
                <option value="mins">mins</option>
                <option value="hours">hours</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Secret</label>
            <input
              type="password"
              value={formData.secret}
              onChange={e => setFormData(prev => ({ ...prev, secret: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-3">Payload Template</label>
            <div className="flex space-x-4">
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, payloadTemplate: 'default' }))}
                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                  formData.payloadTemplate === 'default'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Default
              </button>
              <button
                type="button"
                onClick={() => setFormData(prev => ({ ...prev, payloadTemplate: 'custom' }))}
                className={`px-4 py-2 border rounded-lg text-sm transition-colors ${
                  formData.payloadTemplate === 'custom'
                    ? 'border-blue-500 bg-blue-50 text-blue-700'
                    : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                }`}
              >
                Custom
              </button>
            </div>
            
            {formData.payloadTemplate === 'custom' && (
              <div className="mt-4">
                <textarea
                  value={formData.customPayload}
                  onChange={e => setFormData(prev => ({ ...prev, customPayload: e.target.value }))}
                  placeholder="Enter your custom payload template..."
                  rows={6}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-sm font-mono"
                />
              </div>
            )}
          </div>

          {/* Ping Test Section */}
          <div className="border-t pt-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-medium">Webhook test</h3>
                <p className="text-sm text-gray-600">Please ping test before creating.</p>
              </div>
              <button
                type="button"
                onClick={handlePingTest}
                className="flex items-center px-4 py-2 border border-gray-300 rounded-lg text-sm hover:bg-gray-50 transition-colors"
              >
                <Activity className="h-4 w-4 mr-2" />
                Ping test
              </button>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Webhook response</label>
              <div className="p-4 bg-gray-50 border border-gray-200 rounded-lg min-h-[80px]">
                <p className="text-sm text-gray-600">
                  {formData.testResponse || 'No data yet'}
                </p>
              </div>
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
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
