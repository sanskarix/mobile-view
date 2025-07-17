
import React, { useState } from 'react';
import { Edit, ChevronDown, Globe } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from './ui/collapsible';

export const EventAvailability = () => {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const handleEditAvailability = () => {
    navigate('/availability');
  };

  const workingHours = [
    { day: 'Monday', start: '9:00 am', end: '5:00 pm', available: true },
    { day: 'Tuesday', start: '9:00 am', end: '5:00 pm', available: true },
    { day: 'Wednesday', start: '9:00 am', end: '5:00 pm', available: true },
    { day: 'Thursday', start: '9:00 am', end: '5:00 pm', available: true },
    { day: 'Friday', start: '9:00 am', end: '5:00 pm', available: true },
    { day: 'Saturday', start: '', end: '', available: false },
    { day: 'Sunday', start: '', end: '', available: false },
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-foreground">Availability</h3>
        <button
          onClick={handleEditAvailability}
          className="flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Edit className="h-4 w-4 mr-2" />
          Edit
        </button>
      </div>
      
      <div className="space-y-4">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="flex items-center justify-between w-full p-4 bg-background border border-border rounded-lg hover:bg-muted/50 transition-colors">
            <span className="font-medium text-foreground">Working Hours - Default</span>
            <ChevronDown className={`h-4 w-4 text-muted-foreground transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {workingHours.map((schedule) => (
              <div key={schedule.day} className="flex items-center justify-between py-3 px-4 border-b border-border last:border-b-0">
                <span className="font-medium text-foreground min-w-[100px]">{schedule.day}</span>
                <div className="text-right">
                  {schedule.available ? (
                    <span className="text-muted-foreground">
                      {schedule.start} - {schedule.end}
                    </span>
                  ) : (
                    <span className="text-muted-foreground">Unavailable</span>
                  )}
                </div>
              </div>
            ))}
            
            <div className="flex items-center justify-between pt-4 border-t border-border">
              <div className="flex items-center space-x-2">
                <Globe className="h-4 w-4 text-primary" />
                <span className="text-sm text-foreground">Asia/Calcutta</span>
              </div>
              <button className="text-sm text-primary hover:text-primary/80 transition-colors flex items-center">
                <Edit className="h-3 w-3 mr-1" />
                Edit
              </button>
            </div>
          </CollapsibleContent>
        </Collapsible>
      </div>
    </div>
  );
};
