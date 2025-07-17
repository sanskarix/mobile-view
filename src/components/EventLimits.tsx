
import React from 'react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';

export const EventLimits = () => {
  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      {/* Booking Limits Section */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Booking limits</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Limit future bookings</h4>
                <p className="text-sm text-muted-foreground">
                  Limit how far in advance people can book appointments
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Minimum notice</h4>
                <p className="text-sm text-muted-foreground">
                  Require a minimum amount of notice before booking
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="0" className="w-20" />
                <span className="text-sm text-muted-foreground">hours</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Daily limit</h4>
                <p className="text-sm text-muted-foreground">
                  Limit the number of bookings per day
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Total limit</h4>
                <p className="text-sm text-muted-foreground">
                  Limit the total number of bookings for this event
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* Buffer Times Section */}
        <div className="space-y-4 pt-6 border-t border-border">
          <h3 className="text-lg font-semibold text-foreground">Buffer times</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Before event</h4>
                <p className="text-sm text-muted-foreground">
                  Add time before the event starts
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="0" className="w-20" />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">After event</h4>
                <p className="text-sm text-muted-foreground">
                  Add time after the event ends
                </p>
              </div>
              <div className="flex items-center space-x-2">
                <Input type="number" defaultValue="0" className="w-20" />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
