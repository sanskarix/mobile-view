
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { CustomSelect } from './ui/custom-select';

export const EventLimits = () => {
  const [settings, setSettings] = useState({
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
      {/* Minimum booking notice */}
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                Minimum booking notice
              </h3>
              <p style={{ fontSize: '14px', color: '#384252' }}>
                Require a minimum amount of time before the meeting to book a slot
              </p>
            </div>
            <Switch
              checked={settings.minimumNotice}
              onCheckedChange={value => handleToggle('minimumNotice', value)}
            />
          </div>
          
          {settings.minimumNotice && (
            <div className="mt-4 flex items-center space-x-2">
              <input
                type="number"
                value={settings.minimumNoticeValue}
                onChange={e => handleValueChange('minimumNoticeValue', e.target.value)}
                className="w-20 px-3 py-2 border border-border rounded-lg text-sm bg-background"
              />
              <CustomSelect
                value={settings.minimumNoticeUnit}
                onValueChange={value => handleValueChange('minimumNoticeUnit', value)}
                options={timeUnitOptions}
                className="w-32"
              />
            </div>
          )}
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        {/* Limit future bookings */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex-1">
            <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
              Limit future bookings
            </h3>
            <p style={{ fontSize: '14px', color: '#384252' }}>
              Limit how far in the future people can book meetings
            </p>
          </div>
          <Switch
            checked={settings.limitFutureBookings}
            onCheckedChange={value => handleToggle('limitFutureBookings', value)}
          />
        </div>

        {settings.limitFutureBookings && (
          <div className="space-y-4 ml-4">
            {/* Option 1 - Business/Calendar days */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="business_days"
                  name="futureBookingType"
                  value="business_days"
                  checked={settings.futureBookingType === 'business_days'}
                  onChange={e => handleValueChange('futureBookingType', e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="business_days" className="flex items-center space-x-2">
                  <input
                    type="number"
                    value={settings.futureBookingValue}
                    onChange={e => handleValueChange('futureBookingValue', e.target.value)}
                    className="w-16 px-2 py-1 border border-border rounded text-sm bg-background"
                  />
                  <CustomSelect
                    value={settings.futureBookingUnit}
                    onValueChange={value => handleValueChange('futureBookingUnit', value)}
                    options={businessDayOptions}
                    className="w-40"
                  />
                  <span className="text-sm">into the future</span>
                </label>
              </div>
              
              <div className="ml-6">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="always-available"
                    checked={settings.alwaysAvailable}
                    onChange={e => handleToggle('alwaysAvailable', e.target.checked)}
                    className="mr-2"
                  />
                  <label htmlFor="always-available" className="text-sm">
                    Always {settings.futureBookingValue} days available
                  </label>
                </div>
              </div>
            </div>

            {/* Option 2 - Date range */}
            <div className="space-y-3">
              <div className="flex items-center">
                <input
                  type="radio"
                  id="date_range"
                  name="futureBookingType"
                  value="date_range"
                  checked={settings.futureBookingType === 'date_range'}
                  onChange={e => handleValueChange('futureBookingType', e.target.value)}
                  className="mr-2"
                />
                <label htmlFor="date_range" className="text-sm">Within a date range</label>
              </div>
              
              {settings.futureBookingType === 'date_range' && (
                <div className="ml-6 flex items-center space-x-2">
                  <input
                    type="date"
                    value={settings.dateRangeStart}
                    onChange={e => handleValueChange('dateRangeStart', e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
                  />
                  <span className="text-sm">to</span>
                  <input
                    type="date"
                    value={settings.dateRangeEnd}
                    onChange={e => handleValueChange('dateRangeEnd', e.target.value)}
                    className="px-3 py-2 border border-border rounded-lg text-sm bg-background"
                  />
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-8">
        {/* Buffer time before */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                  Buffer time before meetings
                </h3>
                <p style={{ fontSize: '14px', color: '#384252' }}>
                  Add time before the meeting
                </p>
              </div>
              <Switch
                checked={settings.bufferTimeBefore}
                onCheckedChange={value => handleToggle('bufferTimeBefore', value)}
              />
            </div>
            
            {settings.bufferTimeBefore && (
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="number"
                  value={settings.bufferTimeBeforeValue}
                  onChange={e => handleValueChange('bufferTimeBeforeValue', e.target.value)}
                  className="w-20 px-3 py-2 border border-border rounded-lg text-sm bg-background"
                />
                <span className="text-sm">minutes</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        {/* Buffer time after */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                  Buffer time after meetings
                </h3>
                <p style={{ fontSize: '14px', color: '#384252' }}>
                  Add time after the meeting
                </p>
              </div>
              <Switch
                checked={settings.bufferTimeAfter}
                onCheckedChange={value => handleToggle('bufferTimeAfter', value)}
              />
            </div>
            
            {settings.bufferTimeAfter && (
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="number"
                  value={settings.bufferTimeAfterValue}
                  onChange={e => handleValueChange('bufferTimeAfterValue', e.target.value)}
                  className="w-20 px-3 py-2 border border-border rounded-lg text-sm bg-background"
                />
                <span className="text-sm">minutes</span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200 pt-8">
        {/* Daily booking limit */}
        <div className="flex items-center justify-between">
          <div className="flex-1">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                  Daily booking limit
                </h3>
                <p style={{ fontSize: '14px', color: '#384252' }}>
                  Limit number of bookings per day
                </p>
              </div>
              <Switch
                checked={settings.dailyBookingLimit}
                onCheckedChange={value => handleToggle('dailyBookingLimit', value)}
              />
            </div>
            
            {settings.dailyBookingLimit && (
              <div className="mt-4 flex items-center space-x-2">
                <input
                  type="number"
                  min="1"
                  value={settings.dailyBookingLimitValue}
                  onChange={e => handleValueChange('dailyBookingLimitValue', e.target.value)}
                  className="w-20 px-3 py-2 border border-border rounded-lg text-sm bg-background"
                />
                <span className="text-sm">bookings per day</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
