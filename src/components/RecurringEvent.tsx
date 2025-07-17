
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Input } from './ui/input';

export const RecurringEvent = () => {
  const [isRecurring, setIsRecurring] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between py-3 border-b border-border">
          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">Recurring event</h3>
            <p className="text-sm text-muted-foreground">
              Make this a recurring event that repeats on a regular schedule
            </p>
          </div>
          <Switch 
            checked={isRecurring} 
            onCheckedChange={setIsRecurring} 
          />
        </div>

        {isRecurring && (
          <div className="space-y-6 animate-in fade-in duration-200">
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Frequency</label>
                  <Select defaultValue="weekly">
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="daily">Daily</SelectItem>
                      <SelectItem value="weekly">Weekly</SelectItem>
                      <SelectItem value="monthly">Monthly</SelectItem>
                      <SelectItem value="yearly">Yearly</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium text-foreground">Repeat every</label>
                  <div className="flex items-center space-x-2">
                    <Input type="number" defaultValue="1" className="w-20" />
                    <span className="text-sm text-muted-foreground">week(s)</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">Maximum occurrences</label>
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <Input type="radio" name="occurrence" id="unlimited" className="w-4 h-4" />
                    <label htmlFor="unlimited" className="text-sm text-foreground">Unlimited</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Input type="radio" name="occurrence" id="limited" className="w-4 h-4" />
                    <label htmlFor="limited" className="text-sm text-foreground">Limited to</label>
                    <Input type="number" defaultValue="10" className="w-20" />
                    <span className="text-sm text-muted-foreground">occurrences</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium text-foreground">End date</label>
                <Select>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Select end date" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="never">Never</SelectItem>
                    <SelectItem value="date">On specific date</SelectItem>
                    <SelectItem value="after">After number of occurrences</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        )}

        <div className="bg-muted/30 rounded-lg p-4">
          <h4 className="font-medium text-foreground mb-2">How recurring events work</h4>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Each occurrence is treated as a separate booking</li>
            <li>• Attendees can book individual occurrences</li>
            <li>• Changes to the event type affect all future occurrences</li>
            <li>• Past occurrences remain unchanged</li>
          </ul>
        </div>
      </div>
    </div>
  );
};
