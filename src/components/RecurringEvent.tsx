
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

export const RecurringEvent = () => {
  const [isRecurring, setIsRecurring] = useState(false);
  const [frequency, setFrequency] = useState('weekly');
  const [maxOccurrences, setMaxOccurrences] = useState('');

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Recurring Event</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Configure if this event type should be available as a recurring booking option.
          </p>
        </div>

        <div className="space-y-6">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="enable-recurring" 
              checked={isRecurring}
              onCheckedChange={(checked) => setIsRecurring(checked === true)}
            />
            <Label htmlFor="enable-recurring" className="font-medium">
              Enable recurring bookings
            </Label>
          </div>

          {isRecurring && (
            <div className="ml-6 space-y-6 p-4 border border-border rounded-lg">
              <div className="space-y-3">
                <Label htmlFor="frequency">Frequency</Label>
                <Select value={frequency} onValueChange={setFrequency}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">Daily</SelectItem>
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-3">
                <Label htmlFor="max-occurrences">Maximum number of occurrences</Label>
                <div className="flex items-center space-x-3">
                  <Input
                    id="max-occurrences"
                    type="number"
                    placeholder="12"
                    value={maxOccurrences}
                    onChange={(e) => setMaxOccurrences(e.target.value)}
                    className="w-24"
                  />
                  <span className="text-sm text-muted-foreground">
                    (Leave empty for unlimited)
                  </span>
                </div>
              </div>

              <div className="space-y-3">
                <Label>Recurring pattern preview</Label>
                <div className="p-3 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    {frequency === 'daily' && 'Every day'}
                    {frequency === 'weekly' && 'Every week on the same day'}
                    {frequency === 'monthly' && 'Every month on the same date'}
                    {maxOccurrences && `, up to ${maxOccurrences} times`}
                  </p>
                </div>
              </div>

              <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-amber-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-sm font-medium text-amber-800">
                      Note about recurring events
                    </h3>
                    <div className="mt-2 text-sm text-amber-700">
                      <p>
                        When attendees book a recurring event, they will be able to schedule multiple sessions at once based on your configured pattern.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
