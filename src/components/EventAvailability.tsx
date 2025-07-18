import React, { useState } from 'react';
import { Plus, Clock, ChevronDown } from 'lucide-react';
import { Switch } from './ui/switch';
import { DateOverrideModal } from './DateOverrideModal';

export const EventAvailability = () => {
  const [showOverrideModal, setShowOverrideModal] = useState(false);
  const [selectedSchedule, setSelectedSchedule] = useState('default');
  
  const schedules = [
    { id: 'default', name: 'Working Hours' },
    { id: 'extended', name: 'Extended Hours' },
    { id: 'weekend', name: 'Weekend Schedule' },
    { id: 'custom', name: 'Custom Schedule' }
  ];

  const [dateOverrides, setDateOverrides] = useState([]);

  const addDateOverride = (date: string) => {
    setDateOverrides(prev => [...prev, { id: Date.now().toString(), date }]);
  };

  const deleteDateOverride = (id: string) => {
    setDateOverrides(prev => prev.filter(override => override.id !== id));
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6" style={{ fontSize: '14px', color: '#384252' }}>
      {/* Schedule Selection */}
      <div>
        <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
          Which schedule should this event type use?
        </label>
        <div className="relative">
          <select 
            value={selectedSchedule}
            onChange={(e) => setSelectedSchedule(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg appearance-none bg-white" 
            style={{ fontSize: '14px', color: '#384252' }}
          >
            {schedules.map(schedule => (
              <option key={schedule.id} value={schedule.id}>{schedule.name}</option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
        </div>
        <p className="mt-2" style={{ fontSize: '12px', color: '#384252' }}>
          Apply a schedule to this event type.
        </p>
      </div>

      {/* Date Overrides */}
      <div className="border-t border-gray-200 pt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold" style={{ fontSize: '16px', color: '#384252' }}>Date Overrides</h3>
          <button onClick={() => setShowOverrideModal(true)} className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" style={{ fontSize: '14px' }}>
            <Plus className="h-4 w-4 mr-1" />
            Add Override
          </button>
        </div>

        {dateOverrides.length === 0 ? (
          <div className="text-center py-8 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
            <Clock className="h-6 w-6 text-gray-400 mx-auto mb-2" />
            <p style={{ fontSize: '14px', color: '#384252' }}>No date overrides configured</p>
          </div>
        ) : (
          <div className="space-y-3">
            {dateOverrides.map(override => (
              <div key={override.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg bg-white">
                <span style={{ fontSize: '14px', color: '#384252' }}>{override.date}</span>
                <button onClick={() => deleteDateOverride(override.id)} className="text-red-500 hover:text-red-700">
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <DateOverrideModal isOpen={showOverrideModal} onClose={() => setShowOverrideModal(false)} onDateSelect={addDateOverride} />
    </div>
  );
};
