import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Workflow, Mail, MessageSquare, Phone } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { CreateWorkflowModal } from '@/components/CreateWorkflowModal';
import { WorkflowBuilder } from '@/components/WorkflowBuilder';
import { HeaderMeta } from '@/components/Layout';

const workflowTemplates = [
  {
    id: 'email-reminder-host',
    title: 'Email reminder to host',
    description: 'Never miss an event — get automated email reminders',
    icon: Mail,
    iconColor: 'text-green-600'
  },
  {
    id: 'email-reminder-invitee',
    title: 'Email reminder to invitee',
    description: 'Reduce no-shows — send automated email reminders to invitees',
    icon: Mail,
    iconColor: 'text-green-600'
  },
  {
    id: 'thank-you-email',
    title: 'Send thank you email',
    description: 'Build relationships with a quick thanks',
    icon: Mail,
    iconColor: 'text-red-600'
  },
  {
    id: 'email-additional-resources',
    title: 'Email additional resources',
    description: 'Send links for additional resources to your invitees',
    icon: Mail,
    iconColor: 'text-blue-600'
  },
  {
    id: 'email-reminder-someone-else',
    title: 'Email reminder to someone else',
    description: 'Prompt non-attendees so they can help prepare for your meeting',
    icon: Mail,
    iconColor: 'text-orange-600'
  },
  {
    id: 'request-followup-meeting',
    title: 'Request follow-up meeting',
    description: "Don't wait to meet again",
    icon: Mail,
    iconColor: 'text-purple-600'
  },
  {
    id: 'email-feedback-survey',
    title: 'Email your own feedback survey',
    description: 'Email a survey link from a third party like Typeform or Google Forms to get feedback from invitees after your event',
    icon: Mail,
    iconColor: 'text-pink-600'
  },
  {
    id: 'email-no-shows',
    title: 'Email no-shows to book a new time',
    description: 'Follow up with invitees who didn\'t show up to the meeting',
    icon: Mail,
    iconColor: 'text-red-600'
  },
  {
    id: 'text-reminder-host',
    title: 'Text reminder to host',
    description: 'Never miss an event — set automated text reminders',
    icon: MessageSquare,
    iconColor: 'text-green-600'
  }
];

export const Workflows = () => {
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTemplates, setShowTemplates] = useState(false);
  const [showWorkflowBuilder, setShowWorkflowBuilder] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

  React.useEffect(() => {
    setHeaderMeta({
      title: 'Workflows',
      description: 'Automate your scheduling workflow'
    });
  }, [setHeaderMeta]);

  const handleCreateWorkflow = () => {
    setShowTemplates(true);
  };

  const handleCreateCustomWorkflow = () => {
    setShowTemplates(false);
    setShowCreateModal(true);
  };

  const handleTemplateSelect = (template: any) => {
    setSelectedTemplate(template);
    setShowTemplates(false);
    setShowWorkflowBuilder(true);
  };

  const handleWorkflowModalContinue = () => {
    setShowCreateModal(false);
    setShowWorkflowBuilder(true);
  };

  // Empty state for no workflows
  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center py-16">
          <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-6">
            <Workflow className="h-8 w-8 text-muted-foreground" />
          </div>
          
          <h1 className="text-2xl font-semibold mb-4">Create Workflows</h1>
          <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
            With Workflows you can send automated reminders and route notifications to the right person at the right time
          </p>
          
          <Button onClick={handleCreateWorkflow} className="gap-2">
            <Plus className="h-4 w-4" />
            Create Workflow
          </Button>
        </div>
      </div>

      {/* Templates Modal */}
      <Dialog open={showTemplates} onOpenChange={setShowTemplates}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Choose a workflow template</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            <div className="text-center">
              <Button 
                variant="outline" 
                onClick={handleCreateCustomWorkflow}
                className="gap-2"
              >
                <Plus className="h-4 w-4" />
                Create your own workflow
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {workflowTemplates.map((template) => (
                <div 
                  key={template.id} 
                  className="border rounded-lg p-6 hover:border-border/60 transition-all cursor-pointer"
                  onClick={() => handleTemplateSelect(template)}
                >
                  <div className="flex flex-col items-center text-center space-y-4">
                    <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center">
                      <template.icon className={`h-6 w-6 ${template.iconColor}`} />
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">{template.title}</h3>
                      <p className="text-sm text-muted-foreground">{template.description}</p>
                    </div>
                    <Button variant="outline" size="sm">
                      Add workflow
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onContinue={handleWorkflowModalContinue}
      />

      {/* Workflow Builder */}
      <WorkflowBuilder
        open={showWorkflowBuilder}
        onOpenChange={setShowWorkflowBuilder}
        template={selectedTemplate}
      />
    </div>
  );
};