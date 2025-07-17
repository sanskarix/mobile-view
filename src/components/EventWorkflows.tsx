
import React from 'react';
import { Plus, Zap } from 'lucide-react';

export const EventWorkflows = () => {
  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
          <Zap className="h-8 w-8 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">No workflows configured</h3>
        <p className="text-muted-foreground mb-6 max-w-md mx-auto text-sm">
          Create automated workflows to streamline your booking process and save time.
        </p>
        <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors font-medium text-sm mx-auto">
          <Plus className="h-4 w-4 mr-2" />
          Create Workflow
        </button>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Available workflow templates</h3>
        <p className="text-muted-foreground mb-6 text-sm">Choose from pre-built templates to get started quickly</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              title: 'Send welcome email',
              description: 'Automatically send a personalized welcome message when someone books',
              icon: '📧'
            },
            {
              title: 'Add to CRM',
              description: 'Create or update contact records in your CRM system',
              icon: '👤'
            },
            {
              title: 'Send reminder',
              description: 'Send automated reminders before the scheduled meeting',
              icon: '⏰'
            },
            {
              title: 'Create calendar event',
              description: 'Automatically add events to team calendars',
              icon: '📅'
            }
          ].map((template, index) => (
            <div key={index} className="p-4 border border-border rounded-lg hover:border-border/60 transition-colors bg-card">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
                  <span className="text-lg">{template.icon}</span>
                </div>
                <div className="flex-1">
                  <h4 className="font-medium text-foreground text-sm mb-1">{template.title}</h4>
                  <p className="text-muted-foreground text-xs">{template.description}</p>
                </div>
                <button className="flex items-center px-3 py-1.5 text-xs text-foreground border border-border rounded-md hover:bg-muted transition-colors font-medium">
                  <Plus className="h-3 w-3 mr-1" />
                  Use
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
