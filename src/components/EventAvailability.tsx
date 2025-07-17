
import React, { useState } from 'react';
import { Edit } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventAvailability = () => {
  const navigate = useNavigate();

  const handleEditAvailability = () => {
    navigate('/availability');
  };

  return (
    <div className="p-6 max-w-6xl mx-auto space-y-6">
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
      
      <div className="bg-muted/30 rounded-lg p-6 text-center">
        <p className="text-muted-foreground">
          Configure your availability settings to control when this event can be booked.
        </p>
      </div>
    </div>
  );
};
