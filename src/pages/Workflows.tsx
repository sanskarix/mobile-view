import React, { useState, useEffect } from 'react';
import { useOutletContext, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Plus, Workflow, ChevronDown, Copy, ExternalLink, Download, Code, MoreHorizontal, Mail, MessageSquare, MessageCircle } from 'lucide-react';
import { CreateWorkflowModal } from '@/components/CreateWorkflowModal';
import { HeaderMeta } from '@/components/Layout';
import { Switch } from '@/components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
interface WorkflowCardProps {
  workflow: any;
  onEdit: (workflowId: string) => void;
  onToggle: (workflowId: string, enabled: boolean) => void;
  onDuplicate: (workflowId: string) => void;
  onDelete: (workflowId: string) => void;
  onCopyLink: (workflowId: string) => void;
  copiedLink: string | null;
}
const WorkflowCard: React.FC<WorkflowCardProps> = ({
  workflow,
  onEdit,
  onToggle,
  onDuplicate,
  onDelete,
  onCopyLink,
  copiedLink
}) => {
  return <div className="bg-card border border-border rounded-lg p-6 hover:border-border/60 transition-all hover:shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-2">
            <h3 className="font-semibold text-foreground text-base">{workflow.title}</h3>
            <div className="flex items-center space-x-2">
              <Switch checked={workflow.enabled} onCheckedChange={checked => onToggle(workflow.id, checked)} />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => onEdit(workflow.id)}>
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDuplicate(workflow.id)}>
                    Duplicate
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onCopyLink(workflow.id)}>
                    {copiedLink === workflow.id ? 'Copied!' : 'Copy link'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => onDelete(workflow.id)} className="text-destructive">
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>

          <p className="text-muted-foreground text-sm mb-3">
            {workflow.trigger} • {workflow.action}
          </p>

          <div className="flex items-center justify-between">
            <span className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-xs rounded">
              {workflow.eventTypeInfo}
            </span>
            <div className="flex items-center space-x-1">
              {workflow.action.includes('email') && <Mail className="h-3 w-3 text-muted-foreground" />}
              {workflow.action.includes('SMS') && <MessageSquare className="h-3 w-3 text-muted-foreground" />}
              {workflow.action.includes('WhatsApp') && <MessageCircle className="h-3 w-3 text-green-600" />}
            </div>
          </div>
        </div>
      </div>
    </div>
};
export const Workflows = () => {
  const {
    setHeaderMeta
  } = useOutletContext<{
    setHeaderMeta: (meta: HeaderMeta) => void;
  }>();
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showTeamDropdown, setShowTeamDropdown] = useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('all');
  const [workflows, setWorkflows] = useState<any[]>([]);
  const [teams, setTeams] = useState<any[]>([]);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  React.useEffect(() => {
    setHeaderMeta({
      title: 'Workflows',
      description: 'Automate your scheduling workflow'
    });
  }, [setHeaderMeta]);

  // Load teams from localStorage
  useEffect(() => {
    const personalTeam = {
      id: 'personal',
      name: 'Your account',
      avatar: 'S'
    };
    const savedTeams = localStorage.getItem('teams');
    const loadedTeams = savedTeams ? JSON.parse(savedTeams) : [];
    const exampleTeams = [{
      id: 'team1',
      name: 'Marketing Team',
      avatar: 'M'
    }, {
      id: 'team2',
      name: 'Sales Team',
      avatar: 'S'
    }, {
      id: 'team3',
      name: 'Development Team',
      avatar: 'D'
    }, {
      id: 'team4',
      name: 'Support Team',
      avatar: 'Su'
    }];
    setTeams([personalTeam, ...loadedTeams.map((team: any) => ({
      ...team,
      name: team.name
    })), ...exampleTeams]);
  }, []);

  // Load sample workflows and check for saved ones
  useEffect(() => {
    const savedWorkflows = localStorage.getItem('workflows');
    let loadedWorkflows = savedWorkflows ? JSON.parse(savedWorkflows) : [];
    
    // If no saved workflows, use sample data
    if (loadedWorkflows.length === 0) {
      loadedWorkflows = [{
        id: 'workflow-1',
        title: 'Meeting Reminder Emails',
        trigger: '24 hours after new event is booked',
        action: 'Send emails to attendees',
        enabled: true,
        eventTypeInfo: 'Active on 3 event types',
        teamName: 'Personal',
        createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString()
      }, {
        id: 'workflow-2',
        title: 'Post-Meeting Follow Up',
        trigger: 'Immediately when after event ends',
        action: 'Send emails to host',
        enabled: true,
        eventTypeInfo: 'Active on Team Standup',
        teamName: 'Support Team',
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString()
      }, {
        id: 'workflow-3',
        title: 'Cancellation Notification',
        trigger: 'Immediately when event is canceled',
        action: 'Send SMS to attendees',
        enabled: false,
        eventTypeInfo: 'Active on all event types',
        teamName: 'Sales Team',
        createdAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000).toISOString()
      }, {
        id: 'workflow-4',
        title: 'No-Show Alert',
        trigger: 'Immediately when invitee is marked no-show',
        action: 'Send emails to host',
        enabled: true,
        eventTypeInfo: 'Active on 2 event types',
        teamName: 'Development Team',
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString()
      }];
    }
    setWorkflows(loadedWorkflows);
  }, []);
  const handleCreateWorkflow = () => {
    navigate('/workflows/templates');
  };
  const handleWorkflowModalContinue = () => {
    setShowCreateModal(false);
    navigate('/workflows/new');
  };
  const handleWorkflowEdit = (workflowId: string) => {
    const workflow = workflows.find(w => w.id === workflowId);
    navigate('/workflows/new', { state: { editWorkflow: workflow } });
  };
  const handleWorkflowToggle = (workflowId: string, enabled: boolean) => {
    setWorkflows(prev => prev.map(workflow => workflow.id === workflowId ? {
      ...workflow,
      enabled
    } : workflow));
  };
  const handleWorkflowDuplicate = (workflowId: string) => {
    const workflowToDuplicate = workflows.find(w => w.id === workflowId);
    if (workflowToDuplicate) {
      const duplicatedWorkflow = {
        ...workflowToDuplicate,
        id: `workflow-${Date.now()}`,
        title: `${workflowToDuplicate.title} (Copy)`,
        createdAt: new Date().toISOString(),
        enabled: false
      };
      setWorkflows(prev => [...prev, duplicatedWorkflow]);
    }
  };
  const handleWorkflowDelete = (workflowId: string) => {
    setWorkflows(prev => prev.filter(workflow => workflow.id !== workflowId));
  };
  const handleCopyLink = (workflowId: string) => {
    navigator.clipboard.writeText(`https://cal.id/workflows/${workflowId}`);
    setCopiedLink(workflowId);
    setTimeout(() => setCopiedLink(null), 2000);
  };
  const getFilteredTeams = () => {
    const allOption = {
      id: 'all',
      name: 'All',
      avatar: '',
      checked: selectedTeamFilter === 'all'
    };
    const teamOptions = teams.map(team => ({
      ...team,
      checked: selectedTeamFilter === team.id
    }));
    return [allOption, ...teamOptions];
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-6">
        {workflows.length === 0 ? (
          // Empty state
          <div className="max-w-full mx-auto">
            {/* Teams Filter Dropdown */}
            <div className="mb-8">
              <div className="relative inline-block">
                <button onClick={() => setShowTeamDropdown(!showTeamDropdown)} className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                  <span>Teams: All</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showTeamDropdown && <div className="absolute top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      {getFilteredTeams().map(team => <button key={team.id} onClick={() => {
                  setSelectedTeamFilter(team.id);
                  setShowTeamDropdown(false);
                }} className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors">
                          <div className="flex items-center">
                            {team.id === 'all' ? <div className="h-5 w-5 mr-2" /> : <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                                {team.avatar}
                              </div>}
                            <span>{team.name}</span>
                          </div>
                          {team.checked && <div className="h-2 w-2 bg-primary rounded-full" />}
                        </button>)}
                    </div>
                  </div>}
              </div>
            </div>

            {/* Empty State Content */}
            <div className="flex flex-col items-center justify-center min-h-[40vh] text-center">
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
        ) : (
      // Workflows display
      <div className="pb-6 space-y-4 w-full max-w-full">
            {/* Teams Filter and New Button */}
            <div className="flex items-center justify-between mb-8">
              <div className="relative">
                <button onClick={() => setShowTeamDropdown(!showTeamDropdown)} className="flex items-center space-x-2 px-3 py-2 border border-border rounded-lg hover:bg-muted transition-colors text-sm">
                  <span>Teams: All</span>
                  <ChevronDown className="h-4 w-4" />
                </button>

                {showTeamDropdown && <div className="absolute top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg z-10">
                    <div className="py-2">
                      {getFilteredTeams().map(team => <button key={team.id} onClick={() => {
                  setSelectedTeamFilter(team.id);
                  setShowTeamDropdown(false);
                }} className="w-full flex items-center justify-between px-3 py-2 text-sm hover:bg-muted transition-colors">
                          <div className="flex items-center">
                            {team.id === 'all' ? <div className="h-5 w-5 mr-2" /> : <div className="h-5 w-5 rounded-full bg-muted flex items-center justify-center text-xs font-medium mr-2">
                                {team.avatar}
                              </div>}
                            <span>{team.name}</span>
                          </div>
                          {team.checked && <div className="h-2 w-2 bg-primary rounded-full" />}
                        </button>)}
                    </div>
                  </div>}
              </div>

              <Button onClick={handleCreateWorkflow}>
                <Plus className="h-4 w-4 mr-2" />
                Create Workflow
              </Button>
            </div>

            {/* Workflows List - Single Column */}
            <div className="space-y-4">
              {workflows.map(workflow => <WorkflowCard key={workflow.id} workflow={workflow} onEdit={handleWorkflowEdit} onToggle={handleWorkflowToggle} onDuplicate={handleWorkflowDuplicate} onDelete={handleWorkflowDelete} onCopyLink={handleCopyLink} copiedLink={copiedLink} />)}
            </div>
          </div>
        )}

        {/* Create Workflow Modal */}
        <CreateWorkflowModal open={showCreateModal} onOpenChange={setShowCreateModal} onContinue={handleWorkflowModalContinue} />
      </div>
    </div>
  );
};