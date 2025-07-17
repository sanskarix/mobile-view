
import React, { useState } from 'react';
import { Switch } from './ui/switch';

export const EventLimits = () => {
  const [enableLimits, setEnableLimits] = useState(false);
  const [enableBookingWindow, setEnableBookingWindow] = useState(false);
  const [enableBufferTime, setEnableBufferTime] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h3 className="font-medium text-foreground">Limit bookings per day</h3>
            <p className="text-sm text-muted-foreground">Set a maximum number of bookings allowed per day</p>
          </div>
          <Switch 
            checked={enableLimits} 
            onCheckedChange={(checked) => setEnableLimits(checked === true)}
          />
        </div>

        {enableLimits && (
          <div className="ml-4 p-4 bg-muted/30 rounded-lg">
            <label className="block text-sm font-medium text-foreground mb-2">
              Maximum bookings per day
            </label>
            <input 
              type="number" 
              min="1" 
              defaultValue="5"
              className="w-32 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
            />
          </div>
        )}

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h3 className="font-medium text-foreground">Booking window</h3>
            <p className="text-sm text-muted-foreground">Set how far in advance bookings can be made</p>
          </div>
          <Switch 
            checked={enableBookingWindow} 
            onCheckedChange={(checked) => setEnableBookingWindow(checked === true)}
          />
        </div>

        {enableBookingWindow && (
          <div className="ml-4 p-4 bg-muted/30 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Minimum notice
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="0" 
                  defaultValue="24"
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
                <select className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background">
                  <option value="hours">hours</option>
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Maximum notice
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="1" 
                  defaultValue="30"
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
                <select className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background">
                  <option value="days">days</option>
                  <option value="weeks">weeks</option>
                  <option value="months">months</option>
                </select>
              </div>
            </div>
          </div>
        )}

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div>
            <h3 className="font-medium text-foreground">Buffer time</h3>
            <p className="text-sm text-muted-foreground">Add time before and after bookings</p>
          </div>
          <Switch 
            checked={enableBufferTime} 
            onCheckedChange={(checked) => setEnableBufferTime(checked === true)}
          />
        </div>

        {enableBufferTime && (
          <div className="ml-4 p-4 bg-muted/30 rounded-lg space-y-4">
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Before event
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="0" 
                  defaultValue="15"
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                After event
              </label>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  min="0" 
                  defaultValue="15"
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
