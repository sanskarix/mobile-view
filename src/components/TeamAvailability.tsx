
import React, { useState } from 'react';
import { Button } from './ui/button';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { ChevronLeft, ChevronRight, Clock } from 'lucide-react';

interface TeamMember {
  id: string;
  name: string;
  avatar: string;
  timezone: string;
  isAvailable: boolean;
  schedule: {
    [key: string]: { start: string; end: string; available: boolean }[];
  };
}

export const TeamAvailability = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedMember, setSelectedMember] = useState<string | null>(null);
  const [hoverTime, setHoverTime] = useState<string | null>(null);

  const teamMembers: TeamMember[] = [
    {
      id: '1',
      name: 'You',
      avatar: 'Y',
      timezone: 'UTC+05:30',
      isAvailable: true,
      schedule: {
        [selectedDate.toDateString()]: [
          { start: '09:00', end: '12:00', available: true },
          { start: '13:00', end: '17:00', available: true }
        ]
      }
    },
    {
      id: '2',
      name: 'Sanskar Yadav',
      avatar: 'S',
      timezone: 'UTC+05:30',
      isAvailable: true,
      schedule: {
        [selectedDate.toDateString()]: [
          { start: '10:00', end: '14:00', available: true },
          { start: '15:00', end: '18:00', available: false }
        ]
      }
    },
    {
      id: '3',
      name: 'John Doe',
      avatar: 'J',
      timezone: 'UTC-05:00',
      isAvailable: false,
      schedule: {
        [selectedDate.toDateString()]: [
          { start: '08:00', end: '16:00', available: false }
        ]
      }
    }
  ];

  const timeSlots = Array.from({ length: 24 }, (_, i) => {
    const hour = i.toString().padStart(2, '0');
    return `${hour}:00`;
  });

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const navigateDate = (direction: 'prev' | 'next') => {
    const newDate = new Date(selectedDate);
    newDate.setDate(selectedDate.getDate() + (direction === 'next' ? 1 : -1));
    setSelectedDate(newDate);
  };

  const getSlotStyle = (member: TeamMember, time: string) => {
    const schedule = member.schedule[selectedDate.toDateString()] || [];
    const timeHour = parseInt(time.split(':')[0]);
    
    const slot = schedule.find(s => {
      const startHour = parseInt(s.start.split(':')[0]);
      const endHour = parseInt(s.end.split(':')[0]);
      return timeHour >= startHour && timeHour < endHour;
    });

    if (!slot) return 'bg-gray-100';
    return slot.available ? 'bg-green-500' : 'bg-gray-400';
  };

  return (
    <div className="space-y-6">
      {/* Date Navigation */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('prev')}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-lg font-semibold">{formatDate(selectedDate)}</h2>
          <Button
            variant="outline"
            size="icon"
            onClick={() => navigateDate('next')}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Team Availability Grid */}
      <div className="border rounded-lg overflow-hidden">
        <div className="grid grid-cols-[300px_1fr] divide-x">
          {/* Team Members Column */}
          <div className="bg-gray-50">
            <div className="p-4 border-b bg-white">
              <h3 className="font-medium text-sm">Team Members</h3>
            </div>
            <div className="divide-y">
              {teamMembers.map((member) => (
                <div
                  key={member.id}
                  className={`p-4 cursor-pointer hover:bg-gray-100 transition-colors ${
                    selectedMember === member.id ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                  }`}
                  onClick={() => setSelectedMember(member.id)}
                >
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="text-xs">
                        {member.avatar}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium text-sm">{member.name}</div>
                      <div className="text-xs text-gray-500 flex items-center">
                        <Clock className="h-3 w-3 mr-1" />
                        {member.timezone}
                      </div>
                    </div>
                  </div>
                  <div className="mt-2">
                    <span className={`inline-block px-2 py-1 rounded-full text-xs ${
                      member.isAvailable 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {member.isAvailable ? 'Available' : 'Busy'}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Timeline Column */}
          <div className="relative">
            {/* Time Header */}
            <div className="sticky top-0 bg-white border-b p-2">
              <div className="grid grid-cols-24 gap-px">
                {timeSlots.map((time, index) => (
                  <div
                    key={time}
                    className="text-xs text-center py-1 text-gray-500"
                    style={{ gridColumn: `${index + 1} / span 1` }}
                  >
                    {index % 2 === 0 ? time : ''}
                  </div>
                ))}
              </div>
            </div>

            {/* Timeline Grid */}
            <div className="relative">
              {teamMembers.map((member, memberIndex) => (
                <div
                  key={member.id}
                  className="relative"
                  style={{ height: '73px' }}
                >
                  <div className="absolute inset-0 grid grid-cols-24 gap-px p-2">
                    {timeSlots.map((time, timeIndex) => (
                      <div
                        key={time}
                        className={`h-12 rounded-sm ${getSlotStyle(member, time)}`}
                        style={{ gridColumn: `${timeIndex + 1} / span 1` }}
                        onMouseEnter={() => setHoverTime(time)}
                        onMouseLeave={() => setHoverTime(null)}
                      />
                    ))}
                  </div>
                  {memberIndex < teamMembers.length - 1 && (
                    <div className="absolute bottom-0 left-0 right-0 border-b" />
                  )}
                </div>
              ))}

              {/* Hover Indicator */}
              {hoverTime && (
                <div 
                  className="absolute top-0 bottom-0 w-0.5 bg-blue-600 pointer-events-none z-10"
                  style={{
                    left: `${(parseInt(hoverTime.split(':')[0]) / 24) * 100}%`,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {hoverTime}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Legend */}
      <div className="flex items-center space-x-6 text-sm">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-green-500 rounded"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded"></div>
          <span>Busy</span>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 bg-gray-100 rounded border"></div>
          <span>No availability</span>
        </div>
      </div>
    </div>
  );
};
