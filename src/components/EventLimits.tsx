
import React, { useState } from 'react';
import { CustomSelect } from './ui/custom-select';
import { Switch } from './ui/switch';

export const EventLimits = () => {
  const [settings, setSettings] = useState({
    beforeBufferTime: '0',
    beforeBufferUnit: 'mins',
    afterBufferTime: '0',
    afterBufferUnit: 'mins',
    minimumNotice: '0',
    minimumNoticeUnit: 'mins',
    timeSlotInterval: '15',
    timeSlotIntervalUnit: 'mins',
    limitFutureBookings: false,
    futureBookingType: 'business', // 'business' or 'dateRange'
    futureBookingDays: '30',
    futureBookingDayType: 'business', // 'business' or 'calendar'
    alwaysAvailable: false,
    startDate: '',
    endDate: '',
    limitPastBookings: false,
    pastBookingDays: '0',
    pastBookingUnit: 'days'
  });

  const timeUnitOptions = [
    { value: 'mins', label: 'Minutes' },
    { value: 'hours', label: 'Hours' }
  ];

  const dayTypeOptions = [
    { value: 'business', label: 'Business days' },
    { value: 'calendar', label: 'Calendar days' }
  ];

  const intervalOptions = [
    { value: '5', label: '5 minutes' },
    { value: '10', label: '10 minutes' },
    { value: '15', label: '15 minutes' },
    { value: '30', label: '30 minutes' },
    { value: '60', label: '1 hour' }
  ];

  const handleSettingChange = (key: string, value: string | boolean) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6" style={{ fontSize: '14px', color: '#384252' }}>
      {/* Buffer Times Section */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before Event */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg" style={{ fontSize: '16px', color: '#384252' }}>
              Before event
            </h3>
            
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Buffer time
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={settings.beforeBufferTime}
                  onChange={(e) => handleSettingChange('beforeBufferTime', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  style={{ height: '40px', fontSize: '14px' }}
                  min="0"
                />
                <CustomSelect
                  value={settings.beforeBufferUnit}
                  onChange={(value) => handleSettingChange('beforeBufferUnit', value)}
                  options={timeUnitOptions}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Minimum notice
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={settings.minimumNotice}
                  onChange={(e) => handleSettingChange('minimumNotice', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  style={{ height: '40px', fontSize: '14px' }}
                  min="0"
                />
                <CustomSelect
                  value={settings.minimumNoticeUnit}
                  onChange={(value) => handleSettingChange('minimumNoticeUnit', value)}
                  options={timeUnitOptions}
                  className="flex-1"
                />
              </div>
            </div>
          </div>

          {/* Separator */}
          <div className="hidden lg:block w-px bg-gray-200 mx-4"></div>
          <div className="lg:hidden border-t border-gray-200 my-6"></div>

          {/* After Event */}
          <div className="space-y-6">
            <h3 className="font-semibold text-lg" style={{ fontSize: '16px', color: '#384252' }}>
              After event
            </h3>
            
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Buffer time
              </label>
              <div className="flex space-x-3">
                <input
                  type="number"
                  value={settings.afterBufferTime}
                  onChange={(e) => handleSettingChange('afterBufferTime', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  style={{ height: '40px', fontSize: '14px' }}
                  min="0"
                />
                <CustomSelect
                  value={settings.afterBufferUnit}
                  onChange={(value) => handleSettingChange('afterBufferUnit', value)}
                  options={timeUnitOptions}
                  className="flex-1"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Time-slot intervals
              </label>
              <CustomSelect
                value={settings.timeSlotInterval}
                onChange={(value) => handleSettingChange('timeSlotInterval', value)}
                options={intervalOptions}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Future Bookings Section */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                Limit future bookings
              </h3>
              <p className="mt-1" style={{ fontSize: '12px', color: '#384252' }}>
                Limit how far in the future people can book
              </p>
            </div>
            <Switch 
              checked={settings.limitFutureBookings} 
              onCheckedChange={(value) => handleSettingChange('limitFutureBookings', value)} 
            />
          </div>

          {settings.limitFutureBookings && (
            <div className="pl-6 space-y-4">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    id="business-days"
                    name="futureBookingType"
                    checked={settings.futureBookingType === 'business'}
                    onChange={() => handleSettingChange('futureBookingType', 'business')}
                  />
                  <label htmlFor="business-days" className="flex items-center space-x-2 flex-1">
                    <input
                      type="number"
                      value={settings.futureBookingDays}
                      onChange={(e) => handleSettingChange('futureBookingDays', e.target.value)}
                      className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                      style={{ height: '32px', fontSize: '14px' }}
                      min="1"
                    />
                    <CustomSelect
                      value={settings.futureBookingDayType}
                      onChange={(value) => handleSettingChange('futureBookingDayType', value)}
                      options={dayTypeOptions}
                      className="w-32"
                    />
                    <span style={{ fontSize: '14px', color: '#384252' }}>into the future.</span>
                  </label>
                </div>
                
                <div className="ml-6 flex items-center space-x-2">
                  <input 
                    type="checkbox" 
                    id="always-available"
                    checked={settings.alwaysAvailable}
                    onChange={(e) => handleSettingChange('alwaysAvailable', e.target.checked)}
                  />
                  <label htmlFor="always-available" style={{ fontSize: '14px', color: '#384252' }}>
                    Always {settings.futureBookingDays} days available ({settings.futureBookingDays} will be updated realtime)
                  </label>
                </div>

                <div className="flex items-center space-x-3">
                  <input 
                    type="radio" 
                    id="date-range"
                    name="futureBookingType"
                    checked={settings.futureBookingType === 'dateRange'}
                    onChange={() => handleSettingChange('futureBookingType', 'dateRange')}
                  />
                  <label htmlFor="date-range" style={{ fontSize: '14px', color: '#384252' }}>
                    Within a date range
                  </label>
                </div>

                {settings.futureBookingType === 'dateRange' && (
                  <div className="ml-6 grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm mb-2" style={{ fontSize: '12px', color: '#384252' }}>
                        Start Date
                      </label>
                      <input
                        type="date"
                        value={settings.startDate}
                        onChange={(e) => handleSettingChange('startDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        style={{ height: '40px', fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ fontSize: '12px', color: '#384252' }}>
                        End Date
                      </label>
                      <input
                        type="date"
                        value={settings.endDate}
                        onChange={(e) => handleSettingChange('endDate', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        style={{ height: '40px', fontSize: '14px' }}
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Past Bookings Section */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                Limit past bookings
              </h3>
              <p className="mt-1" style={{ fontSize: '12px', color: '#384252' }}>
                Limit how far in the past people can book
              </p>
            </div>
            <Switch 
              checked={settings.limitPastBookings} 
              onCheckedChange={(value) => handleSettingChange('limitPastBookings', value)} 
            />
          </div>

          {settings.limitPastBookings && (
            <div className="pl-6">
              <div className="flex items-center space-x-3">
                <input
                  type="number"
                  value={settings.pastBookingDays}
                  onChange={(e) => handleSettingChange('pastBookingDays', e.target.value)}
                  className="w-20 px-3 py-2 border border-gray-300 rounded-md"
                  style={{ height: '40px', fontSize: '14px' }}
                  min="0"
                />
                <CustomSelect
                  value={settings.pastBookingUnit}
                  onChange={(value) => handleSettingChange('pastBookingUnit', value)}
                  options={[
                    { value: 'days', label: 'Days' },
                    { value: 'hours', label: 'Hours' }
                  ]}
                  className="w-32"
                />
                <span style={{ fontSize: '14px', color: '#384252' }}>into the past</span>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
