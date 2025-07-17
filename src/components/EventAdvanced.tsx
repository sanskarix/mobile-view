
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

export const EventAdvanced = () => {
  const [requiresConfirmation, setRequiresConfirmation] = useState(false);
  const [customFields, setCustomFields] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  return (
    <div className="p-0 max-w-none mx-auto space-y-6 text-sm" style={{ color: '#384252' }}>
      {/* Requires Confirmation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Requires confirmation</h3>
            <p className="text-sm text-muted-foreground">Bookings require manual approval</p>
          </div>
          <Switch checked={requiresConfirmation} onCheckedChange={setRequiresConfirmation} />
        </div>
      </div>

      {/* Custom Redirect */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2" style={{ color: '#384252' }}>Success redirect URL</h3>
          <p className="text-sm text-muted-foreground mb-4">Redirect users to a custom URL after booking</p>
          <Input 
            placeholder="https://example.com/thank-you"
            value={redirectUrl}
            onChange={(e) => setRedirectUrl(e.target.value)}
            className="text-sm"
            style={{ color: '#384252' }}
          />
        </div>
      </div>

      {/* Custom Fields */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-sm font-medium" style={{ color: '#384252' }}>Custom booking fields</h3>
            <p className="text-sm text-muted-foreground">Collect additional information from bookers</p>
          </div>
          <Switch checked={customFields} onCheckedChange={setCustomFields} />
        </div>
        
        {customFields && (
          <div className="pl-6 space-y-4 border-l-2 border-muted">
            <button className="text-sm text-blue-600 hover:text-blue-700">
              + Add custom field
            </button>
          </div>
        )}
      </div>

      {/* Booking Notes */}
      <div className="space-y-4">
        <div>
          <h3 className="text-sm font-medium mb-2" style={{ color: '#384252' }}>Additional notes</h3>
          <p className="text-sm text-muted-foreground mb-4">Notes visible to bookers on the booking page</p>
          <Textarea 
            placeholder="Any additional information for your bookers..."
            rows={3}
            className="text-sm"
            style={{ color: '#384252' }}
          />
        </div>
      </div>
    </div>
  );
};
