
import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';
import { Separator } from './ui/separator';

export const EventLimits = () => {
  const [settings, setSettings] = useState({
    enableLimits: false,
    maxEventsPerDay: 1,
    maxEventsRolling: 1,
    rollingPeriod: 1,
    rollingPeriodUnit: 'day',
    beforeEventBuffer: 0,
    beforeEventUnit: 'minutes',
    afterEventBuffer: 0,
    afterEventUnit: 'minutes',
    minimumNotice: 0,
    minimumNoticeUnit: 'minutes',
    timeSlotInterval: 15,
    timeSlotUnit: 'minutes',
    limitFutureBookings: false,
    futureBookingsDays: 30,
    futureBookingsUnit: 'business',
    futureBookingsAlwaysAvailable: false,
    dateRangeOption: false
  });

  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string) => {
    setDropdownStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleChange = (key: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const CustomSelect = ({ 
    value, 
    options, 
    onChange, 
    placeholder, 
    dropdownKey 
  }: { 
    value: string; 
    options: { value: string; label: string }[]; 
    onChange: (value: string) => void; 
    placeholder?: string;
    dropdownKey: string;
  }) => {
    const isOpen = dropdownStates[dropdownKey] || false;
    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown(dropdownKey)}
          className="w-full h-10 px-3 border border-border rounded-md bg-background text-left flex items-center justify-between hover:bg-muted/50 transition-colors text-sm"
        >
          <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  toggleDropdown(dropdownKey);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-foreground"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const unitOptions = [
    { value: 'minutes', label: 'Minutes' },
    { value: 'hours', label: 'Hours' },
    { value: 'days', label: 'Days' }
  ];

  const periodOptions = [
    { value: 'day', label: 'Day' },
    { value: 'week', label: 'Week' },
    { value: 'month', label: 'Month' }
  ];

  const futureBookingsUnitOptions = [
    { value: 'business', label: 'Business days' },
    { value: 'calendar', label: 'Calendar days' }
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-8 border border-border rounded-lg p-6" style={{
      fontSize: '14px',
      color: '#384252'
    }}>
      {/* Enable limits toggle */}
      <div className="flex items-center justify-between border-b border-border pb-6">
        <div>
          <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
            Limit bookings per day
          </h3>
          <p style={{ fontSize: '14px', color: '#384252' }}>
            Limit how many bookings can be scheduled per day
          </p>
        </div>
        <Switch 
          checked={settings.enableLimits} 
          onCheckedChange={(value) => handleChange('enableLimits', value)} 
        />
      </div>

      {settings.enableLimits && (
        <div className="space-y-6 border border-border rounded-lg p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Maximum events per day
              </label>
              <input
                type="number"
                value={settings.maxEventsPerDay}
                onChange={(e) => handleChange('maxEventsPerDay', parseInt(e.target.value))}
                className="w-full h-10 px-3 border border-border rounded-md text-sm"
                min="1"
              />
            </div>
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Maximum events in rolling period
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={settings.maxEventsRolling}
                  onChange={(e) => handleChange('maxEventsRolling', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="1"
                />
                <input
                  type="number"
                  value={settings.rollingPeriod}
                  onChange={(e) => handleChange('rollingPeriod', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="1"
                />
                <CustomSelect
                  value={settings.rollingPeriodUnit}
                  options={periodOptions}
                  onChange={(value) => handleChange('rollingPeriodUnit', value)}
                  dropdownKey="rollingPeriodUnit"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Buffer times section with side-by-side layout */}
      <div className="border border-border rounded-lg p-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Before event section */}
          <div className="space-y-6">
            <h3 className="font-semibold mb-4" style={{ fontSize: '16px', color: '#384252' }}>
              Before event
            </h3>
            
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Buffer time
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={settings.beforeEventBuffer}
                  onChange={(e) => handleChange('beforeEventBuffer', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="0"
                />
                <CustomSelect
                  value={settings.beforeEventUnit}
                  options={unitOptions}
                  onChange={(value) => handleChange('beforeEventUnit', value)}
                  dropdownKey="beforeEventUnit"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Minimum notice
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={settings.minimumNotice}
                  onChange={(e) => handleChange('minimumNotice', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="0"
                />
                <CustomSelect
                  value={settings.minimumNoticeUnit}
                  options={unitOptions}
                  onChange={(value) => handleChange('minimumNoticeUnit', value)}
                  dropdownKey="minimumNoticeUnit"
                />
              </div>
            </div>
          </div>

          <Separator orientation="vertical" className="hidden lg:block" />

          {/* After event section */}
          <div className="space-y-6">
            <h3 className="font-semibold mb-4" style={{ fontSize: '16px', color: '#384252' }}>
              After event
            </h3>
            
            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Buffer time
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={settings.afterEventBuffer}
                  onChange={(e) => handleChange('afterEventBuffer', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="0"
                />
                <CustomSelect
                  value={settings.afterEventUnit}
                  options={unitOptions}
                  onChange={(value) => handleChange('afterEventUnit', value)}
                  dropdownKey="afterEventUnit"
                />
              </div>
            </div>

            <div>
              <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                Time-slot intervals
              </label>
              <div className="flex space-x-2">
                <input
                  type="number"
                  value={settings.timeSlotInterval}
                  onChange={(e) => handleChange('timeSlotInterval', parseInt(e.target.value))}
                  className="w-20 h-10 px-3 border border-border rounded-md text-sm"
                  min="1"
                />
                <CustomSelect
                  value={settings.timeSlotUnit}
                  options={unitOptions}
                  onChange={(value) => handleChange('timeSlotUnit', value)}
                  dropdownKey="timeSlotUnit"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Limit future bookings */}
      <div className="border border-border rounded-lg p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
              Limit future bookings
            </h3>
            <p style={{ fontSize: '14px', color: '#384252' }}>
              Limit how far in advance people can book
            </p>
          </div>
          <Switch 
            checked={settings.limitFutureBookings} 
            onCheckedChange={(value) => handleChange('limitFutureBookings', value)} 
          />
        </div>

        {settings.limitFutureBookings && (
          <div className="space-y-6">
            {/* Option selector */}
            <div className="space-y-4">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="option1"
                  name="futureBookingOption"
                  checked={!settings.dateRangeOption}
                  onChange={() => handleChange('dateRangeOption', false)}
                  className="w-4 h-4"
                />
                <label htmlFor="option1" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
                  <input
                    type="number"
                    value={settings.futureBookingsDays}
                    onChange={(e) => handleChange('futureBookingsDays', parseInt(e.target.value))}
                    className="w-16 h-8 px-2 border border-border rounded text-sm"
                    min="1"
                    disabled={settings.dateRangeOption}
                  />
                  <CustomSelect
                    value={settings.futureBookingsUnit}
                    options={futureBookingsUnitOptions}
                    onChange={(value) => handleChange('futureBookingsUnit', value)}
                    dropdownKey="futureBookingsUnit"
                  />
                  <span>into the future.</span>
                </label>
              </div>
              
              <div className="ml-6">
                <label className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={settings.futureBookingsAlwaysAvailable}
                    onChange={(e) => handleChange('futureBookingsAlwaysAvailable', e.target.checked)}
                    className="w-4 h-4"
                    disabled={settings.dateRangeOption}
                  />
                  <span style={{ fontSize: '14px', color: '#384252' }}>
                    Always {settings.futureBookingsDays} days available ({settings.futureBookingsDays} will be updated realtime)
                  </span>
                </label>
              </div>

              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  id="option2"
                  name="futureBookingOption"
                  checked={settings.dateRangeOption}
                  onChange={() => handleChange('dateRangeOption', true)}
                  className="w-4 h-4"
                />
                <label htmlFor="option2" style={{ fontSize: '14px', color: '#384252' }}>
                  Within a date range
                </label>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
