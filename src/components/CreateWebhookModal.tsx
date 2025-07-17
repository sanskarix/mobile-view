
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Switch } from './ui/switch';

interface CreateWebhookModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateWebhook: (webhookData: any) => void;
}

export const CreateWebhookModal = ({ isOpen, onClose, onCreateWebhook }: CreateWebhookModalProps) => {
  const [webhookData, setWebhookData] = useState({
    subscriberUrl: '',
    enableWebhook: true,
    eventTriggers: [
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
      'Instant Meeting Created',
      'Out of Office Created',
      'Transcript Generated',
      'After hosts didn\'t join cal video',
      'After guests didn\'t join cal video'
    ],
    noShowTimeout: 5,
    secret: '',
    payloadTemplate: 'Default'
  });

  const [availableTriggers] = useState([
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
    'Instant Meeting Created',
    'Out of Office Created',
    'Transcript Generated',
    'After hosts didn\'t join cal video',
    'After guests didn\'t join cal video'
  ]);

  const [newTrigger, setNewTrigger] = useState('');
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [pingTestResult, setPingTestResult] = useState('No data yet');

  const filteredSuggestions = availableTriggers.filter(trigger => 
    !webhookData.eventTriggers.includes(trigger) && 
    trigger.toLowerCase().includes(newTrigger.toLowerCase())
  );

  const handleAddTrigger = (trigger: string) => {
    if (!webhookData.eventTriggers.includes(trigger)) {
      setWebhookData(prev => ({
        ...prev,
        eventTriggers: [...prev.eventTriggers, trigger]
      }));
    }
    setNewTrigger('');
    setShowSuggestions(false);
  };

  const handleRemoveTrigger = (trigger: string) => {
    setWebhookData(prev => ({
      ...prev,
      eventTriggers: prev.eventTriggers.filter(t => t !== trigger)
    }));
  };

  const handlePingTest = () => {
    setPingTestResult('Testing...');
    setTimeout(() => {
      setPingTestResult('Success');
    }, 1000);
  };

  const handleCreateWebhook = () => {
    onCreateWebhook(webhookData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between p-6 border-b border-gray-200 flex-shrink-0">
          <div>
            <h3 className="text-lg font-semibold">Create Webhook</h3>
            <p className="text-sm text-gray-600">Create a webhook for this team event type</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto">
          <div className="p-6 space-y-6">
            {/* Subscriber URL */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Subscriber URL</label>
              <input 
                type="url" 
                value={webhookData.subscriberUrl}
                onChange={e => setWebhookData(prev => ({ ...prev, subscriberUrl: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Enable Webhook Toggle */}
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium text-gray-700">Enable Webhook</span>
              <Switch 
                checked={webhookData.enableWebhook}
                onCheckedChange={checked => setWebhookData(prev => ({ ...prev, enableWebhook: checked }))}
              />
            </div>

            {/* Event Triggers */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">Event Triggers</label>
              
              {/* Add new trigger input */}
              <div className="relative mb-3">
                <input
                  type="text"
                  value={newTrigger}
                  onChange={(e) => {
                    setNewTrigger(e.target.value);
                    setShowSuggestions(e.target.value.length > 0);
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && filteredSuggestions.length > 0) {
                      handleAddTrigger(filteredSuggestions[0]);
                    }
                  }}
                  placeholder="Type to search and add triggers..."
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
                
                {/* Suggestions dropdown */}
                {showSuggestions && filteredSuggestions.length > 0 && (
                  <div className="absolute top-full left-0 right-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
                    {filteredSuggestions.map(trigger => (
                      <button
                        key={trigger}
                        onClick={() => handleAddTrigger(trigger)}
                        className="w-full text-left px-3 py-2 hover:bg-gray-50 text-sm border-b border-gray-100 last:border-b-0"
                      >
                        {trigger}
                      </button>
                    ))}
                  </div>
                )}
              </div>
              
              {/* Selected triggers */}
              <div className="border border-gray-300 rounded-lg p-3 max-h-32 overflow-y-auto">
                <div className="flex flex-wrap gap-2">
                  {webhookData.eventTriggers.map(trigger => (
                    <span 
                      key={trigger}
                      className="inline-flex items-center px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                    >
                      {trigger}
                      <button
                        onClick={() => handleRemoveTrigger(trigger)}
                        className="ml-2 text-gray-500 hover:text-gray-700"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* No-show timeout */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                How long after the users don't show up on cal video meeting?
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={webhookData.noShowTimeout}
                  onChange={e => setWebhookData(prev => ({ ...prev, noShowTimeout: parseInt(e.target.value) }))}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg"
                />
                <span className="text-sm text-gray-600">mins</span>
              </div>
            </div>

            {/* Secret */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Secret</label>
              <input 
                type="password" 
                value={webhookData.secret}
                onChange={e => setWebhookData(prev => ({ ...prev, secret: e.target.value }))}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>

            {/* Payload Template */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Payload Template</label>
              <div className="flex space-x-2">
                <button 
                  onClick={() => setWebhookData(prev => ({ ...prev, payloadTemplate: 'Default' }))}
                  className={`px-4 py-2 text-sm rounded border ${
                    webhookData.payloadTemplate === 'Default' 
                      ? 'bg-gray-200 border-gray-300' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Default
                </button>
                <button
                  onClick={() => setWebhookData(prev => ({ ...prev, payloadTemplate: 'Custom' }))}
                  className={`px-4 py-2 text-sm rounded border ${
                    webhookData.payloadTemplate === 'Custom' 
                      ? 'bg-gray-200 border-gray-300' 
                      : 'bg-white border-gray-300 hover:bg-gray-50'
                  }`}
                >
                  Custom
                </button>
              </div>
            </div>

            {/* Webhook test */}
            <div className="border-t pt-6">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h4 className="text-sm font-medium text-gray-700">Webhook test</h4>
                  <p className="text-sm text-gray-500">Please ping test before creating.</p>
                </div>
                <button
                  onClick={handlePingTest}
                  className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded border"
                >
                  🏓 Ping test
                </button>
              </div>

              <div>
                <h5 className="text-sm font-medium text-gray-700 mb-2">Webhook response</h5>
                <div className="bg-gray-50 p-3 rounded border text-sm text-gray-600">
                  {pingTestResult}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 p-6 border-t border-gray-200 flex-shrink-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-gray-600 hover:text-gray-800"
          >
            Cancel
          </button>
          <button 
            onClick={handleCreateWebhook}
            disabled={!webhookData.subscriberUrl}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-sm font-medium"
          >
            Create Webhook
          </button>
        </div>
      </div>
    </div>
  );
};
