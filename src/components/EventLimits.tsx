import React, { useState } from 'react';
import { Switch } from './ui/switch';

export default function EventLimits() {
  const [beforeEventEnabled, setBeforeEventEnabled] = useState(false);
  const [afterEventEnabled, setAfterEventEnabled] = useState(false);
  const [minimumNoticeEnabled, setMinimumNoticeEnabled] = useState(false);
  const [slotIntervalEnabled, setSlotIntervalEnabled] = useState(false);

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Before Event Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Before event</h3>
            <p className="text-sm text-gray-600">Add buffer time before your events</p>
          </div>
          <Switch 
            checked={beforeEventEnabled}
            onCheckedChange={setBeforeEventEnabled}
          />
        </div>
        {beforeEventEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Buffer time before event</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                <option>No buffer time</option>
                <option>15 mins</option>
                <option>30 mins</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* After Event Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">After event</h3>
            <p className="text-sm text-gray-600">Add buffer time after your events</p>
          </div>
          <Switch 
            checked={afterEventEnabled}
            onCheckedChange={setAfterEventEnabled}
          />
        </div>
        {afterEventEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Buffer time after event</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                <option>No buffer time</option>
                <option>15 mins</option>
                <option>30 mins</option>
              </select>
            </div>
          </div>
        )}
      </div>

      {/* Minimum Notice Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Minimum notice</h3>
            <p className="text-sm text-gray-600">Prevent bookings too close to the event time</p>
          </div>
          <Switch 
            checked={minimumNoticeEnabled}
            onCheckedChange={setMinimumNoticeEnabled}
          />
        </div>
        {minimumNoticeEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-100">
            <div className="flex space-x-3">
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-700">Minimum time</label>
                <input
                  type="number"
                  defaultValue="1"
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
                />
              </div>
              <div className="flex-1 space-y-2">
                <label className="text-sm font-medium text-gray-700">Unit</label>
                <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                  <option>Days</option>
                  <option>Hours</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Time Slot Intervals Section */}
      <div className="border border-gray-200 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Time slot intervals</h3>
            <p className="text-sm text-gray-600">Customize available booking time slots</p>
          </div>
          <Switch 
            checked={slotIntervalEnabled}
            onCheckedChange={setSlotIntervalEnabled}
          />
        </div>
        {slotIntervalEnabled && (
          <div className="space-y-4 pl-4 border-l-2 border-gray-100">
            <div className="space-y-2">
              <label className="text-sm font-medium text-gray-700">Slot interval</label>
              <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
                <option>Use event length (default)</option>
                <option>15 mins</option>
                <option>30 mins</option>
              </select>
            </div>
          </div>
        )}
      </div>

      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Limit future bookings</h3>
            <p className="text-sm text-gray-600">Prevent bookings too far in advance</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Limit total bookings</h3>
            <p className="text-sm text-gray-600">Limit how many times this event can be booked</p>
          </div>
          <Switch />
        </div>

        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium text-gray-700">Limit bookings per day</h3>
            <p className="text-sm text-gray-600">Limit bookings per day for this event type</p>
          </div>
          <Switch />
        </div>
      </div>
    </div>
  );
}
