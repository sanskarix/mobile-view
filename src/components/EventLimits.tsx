
import React, { useState } from 'react';
import { Plus, ChevronDown } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventLimits = () => {
  const [settings, setSettings] = useState({
    beforeEvent: {
      bufferTime: 'no-buffer',
      minimumNotice: {
        value: 2,
        unit: 'hours'
      }
    },
    afterEvent: {
      bufferTime: 'no-buffer',
      timeSlotIntervals: 'default'
    },
    limitBookingFrequency: {
      enabled: false,
      limit: 1,
      period: 'per-day',
      limits: [{
        limit: 1,
        period: 'per-day'
      }]
    },
    showFirstSlotOnly: {
      enabled: false
    },
    limitTotalBookingDuration: {
      enabled: false,
      duration: 60,
      unit: 'minutes',
      period: 'per-day',
      limits: [{
        duration: 60,
        unit: 'minutes',
        period: 'per-day'
      }]
    },
    limitFutureBookings: {
      enabled: false,
      option: 'days', // 'days' or 'dateRange'
      days: 30,
      type: 'business-days',
      alwaysAvailable: true,
      dateRange: {
        start: 'Jul 10, 2025',
        end: 'Jul 10, 2025'
      }
    },
    offsetStartTimes: {
      enabled: false,
      offset: 0,
      unit: 'minutes'
    }
  });

  const updateSetting = (section: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const addBookingLimit = () => {
    const newLimit = {
      limit: 1,
      period: 'per-day'
    };
    updateSetting('limitBookingFrequency', 'limits', [...settings.limitBookingFrequency.limits, newLimit]);
  };

  const addDurationLimit = () => {
    const newLimit = {
      duration: 60,
      unit: 'minutes',
      period: 'per-day'
    };
    updateSetting('limitTotalBookingDuration', 'limits', [...settings.limitTotalBookingDuration.limits, newLimit]);
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      {/* Before Event & After Event - Side by Side */}
      <div className="border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Event */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-foreground" style={{ fontSize: '14px', color: '#384252' }}>Before event</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Buffer time</label>
              <div className="relative">
                <select 
                  value={settings.beforeEvent.bufferTime} 
                  onChange={e => updateSetting('beforeEvent', 'bufferTime', e.target.value)} 
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background appearance-none h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <option value="no-buffer">No buffer time</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Minimum Notice</label>
              <div className="flex space-x-2">
                <input 
                  type="number" 
                  value={settings.beforeEvent.minimumNotice.value} 
                  onChange={e => updateSetting('beforeEvent', 'minimumNotice', {
                    ...settings.beforeEvent.minimumNotice,
                    value: parseInt(e.target.value)
                  })} 
                  className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                />
                <div className="relative">
                  <select 
                    value={settings.beforeEvent.minimumNotice.unit} 
                    onChange={e => updateSetting('beforeEvent', 'minimumNotice', {
                      ...settings.beforeEvent.minimumNotice,
                      unit: e.target.value
                    })} 
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="hours">Hours</option>
                    <option value="days">Days</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          {/* After Event */}
          <div className="space-y-4">
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>After event</h3>
            
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Buffer time</label>
              <div className="relative">
                <select 
                  value={settings.afterEvent.bufferTime} 
                  onChange={e => updateSetting('afterEvent', 'bufferTime', e.target.value)} 
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <option value="no-buffer">No buffer time</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Time-slot intervals</label>
              <div className="relative">
                <select 
                  value={settings.afterEvent.timeSlotIntervals} 
                  onChange={e => updateSetting('afterEvent', 'timeSlotIntervals', e.target.value)} 
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <option value="default">Use event length (default)</option>
                  <option value="15">15 minutes</option>
                  <option value="30">30 minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limit Booking Frequency */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Limit booking frequency</h3>
            <p className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>Limit how many times this event can be booked</p>
          </div>
          <Switch checked={settings.limitBookingFrequency.enabled} onCheckedChange={checked => updateSetting('limitBookingFrequency', 'enabled', checked)} />
        </div>
        
        {settings.limitBookingFrequency.enabled && (
          <div className="space-y-4">
            {settings.limitBookingFrequency.limits.map((limit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={limit.limit} 
                  onChange={e => {
                    const newLimits = [...settings.limitBookingFrequency.limits];
                    newLimits[index] = {
                      ...limit,
                      limit: parseInt(e.target.value)
                    };
                    updateSetting('limitBookingFrequency', 'limits', newLimits);
                  }} 
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                />
                <div className="relative">
                  <select 
                    value={limit.period} 
                    onChange={e => {
                      const newLimits = [...settings.limitBookingFrequency.limits];
                      newLimits[index] = {
                        ...limit,
                        period: e.target.value
                      };
                      updateSetting('limitBookingFrequency', 'limits', newLimits);
                    }} 
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="per-day">Per day</option>
                    <option value="per-week">Per week</option>
                    <option value="per-month">Per month</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            ))}
            <button 
              onClick={addBookingLimit} 
              className="text-primary hover:text-primary/80 flex items-center text-sm"
              style={{ fontSize: '14px' }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Limit
            </button>
          </div>
        )}
      </div>

      {/* Show First Slot Only */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="font-semibold mb-2" style={{ fontSize: '14px', color: '#384252' }}>Only show the first slot of each day as available</h3>
            <p className="text-sm max-w-3xl" style={{ fontSize: '14px', color: '#384252' }}>
              This will limit your availability for this event type to one slot per day, scheduled at the earliest available time.
            </p>
          </div>
          <Switch checked={settings.showFirstSlotOnly.enabled} onCheckedChange={checked => updateSetting('showFirstSlotOnly', 'enabled', checked)} />
        </div>
      </div>

      {/* Limit Total Booking Duration */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Limit total booking duration</h3>
            <p className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>Limit total amount of time that this event can be booked</p>
          </div>
          <Switch checked={settings.limitTotalBookingDuration.enabled} onCheckedChange={checked => updateSetting('limitTotalBookingDuration', 'enabled', checked)} />
        </div>
        
        {settings.limitTotalBookingDuration.enabled && (
          <div className="space-y-4">
            {settings.limitTotalBookingDuration.limits.map((limit, index) => (
              <div key={index} className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={limit.duration} 
                  onChange={e => {
                    const newLimits = [...settings.limitTotalBookingDuration.limits];
                    newLimits[index] = {
                      ...limit,
                      duration: parseInt(e.target.value)
                    };
                    updateSetting('limitTotalBookingDuration', 'limits', newLimits);
                  }} 
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                />
                <div className="relative">
                  <select 
                    value={limit.unit} 
                    onChange={e => {
                      const newLimits = [...settings.limitTotalBookingDuration.limits];
                      newLimits[index] = {
                        ...limit,
                        unit: e.target.value
                      };
                      updateSetting('limitTotalBookingDuration', 'limits', newLimits);
                    }} 
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
                <div className="relative">
                  <select 
                    value={limit.period} 
                    onChange={e => {
                      const newLimits = [...settings.limitTotalBookingDuration.limits];
                      newLimits[index] = {
                        ...limit,
                        period: e.target.value
                      };
                      updateSetting('limitTotalBookingDuration', 'limits', newLimits);
                    }} 
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="per-day">Per day</option>
                    <option value="per-week">Per week</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>
            ))}
            <button 
              onClick={addDurationLimit} 
              className="text-primary hover:text-primary/80 flex items-center text-sm"
              style={{ fontSize: '14px' }}
            >
              <Plus className="h-4 w-4 mr-1" />
              Add Limit
            </button>
          </div>
        )}
      </div>

      {/* Limit Future Bookings */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Limit future bookings</h3>
            <p className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>Limit how far in the future this event can be booked</p>
          </div>
          <Switch checked={settings.limitFutureBookings.enabled} onCheckedChange={checked => updateSetting('limitFutureBookings', 'enabled', checked)} />
        </div>
        
        {settings.limitFutureBookings.enabled && (
          <div className="space-y-4">
            {/* Option selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="days-option" 
                  name="futureBookingOption" 
                  checked={settings.limitFutureBookings.option === 'days'}
                  onChange={() => updateSetting('limitFutureBookings', 'option', 'days')}
                />
                <label htmlFor="days-option" className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>
                  Days into the future
                </label>
              </div>
              
              {settings.limitFutureBookings.option === 'days' && (
                <div className="ml-6 space-y-3">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="number" 
                      value={settings.limitFutureBookings.days} 
                      onChange={e => updateSetting('limitFutureBookings', 'days', parseInt(e.target.value))} 
                      className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                      style={{ fontSize: '14px', color: '#384252' }}
                    />
                    <div className="relative">
                      <select 
                        value={settings.limitFutureBookings.type} 
                        onChange={e => updateSetting('limitFutureBookings', 'type', e.target.value)} 
                        className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                        style={{ fontSize: '14px', color: '#384252' }}
                      >
                        <option value="business-days">business days</option>
                        <option value="calendar-days">calendar days</option>
                      </select>
                      <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                    </div>
                    <span className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>into the future</span>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id="always-available" 
                      checked={settings.limitFutureBookings.alwaysAvailable} 
                      onChange={e => updateSetting('limitFutureBookings', 'alwaysAvailable', e.target.checked)}
                    />
                    <label htmlFor="always-available" className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>
                      Always {settings.limitFutureBookings.days} days available
                    </label>
                  </div>
                </div>
              )}
              
              <div className="flex items-center space-x-2">
                <input 
                  type="radio" 
                  id="date-range-option" 
                  name="futureBookingOption" 
                  checked={settings.limitFutureBookings.option === 'dateRange'}
                  onChange={() => updateSetting('limitFutureBookings', 'option', 'dateRange')}
                />
                <label htmlFor="date-range-option" className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>
                  Within a date range
                </label>
              </div>
              
              {settings.limitFutureBookings.option === 'dateRange' && (
                <div className="ml-6">
                  <div className="flex items-center space-x-2">
                    <input 
                      type="text" 
                      value={settings.limitFutureBookings.dateRange.start} 
                      onChange={e => updateSetting('limitFutureBookings', 'dateRange', {
                        ...settings.limitFutureBookings.dateRange,
                        start: e.target.value
                      })} 
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                      style={{ fontSize: '14px', color: '#384252' }}
                    />
                    <span className="text-muted-foreground" style={{ fontSize: '14px', color: '#384252' }}>-</span>
                    <input 
                      type="text" 
                      value={settings.limitFutureBookings.dateRange.end} 
                      onChange={e => updateSetting('limitFutureBookings', 'dateRange', {
                        ...settings.limitFutureBookings.dateRange,
                        end: e.target.value
                      })} 
                      className="flex-1 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                      style={{ fontSize: '14px', color: '#384252' }}
                    />
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Offset Start Times */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Offset start times</h3>
            <p className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>Offset timeslots shown to bookers by a specified number of minutes</p>
          </div>
          <Switch checked={settings.offsetStartTimes.enabled} onCheckedChange={checked => updateSetting('offsetStartTimes', 'enabled', checked)} />
        </div>
        
        {settings.offsetStartTimes.enabled && (
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <span className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>Offset by</span>
              <input 
                type="number" 
                value={settings.offsetStartTimes.offset} 
                onChange={e => updateSetting('offsetStartTimes', 'offset', parseInt(e.target.value))} 
                className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                style={{ fontSize: '14px', color: '#384252' }}
              />
              <div className="relative">
                <select 
                  value={settings.offsetStartTimes.unit} 
                  onChange={e => updateSetting('offsetStartTimes', 'unit', e.target.value)} 
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring appearance-none h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <option value="minutes">Minutes</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
              </div>
            </div>
            <p className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>
              e.g. this will show time slots to your bookers at {9 + settings.offsetStartTimes.offset / 60}:00 AM instead of 9:00 AM
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
