
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

export const RecurringEvent = () => {
  const [enableRecurring, setEnableRecurring] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-center space-x-3">
          <Checkbox
            id="enable-recurring"
            checked={enableRecurring}
            onCheckedChange={(checked) => setEnableRecurring(checked === true)}
          />
          <div>
            <label htmlFor="enable-recurring" className="text-sm font-medium text-foreground cursor-pointer">
              Make this a recurring event
            </label>
            <p className="text-sm text-muted-foreground">
              Allow attendees to book multiple sessions at once
            </p>
          </div>
        </div>

        {enableRecurring && (
          <div className="ml-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-foreground">Recurrence Settings</h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Frequency
                  </label>
                  <Select>
                    <SelectTrigger>
                      <SelectValue placeholder="Select frequency" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground block mb-2">
                    Number of sessions
                  </label>
                  <Input type="number" placeholder="4" min="1" max="52" />
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-foreground block mb-2">
                  Interval
                </label>
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-muted-foreground">Every</span>
                  <Input type="number" placeholder="1" className="w-20" min="1" />
                  <Select>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="weeks" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="days">day(s)</SelectItem>
                      <SelectItem value="weeks">week(s)</SelectItem>
                      <SelectItem value="months">month(s)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <h4 className="text-md font-medium text-foreground">Additional Options</h4>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <Checkbox id="require-all-sessions" />
                  <label htmlFor="require-all-sessions" className="text-sm font-medium text-foreground cursor-pointer">
                    Require booking all sessions at once
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="allow-individual-cancellation" />
                  <label htmlFor="allow-individual-cancellation" className="text-sm font-medium text-foreground cursor-pointer">
                    Allow cancellation of individual sessions
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <Checkbox id="send-individual-reminders" />
                  <label htmlFor="send-individual-reminders" className="text-sm font-medium text-foreground cursor-pointer">
                    Send reminders for each session
                  </label>
                </div>
              </div>
            </div>
          </div>
        )}

        {!enableRecurring && (
          <div className="bg-muted/30 rounded-lg p-6 text-center">
            <p className="text-muted-foreground text-sm">
              Enable recurring events to allow attendees to book multiple sessions in a series.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
