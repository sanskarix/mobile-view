
import React from 'react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const EventAdvanced = () => {
  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      {/* Advanced Settings */}
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Advanced settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Disable guests</h4>
                <p className="text-sm text-muted-foreground">
                  Prevent guests from adding other attendees
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Hide event</h4>
                <p className="text-sm text-muted-foreground">
                  Hide this event type from your public page
                </p>
              </div>
              <Switch />
            </div>

            <div className="flex items-center justify-between py-3 border-b border-border">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Require payment</h4>
                <p className="text-sm text-muted-foreground">
                  Charge for this event type
                </p>
              </div>
              <Switch />
            </div>

            <div className="space-y-3 py-3 border-b border-border">
              <h4 className="font-medium text-foreground">Custom redirect URL</h4>
              <p className="text-sm text-muted-foreground">
                Redirect to a custom URL after booking
              </p>
              <Input placeholder="https://example.com" />
            </div>

            <div className="space-y-3 py-3 border-b border-border">
              <h4 className="font-medium text-foreground">Success message</h4>
              <p className="text-sm text-muted-foreground">
                Custom message shown after successful booking
              </p>
              <Textarea placeholder="Thank you for booking!" rows={3} />
            </div>

            <div className="flex items-center justify-between py-3">
              <div className="space-y-1">
                <h4 className="font-medium text-foreground">Disable rescheduling</h4>
                <p className="text-sm text-muted-foreground">
                  Prevent attendees from rescheduling
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
