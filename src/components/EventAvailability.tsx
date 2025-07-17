
import React, { useState } from 'react';
import { ChevronDown, Clock, Edit, ExternalLink } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventAvailability = () => {
  const navigate = useNavigate();

  const handleEditAvailability = () => {
    navigate('/availability');
  };

  const weeklySchedule = [
    { day: 'Monday', startTime: '9:00 am', endTime: '5:00 pm', available: true },
    { day: 'Tuesday', startTime: '9:00 am', endTime: '5:00 pm', available: true },
    { day: 'Wednesday', startTime: '9:00 am', endTime: '5:00 pm', available: true },
    { day: 'Thursday', startTime: '9:00 am', endTime: '5:00 pm', available: true },
    { day: 'Friday', startTime: '9:00 am', endTime: '5:00 pm', available: true },
    { day: 'Saturday', startTime: '', endTime: '', available: false },
    { day: 'Sunday', startTime: '', endTime: '', available: false }
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-6 text-sm" style={{ color: '#384252' }}>
      {/* Header with dropdown */}
      <div className="flex items-center justify-between border-b border-border pb-4">
        <div className="flex items-center space-x-2">
          <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Working Hours - Default</h3>
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        </div>
      </div>

      {/* Weekly Schedule */}
      <div className="space-y-6">
        {weeklySchedule.map((schedule, index) => (
          <div key={schedule.day} className="flex items-center justify-between">
            <div className="text-sm font-medium min-w-[120px]" style={{ color: '#384252' }}>
              {schedule.day}
            </div>
            <div className="flex items-center space-x-4 text-muted-foreground">
              {schedule.available ? (
                <>
                  <span className="text-sm" style={{ color: '#384252' }}>{schedule.startTime}</span>
                  <span className="text-sm" style={{ color: '#384252' }}>-</span>
                  <span className="text-sm" style={{ color: '#384252' }}>{schedule.endTime}</span>
                </>
              ) : (
                <span className="text-sm text-muted-foreground">Unavailable</span>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Timezone section */}
      <div className="flex items-center justify-between pt-6 border-t border-border">
        <div className="flex items-center space-x-2">
          <div className="w-4 h-4 rounded-full bg-blue-500 flex items-center justify-center">
            <div className="w-2 h-2 bg-white rounded-full"></div>
          </div>
          <span className="text-sm" style={{ color: '#384252' }}>Asia/Calcutta</span>
        </div>
        <button
          onClick={handleEditAvailability}
          className="flex items-center space-x-1 text-blue-600 hover:text-blue-700 transition-colors"
        >
          <Clock className="h-4 w-4" />
          <span className="text-sm">Edit</span>
          <ExternalLink className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
};
