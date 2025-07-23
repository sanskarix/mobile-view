import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { ArrowLeft, Plus, Trash2, Copy, Info, MoreHorizontal } from 'lucide-react';
import { useNavigate, useParams } from 'react-router-dom';
import { TimeSelector } from '../components/TimeSelector';
import { CustomSelect } from '../components/ui/custom-select';
import { DateOverrideModal } from '../components/DateOverrideModal';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';
import { CopyTimesModal } from '../components/CopyTimesModal';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
}

interface DateOverride {
  id: string;
  date: Date;
  isUnavailable: boolean;
  timeString: string;
}

export const EditAvailability = () => {
  const { teamId } = useParams();
  const navigate = useNavigate();
  const [weeklySchedule, setWeeklySchedule] = useState<{
    [key: string]: TimeSlot[];
  }>({
    Monday: [],
    Tuesday: [],
    Wednesday: [],
    Thursday: [],
    Friday: [],
    Saturday: [],
    Sunday: []
  });
  const [timezone, setTimezone] = useState('UTC');
  const [showDateOverrideModal, setShowDateOverrideModal] = useState(false);
  const [dateOverrides, setDateOverrides] = useState<DateOverride[]>([]);
  const [editingOverride, setEditingOverride] = useState<any>(null);

  const timezones = [
    { value: 'UTC-12:00', label: '(UTC-12:00) Baker/Howland Island' },
    { value: 'UTC-11:00', label: '(UTC-11:00) Niue' },
    { value: 'UTC-10:00', label: '(UTC-10:00) Honolulu' },
    { value: 'UTC-09:30', label: '(UTC-09:30) Marquesas Islands' },
    { value: 'UTC-09:00', label: '(UTC-09:00) Anchorage' },
    { value: 'UTC-08:00', label: '(UTC-08:00) Los Angeles' },
    { value: 'UTC-07:00', label: '(UTC-07:00) Denver' },
    { value: 'UTC-06:00', label: '(UTC-06:00) Chicago' },
    { value: 'UTC-05:00', label: '(UTC-05:00) New York' },
    { value: 'UTC-04:00', label: '(UTC-04:00) Caracas' },
    { value: 'UTC-03:30', label: '(UTC-03:30) Newfoundland' },
    { value: 'UTC-03:00', label: '(UTC-03:00) Buenos Aires' },
    { value: 'UTC-02:00', label: '(UTC-02:00) South Georgia' },
    { value: 'UTC-01:00', label: '(UTC-01:00) Azores' },
    { value: 'UTC+00:00', label: '(UTC+00:00) London' },
    { value: 'UTC+01:00', label: '(UTC+01:00) Paris' },
    { value: 'UTC+02:00', label: '(UTC+02:00) Cairo' },
    { value: 'UTC+03:00', label: '(UTC+03:00) Moscow' },
    { value: 'UTC+03:30', label: '(UTC+03:30) Tehran' },
    { value: 'UTC+04:00', label: '(UTC+04:00) Dubai' },
    { value: 'UTC+04:30', label: '(UTC+04:30) Kabul' },
    { value: 'UTC+05:00', label: '(UTC+05:00) Islamabad' },
    { value: 'UTC+05:30', label: '(UTC+05:30) Mumbai' },
    { value: 'UTC+05:45', label: '(UTC+05:45) Kathmandu' },
    { value: 'UTC+06:00', label: '(UTC+06:00) Dhaka' },
    { value: 'UTC+06:30', label: '(UTC+06:30) Yangon' },
    { value: 'UTC+07:00', label: '(UTC+07:00) Bangkok' },
    { value: 'UTC+08:00', label: '(UTC+08:00) Beijing' },
    { value: 'UTC+09:00', label: '(UTC+09:00) Tokyo' },
    { value: 'UTC+09:30', label: '(UTC+09:30) Adelaide' },
    { value: 'UTC+10:00', label: '(UTC+10:00) Sydney' },
    { value: 'UTC+10:30', label: '(UTC+10:30) Lord Howe Island' },
    { value: 'UTC+11:00', label: '(UTC+11:00) Magadan' },
    { value: 'UTC+11:30', label: '(UTC+11:30) Norfolk Island' },
    { value: 'UTC+12:00', label: '(UTC+12:00) Auckland' },
    { value: 'UTC+12:45', label: '(UTC+12:45) Chatham Islands' },
    { value: 'UTC+13:00', label: '(UTC+13:00) Samoa' },
    { value: 'UTC+14:00', label: '(UTC+14:00) Kiritimati' },
  ];

  useEffect(() => {
    // Load initial schedule and timezone from localStorage or default values
    const savedSchedule = localStorage.getItem('weeklySchedule');
    const savedTimezone = localStorage.getItem('timezone');

    if (savedSchedule) {
      setWeeklySchedule(JSON.parse(savedSchedule));
    }
    if (savedTimezone) {
      setTimezone(savedTimezone);
    }
  }, []);

  useEffect(() => {
    // Save schedule and timezone to localStorage whenever they change
    localStorage.setItem('weeklySchedule', JSON.stringify(weeklySchedule));
    localStorage.setItem('timezone', timezone);
  }, [weeklySchedule, timezone]);

  const addTimeSlot = (day: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: [...prev[day], { id: Date.now().toString(), startTime: '09:00', endTime: '17:00' }]
    }));
  };

  const removeTimeSlot = (day: string, slotId: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: prev[day].filter(slot => slot.id !== slotId)
    }));
  };

  const handleTimeSlotChange = (day: string, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    setWeeklySchedule(prev => ({
      ...prev,
      [day]: prev[day].map(slot =>
        slot.id === slotId ? { ...slot, [field]: value } : slot
      )
    }));
  };

  const handleCopyTimes = (sourceDay: string, targetDays: string[]) => {
    const sourceSchedule = weeklySchedule[sourceDay];
    const updatedSchedule = { ...weeklySchedule };
    
    targetDays.forEach(day => {
      updatedSchedule[day] = [...sourceSchedule];
    });
    
    setWeeklySchedule(updatedSchedule);
  };

  const handleSaveOverride = (override: any) => {
    const timeString = override.timeSlots.map((slot: any) => `${slot.startTime} - ${slot.endTime}`).join(', ');
    const newOverride = {
      id: override.id || Date.now().toString(),
      date: override.date,
      isUnavailable: override.isUnavailable,
      timeString: override.isUnavailable ? 'Unavailable' : timeString
    };

    if (editingOverride) {
      setDateOverrides(prev =>
        prev.map(o => (o.id === editingOverride.id ? newOverride : o))
      );
    } else {
      setDateOverrides(prev => [...prev, newOverride]);
    }
    setEditingOverride(null);
  };

  const handleEditOverride = (override: any) => {
    setEditingOverride(override);
    setShowDateOverrideModal(true);
  };

  const handleDeleteOverride = (overrideId: string) => {
    setDateOverrides(prev => prev.filter(o => o.id !== overrideId));
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(`/teams/${teamId}`)}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">Availability</h1>
              <p className="text-sm text-muted-foreground">Configure your weekly availability</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button>Save</Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Schedule Selector - Left Side */}
        <div className="flex-1 p-6 border-r">
          <div className="space-y-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold">Schedule</h3>
              <div className="space-y-4">
                {Object.entries(weeklySchedule).map(([day, timeSlots]) => (
                  <div key={day} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <Checkbox
                          checked={timeSlots.length > 0}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setWeeklySchedule(prev => ({
                                ...prev,
                                [day]: [{ id: Date.now().toString(), startTime: '09:00', endTime: '17:00' }]
                              }));
                            } else {
                              setWeeklySchedule(prev => ({
                                ...prev,
                                [day]: []
                              }));
                            }
                          }}
                        />
                        <span className="font-medium">{day}</span>
                      </div>
                      
                      {timeSlots.length > 0 && (
                        <CopyTimesModal
                          isOpen={false}
                          onClose={() => {}}
                          onCopy={(targetDays) => handleCopyTimes(day, targetDays)}
                          sourceDay={day}
                        >
                          <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4 mr-2" />
                            Copy times
                          </Button>
                        </CopyTimesModal>
                      )}
                    </div>

                    {timeSlots.length > 0 && (
                      <div className="ml-6 space-y-2">
                        {timeSlots.map((slot, index) => (
                          <div key={slot.id} className="flex items-center space-x-2">
                            <TimeSelector
                              value={slot.startTime}
                              onChange={(time) => handleTimeSlotChange(day, slot.id, 'startTime', time)}
                              placeholder="Start time"
                            />
                            <span className="text-muted-foreground">-</span>
                            <TimeSelector
                              value={slot.endTime}
                              onChange={(time) => handleTimeSlotChange(day, slot.id, 'endTime', time)}
                              placeholder="End time"
                            />
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => addTimeSlot(day)}
                              className="text-green-600 hover:text-green-700"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                            {timeSlots.length > 1 && (
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => removeTimeSlot(day, slot.id)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            )}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Timezone Selector - Right Side */}
        <div className="w-80 p-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Timezone</Label>
              <CustomSelect
                value={timezone}
                onValueChange={setTimezone}
                options={timezones}
                placeholder="Select timezone"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Date Overrides Section - Full Width */}
      <div className="border-t p-6">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <h3 className="text-lg font-semibold">Date Overrides</h3>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-4 w-4">
                    <Info className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent side="right" className="ml-2">
                  <p>Add dates when your availability differs from your weekly hours</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <Button onClick={() => setShowDateOverrideModal(true)} variant="outline">
              <Plus className="h-4 w-4 mr-2" />
              Add an override
            </Button>
          </div>

          {dateOverrides.length === 0 ? (
            <div className="text-center py-8 text-muted-foreground">
              <p>No date overrides</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {dateOverrides.map((override) => (
                <div key={override.id} className="border rounded-lg p-4">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium">
                      {override.date.toLocaleDateString('en-US', {
                        weekday: 'long',
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </h4>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent>
                        <DropdownMenuItem onClick={() => handleEditOverride(override)}>
                          Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem 
                          onClick={() => handleDeleteOverride(override.id)}
                          className="text-red-600"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {override.isUnavailable ? 'Unavailable' : override.timeString}
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <DateOverrideModal
        isOpen={showDateOverrideModal}
        onClose={() => {
          setShowDateOverrideModal(false);
          setEditingOverride(null);
        }}
        onSave={handleSaveOverride}
        editingOverride={editingOverride}
      />
    </div>
  );
};
