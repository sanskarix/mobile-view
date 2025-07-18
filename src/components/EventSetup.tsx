
import React, { useState } from 'react';
import { Link, Settings, Copy, Eye } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventSetup = () => {
  const [eventData, setEventData] = useState({
    title: 'Product Hunt Chats',
    url: 'product-hunt-chats',
    description: 'A quick chat to know more about the product you\'re building and how OneHash Cal can help you schedule appointments.',
    duration: '15',
    bufferBefore: '0',
    bufferAfter: '0',
    maxBookings: '',
    location: 'google-meet',
    requiresBookerEmailVerification: false,
    disableGuests: false,
    hideNotes: false,
    lockTimezone: false,
    translate: false,
    allowBookerToSelectDuration: false
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setEventData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-8" style={{ fontSize: '14px', color: '#384252' }}>
      {/* Event Details */}
      <div className="space-y-6">
        <div>
          <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Event name *
          </label>
          <input
            type="text"
            value={eventData.title}
            onChange={(e) => handleInputChange('title', e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg"
            style={{ fontSize: '14px' }}
          />
        </div>

        <div>
          <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            URL
          </label>
          <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
            <span className="px-3 py-2 bg-gray-50 text-gray-600" style={{ fontSize: '14px' }}>
              cal.id/sanskar/
            </span>
            <input
              type="text"
              value={eventData.url}
              onChange={(e) => handleInputChange('url', e.target.value)}
              className="flex-1 px-3 py-2 border-0 outline-none"
              style={{ fontSize: '14px' }}
            />
            <div className="flex items-center px-3 space-x-2">
              <Copy className="h-4 w-4 text-gray-600" />
              <Eye className="h-4 w-4 text-gray-600" />
            </div>
          </div>
        </div>

        <div>
          <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Description
          </label>
          <textarea
            value={eventData.description}
            onChange={(e) => handleInputChange('description', e.target.value)}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg resize-none"
            style={{ fontSize: '14px' }}
          />
        </div>
      </div>

      {/* Duration Settings */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="font-medium mb-6" style={{ fontSize: '14px', color: '#384252' }}>Duration</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Length
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={eventData.duration}
                onChange={(e) => handleInputChange('duration', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg mr-2"
                style={{ fontSize: '14px' }}
              />
              <span style={{ fontSize: '14px', color: '#384252' }}>mins</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Buffer before
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={eventData.bufferBefore}
                onChange={(e) => handleInputChange('bufferBefore', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg mr-2"
                style={{ fontSize: '14px' }}
              />
              <span style={{ fontSize: '14px', color: '#384252' }}>mins</span>
            </div>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Buffer after
            </label>
            <div className="flex items-center">
              <input
                type="number"
                value={eventData.bufferAfter}
                onChange={(e) => handleInputChange('bufferAfter', e.target.value)}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg mr-2"
                style={{ fontSize: '14px' }}
              />
              <span style={{ fontSize: '14px', color: '#384252' }}>mins</span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <Switch 
              checked={eventData.translate}
              onCheckedChange={(value) => handleInputChange('translate', value)}
            />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Translate
            </label>
          </div>

          <div className="flex items-center space-x-4">
            <Switch 
              checked={eventData.allowBookerToSelectDuration}
              onCheckedChange={(value) => handleInputChange('allowBookerToSelectDuration', value)}
            />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Allow booker to select duration
            </label>
          </div>
        </div>
      </div>

      {/* Location */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="font-medium mb-6" style={{ fontSize: '14px', color: '#384252' }}>Location</h3>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="google-meet"
              name="location"
              value="google-meet"
              checked={eventData.location === 'google-meet'}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <label htmlFor="google-meet" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
              <span>📹</span>
              <span>Google Meet</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="zoom"
              name="location"
              value="zoom"
              checked={eventData.location === 'zoom'}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <label htmlFor="zoom" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
              <span>📹</span>
              <span>Zoom</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="phone"
              name="location"
              value="phone"
              checked={eventData.location === 'phone'}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <label htmlFor="phone" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
              <span>📞</span>
              <span>Phone call</span>
            </label>
          </div>

          <div className="flex items-center space-x-3">
            <input
              type="radio"
              id="in-person"
              name="location"
              value="in-person"
              checked={eventData.location === 'in-person'}
              onChange={(e) => handleInputChange('location', e.target.value)}
            />
            <label htmlFor="in-person" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
              <span>📍</span>
              <span>In-person meeting</span>
            </label>
          </div>
        </div>
      </div>

      {/* Additional Options */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="font-medium mb-6" style={{ fontSize: '14px', color: '#384252' }}>Additional Options</h3>
        
        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Max bookings per day
            </label>
            <input
              type="number"
              value={eventData.maxBookings}
              onChange={(e) => handleInputChange('maxBookings', e.target.value)}
              placeholder="Unlimited"
              className="w-full md:w-1/3 px-3 py-2 border border-gray-300 rounded-lg"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-4">
              <Switch 
                checked={eventData.requiresBookerEmailVerification}
                onCheckedChange={(value) => handleInputChange('requiresBookerEmailVerification', value)}
              />
              <label style={{ fontSize: '14px', color: '#384252' }}>
                Requires booker email verification
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <Switch 
                checked={eventData.disableGuests}
                onCheckedChange={(value) => handleInputChange('disableGuests', value)}
              />
              <label style={{ fontSize: '14px', color: '#384252' }}>
                Disable guests
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <Switch 
                checked={eventData.hideNotes}
                onCheckedChange={(value) => handleInputChange('hideNotes', value)}
              />
              <label style={{ fontSize: '14px', color: '#384252' }}>
                Hide notes in calendar
              </label>
            </div>

            <div className="flex items-center space-x-4">
              <Switch 
                checked={eventData.lockTimezone}
                onCheckedChange={(value) => handleInputChange('lockTimezone', value)}
              />
              <label style={{ fontSize: '14px', color: '#384252' }}>
                Lock timezone on booking page
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
