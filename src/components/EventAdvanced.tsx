
import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, ExternalLink, Copy, Users } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventAdvanced = () => {
  const [settings, setSettings] = useState({
    eventTypeColor: true,
    hideNotesInCalendar: true,
    disableCancelReschedule: true,
    hideCalendarEventDetails: true,
    redirectOnBooking: true,
    privateLinks: true,
    offerSeats: true,
    shareAttendeeInfo: false,
    showAvailableSeats: true,
    lockTimezoneOnBooking: true,
    requiresConfirmation: false,
    enableCaptcha: true,
    requiresEmailVerification: true,
    eventLayout: 'month',
    redirectUrl: 'https://example.com/redirect-to-my-success-page',
    privateUrl: 'https://cal.id/d/8PbkRpaPETyarTmT8ooyy/product-hunt-chats',
    seats: 2
  });

  const layoutOptions = [
    {
      id: 'month',
      name: 'Month',
      icon: Monitor,
      description: 'Monthly calendar view',
      image: '/lovable-uploads/ddd1363c-3f5b-4bb2-80fb-ba17af1d3406.png'
    },
    {
      id: 'week',
      name: 'Weekly',
      icon: Smartphone,
      description: 'Weekly calendar view',
      image: '/lovable-uploads/9e8be59c-be3a-4863-84f1-0aea0f9736c3.png'
    },
    {
      id: 'column',
      name: 'Column',
      icon: Tablet,
      description: 'Column layout view',
      image: '/lovable-uploads/250cba12-30a8-4629-9401-ee5a78dee766.png'
    }
  ];

  const handleToggle = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleCopyPrivateLink = () => {
    navigator.clipboard.writeText(settings.privateUrl);
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8">
      {/* Event type color */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Event type color</h3>
            <p className="text-sm text-gray-500">This is only used for event type & booking differentiation within the app. It is not displayed to bookers.</p>
          </div>
          <Switch checked={settings.eventTypeColor} onCheckedChange={(value) => handleToggle('eventTypeColor', value)} />
        </div>
        
        {settings.eventTypeColor && (
          <div className="mt-4 pl-4 space-y-3">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Event Type Color (Light Theme)</label>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-blue-500 rounded border"></div>
                <span className="text-sm text-gray-600">007ee5</span>
              </div>
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">Event Type Color (Dark Theme)</label>
              <div className="flex items-center space-x-2">
                <input 
                  type="text" 
                  value="fafafa" 
                  className="px-3 py-2 border border-gray-300 rounded-lg text-sm w-32"
                />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Hide notes in calendar */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Hide notes in calendar</h3>
          <p className="text-sm text-gray-500">For privacy reasons, additional inputs and notes will be hidden in the calendar entry. They will still be sent to your email.</p>
        </div>
        <Switch checked={settings.hideNotesInCalendar} onCheckedChange={(value) => handleToggle('hideNotesInCalendar', value)} />
      </div>

      {/* Disable Cancel and Reschedule options */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Disable Cancel and Reschedule options for this event type</h3>
          <p className="text-sm text-gray-500">Attendees will not be able to cancel or reschedule their bookings</p>
        </div>
        <Switch checked={settings.disableCancelReschedule} onCheckedChange={(value) => handleToggle('disableCancelReschedule', value)} />
      </div>

      {/* Hide calendar event details */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Hide calendar event details on shared calendars</h3>
          <p className="text-sm text-gray-500">When a calendar is shared, events are visible to readers but their details are hidden from those without write access.</p>
        </div>
        <Switch checked={settings.hideCalendarEventDetails} onCheckedChange={(value) => handleToggle('hideCalendarEventDetails', value)} />
      </div>

      {/* Redirect on booking */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Redirect on booking</h3>
            <p className="text-sm text-gray-500">Redirect to a custom URL after a successful booking</p>
          </div>
          <Switch checked={settings.redirectOnBooking} onCheckedChange={(value) => handleToggle('redirectOnBooking', value)} />
        </div>
        
        {settings.redirectOnBooking && (
          <div className="mt-4 pl-4">
            <input 
              type="url" 
              value={settings.redirectUrl}
              onChange={(e) => setSettings(prev => ({ ...prev, redirectUrl: e.target.value }))}
              placeholder="https://example.com/redirect-to-my-success-page"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
            />
            <div className="flex items-center mt-2">
              <input type="checkbox" id="forward-params" className="mr-2" />
              <label htmlFor="forward-params" className="text-sm text-gray-600">
                Forward parameters such as ?email=...&name=... and more
              </label>
            </div>
          </div>
        )}
      </div>

      {/* Private Links */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Private Links</h3>
            <p className="text-sm text-gray-500">Generate private URLs without exposing the username, which will be destroyed once used</p>
          </div>
          <Switch checked={settings.privateLinks} onCheckedChange={(value) => handleToggle('privateLinks', value)} />
        </div>
        
        {settings.privateLinks && (
          <div className="mt-4 pl-4">
            <div className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
              <span className="text-sm text-gray-700 flex-1">{settings.privateUrl}</span>
              <button
                onClick={handleCopyPrivateLink}
                className="p-1 hover:bg-gray-200 rounded"
                title="Copy private link"
              >
                <Copy className="h-4 w-4 text-gray-500" />
              </button>
            </div>
            <button className="mt-2 text-sm text-blue-600 hover:text-blue-700">
              + Add new link
            </button>
          </div>
        )}
      </div>

      {/* Offer seats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Offer seats</h3>
            <p className="text-sm text-gray-500">Offer seats for booking. This automatically disables guest & opt-in bookings.</p>
          </div>
          <Switch checked={settings.offerSeats} onCheckedChange={(value) => handleToggle('offerSeats', value)} />
        </div>
        
        {settings.offerSeats && (
          <div className="mt-4 pl-4 space-y-4">
            <div className="flex items-center space-x-4">
              <input 
                type="number" 
                value={settings.seats}
                onChange={(e) => setSettings(prev => ({ ...prev, seats: parseInt(e.target.value) }))}
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
              <span className="text-sm text-gray-600">seats</span>
            </div>
            
            <div>
              <h4 className="text-sm font-medium text-gray-700 mb-2">Share attendee information between guests</h4>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="share-attendee-info"
                  checked={settings.shareAttendeeInfo}
                  onChange={(e) => handleToggle('shareAttendeeInfo', e.target.checked)}
                />
                <label htmlFor="share-attendee-info" className="text-sm text-gray-600">
                  Show the number of available seats
                </label>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Lock timezone */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Lock timezone on booking page</h3>
          <p className="text-sm text-gray-500">To lock the timezone on booking page, useful for in-person events.</p>
        </div>
        <Switch checked={settings.lockTimezoneOnBooking} onCheckedChange={(value) => handleToggle('lockTimezoneOnBooking', value)} />
      </div>

      {/* Booking questions */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Booking questions</h3>
        <p className="text-sm text-gray-600 mb-4">Customize the questions asked on the booking page</p>
        
        <div className="space-y-4">
          {/* Questions list would go here based on the image */}
          <div className="text-sm text-gray-500">Questions configuration would be implemented here</div>
        </div>
      </div>

      {/* Add to calendar */}
      <div className="border-t border-gray-200 pt-6 space-y-6">
        <div>
          <h3 className="text-base font-semibold text-gray-900 mb-2">Add to calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Default sanskarix@gmail.com (Google Calendar - sanskarix@gmail.com)</option>
              </select>
              <p className="text-xs text-gray-500 mt-1">The calendar to add bookings to</p>
            </div>
            <div>
              <input 
                type="text"
                placeholder="Product Hunt Chats between Sanskar Yadav and {Scheduler}"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
              />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-2 mb-4">
            <input type="checkbox" id="use-organizer-email" />
            <label htmlFor="use-organizer-email" className="text-sm text-gray-700">
              Use "Add to calendar" email as the organizer
            </label>
          </div>
          <select className="w-full md:w-1/2 px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Default sanskarix@gmail.com</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">We'll display this email address as the organizer, and send confirmation emails here.</p>
        </div>
      </div>

      {/* Layout */}
      <div className="border-t border-gray-200 pt-6">
        <h3 className="text-base font-semibold text-gray-900 mb-4">Layout</h3>
        <p className="text-sm text-gray-600 mb-4">You can select multiple and your bookers can switch views.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {layoutOptions.map(layout => (
            <div key={layout.id} className="space-y-2">
              <div 
                className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all aspect-video ${
                  settings.eventLayout === layout.id 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => setSettings(prev => ({ ...prev, eventLayout: layout.id }))}
              >
                <img 
                  src={layout.image} 
                  alt={layout.name}
                  className="w-full h-full object-cover rounded"
                />
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  checked={settings.eventLayout === layout.id}
                  onChange={() => setSettings(prev => ({ ...prev, eventLayout: layout.id }))}
                />
                <label className="text-sm font-medium text-gray-700">{layout.name}</label>
              </div>
              <p className="text-xs text-gray-500">Default view</p>
            </div>
          ))}
        </div>
      </div>

      {/* Additional settings */}
      <div className="border-t border-gray-200 pt-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Requires confirmation</h3>
            <p className="text-sm text-gray-500">The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.</p>
          </div>
          <Switch checked={settings.requiresConfirmation} onCheckedChange={(value) => handleToggle('requiresConfirmation', value)} />
        </div>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-sm font-medium text-gray-700">Enable captcha on Booking page</h3>
              <p className="text-sm text-gray-500">By enabling captcha, you'll prevent automated bots from booking you.</p>
            </div>
            <Switch checked={settings.enableCaptcha} onCheckedChange={(value) => handleToggle('enableCaptcha', value)} />
          </div>
          
          {settings.enableCaptcha && (
            <div className="pl-4">
              <label className="block text-sm text-gray-600 mb-2">Select captcha strength</label>
              <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
                <option>Medium</option>
                <option>Low</option>
                <option>High</option>
              </select>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Requires booker email verification</h3>
            <p className="text-sm text-gray-500">To ensure booker's email verification before scheduling events</p>
          </div>
          <Switch checked={settings.requiresEmailVerification} onCheckedChange={(value) => handleToggle('requiresEmailVerification', value)} />
        </div>
      </div>
    </div>
  );
};
