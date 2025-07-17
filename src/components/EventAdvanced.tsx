
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';

export const EventAdvanced = () => {
  const [requireConfirmation, setRequireConfirmation] = useState(false);
  const [redirectOnBooking, setRedirectOnBooking] = useState(false);
  const [enableSEO, setEnableSEO] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-foreground">Booking Settings</h3>
          
          <div className="space-y-4">
            <div className="flex items-start space-x-3">
              <Checkbox 
                id="require-confirmation"
                checked={requireConfirmation}
                onCheckedChange={(checked) => setRequireConfirmation(checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="require-confirmation" className="text-sm font-medium text-foreground cursor-pointer">
                  Require confirmation
                </label>
                <p className="text-sm text-muted-foreground">
                  Bookings will require manual confirmation before they're confirmed
                </p>
              </div>
            </div>

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="redirect-on-booking"
                checked={redirectOnBooking}
                onCheckedChange={(checked) => setRedirectOnBooking(checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="redirect-on-booking" className="text-sm font-medium text-foreground cursor-pointer">
                  Redirect on booking
                </label>
                <p className="text-sm text-muted-foreground">
                  Redirect to external URL after successful booking
                </p>
              </div>
            </div>

            {redirectOnBooking && (
              <div className="ml-6 space-y-2">
                <label className="block text-sm font-medium text-foreground">
                  Redirect URL
                </label>
                <input 
                  type="url"
                  placeholder="https://example.com/thank-you"
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                />
              </div>
            )}

            <div className="flex items-start space-x-3">
              <Checkbox 
                id="enable-seo"
                checked={enableSEO}
                onCheckedChange={(checked) => setEnableSEO(checked === true)}
                className="mt-1"
              />
              <div className="space-y-1">
                <label htmlFor="enable-seo" className="text-sm font-medium text-foreground cursor-pointer">
                  Enable SEO
                </label>
                <p className="text-sm text-muted-foreground">
                  Add custom meta tags for better search engine optimization
                </p>
              </div>
            </div>

            {enableSEO && (
              <div className="ml-6 space-y-4">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Meta title
                  </label>
                  <input 
                    type="text"
                    placeholder="Custom page title"
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-foreground">
                    Meta description
                  </label>
                  <textarea 
                    placeholder="Custom page description"
                    rows={3}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
