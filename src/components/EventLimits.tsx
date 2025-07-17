
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';

export const EventLimits = () => {
  const [bufferTime, setBufferTime] = useState(false);
  const [dailyLimit, setDailyLimit] = useState(false);
  const [futureBookings, setFutureBookings] = useState(false);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6 text-sm" style={{ color: '#384252' }}>
      {/* Buffer Time */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Buffer time</h3>
            <p className="text-sm text-muted-foreground">Add time before or after your events</p>
          </div>
          <Switch checked={bufferTime} onCheckedChange={setBufferTime} />
        </div>
        
        {bufferTime && (
          <div className="pl-6 space-y-4 border-l-2 border-muted">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#384252' }}>Before event</label>
                <div className="flex items-center space-x-2">
                  <Input type="number" defaultValue="0" className="w-20 text-sm" style={{ color: '#384252' }} />
                  <span className="text-sm" style={{ color: '#384252' }}>minutes</span>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: '#384252' }}>After event</label>
                <div className="flex items-center space-x-2">
                  <Input type="number" defaultValue="0" className="w-20 text-sm" style={{ color: '#384252' }} />
                  <span className="text-sm" style={{ color: '#384252' }}>minutes</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Daily Limit */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Daily booking limit</h3>
            <p className="text-sm text-muted-foreground">Limit how many events can be booked per day</p>
          </div>
          <Switch checked={dailyLimit} onCheckedChange={setDailyLimit} />
        </div>
        
        {dailyLimit && (
          <div className="pl-6 space-y-4 border-l-2 border-muted">
            <div className="flex items-center space-x-2">
              <Input type="number" defaultValue="1" className="w-20 text-sm" style={{ color: '#384252' }} />
              <span className="text-sm" style={{ color: '#384252' }}>events per day</span>
            </div>
          </div>
        )}
      </div>

      {/* Future Bookings */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Limit future bookings</h3>
            <p className="text-sm text-muted-foreground">Prevent bookings too far in advance</p>
          </div>
          <Switch checked={futureBookings} onCheckedChange={setFutureBookings} />
        </div>
        
        {futureBookings && (
          <div className="pl-6 space-y-4 border-l-2 border-muted">
            <div className="flex items-center space-x-2">
              <Input type="number" defaultValue="30" className="w-20 text-sm" style={{ color: '#384252' }} />
              <select className="px-3 py-2 border border-border rounded-lg text-sm" style={{ color: '#384252' }}>
                <option>days</option>
                <option>weeks</option>
                <option>months</option>
              </select>
              <span className="text-sm" style={{ color: '#384252' }}>in advance</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
