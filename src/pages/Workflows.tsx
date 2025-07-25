import React, { useState } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Workflow } from 'lucide-react';
import { CreateWorkflowModal } from '@/components/CreateWorkflowModal';
import { HeaderMeta } from '@/components/Layout';


export const Workflows = () => {
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);

  React.useEffect(() => {
    setHeaderMeta({
      title: 'Workflows',
      description: 'Automate your scheduling workflow'
    });
  }, [setHeaderMeta]);

  const handleCreateWorkflow = () => {
    navigate('/workflows/templates');
  };

  const handleWorkflowModalContinue = () => {
    setShowCreateModal(false);
    navigate('/workflows/new');
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

      {/* Create Workflow Modal */}
      <CreateWorkflowModal
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onContinue={handleWorkflowModalContinue}
      />
    </div>
  );
};