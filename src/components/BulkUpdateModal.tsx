
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Check } from 'lucide-react';

interface BulkUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const BulkUpdateModal = ({ isOpen, onClose }: BulkUpdateModalProps) => {
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([
    'select-all',
    'recurring-event',
    'product-demo',
    'everything-else',
    'interviews',
    'product-hunt-chats'
  ]);

  const eventTypes = [
    { id: 'select-all', label: 'Select All' },
    { id: 'recurring-event', label: 'Recurring Event' },
    { id: 'product-demo', label: 'Product Demo' },
    { id: 'everything-else', label: 'Everything Else' },
    { id: 'interviews', label: 'Interviews' },
    { id: 'product-hunt-chats', label: 'Product Hunt Chats' }
  ];

  const handleToggleEventType = (eventTypeId: string) => {
    if (eventTypeId === 'select-all') {
      if (selectedEventTypes.includes('select-all')) {
        setSelectedEventTypes([]);
      } else {
        setSelectedEventTypes(eventTypes.map(et => et.id));
      }
    } else {
      setSelectedEventTypes(prev => {
        let newSelected;
        if (prev.includes(eventTypeId)) {
          newSelected = prev.filter(id => id !== eventTypeId);
        } else {
          newSelected = [...prev, eventTypeId];
        }
        
        const nonSelectAllItems = eventTypes.filter(et => et.id !== 'select-all');
        const hasAllSelected = nonSelectAllItems.every(et => newSelected.includes(et.id));
        
        if (hasAllSelected && !newSelected.includes('select-all')) {
          newSelected.push('select-all');
        } else if (!hasAllSelected && newSelected.includes('select-all')) {
          newSelected = newSelected.filter(id => id !== 'select-all');
        }
        
        return newSelected;
      });
    }
  };

  const handleUpdate = () => {
    console.log('Updating event types:', selectedEventTypes);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold mb-2">
            Bulk update existing event types
          </DialogTitle>
          <p className="text-muted-foreground text-sm">
            Update the schedules for the selected event types
          </p>
        </DialogHeader>
        
        <div className="space-y-4 py-4">
          {eventTypes.map(eventType => (
            <div key={eventType.id} className="flex items-center space-x-3">
              <button
                onClick={() => handleToggleEventType(eventType.id)}
                className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                  selectedEventTypes.includes(eventType.id)
                    ? 'bg-foreground border-foreground'
                    : 'border-border hover:border-foreground/50'
                }`}
              >
                {selectedEventTypes.includes(eventType.id) && (
                  <Check className="h-3 w-3 text-background" />
                )}
              </button>
              <span className="text-sm text-foreground font-medium">
                {eventType.label}
              </span>
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
      </DialogContent>
    </Dialog>
  );
};
