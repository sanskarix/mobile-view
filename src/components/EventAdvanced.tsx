
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const EventAdvanced = () => {
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [disableGuests, setDisableGuests] = useState(false);
  const [hideEventTypeDetails, setHideEventTypeDetails] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Advanced Settings</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Configure advanced booking behavior and event type settings.
          </p>
        </div>

        {/* Event Link */}
        <div className="space-y-3">
          <Label htmlFor="event-slug">Event link</Label>
          <div className="flex items-center space-x-2">
            <span className="text-sm text-muted-foreground">cal.com/</span>
            <Input
              id="event-slug"
              placeholder="sample-event"
              className="flex-1"
            />
          </div>
        </div>

        {/* Event Color */}
        <div className="space-y-3">
          <Label htmlFor="event-color">Event color</Label>
          <Select defaultValue="blue">
            <SelectTrigger className="w-full">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="blue">Blue</SelectItem>
              <SelectItem value="green">Green</SelectItem>
              <SelectItem value="red">Red</SelectItem>
              <SelectItem value="purple">Purple</SelectItem>
              <SelectItem value="orange">Orange</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Success Redirect URL */}
        <div className="space-y-3">
          <Label htmlFor="success-url">Success redirect URL</Label>
          <Input
            id="success-url"
            placeholder="https://example.com/thank-you"
            type="url"
          />
          <p className="text-xs text-muted-foreground">
            Where to redirect attendees after booking (optional)
          </p>
        </div>

        {/* Additional Notes */}
        <div className="space-y-3">
          <Label htmlFor="additional-notes">Additional notes</Label>
          <Textarea
            id="additional-notes"
            placeholder="Any additional information for attendees..."
            rows={3}
          />
        </div>

        {/* Advanced Options */}
        <div className="space-y-4">
          <h4 className="text-base font-medium text-foreground">Booking Options</h4>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="requires-confirmation" 
                checked={requiresConfirmation}
                onCheckedChange={setRequiresConfirmation}
              />
              <Label htmlFor="requires-confirmation">
                Requires confirmation (manual approval)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="disable-guests" 
                checked={disableGuests}
                onCheckedChange={setDisableGuests}
              />
              <Label htmlFor="disable-guests">
                Disable guests (only booker can attend)
              </Label>
            </div>

            <div className="flex items-center space-x-2">
              <Checkbox 
                id="hide-details" 
                checked={hideEventTypeDetails}
                onCheckedChange={setHideEventTypeDetails}
              />
              <Label htmlFor="hide-details">
                Hide event type details from booking page
              </Label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
