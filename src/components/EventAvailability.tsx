
import React from 'react';
import { ChevronDown, Edit, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventAvailability = () => {
  const navigate = useNavigate();

  const handleEditAvailability = () => {
    navigate('/availability');
  };

  const weekDays = [
    { day: 'Monday', time: '9:00 am - 5:00 pm', available: true },
    { day: 'Tuesday', time: '9:00 am - 5:00 pm', available: true },
    { day: 'Wednesday', time: '9:00 am - 5:00 pm', available: true },
    { day: 'Thursday', time: '9:00 am - 5:00 pm', available: true },
    { day: 'Friday', time: '9:00 am - 5:00 pm', available: true },
    { day: 'Saturday', time: 'Unavailable', available: false },
    { day: 'Sunday', time: 'Unavailable', available: false }
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="bg-card rounded-lg border border-border">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <h3 className="font-medium text-foreground">Working Hours - Default</h3>
          </div>
          <ChevronDown className="h-4 w-4 text-muted-foreground" />
        </div>

        {/* Schedule List */}
        <div className="p-4 space-y-4">
          {weekDays.map((day, index) => (
            <div key={index} className="flex items-center justify-between py-2">
              <span className="text-foreground font-medium min-w-[100px]">{day.day}</span>
              <span className={`text-sm ${day.available ? 'text-foreground' : 'text-muted-foreground'}`}>
                {day.time}
              </span>
            </div>
          ))}
        </div>

        {/* Timezone */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Globe className="h-4 w-4 text-muted-foreground" />
              <span className="text-foreground">Asia/Calcutta</span>
            </div>
            <button
              onClick={handleEditAvailability}
              className="flex items-center space-x-1 text-sm text-primary hover:text-primary/80 transition-colors"
            >
              <Edit className="h-4 w-4" />
              <span>Edit</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
