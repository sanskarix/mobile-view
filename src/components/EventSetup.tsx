
import React, { useState, useRef, useEffect } from 'react';
import { Clock, X, ChevronDown } from 'lucide-react';
import { Switch } from './ui/switch';
import { Button } from './ui/button';

interface Duration {
  value: number;
  label: string;
}

const defaultDurations: Duration[] = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' }
];

const recommendedDurations: Duration[] = [
  { value: 15, label: '15 min' },
  { value: 30, label: '30 min' },
  { value: 45, label: '45 min' },
  { value: 60, label: '60 min' },
  { value: 90, label: '90 min' },
  { value: 120, label: '2 hours' }
];

export default function EventSetup() {
  const [selectedDurations, setSelectedDurations] = useState<Duration[]>([
    { value: 30, label: '30 min' }
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const addDuration = (duration: Duration) => {
    if (!selectedDurations.find(d => d.value === duration.value)) {
      setSelectedDurations([...selectedDurations, duration]);
    }
    setIsDropdownOpen(false);
  };

  const removeDuration = (value: number) => {
    setSelectedDurations(selectedDurations.filter(d => d.value !== value));
  };

  return (
    <div className="space-y-8 max-w-2xl">
      {/* Event Name */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Event name *</label>
        <input
          type="text"
          defaultValue="15 Minute Meeting"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
        />
      </div>

      {/* Description */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Description</label>
        <textarea
          rows={4}
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          placeholder="Write a summary and any details your invitee should know about the event."
        />
      </div>

      {/* Duration */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Duration *</label>
        <div className="relative" ref={dropdownRef}>
          <div
            className="w-full min-h-[42px] px-3 py-2 border border-gray-300 rounded-md focus-within:ring-2 focus-within:ring-blue-500 cursor-text bg-white flex flex-wrap items-center gap-2"
            onClick={() => setIsDropdownOpen(true)}
          >
            {selectedDurations.map((duration) => (
              <span
                key={duration.value}
                className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 text-gray-600 text-sm rounded border"
              >
                <Clock className="h-3 w-3" />
                {duration.label}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    removeDuration(duration.value);
                  }}
                  className="hover:bg-gray-200 rounded p-0.5"
                >
                  <X className="h-3 w-3" />
                </button>
              </span>
            ))}
            <ChevronDown className="h-4 w-4 text-gray-400 ml-auto" />
          </div>
          
          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-md shadow-lg z-10 max-h-48 overflow-y-auto">
              <div className="p-2">
                <div className="text-xs font-medium text-gray-500 mb-2">Recommended</div>
                {recommendedDurations.map((duration) => (
                  <button
                    key={duration.value}
                    onClick={() => addDuration(duration)}
                    className={`w-full text-left px-3 py-2 text-sm rounded hover:bg-gray-50 flex items-center gap-2 ${
                      selectedDurations.find(d => d.value === duration.value) ? 'bg-blue-50 text-blue-600' : 'text-gray-700'
                    }`}
                  >
                    <Clock className="h-4 w-4" />
                    {duration.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Location */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Location</label>
        <select className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600">
          <option>Google Meet</option>
          <option>Zoom</option>
          <option>Microsoft Teams</option>
          <option>In Person</option>
        </select>
      </div>

      {/* Event Link */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Event link</label>
        <div className="flex">
          <span className="inline-flex items-center px-3 rounded-l-md border border-r-0 border-gray-300 bg-gray-50 text-gray-700 text-sm">
            cal.com/
          </span>
          <input
            type="text"
            defaultValue="15min"
            className="flex-1 px-3 py-2 border border-gray-300 rounded-r-md focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-600"
          />
        </div>
      </div>

      {/* Event Color */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-gray-700">Event color</label>
        <div className="flex items-center space-x-2">
          <div className="w-8 h-8 bg-blue-500 rounded border border-gray-300"></div>
          <span className="text-sm text-gray-600">#3174F7</span>
        </div>
      </div>

      {/* Secret Event */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-sm font-medium text-gray-700">Secret event</h3>
          <p className="text-sm text-gray-600">Hide this event type from your public booking page</p>
        </div>
        <Switch />
      </div>
    </div>
  );
}
