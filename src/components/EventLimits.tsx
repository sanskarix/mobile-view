
import React, { useState } from 'react';
import { Checkbox } from './ui/checkbox';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';

export const EventLimits = () => {
  const [enableBookingLimits, setEnableBookingLimits] = useState(false);
  const [enableBufferTime, setEnableBufferTime] = useState(false);
  const [enableNoticeTime, setEnableNoticeTime] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-8">
        {/* Booking Limits */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="booking-limits"
              checked={enableBookingLimits}
              onCheckedChange={(checked) => setEnableBookingLimits(checked === true)}
            />
            <div>
              <label htmlFor="booking-limits" className="text-sm font-medium text-foreground cursor-pointer">
                Enable booking limits
              </label>
              <p className="text-sm text-muted-foreground">
                Limit how many bookings can be made per day, week, month, or year
              </p>
            </div>
          </div>

          {enableBookingLimits && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Input type="number" placeholder="1" className="w-20" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="per day" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="day">per day</SelectItem>
                    <SelectItem value="week">per week</SelectItem>
                    <SelectItem value="month">per month</SelectItem>
                    <SelectItem value="year">per year</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>

        {/* Buffer Time */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="buffer-time"
              checked={enableBufferTime}
              onCheckedChange={(checked) => setEnableBufferTime(checked === true)}
            />
            <div>
              <label htmlFor="buffer-time" className="text-sm font-medium text-foreground cursor-pointer">
                Add buffer time
              </label>
              <p className="text-sm text-muted-foreground">
                Add time before or after an event
              </p>
            </div>
          </div>

          {enableBufferTime && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground min-w-[80px]">Before event</span>
                <Input type="number" placeholder="0" className="w-20" />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
              <div className="flex items-center space-x-3">
                <span className="text-sm text-muted-foreground min-w-[80px]">After event</span>
                <Input type="number" placeholder="0" className="w-20" />
                <span className="text-sm text-muted-foreground">minutes</span>
              </div>
            </div>
          )}
        </div>

        {/* Notice Time */}
        <div className="space-y-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="notice-time"
              checked={enableNoticeTime}
              onCheckedChange={(checked) => setEnableNoticeTime(checked === true)}
            />
            <div>
              <label htmlFor="notice-time" className="text-sm font-medium text-foreground cursor-pointer">
                Require minimum notice
              </label>
              <p className="text-sm text-muted-foreground">
                How much advance notice do you need for bookings?
              </p>
            </div>
          </div>

          {enableNoticeTime && (
            <div className="ml-6 space-y-3">
              <div className="flex items-center space-x-3">
                <Input type="number" placeholder="1" className="w-20" />
                <Select>
                  <SelectTrigger className="w-32">
                    <SelectValue placeholder="hours" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="minutes">minutes</SelectItem>
                    <SelectItem value="hours">hours</SelectItem>
                    <SelectItem value="days">days</SelectItem>
                    <SelectItem value="weeks">weeks</SelectItem>
                  </SelectContent>
                </Select>
                <span className="text-sm text-muted-foreground">before the event</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
