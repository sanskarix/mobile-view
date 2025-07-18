
import React, { useState } from 'react';
import { Plus, MoreVertical, Copy, Edit, Trash2, GripVertical } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const EventTypes = () => {
  const navigate = useNavigate();
  const [eventTypes, setEventTypes] = useState([
    {
      id: 1,
      title: 'Product Hunt Chats',
      duration: '15 mins',
      url: 'product-hunt-chats',
      isEnabled: true,
      color: 'bg-blue-500'
    },
    {
      id: 2,
      title: 'Quick Sync',
      duration: '30 mins',
      url: 'quick-sync',
      isEnabled: true,
      color: 'bg-green-500'
    }
  ]);

  const handleDuplicate = (eventType: any) => {
    const newEventType = {
      ...eventType,
      id: Math.max(...eventTypes.map(e => e.id)) + 1,
      title: `${eventType.title} (Copy)`,
      url: `${eventType.url}-copy`
    };
    setEventTypes([...eventTypes, newEventType]);
  };

  const handleDelete = (eventId: number) => {
    if (confirm('Are you sure you want to delete this event type?')) {
      setEventTypes(eventTypes.filter(e => e.id !== eventId));
    }
  };

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">Event Types</h1>
          <p className="text-muted-foreground mt-1">Create events to share for people to book on your calendar.</p>
        </div>
        <button className="bg-primary text-primary-foreground px-4 py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors flex items-center">
          <Plus className="h-4 w-4 mr-2" />
          New event type
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventTypes.map((eventType) => (
          <div
            key={eventType.id}
            className="group relative bg-card border border-border rounded-lg p-6 hover:shadow-md transition-all duration-200"
          >
            {/* Drag handle */}
            <div className="absolute -left-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
              <GripVertical className="h-4 w-4 text-muted-foreground" />
            </div>

            {/* More options dropdown */}
            <div className="absolute top-4 right-4">
              <div className="relative group/dropdown">
                <button className="p-1 hover:bg-muted rounded opacity-0 group-hover:opacity-100 transition-opacity">
                  <MoreVertical className="h-4 w-4 text-muted-foreground" />
                </button>
                
                {/* Dropdown menu */}
                <div className="absolute right-0 top-8 w-48 bg-popover border border-border rounded-lg shadow-lg z-10 opacity-0 invisible group-hover/dropdown:opacity-100 group-hover/dropdown:visible transition-all">
                  <div className="py-1">
                    <button
                      onClick={() => handleDuplicate(eventType)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      style={{ fontSize: '14px', color: '#384252' }}
                    >
                      <Copy className="h-4 w-4 mr-2" />
                      Duplicate
                    </button>
                    <button
                      onClick={() => navigate(`/event/${eventType.id}/setup`)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center"
                      style={{ fontSize: '14px', color: '#384252' }}
                    >
                      <Edit className="h-4 w-4 mr-2" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(eventType.id)}
                      className="w-full px-4 py-2 text-left text-sm hover:bg-muted flex items-center text-destructive"
                      style={{ fontSize: '14px' }}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Card content */}
            <div className="flex items-start space-x-4">
              <div className={`w-4 h-4 rounded ${eventType.color} flex-shrink-0 mt-1`}></div>
              <div className="flex-1 min-w-0">
                <h3 
                  className="font-medium text-foreground cursor-pointer hover:text-primary transition-colors"
                  onClick={() => navigate(`/event/${eventType.id}/setup`)}
                  style={{ fontSize: '14px', color: '#384252' }}
                >
                  {eventType.title}
                </h3>
                <p className="text-muted-foreground mt-1" style={{ fontSize: '14px', color: '#384252' }}>
                  {eventType.duration}
                </p>
                <p className="text-muted-foreground mt-2" style={{ fontSize: '14px', color: '#384252' }}>
                  cal.id/sanskar/{eventType.url}
                </p>
              </div>
            </div>

            {/* Status toggle */}
            <div className="mt-4 flex items-center justify-between">
              <span className="text-sm" style={{ fontSize: '14px', color: '#384252' }}>
                {eventType.isEnabled ? 'On' : 'Off'}
              </span>
              <button 
                className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                  eventType.isEnabled ? 'bg-primary' : 'bg-muted'
                }`}
                onClick={() => {
                  setEventTypes(eventTypes.map(e => 
                    e.id === eventType.id ? { ...e, isEnabled: !e.isEnabled } : e
                  ));
                }}
              >
                <span
                  className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                    eventType.isEnabled ? 'translate-x-6' : 'translate-x-1'
                  }`}
                />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
