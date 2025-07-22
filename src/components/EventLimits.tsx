import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { CustomSelect } from './ui/custom-select';

export const EventLimits = () => {
  const [settings, setSettings] = useState({
    // New Before Event Settings
    beforeEventBufferTime: 'no-buffer',
    beforeMinimumNoticeValue: '2',
    beforeMinimumNoticeUnit: 'hours',
    
    // New After Event Settings  
    afterEventBufferTime: 'no-buffer',
    timeSlotIntervals: 'default',
    
    // Existing settings
    minimumNotice: false,
    minimumNoticeValue: '120',
    minimumNoticeUnit: 'minutes',
    limitFutureBookings: false,
    futureBookingType: 'business_days',
    futureBookingValue: '60',
    futureBookingUnit: 'business_days',
    alwaysAvailable: false,
    dateRangeStart: '',
    dateRangeEnd: '',
    bufferTimeBefore: false,
    bufferTimeBeforeValue: '0',
    bufferTimeAfter: false,
    bufferTimeAfterValue: '0',
    dailyBookingLimit: false,
    dailyBookingLimitValue: '1'
  });

  const handleToggle = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const handleValueChange = (setting: string, value: string) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
  };

  const bufferTimeOptions = [
    { value: 'no-buffer', label: 'No buffer time' },
    { value: '15', label: '15 mins' },
    { value: '20', label: '20 mins' }
  ];

  const minimumNoticeUnitOptions = [
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' }
  ];

  const timeSlotOptions = [
    { value: 'default', label: 'Use event length (default)' },
    { value: '15', label: '15 mins' },
    { value: '30', label: '30 mins' }
  ];

  const timeUnitOptions = [
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' }
  ];

  const businessDayOptions = [
    { value: 'business_days', label: 'Business days' },
    { value: 'calendar_days', label: 'Calendar days' }
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-8" style={{ fontSize: '14px', color: '#384252' }}>
      {/* New Before/After Event Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Before event section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg mb-4" style={{ fontSize: '18px', color: '#384252' }}>
            Before event
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#384252' }}>Buffer time</label>
              <CustomSelect
                value={settings.beforeEventBufferTime}
                onValueChange={value => handleValueChange('beforeEventBufferTime', value)}
                options={bufferTimeOptions}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#384252' }}>Minimum Notice</label>
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={settings.beforeMinimumNoticeValue}
                  onChange={e => handleValueChange('beforeMinimumNoticeValue', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                  style={{ fontSize: '14px' }}
                />
                <CustomSelect
                  value={settings.beforeMinimumNoticeUnit}
                  onValueChange={value => handleValueChange('beforeMinimumNoticeUnit', value)}
                  options={minimumNoticeUnitOptions}
                  className="w-28"
                />
              </div>
            </div>
          </div>
        </div>

        {/* After event section */}
        <div className="space-y-6">
          <h3 className="font-semibold text-lg mb-4" style={{ fontSize: '18px', color: '#384252' }}>
            After event
          </h3>
          
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#384252' }}>Buffer time</label>
              <CustomSelect
                value={settings.afterEventBufferTime}
                onValueChange={value => handleValueChange('afterEventBufferTime', value)}
                options={bufferTimeOptions}
                className="w-full"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-3" style={{ color: '#384252' }}>Time-slot intervals</label>
              <CustomSelect
                value={settings.timeSlotIntervals}
                onValueChange={value => handleValueChange('timeSlotIntervals', value)}
                options={timeSlotOptions}
                className="w-full"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Limit booking frequency */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-8">
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Limit booking frequency
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Limit how many times this event can be booked
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="number"
                min="1"
                value="1"
                className="w-16 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                style={{ fontSize: '14px' }}
              />
              <CustomSelect
                value="per-day"
                onValueChange={() => {}}
                options={[
                  { value: 'per-day', label: 'Per day' },
                  { value: 'per-week', label: 'Per week' },
                  { value: 'per-month', label: 'Per month' }
                ]}
                className="w-32"
              />
            </div>
            
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              + Add Limit
            </button>
          </div>
          <Switch
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </div>

      {/* Only show the first slot of each day as available */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-8">
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Only show the first slot of each day as available
            </h3>
            <p className="text-sm text-gray-600">
              This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.
            </p>
          </div>
          <Switch
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </div>

      {/* Limit total booking duration */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-8">
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Limit total booking duration
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Limit total amount of time that this event can be booked
            </p>
            
            <div className="flex items-center space-x-3 mb-4">
              <input
                type="number"
                min="1"
                value="60"
                className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                style={{ fontSize: '14px' }}
              />
              <span className="text-sm text-gray-600">Minutes</span>
              <CustomSelect
                value="per-day"
                onValueChange={() => {}}
                options={[
                  { value: 'per-day', label: 'Per day' },
                  { value: 'per-week', label: 'Per week' },
                  { value: 'per-month', label: 'Per month' }
                ]}
                className="w-32"
              />
            </div>
            
            <button className="text-blue-600 text-sm font-medium hover:text-blue-700">
              + Add Limit
            </button>
          </div>
          <Switch
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </div>

      {/* Limit future bookings */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1 pr-8">
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Limit future bookings
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Limit how far in the future this event can be booked
            </p>
            
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="business_days_option"
                  name="futureBookingType"
                  value="business_days"
                  checked={settings.futureBookingType === 'business_days'}
                  onChange={e => handleValueChange('futureBookingType', e.target.value)}
                />
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={settings.futureBookingValue}
                    onChange={e => handleValueChange('futureBookingValue', e.target.value)}
                    className="w-16 px-2 py-1 border border-gray-300 rounded text-sm bg-white"
                  />
                  <CustomSelect
                    value={settings.futureBookingUnit}
                    onValueChange={value => handleValueChange('futureBookingUnit', value)}
                    options={businessDayOptions}
                    className="w-40"
                  />
                  <span className="text-sm text-gray-600">into the future</span>
                </div>
              </div>
              
              <div className="ml-6">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id="always-available-option"
                    checked={settings.alwaysAvailable}
                    onChange={e => handleToggle('alwaysAvailable', e.target.checked)}
                  />
                  <label htmlFor="always-available-option" className="text-sm text-gray-600">
                    Always {settings.futureBookingValue} days available
                  </label>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="date_range_option" 
                  name="futureBookingType"
                  value="date_range"
                  checked={settings.futureBookingType === 'date_range'}
                  onChange={e => handleValueChange('futureBookingType', e.target.value)}
                />
                <label htmlFor="date_range_option" className="text-sm text-gray-600">Within a date range</label>
              </div>
              
              {settings.futureBookingType === 'date_range' && (
                <div className="ml-6 flex items-center space-x-2">
                  <input
                    type="date"
                    value={settings.dateRangeStart}
                    onChange={e => handleValueChange('dateRangeStart', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                  />
                  <span className="text-sm text-gray-600">to</span>
                  <input
                    type="date"
                    value={settings.dateRangeEnd}
                    onChange={e => handleValueChange('dateRangeEnd', e.target.value)}
                    className="px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                  />
                </div>
              )}
            </div>
          </div>
          <Switch
            checked={settings.limitFutureBookings}
            onCheckedChange={value => handleToggle('limitFutureBookings', value)}
          />
        </div>
      </div>

      {/* Offset start times */}
      <div className="border-t border-gray-200 pt-8">
        <div className="flex items-start justify-between">
          <div className="flex-1 pr-8">
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Offset start times
            </h3>
            <p className="text-sm text-gray-600 mb-4">
              Offset timestamps shown to bookers by a specified number of minutes
            </p>
            
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#384252' }}>Offset by</label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    value="0"
                    className="w-20 px-3 py-2 border border-gray-300 rounded-lg text-sm bg-white"
                    style={{ fontSize: '14px' }}
                  />
                  <span className="text-sm text-gray-600">Minutes</span>
                </div>
              </div>
              
              <p className="text-xs text-gray-500">
                e.g. this will show time slots to your bookers at 9:00 AM instead of 9:00 AM
              </p>
            </div>
          </div>
          <Switch
            checked={false}
            onCheckedChange={() => {}}
          />
        </div>
      </div>
    </div>
  );
};
