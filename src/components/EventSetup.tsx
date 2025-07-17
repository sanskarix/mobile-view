
import React, { useState } from 'react';
import { Globe, Lock, Video, MapPin, Phone, Plus, X, ExternalLink } from 'lucide-react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const EventSetup = () => {
  const [eventTitle, setEventTitle] = useState('Sample Event Type');
  const [description, setDescription] = useState('A quick sample event between you and me');
  const [duration, setDuration] = useState(30);
  const [bookingWindow, setBookingWindow] = useState('7 days');
  const [isPublic, setIsPublic] = useState(true);
  const [locations, setLocations] = useState([
    { id: '1', type: 'video', name: 'Google Meet', icon: Video, active: false },
    { id: '2', type: 'phone', name: 'Phone call', icon: Phone, active: true },
    { id: '3', type: 'location', name: 'In-person meeting', icon: MapPin, active: false }
  ]);

  const toggleLocation = (id: string) => {
    setLocations(prev => prev.map(loc => 
      loc.id === id ? { ...loc, active: !loc.active } : loc
    ));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6 text-sm" style={{ color: '#384252' }}>
      {/* Event Title */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: '#384252' }}>Event name</label>
        <Input 
          value={eventTitle}
          onChange={(e) => setEventTitle(e.target.value)}
          className="text-sm"
          style={{ color: '#384252' }}
        />
      </div>

      {/* Event URL */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: '#384252' }}>Event link</label>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">cal.com/sanskar-yadav/</span>
          <Input 
            value="sample-event-type"
            className="flex-1 text-sm"
            style={{ color: '#384252' }}
          />
          <button className="text-blue-600 hover:text-blue-700">
            <ExternalLink className="h-4 w-4" />
          </button>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: '#384252' }}>Description</label>
        <Textarea 
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
          className="text-sm"
          style={{ color: '#384252' }}
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="block text-sm font-medium" style={{ color: '#384252' }}>Duration</label>
        <div className="flex items-center space-x-4">
          <Input 
            type="number"
            value={duration}
            onChange={(e) => setDuration(Number(e.target.value))}
            className="w-20 text-sm"
            style={{ color: '#384252' }}
          />
          <span className="text-sm" style={{ color: '#384252' }}>minutes</span>
        </div>
      </div>

      {/* Location */}
      <div className="space-y-4">
        <label className="block text-sm font-medium" style={{ color: '#384252' }}>Location</label>
        <div className="space-y-3">
          {locations.map((location) => (
            <div 
              key={location.id}
              className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer transition-colors ${
                location.active ? 'border-blue-200 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
              }`}
              onClick={() => toggleLocation(location.id)}
            >
              <div className="flex items-center space-x-3">
                <location.icon className="h-4 w-4" style={{ color: '#384252' }} />
                <span className="text-sm" style={{ color: '#384252' }}>{location.name}</span>
              </div>
              <Switch checked={location.active} onChange={() => toggleLocation(location.id)} />
            </div>
          ))}
          <button className="flex items-center space-x-2 text-blue-600 hover:text-blue-700 text-sm">
            <Plus className="h-4 w-4" />
            <span>Add location</span>
          </button>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-medium" style={{ color: '#384252' }}>Make this event public</h4>
            <p className="text-sm text-muted-foreground">Allow anyone to book this event</p>
          </div>
          <Switch checked={isPublic} onCheckedChange={setIsPublic} />
        </div>
      </div>
    </div>
  );
};
