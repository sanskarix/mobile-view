import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Route, Plus, ChevronDown, Copy, ExternalLink, Search, MoreVertical, Edit, Trash2, Share2, Users, Eye } from 'lucide-react';
import { CreateRoutingFormModal } from '../components/CreateRoutingFormModal';
import { Switch } from '../components/ui/switch';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { useOutletContext } from 'react-router-dom';
import type { HeaderMeta } from '../components/Layout';

interface RoutingForm {
  id: string;
  name: string;
  description: string;
  url: string;
  teamId: string;
  teamName: string;
  isActive: boolean;
  responses: number;
  routes: number;
  createdAt: string;
}

const mockRoutingForms: RoutingForm[] = [
  {
    id: '1',
    name: 'Sales Qualification',
    description: 'Route leads to appropriate sales representatives',
    url: '/forms/sales-qualification',
    teamId: 'sales',
    teamName: 'Sales Team',
    isActive: true,
    responses: 143,
    routes: 3,
    createdAt: '2024-01-15'
  },
  {
    id: '2',
    name: 'Support Triage',
    description: 'Direct support requests to the right team',
    url: '/forms/support-triage',
    teamId: 'support',
    teamName: 'Support Team',
    isActive: true,
    responses: 89,
    routes: 5,
    createdAt: '2024-01-10'
  },
  {
    id: '3',
    name: 'Interview Scheduling',
    description: 'Route candidates to appropriate interviewers',
    url: '/forms/interview-scheduling',
    teamId: 'hr',
    teamName: 'HR Team',
    isActive: false,
    responses: 67,
    routes: 4,
    createdAt: '2024-01-08'
  }
];

export const RoutingForms = () => {
  const navigate = useNavigate();
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [selectedTeamFilter, setSelectedTeamFilter] = useState('all');
  const [routingForms, setRoutingForms] = useState<RoutingForm[]>(mockRoutingForms);
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();

  const teams = [
    { id: 'personal', name: 'Your account', avatar: 'Y' },
    { id: 'sales', name: 'Sales Team', avatar: 'S' },
    { id: 'support', name: 'Support Team', avatar: 'S' },
    { id: 'hr', name: 'HR Team', avatar: 'H' },
  ];

  useEffect(() => {
    setHeaderMeta({
      title: 'Routing Forms',
      description: 'Create forms to direct attendees to the correct destinations',
    });
  }, [setHeaderMeta]);

  const filteredForms = routingForms.filter(form => {
    const matchesTeam = selectedTeamFilter === 'all' || form.teamId === selectedTeamFilter;
    const matchesSearch = form.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTeam && matchesSearch;
  });

  const handleCopyLink = (url: string, formId: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(formId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleToggleActive = (formId: string) => {
    setRoutingForms(prev => prev.map(form => 
      form.id === formId ? { ...form, isActive: !form.isActive } : form
    ));
  };

  const handleDelete = (formId: string) => {
    setRoutingForms(prev => prev.filter(form => form.id !== formId));
  };

  const handleFormCreated = (formData: any) => {
    const newForm: RoutingForm = {
      id: `form-${Date.now()}`,
      name: formData.title,
      description: formData.description,
      url: `/forms/${formData.title.toLowerCase().replace(/\s+/g, '-')}`,
      teamId: formData.teamId,
      teamName: formData.teamName,
      isActive: true,
      responses: 0,
      routes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };
    setRoutingForms(prev => [...prev, newForm]);
  };

  const teamOptions = [
    { value: 'all', label: 'All Teams' },
    { value: 'sales', label: 'Sales Team' },
    { value: 'support', label: 'Support Team' },
    { value: 'hr', label: 'HR Team' },
  ];

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Header Actions */}
      <div className="flex items-center justify-between mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <Users className="h-4 w-4" />
              <span className="max-w-24 truncate">
                {teamOptions.find(t => t.value === selectedTeamFilter)?.label}
              </span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start">
            {teamOptions.map((team) => (
              <DropdownMenuItem 
                key={team.value}
                onClick={() => setSelectedTeamFilter(team.value)}
              >
                {team.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setShowCreateModal(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New Form
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search routing forms..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Routing Forms List */}
      <div className="space-y-3">
        {filteredForms.map((form) => (
          <div
            key={form.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3 flex-1 min-w-0">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Route className="h-5 w-5 text-primary" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-2">
                    <h3 className="font-medium text-foreground truncate">{form.name}</h3>
                    <Switch 
                      checked={form.isActive}
                      onCheckedChange={() => handleToggleActive(form.id)}
                      className="scale-75"
                    />
                  </div>
                  
                  {/* Stats */}
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{form.responses}</span>
                      <span>responses</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <span className="font-medium">{form.routes}</span>
                      <span>routes</span>
                    </div>
                    <span className="text-xs bg-secondary px-2 py-1 rounded">
                      {form.teamName}
                    </span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => navigate(`/routing-forms/${form.id}/edit`)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => window.open(`${window.location.origin}${form.url}`, '_blank')}>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Preview
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleCopyLink(form.url, form.id)}>
                    <Copy className="h-4 w-4 mr-2" />
                    {copiedLink === form.id ? 'Copied!' : 'Copy Link'}
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => console.log('Share form')}>
                    <Share2 className="h-4 w-4 mr-2" />
                    Share
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={() => handleDelete(form.id)}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Delete
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {filteredForms.length === 0 && (
        <div className="text-center py-12">
          <Route className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No routing forms found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedTeamFilter !== 'all' 
              ? 'Try adjusting your filters or search terms.' 
              : 'Create your first routing form to get started.'}
          </p>
          <Button onClick={() => setShowCreateModal(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Routing Form
          </Button>
        </div>
      )}

      <CreateRoutingFormModal
        isOpen={showCreateModal}
        onClose={() => setShowCreateModal(false)}
      />
    </div>
  );
};
