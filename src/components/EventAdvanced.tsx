
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const EventAdvanced = () => {
  const [requireConfirmation, setRequireConfirmation] = useState(false);
  const [enableRedirect, setEnableRedirect] = useState(false);
  const [enableAdditionalNotes, setEnableAdditionalNotes] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-8">
        {/* Confirmation */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="require-confirmation"
              checked={requireConfirmation}
              onCheckedChange={(checked) => setRequireConfirmation(checked === true)}
            />
            <div>
              <label htmlFor="require-confirmation" className="text-sm font-medium text-foreground cursor-pointer">
                Require confirmation before booking
              </label>
              <p className="text-sm text-muted-foreground">
                You'll need to manually approve each booking request
              </p>
            </div>
          </div>
        </div>

        {/* Redirect URL */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="enable-redirect"
              checked={enableRedirect}
              onCheckedChange={(checked) => setEnableRedirect(checked === true)}
            />
            <div>
              <label htmlFor="enable-redirect" className="text-sm font-medium text-foreground cursor-pointer">
                Redirect to custom URL after booking
              </label>
              <p className="text-sm text-muted-foreground">
                Send users to a specific page after they book
              </p>
            </div>
          </div>

          {enableRedirect && (
            <div className="ml-6">
              <Input 
                type="url" 
                placeholder="https://example.com/thank-you" 
                className="max-w-md"
              />
            </div>
          )}
        </div>

        {/* Additional Notes */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="additional-notes"
              checked={enableAdditionalNotes}
              onCheckedChange={(checked) => setEnableAdditionalNotes(checked === true)}
            />
            <div>
              <label htmlFor="additional-notes" className="text-sm font-medium text-foreground cursor-pointer">
                Enable additional notes field
              </label>
              <p className="text-sm text-muted-foreground">
                Allow invitees to add notes when booking
              </p>
            </div>
          </div>

          {enableAdditionalNotes && (
            <div className="ml-6 space-y-3">
              <div>
                <label className="text-sm font-medium text-foreground">
                  Field label
                </label>
                <Input 
                  placeholder="Additional notes" 
                  className="max-w-md mt-1"
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">
                  Placeholder text
                </label>
                <Textarea 
                  placeholder="Please share anything that will help prepare for our meeting."
                  className="max-w-md mt-1"
                  rows={3}
                />
              </div>
            </div>
          )}
        </div>

        {/* Additional Settings */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Additional Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Checkbox id="hide-event-type" />
              <label htmlFor="hide-event-type" className="text-sm font-medium text-foreground cursor-pointer">
                Hide event type from public view
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="disable-guests" />
              <label htmlFor="disable-guests" className="text-sm font-medium text-foreground cursor-pointer">
                Disable guests from adding additional participants
              </label>
            </div>

            <div className="flex items-center space-x-3">
              <Checkbox id="email-reminders" />
              <label htmlFor="email-reminders" className="text-sm font-medium text-foreground cursor-pointer">
                Send email reminders
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
