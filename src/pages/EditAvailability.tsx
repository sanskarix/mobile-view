
import React, { useState } from 'react';
import { useParams, useLocation, useNavigate } from 'react-router-dom';
import { ArrowLeft, Plus, Copy, Trash2, Calendar, Clock, X } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '../components/ui/tabs';
import { TimeSelector } from '../components/TimeSelector';
import { CustomSelect } from '../components/ui/custom-select';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../components/ui/dialog';
import { format } from 'date-fns';

interface TimeSlot {
  id: string;
  startTime: string;
  endTime: string;
  isNew?: boolean;
}

interface DaySchedule {
  day: string;
  enabled: boolean;
  timeSlots: TimeSlot[];
}

interface DateOverride {
  id: string;
  date: string;
  type: 'unavailable' | 'custom';
  timeSlots?: TimeSlot[];
  reason?: string;
}

export const EditAvailability = () => {
  const { scheduleId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('hours');
  const [scheduleName, setScheduleName] = useState(
    location.state?.newScheduleName || 'Working Hours'
  );
  const [isOverrideModalOpen, setIsOverrideModalOpen] = useState(false);
  const [editingOverride, setEditingOverride] = useState<DateOverride | null>(null);
  const [overrideDate, setOverrideDate] = useState('');
  const [overrideType, setOverrideType] = useState<'unavailable' | 'custom'>('unavailable');
  const [overrideReason, setOverrideReason] = useState('');
  const [overrideTimeSlots, setOverrideTimeSlots] = useState<TimeSlot[]>([]);

  const [weeklySchedule, setWeeklySchedule] = useState<DaySchedule[]>([
    { day: 'Monday', enabled: true, timeSlots: [{ id: '1', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Tuesday', enabled: true, timeSlots: [{ id: '2', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Wednesday', enabled: true, timeSlots: [{ id: '3', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Thursday', enabled: true, timeSlots: [{ id: '4', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Friday', enabled: true, timeSlots: [{ id: '5', startTime: '09:00', endTime: '17:00' }] },
    { day: 'Saturday', enabled: false, timeSlots: [] },
    { day: 'Sunday', enabled: false, timeSlots: [] }
  ]);

  const [dateOverrides, setDateOverrides] = useState<DateOverride[]>([
    {
      id: '1',
      date: '2024-01-15',
      type: 'unavailable',
      reason: 'Public Holiday'
    },
    {
      id: '2',
      date: '2024-01-20',
      type: 'custom',
      timeSlots: [{ id: '1', startTime: '10:00', endTime: '14:00' }],
      reason: 'Half Day'
    }
  ]);

  const timezoneOptions = [
    { value: 'asia/calcutta', label: 'Asia/Calcutta' },
    { value: 'utc', label: 'UTC' },
    { value: 'america/new_york', label: 'America/New_York' },
    { value: 'europe/london', label: 'Europe/London' }
  ];

  const [selectedTimezone, setSelectedTimezone] = useState('asia/calcutta');

  const handleDayToggle = (dayIndex: number) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { ...day, enabled: !day.enabled } : day
    ));
  };

  const handleAddTimeSlot = (dayIndex: number) => {
    const newTimeSlot: TimeSlot = {
      id: Date.now().toString(),
      startTime: '09:00',
      endTime: '17:00',
      isNew: true
    };
    
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { 
        ...day, 
        timeSlots: [...day.timeSlots, newTimeSlot],
        enabled: true 
      } : day
    ));
  };

  const handleDeleteTimeSlot = (dayIndex: number, slotId: string) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { 
        ...day, 
        timeSlots: day.timeSlots.filter(slot => slot.id !== slotId)
      } : day
    ));
  };

  const handleTimeSlotChange = (dayIndex: number, slotId: string, field: 'startTime' | 'endTime', value: string) => {
    setWeeklySchedule(prev => prev.map((day, index) => 
      index === dayIndex ? { 
        ...day, 
        timeSlots: day.timeSlots.map(slot => 
          slot.id === slotId ? { ...slot, [field]: value } : slot
        )
      } : day
    ));
  };

  const handleCopyTimes = (sourceDayIndex: number) => {
    const sourceDay = weeklySchedule[sourceDayIndex];
    // Implementation for copying times to other days
    console.log('Copying times from', sourceDay.day);
  };

  const handleAddOverride = () => {
    setEditingOverride(null);
    setOverrideDate('');
    setOverrideType('unavailable');
    setOverrideReason('');
    setOverrideTimeSlots([]);
    setIsOverrideModalOpen(true);
  };

  const handleEditOverride = (override: DateOverride) => {
    setEditingOverride(override);
    setOverrideDate(override.date);
    setOverrideType(override.type);
    setOverrideReason(override.reason || '');
    setOverrideTimeSlots(override.timeSlots || []);
    setIsOverrideModalOpen(true);
  };

  const handleSaveOverride = () => {
    const overrideData: DateOverride = {
      id: editingOverride?.id || Date.now().toString(),
      date: overrideDate,
      type: overrideType,
      reason: overrideReason,
      timeSlots: overrideType === 'custom' ? overrideTimeSlots : undefined
    };

    if (editingOverride) {
      setDateOverrides(prev => prev.map(override => 
        override.id === editingOverride.id ? overrideData : override
      ));
    } else {
      setDateOverrides(prev => [...prev, overrideData]);
    }
    
    setIsOverrideModalOpen(false);
  };

  const handleDeleteOverride = (overrideId: string) => {
    setDateOverrides(prev => prev.filter(override => override.id !== overrideId));
  };

  return (
    <div className="px-6 py-6 max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate('/availability')}
            className="hover:bg-muted"
          >
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <Input
              value={scheduleName}
              onChange={(e) => setScheduleName(e.target.value)}
              className="text-2xl font-bold border-none p-0 h-auto bg-transparent focus:ring-0"
            />
          </div>
        </div>
        <div className="flex items-center space-x-3">
          <Button variant="outline">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>

      <Tabs value={selectedTab} onValueChange={setSelectedTab} className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="hours">Hours</TabsTrigger>
          <TabsTrigger value="date-overrides">Date Overrides</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
        </TabsList>

        <TabsContent value="hours" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Clock className="h-5 w-5" />
                <span>Weekly Hours</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {weeklySchedule.map((day, dayIndex) => (
                <div key={day.day} className="flex items-center space-x-4 p-4 border rounded-lg">
                  <div className="flex items-center space-x-3 min-w-[140px]">
                    <button
                      onClick={() => handleDayToggle(dayIndex)}
                      className={`w-12 h-6 rounded-full transition-all ${
                        day.enabled ? 'bg-primary' : 'bg-muted'
                      }`}
                    >
                      <div className={`w-5 h-5 rounded-full bg-white transition-all ${
                        day.enabled ? 'translate-x-6' : 'translate-x-0.5'
                      }`} />
                    </button>
                    <span className="font-medium">{day.day}</span>
                  </div>
                  
                  <div className="flex-1 space-y-2">
                    {day.enabled && day.timeSlots.map((slot) => (
                      <div key={slot.id} className="flex items-center space-x-2">
                        <TimeSelector
                          value={slot.startTime}
                          onChange={(time) => handleTimeSlotChange(dayIndex, slot.id, 'startTime', time)}
                        />
                        <span>-</span>
                        <TimeSelector
                          value={slot.endTime}
                          onChange={(time) => handleTimeSlotChange(dayIndex, slot.id, 'endTime', time)}
                        />
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => handleCopyTimes(dayIndex)}
                          className="h-8 w-8"
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        {slot.isNew && (
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteTimeSlot(dayIndex, slot.id)}
                            className="h-8 w-8 text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    ))}
                    
                    {day.enabled && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleAddTimeSlot(dayIndex)}
                        className="text-primary hover:text-primary"
                      >
                        <Plus className="h-4 w-4 mr-1" />
                        Add time
                      </Button>
                    )}
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="date-overrides" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="h-5 w-5" />
                  <span>Date Overrides</span>
                </CardTitle>
                <Button onClick={handleAddOverride}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add an override
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              {dateOverrides.length === 0 ? (
                <p className="text-muted-foreground text-center py-8">
                  No date overrides configured yet.
                </p>
              ) : (
                <div className="space-y-3">
                  {dateOverrides.map((override) => (
                    <div key={override.id} className="flex items-center justify-between p-3 border rounded-lg">
                      <div>
                        <div className="font-medium">
                          {format(new Date(override.date), 'MMMM d, yyyy')}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {override.type === 'unavailable' ? 'Unavailable' : 'Custom hours'}
                          {override.reason && ` - ${override.reason}`}
                        </div>
                        {override.timeSlots && (
                          <div className="text-sm text-muted-foreground mt-1">
                            {override.timeSlots.map(slot => `${slot.startTime} - ${slot.endTime}`).join(', ')}
                          </div>
                        )}
                      </div>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleEditOverride(override)}
                        >
                          Edit
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleDeleteOverride(override.id)}
                          className="text-destructive hover:text-destructive"
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="details" className="space-y-6 mt-6">
          <Card>
            <CardHeader>
              <CardTitle>Schedule Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Timezone</label>
                <CustomSelect
                  value={selectedTimezone}
                  onValueChange={setSelectedTimezone}
                  options={timezoneOptions}
                  className="w-full max-w-md"
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <Dialog open={isOverrideModalOpen} onOpenChange={setIsOverrideModalOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>
              {editingOverride ? 'Edit Override' : 'Add Date Override'}
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Date</label>
              <Input
                type="date"
                value={overrideDate}
                onChange={(e) => setOverrideDate(e.target.value)}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Type</label>
              <CustomSelect
                value={overrideType}
                onValueChange={(value) => setOverrideType(value as 'unavailable' | 'custom')}
                options={[
                  { value: 'unavailable', label: 'Unavailable' },
                  { value: 'custom', label: 'Custom hours' }
                ]}
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-2">Reason (Optional)</label>
              <Input
                value={overrideReason}
                onChange={(e) => setOverrideReason(e.target.value)}
                placeholder="e.g., Public Holiday"
              />
            </div>
            
            <div className="flex justify-end space-x-3 pt-4">
              <Button variant="outline" onClick={() => setIsOverrideModalOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSaveOverride}>
                {editingOverride ? 'Update' : 'Add'} Override
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
