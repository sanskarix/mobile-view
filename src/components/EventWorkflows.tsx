import React, { useState } from 'react';
import { Plus, Zap, Mail, MessageSquare } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventWorkflows = () => {
  const [workflowsEnabled, setWorkflowsEnabled] = useState(false);
  const [workflows, setWorkflows] = useState([]);

  return (
    <div className="p-0 max-w-none mx-auto space-y-6" style={{ fontSize: '14px', color: '#384252' }}>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold" style={{ fontSize: '16px', color: '#384252' }}>Workflows</h3>
          <p style={{ fontSize: '14px', color: '#384252' }}>Automate actions when events are scheduled</p>
        </div>
        <Switch checked={workflowsEnabled} onCheckedChange={setWorkflowsEnabled} />
      </div>

      {workflowsEnabled ? (
        workflows.length === 0 ? (
          <div className="text-center py-12 bg-gray-50 border-2 border-dashed border-gray-300 rounded-lg">
            <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-4">
              <Zap className="h-6 w-6 text-gray-400" />
            </div>
            <p className="mb-4" style={{ fontSize: '14px', color: '#384252' }}>No workflows configured</p>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" style={{ fontSize: '14px' }}>
              Create Workflow
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h4 className="font-semibold" style={{ fontSize: '14px', color: '#384252' }}>Active Workflows</h4>
              <button className="flex items-center px-3 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 font-medium" style={{ fontSize: '14px' }}>
                <Plus className="h-4 w-4 mr-1" />
                Add Workflow
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="text-center py-8 text-gray-500" style={{ fontSize: '14px' }}>
          Enable workflows to automate actions when events are scheduled
        </div>
      )}
    </div>
  );
};
