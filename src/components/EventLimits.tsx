
import React, { useState } from 'react';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Checkbox } from './ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const EventLimits = () => {
  const [enableDuration, setEnableDuration] = useState(false);
  const [enableFrequency, setEnableFrequency] = useState(false);
  const [enableRange, setEnableRange] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Booking Limits</h3>
          <p className="text-sm text-muted-foreground mb-6">
            Limit how far in the future people can book, set minimum booking notice, and control booking frequency.
          </p>
        </div>

        {/* Duration Limit */}
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="duration-limit" 
              checked={enableDuration}
              onCheckedChange={(checked) => setEnableDuration(checked === true)}
            />
            <Label htmlFor="duration-limit" className="font-medium">
              Limit total booking duration per day
            </Label>
          </div>
          
          {enableDuration && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Input
                  type="number"
                  placeholder="4"
                  className="w-20"
                />
                <span className="text-sm text-muted-foreground">hours per day</span>
              </div>
            </div>
          )}
        </div>

        {/* Frequency Limit */}
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="frequency-limit" 
              checked={enableFrequency}
              onCheckedChange={(checked) => setEnableFrequency(checked === true)}
            />
            <Label htmlFor="frequency-limit" className="font-medium">
              Limit booking frequency
            </Label>
          </div>
          
          {enableFrequency && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Allow</span>
                <Input
                  type="number"
                  placeholder="1"
                  className="w-20"
                />
                <Select defaultValue="week">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">per day</SelectItem>
                    <SelectItem value="week">per week</SelectItem>
                    <SelectItem value="month">per month</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Date Range Limit */}
        <div className="space-y-4 p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-2">
            <Checkbox 
              id="range-limit" 
              checked={enableRange}
              onCheckedChange={(checked) => setEnableRange(checked === true)}
            />
            <Label htmlFor="range-limit" className="font-medium">
              Limit how far in advance people can book
            </Label>
          </div>
          
          {enableRange && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground">Up to</span>
                <Input
                  type="number"
                  placeholder="60"
                  className="w-20"
                />
                <Select defaultValue="days">
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="days">days</SelectItem>
                    <SelectItem value="weeks">weeks</SelectItem>
                    <SelectItem value="months">months</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">in advance</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
