
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';

interface BulkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: (selectedEventTypes: string[]) => void;
}

export const BulkUpdateModal = ({ isOpen, onClose, onUpdate }: BulkUpdateModalProps) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([
    'recurring-event',
    'product-demo',
    'everything-else',
    'interviews',
    'product-hunt-chats'
  ]);

  const eventTypes = [
    { id: 'recurring-event', name: 'Recurring Event' },
    { id: 'product-demo', name: 'Product Demo' },
    { id: 'everything-else', name: 'Everything Else' },
    { id: 'interviews', name: 'Interviews' },
    { id: 'product-hunt-chats', name: 'Product Hunt Chats' }
  ];

  const handleSelectAll = () => {
    if (selectedEventTypes.length === eventTypes.length) {
      setSelectedEventTypes([]);
    } else {
      setSelectedEventTypes(eventTypes.map(et => et.id));
    }
  };

  const handleEventTypeToggle = (eventTypeId: string) => {
    setSelectedEventTypes(prev =>
      prev.includes(eventTypeId)
        ? prev.filter(id => id !== eventTypeId)
        : [...prev, eventTypeId]
    );
  };

  const handleUpdate = () => {
    onUpdate(selectedEventTypes);
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Bulk update existing event types</DialogTitle>
          <p className="text-sm text-muted-foreground">
            Update the schedules for the selected event types
          </p>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="select-all"
              checked={selectedEventTypes.length === eventTypes.length}
              onCheckedChange={handleSelectAll}
            />
            <label htmlFor="select-all" className="text-sm font-medium">
              Select All
            </label>
          </div>

          <div className="space-y-3">
            {eventTypes.map((eventType) => (
              <div key={eventType.id} className="flex items-center space-x-2">
                <Checkbox
                  id={eventType.id}
                  checked={selectedEventTypes.includes(eventType.id)}
                  onCheckedChange={() => handleEventTypeToggle(eventType.id)}
                />
                <label htmlFor={eventType.id} className="text-sm">
                  {eventType.name}
                </label>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <Button variant="outline" onClick={onClose}>
              Close
            </Button>
            <Button onClick={handleUpdate}>
              Update
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
