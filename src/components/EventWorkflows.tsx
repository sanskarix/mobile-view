
import React, { useState } from 'react';
import { Plus, Mail, MessageSquare, Calendar, Clock } from 'lucide-react';
import { Switch } from './ui/switch';
import { Badge } from './ui/badge';

interface Workflow {
  id: string;
  name: string;
  trigger: string;
  actions: string[];
  enabled: boolean;
}

export const EventWorkflows = () => {
  const [workflows, setWorkflows] = useState<Workflow[]>([
    {
      id: '1',
      name: 'Booking Confirmation',
      trigger: 'On booking confirmed',
      actions: ['Send email to attendee', 'Send SMS reminder'],
      enabled: true
    },
    {
      id: '2',
      name: 'Pre-meeting Reminder',
      trigger: '1 hour before meeting',
      actions: ['Send email reminder', 'Create calendar event'],
      enabled: false
    }
  ]);

  const toggleWorkflow = (workflowId: string) => {
    setWorkflows(workflows.map(workflow => 
      workflow.id === workflowId ? { ...workflow, enabled: !workflow.enabled } : workflow
    ));
  };

  const getTriggerIcon = (trigger: string) => {
    if (trigger.includes('booking')) return <Calendar className="h-4 w-4" />;
    if (trigger.includes('hour')) return <Clock className="h-4 w-4" />;
    return <Mail className="h-4 w-4" />;
  };

  const getActionIcon = (action: string) => {
    if (action.includes('email')) return <Mail className="h-4 w-4" />;
    if (action.includes('SMS')) return <MessageSquare className="h-4 w-4" />;
    return <Calendar className="h-4 w-4" />;
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Workflows</h3>
            <p className="text-sm text-muted-foreground">
              Automate actions when certain events occur during the booking process.
            </p>
          </div>
          <button className="flex items-center px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
            <Plus className="h-4 w-4 mr-2" />
            Add Workflow
          </button>
        </div>

        {workflows.length === 0 ? (
          <div className="text-center py-12 border-2 border-dashed border-border rounded-lg">
            <div className="space-y-3">
              <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Calendar className="h-6 w-6 text-muted-foreground" />
              </div>
              <h4 className="font-medium text-foreground">No workflows configured</h4>
              <p className="text-sm text-muted-foreground">
                Create your first workflow to automate booking processes.
              </p>
              <button className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors">
                <Plus className="h-4 w-4 mr-2 inline" />
                Create Workflow
              </button>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {workflows.map((workflow) => (
              <div key={workflow.id} className="p-4 border border-border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <h4 className="font-medium text-foreground">{workflow.name}</h4>
                    <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                      {getTriggerIcon(workflow.trigger)}
                      <span>{workflow.trigger}</span>
                    </div>
                  </div>
                  <Switch
                    checked={workflow.enabled}
                    onCheckedChange={() => toggleWorkflow(workflow.id)}
                  />
                </div>

                <div className="space-y-2">
                  <span className="text-sm font-medium text-foreground">Actions:</span>
                  <div className="flex flex-wrap gap-2">
                    {workflow.actions.map((action, index) => (
                      <div key={index} className="flex items-center space-x-1 px-2 py-1 bg-muted rounded-md">
                        {getActionIcon(action)}
                        <span className="text-xs text-muted-foreground">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
