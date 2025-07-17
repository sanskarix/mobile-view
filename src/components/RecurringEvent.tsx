
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';

export const RecurringEvent = () => {
  const [isRecurring, setIsRecurring] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-start space-x-3">
          <Checkbox 
            id="enable-recurring"
            checked={isRecurring}
            onCheckedChange={(checked) => setIsRecurring(checked === true)}
            className="mt-1"
          />
          <div className="space-y-1">
            <label htmlFor="enable-recurring" className="text-lg font-semibold text-foreground cursor-pointer">
              Enable recurring events
            </label>
            <p className="text-sm text-muted-foreground">
              Allow this event to be booked as a recurring series
            </p>
          </div>
        </div>

        {isRecurring && (
          <div className="ml-6 space-y-6 p-4 bg-muted/30 rounded-lg">
            <div className="space-y-4">
              <h3 className="font-medium text-foreground">Recurrence Settings</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Frequency
                  </label>
                  <select className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background">
                    <option value="daily">Daily</option>
                    <option value="weekly">Weekly</option>
                    <option value="monthly">Monthly</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Maximum occurrences
                  </label>
                  <input 
                    type="number"
                    min="1"
                    max="12"
                    defaultValue="4"
                    className="w-32 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    Maximum of 12 occurrences allowed
                  </p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-foreground mb-2">
                    Booking window per occurrence
                  </label>
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number"
                      min="1"
                      defaultValue="7"
                      className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background"
                    />
                    <span className="text-sm text-muted-foreground">days before each occurrence</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
