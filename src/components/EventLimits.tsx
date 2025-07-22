
import React, { useState } from 'react';
import { Plus, ChevronDown, ChevronUp } from 'lucide-react';
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

  const [dropdownStates, setDropdownStates] = useState({
    beforeBufferTime: false,
    afterBufferTime: false,
    minimumNoticeUnit: false,
    timeSlotIntervals: false,
    futureBookingType: false,
    offsetUnit: false
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

  const toggleDropdown = (dropdown: string) => {
    setDropdownStates(prev => ({
      ...prev,
      [dropdown]: !prev[dropdown as keyof typeof prev]
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
    <div className="p-0 max-w-none mx-auto space-y-8">
      {/* Before and After Event - Side by Side */}
      <div className="border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Before Event */}
          <div className="space-y-4 border-r border-border pr-8">
            <h3 className="text-lg font-semibold text-foreground mb-4" style={{ fontSize: '16px', color: '#384252' }}>Before event</h3>
            
            <div>
              <label className="block text-sm font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Buffer time</label>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('beforeBufferTime')}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background text-left flex items-center justify-between h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <span>{settings.beforeEvent.bufferTime === 'no-buffer' ? 'No buffer time' : `${settings.beforeEvent.bufferTime} minutes`}</span>
                  {dropdownStates.beforeBufferTime ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {dropdownStates.beforeBufferTime && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                    <button onClick={() => { updateSetting('beforeEvent', 'bufferTime', 'no-buffer'); toggleDropdown('beforeBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">No buffer time</button>
                    <button onClick={() => { updateSetting('beforeEvent', 'bufferTime', '15'); toggleDropdown('beforeBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">15 minutes</button>
                    <button onClick={() => { updateSetting('beforeEvent', 'bufferTime', '30'); toggleDropdown('beforeBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">30 minutes</button>
                  </div>
                )}
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
                  <button
                    onClick={() => toggleDropdown('minimumNoticeUnit')}
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background flex items-center justify-between min-w-20 h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <span>{settings.beforeEvent.minimumNotice.unit}</span>
                    {dropdownStates.minimumNoticeUnit ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </button>
                  {dropdownStates.minimumNoticeUnit && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                      <button onClick={() => { updateSetting('beforeEvent', 'minimumNotice', { ...settings.beforeEvent.minimumNotice, unit: 'hours' }); toggleDropdown('minimumNoticeUnit'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">Hours</button>
                      <button onClick={() => { updateSetting('beforeEvent', 'minimumNotice', { ...settings.beforeEvent.minimumNotice, unit: 'days' }); toggleDropdown('minimumNoticeUnit'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">Days</button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* After Event */}
          <div className="space-y-4 pl-8">
            <h3 className="font-semibold mb-4" style={{ fontSize: '16px', color: '#384252' }}>After event</h3>
            
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Buffer time</label>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('afterBufferTime')}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background text-left flex items-center justify-between h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <span>{settings.afterEvent.bufferTime === 'no-buffer' ? 'No buffer time' : `${settings.afterEvent.bufferTime} minutes`}</span>
                  {dropdownStates.afterBufferTime ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {dropdownStates.afterBufferTime && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                    <button onClick={() => { updateSetting('afterEvent', 'bufferTime', 'no-buffer'); toggleDropdown('afterBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">No buffer time</button>
                    <button onClick={() => { updateSetting('afterEvent', 'bufferTime', '15'); toggleDropdown('afterBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">15 minutes</button>
                    <button onClick={() => { updateSetting('afterEvent', 'bufferTime', '30'); toggleDropdown('afterBufferTime'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">30 minutes</button>
                  </div>
                )}
              </div>
            </div>
            
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Time-slot intervals</label>
              <div className="relative">
                <button
                  onClick={() => toggleDropdown('timeSlotIntervals')}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background text-left flex items-center justify-between h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <span>{settings.afterEvent.timeSlotIntervals === 'default' ? 'Use event length (default)' : `${settings.afterEvent.timeSlotIntervals} minutes`}</span>
                  {dropdownStates.timeSlotIntervals ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                </button>
                {dropdownStates.timeSlotIntervals && (
                  <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                    <button onClick={() => { updateSetting('afterEvent', 'timeSlotIntervals', 'default'); toggleDropdown('timeSlotIntervals'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">Use event length (default)</button>
                    <button onClick={() => { updateSetting('afterEvent', 'timeSlotIntervals', '15'); toggleDropdown('timeSlotIntervals'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">15 minutes</button>
                    <button onClick={() => { updateSetting('afterEvent', 'timeSlotIntervals', '30'); toggleDropdown('timeSlotIntervals'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">30 minutes</button>
                  </div>
                )}
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
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background appearance-none pr-8 h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="per-day">Per day</option>
                    <option value="per-week">Per week</option>
                    <option value="per-month">Per month</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
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
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background appearance-none pr-8 h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="minutes">Minutes</option>
                    <option value="hours">Hours</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
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
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background appearance-none pr-8 h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <option value="per-day">Per day</option>
                    <option value="per-week">Per week</option>
                  </select>
                  <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
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
          <div className="space-y-6">
            {/* Option 1 */}
            <div className="space-y-4">
              <h4 className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Option 1</h4>
              <div className="flex items-center space-x-2">
                <input 
                  type="number" 
                  value={settings.limitFutureBookings.days} 
                  onChange={e => updateSetting('limitFutureBookings', 'days', parseInt(e.target.value))} 
                  className="w-20 px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                />
                <div className="relative">
                  <button
                    onClick={() => toggleDropdown('futureBookingType')}
                    className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background flex items-center justify-between min-w-32 h-10"
                    style={{ fontSize: '14px', color: '#384252' }}
                  >
                    <span>{settings.limitFutureBookings.type === 'business-days' ? 'business days' : 'calendar days'}</span>
                    {dropdownStates.futureBookingType ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                  </button>
                  {dropdownStates.futureBookingType && (
                    <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10">
                      <button onClick={() => { updateSetting('limitFutureBookings', 'type', 'business-days'); toggleDropdown('futureBookingType'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">business days</button>
                      <button onClick={() => { updateSetting('limitFutureBookings', 'type', 'calendar-days'); toggleDropdown('futureBookingType'); }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">calendar days</button>
                    </div>
                  )}
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
            
            {/* Option 2 */}
            <div>
              <h4 className="font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Option 2 - Within a date range</h4>
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
                <button
                  onClick={() => toggleDropdown('offsetUnit')}
                  className="px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background flex items-center justify-between min-w-20 h-10"
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  <span>Minutes</span>
                  {dropdownStates.offsetUnit ? <ChevronUp className="h-4 w-4 ml-1" /> : <ChevronDown className="h-4 w-4 ml-1" />}
                </button>
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
