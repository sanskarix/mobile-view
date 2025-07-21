import React, { useState, useRef, useEffect } from 'react';
import { Plus, ExternalLink, Search, Copy, Calendar, Clock, Users, Video, Coffee, Briefcase, GraduationCap, Heart, Zap, Target, User } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { CreateTeamEventModal } from '../components/CreateTeamEventModal';
import { DraggableEventTypes } from '../components/DraggableEventTypes';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/ui/tooltip';

interface EventType {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
  icon: any;
}

interface Team {
  id: string;
  name: string;
  url: string;
  avatar: string;
  eventTypes: EventType[];
}

const getEventIcon = (title: string) => {
  const lowerTitle = title.toLowerCase();
  if (lowerTitle.includes('interview') || lowerTitle.includes('technical')) return Briefcase;
  if (lowerTitle.includes('coffee') || lowerTitle.includes('chat')) return Coffee;
  if (lowerTitle.includes('demo') || lowerTitle.includes('presentation')) return Video;
  if (lowerTitle.includes('meeting') || lowerTitle.includes('sync')) return Users;
  if (lowerTitle.includes('consultation') || lowerTitle.includes('1:1')) return Clock;
  if (lowerTitle.includes('training') || lowerTitle.includes('workshop')) return GraduationCap;
  if (lowerTitle.includes('review') || lowerTitle.includes('assessment')) return Target;
  if (lowerTitle.includes('strategy') || lowerTitle.includes('planning')) return Zap;
  if (lowerTitle.includes('mentorship') || lowerTitle.includes('guidance')) return Heart;
  return Calendar;
};

export const EventTypes = () => {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [selectedTeamForCreation, setSelectedTeamForCreation] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventStates, setEventStates] = useState<{[key: string]: boolean}>({});
  const [teamEvents, setTeamEvents] = useState<Team[]>([]);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const newDropdownRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Load teams from localStorage
  useEffect(() => {
    const loadTeams = () => {
      // Default teams with 10 event types each
      const defaultTeams = [
        {
          id: 'personal',
          name: 'Sanskar Yadav',
          url: 'sanskar',
          avatar: 'S',
          eventTypes: [
            { id: 'p1', title: '15 Minute Meeting', description: 'Quick catch-up call for brief discussions', url: '/sanskar/15min', durations: [15], bookingsToday: 3, isActive: true, icon: getEventIcon('15 Minute Meeting') },
            { id: 'p2', title: '30 Minute Meeting', description: 'Standard meeting for detailed conversations', url: '/sanskar/30min', durations: [30], bookingsToday: 5, isActive: true, icon: getEventIcon('30 Minute Meeting') },
            { id: 'p3', title: '1 Hour Consultation', description: 'In-depth consultation and planning session', url: '/sanskar/consultation', durations: [60], bookingsToday: 2, isActive: true, icon: getEventIcon('1 Hour Consultation') },
            { id: 'p4', title: 'Coffee Chat', description: 'Informal coffee meeting for networking', url: '/sanskar/coffee', durations: [30], bookingsToday: 1, isActive: true, icon: getEventIcon('Coffee Chat') },
            { id: 'p5', title: 'Demo Session', description: 'Product demonstration and Q&A', url: '/sanskar/demo', durations: [45], bookingsToday: 4, isActive: true, icon: getEventIcon('Demo Session') },
            { id: 'p6', title: 'Job Interview', description: 'Job interview and candidate assessment', url: '/sanskar/interview', durations: [60], bookingsToday: 0, isActive: true, icon: getEventIcon('Job Interview') },
            { id: 'p7', title: 'Mentorship Session', description: 'One-on-one mentoring and guidance', url: '/sanskar/mentorship', durations: [45], bookingsToday: 2, isActive: true, icon: getEventIcon('Mentorship Session') },
            { id: 'p8', title: 'Project Review', description: 'Review project progress and feedback', url: '/sanskar/review', durations: [30], bookingsToday: 1, isActive: true, icon: getEventIcon('Project Review') },
            { id: 'p9', title: 'Strategy Planning', description: 'Strategic planning and roadmap discussion', url: '/sanskar/strategy', durations: [60], bookingsToday: 0, isActive: true, icon: getEventIcon('Strategy Planning') },
            { id: 'p10', title: 'Quick Sync', description: 'Brief sync-up and status update', url: '/sanskar/sync', durations: [15], bookingsToday: 3, isActive: true, icon: getEventIcon('Quick Sync') },
          ]
        },
        {
          id: 'meta',
          name: 'Meta',
          url: 'meta',
          avatar: 'M',
          eventTypes: [
            { id: 'm1', title: 'Technical Interview', description: 'Software engineering technical assessment', url: '/meta/tech-interview', durations: [60], bookingsToday: 8, isActive: true, icon: getEventIcon('Technical Interview') },
            { id: 'm2', title: 'Product Review', description: 'Product feature review and feedback', url: '/meta/product-review', durations: [45], bookingsToday: 5, isActive: true, icon: getEventIcon('Product Review') },
            { id: 'm3', title: 'Design Critique', description: 'UI/UX design review session', url: '/meta/design-critique', durations: [30], bookingsToday: 3, isActive: true, icon: getEventIcon('Design Critique') },
            { id: 'm4', title: 'Engineering Sync', description: 'Team engineering synchronization', url: '/meta/eng-sync', durations: [30], bookingsToday: 12, isActive: true, icon: getEventIcon('Engineering Sync') },
            { id: 'm5', title: 'Leadership 1:1', description: 'One-on-one with engineering leadership', url: '/meta/leadership', durations: [30], bookingsToday: 2, isActive: true, icon: getEventIcon('Leadership 1:1') },
            { id: 'm6', title: 'Code Review', description: 'Collaborative code review session', url: '/meta/code-review', durations: [45], bookingsToday: 7, isActive: true, icon: getEventIcon('Code Review') },
            { id: 'm7', title: 'Architecture Discussion', description: 'System architecture planning meeting', url: '/meta/architecture', durations: [60], bookingsToday: 1, isActive: true, icon: getEventIcon('Architecture Discussion') },
            { id: 'm8', title: 'Sprint Planning', description: 'Agile sprint planning session', url: '/meta/sprint-planning', durations: [90], bookingsToday: 1, isActive: true, icon: getEventIcon('Sprint Planning') },
            { id: 'm9', title: 'Performance Review', description: 'Employee performance evaluation', url: '/meta/performance', durations: [45], bookingsToday: 0, isActive: true, icon: getEventIcon('Performance Review') },
            { id: 'm10', title: 'Innovation Workshop', description: 'Brainstorming and innovation session', url: '/meta/innovation', durations: [120], bookingsToday: 0, isActive: true, icon: getEventIcon('Innovation Workshop') },
          ]
        },
        {
          id: 'google',
          name: 'Google',
          url: 'google',
          avatar: 'G',
          eventTypes: [
            { id: 'g1', title: 'System Design Interview', description: 'Large-scale system design assessment', url: '/google/system-design', durations: [60], bookingsToday: 6, isActive: true, icon: getEventIcon('System Design Interview') },
            { id: 'g2', title: 'Coding Interview', description: 'Algorithm and data structure interview', url: '/google/coding', durations: [45], bookingsToday: 10, isActive: true, icon: getEventIcon('Coding Interview') },
            { id: 'g3', title: 'Behavioral Interview', description: 'Leadership and behavioral assessment', url: '/google/behavioral', durations: [45], bookingsToday: 4, isActive: true, icon: getEventIcon('Behavioral Interview') },
            { id: 'g4', title: 'Team Collaboration', description: 'Cross-team collaboration meeting', url: '/google/collaboration', durations: [30], bookingsToday: 15, isActive: true, icon: getEventIcon('Team Collaboration') },
            { id: 'g5', title: 'Research Discussion', description: 'AI/ML research and development talk', url: '/google/research', durations: [60], bookingsToday: 2, isActive: true, icon: getEventIcon('Research Discussion') },
            { id: 'g6', title: 'Product Strategy', description: 'Product roadmap and strategy session', url: '/google/strategy', durations: [60], bookingsToday: 3, isActive: true, icon: getEventIcon('Product Strategy') },
            { id: 'g7', title: 'Tech Talk', description: 'Internal technology presentation', url: '/google/tech-talk', durations: [45], bookingsToday: 1, isActive: true, icon: getEventIcon('Tech Talk') },
            { id: 'g8', title: 'Peer Review', description: 'Peer performance and project review', url: '/google/peer-review', durations: [30], bookingsToday: 5, isActive: true, icon: getEventIcon('Peer Review') },
            { id: 'g9', title: 'Innovation Time', description: '20% time project discussion', url: '/google/innovation', durations: [45], bookingsToday: 1, isActive: true, icon: getEventIcon('Innovation Time') },
            { id: 'g10', title: 'Onboarding Session', description: 'New hire onboarding and orientation', url: '/google/onboarding', durations: [90], bookingsToday: 2, isActive: true, icon: getEventIcon('Onboarding Session') },
          ]
        },
        {
          id: 'tesla',
          name: 'Tesla',
          url: 'tesla',
          avatar: 'T',
          eventTypes: [
            { id: 't1', title: 'Engineering Review', description: 'Vehicle engineering design review', url: '/tesla/eng-review', durations: [60], bookingsToday: 4, isActive: true, icon: getEventIcon('Engineering Review') },
            { id: 't2', title: 'Safety Assessment', description: 'Vehicle safety protocol evaluation', url: '/tesla/safety', durations: [45], bookingsToday: 2, isActive: true, icon: getEventIcon('Safety Assessment') },
            { id: 't3', title: 'Manufacturing Sync', description: 'Production line coordination meeting', url: '/tesla/manufacturing', durations: [30], bookingsToday: 8, isActive: true, icon: getEventIcon('Manufacturing Sync') },
            { id: 't4', title: 'Battery Technology', description: 'Battery innovation and development', url: '/tesla/battery', durations: [60], bookingsToday: 3, isActive: true, icon: getEventIcon('Battery Technology') },
            { id: 't5', title: 'Autopilot Review', description: 'Self-driving technology assessment', url: '/tesla/autopilot', durations: [90], bookingsToday: 1, isActive: true, icon: getEventIcon('Autopilot Review') },
            { id: 't6', title: 'Supply Chain', description: 'Supplier coordination and planning', url: '/tesla/supply-chain', durations: [45], bookingsToday: 6, isActive: true, icon: getEventIcon('Supply Chain') },
            { id: 't7', title: 'Quality Control', description: 'Product quality assurance meeting', url: '/tesla/quality', durations: [30], bookingsToday: 7, isActive: true, icon: getEventIcon('Quality Control') },
            { id: 't8', title: 'Innovation Lab', description: 'R&D and future technology planning', url: '/tesla/innovation', durations: [120], bookingsToday: 0, isActive: true, icon: getEventIcon('Innovation Lab') },
            { id: 't9', title: 'Sustainability', description: 'Environmental impact and sustainability', url: '/tesla/sustainability', durations: [45], bookingsToday: 1, isActive: true, icon: getEventIcon('Sustainability') },
            { id: 't10', title: 'Market Analysis', description: 'Market research and competitive analysis', url: '/tesla/market', durations: [60], bookingsToday: 2, isActive: true, icon: getEventIcon('Market Analysis') },
          ]
        },
        {
          id: 'onehash',
          name: 'OneHash',
          url: 'onehash',
          avatar: 'O',
          eventTypes: [
            { id: 'o1', title: 'Client Onboarding', description: 'New client setup and training session', url: '/onehash/onboarding', durations: [60], bookingsToday: 5, isActive: true, icon: getEventIcon('Client Onboarding') },
            { id: 'o2', title: 'Product Demo', description: 'ERP software demonstration', url: '/onehash/demo', durations: [45], bookingsToday: 8, isActive: true, icon: getEventIcon('Product Demo') },
            { id: 'o3', title: 'Implementation Planning', description: 'ERP implementation strategy meeting', url: '/onehash/implementation', durations: [90], bookingsToday: 2, isActive: true, icon: getEventIcon('Implementation Planning') },
            { id: 'o4', title: 'Support Session', description: 'Customer support and troubleshooting', url: '/onehash/support', durations: [30], bookingsToday: 12, isActive: true, icon: getEventIcon('Support Session') },
            { id: 'o5', title: 'Feature Request', description: 'Product feature discussion and planning', url: '/onehash/feature', durations: [45], bookingsToday: 3, isActive: true, icon: getEventIcon('Feature Request') },
            { id: 'o6', title: 'Training Workshop', description: 'User training and best practices', url: '/onehash/training', durations: [120], bookingsToday: 1, isActive: true, icon: getEventIcon('Training Workshop') },
            { id: 'o7', title: 'Sales Consultation', description: 'Pre-sales consultation and needs analysis', url: '/onehash/sales', durations: [45], bookingsToday: 6, isActive: true, icon: getEventIcon('Sales Consultation') },
            { id: 'o8', title: 'Integration Planning', description: 'Third-party integration discussion', url: '/onehash/integration', durations: [60], bookingsToday: 1, isActive: true, icon: getEventIcon('Integration Planning') },
            { id: 'o9', title: 'Business Review', description: 'Quarterly business review meeting', url: '/onehash/review', durations: [90], bookingsToday: 0, isActive: true, icon: getEventIcon('Business Review') },
            { id: 'o10', title: 'Custom Development', description: 'Custom feature development discussion', url: '/onehash/custom', durations: [60], bookingsToday: 2, isActive: true, icon: getEventIcon('Custom Development') },
          ]
        }
      ];

      setTeamEvents(defaultTeams);
    };

    loadTeams();
  }, []);

  const currentTeam = teamEvents.find(t => t.id === selectedTeam) || teamEvents[0];
  const filteredEvents = currentTeam?.eventTypes?.filter(event => 
    event.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    event.description.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  // Initialize event states
  useEffect(() => {
    const initialStates: {[key: string]: boolean} = {};
    teamEvents.forEach(team => {
      team.eventTypes?.forEach(event => {
        initialStates[event.id] = event.isActive;
      });
    });
    setEventStates(initialStates);
  }, [teamEvents]);

  const handleEventEdit = (eventId: string) => {
    navigate(`/event/${eventId}/setup`);
  };

  const handleCreateEvent = (eventData: any) => {
    console.log('Creating event with data:', eventData);
    const newEventId = `event-${Date.now()}`;
    const newEvent: EventType = {
      id: newEventId,
      title: eventData.title || 'New Event',
      description: eventData.description || 'A new event',
      url: `/${currentTeam.url}/${eventData.url || 'new-event'}`,
      durations: [parseInt(eventData.duration) || 30],
      bookingsToday: 0,
      isActive: true,
      icon: getEventIcon(eventData.title || 'New Event')
    };

    setTeamEvents(prevTeams => prevTeams.map(team => 
      team.id === selectedTeam 
        ? { ...team, eventTypes: [...(team.eventTypes || []), newEvent] }
        : team
    ));

    setEventStates(prev => ({ ...prev, [newEventId]: true }));
    setIsCreateModalOpen(false);
    navigate(`/event/${newEventId}/setup`);
  };

  const handleCopyLink = (eventId: string, url: string) => {
    navigator.clipboard.writeText(`https://cal.id${url}`);
    setCopiedLink(eventId);
    setTimeout(() => setCopiedLink(null), 1500);
  };

  const handleCopyPublicLink = () => {
    const publicUrl = selectedTeam === 'personal' ? 'https://cal.id/sanskar' : `https://cal.id/teams/${currentTeam?.url}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedPublicLink(true);
    setTimeout(() => setCopiedPublicLink(false), 1500);
  };

  const handleToggleEvent = (eventId: string, checked: boolean) => {
    setEventStates(prev => ({ ...prev, [eventId]: checked }));
  };

  const handleReorderEvents = (reorderedEvents: EventType[]) => {
    setTeamEvents(prevTeams => prevTeams.map(team => 
      team.id === selectedTeam 
        ? { ...team, eventTypes: reorderedEvents }
        : team
    ));
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (newDropdownRef.current && !newDropdownRef.current.contains(event.target as Node)) {
        setShowNewDropdown(false);
      }
    };

    if (showNewDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNewDropdown]);

  const handleNewSelection = (teamId: string) => {
    setShowNewDropdown(false);
    if (teamId === 'personal') {
      setIsCreateModalOpen(true);
    } else {
      setSelectedTeamForCreation(teamId);
      setIsCreateTeamModalOpen(true);
    }
  };

  const handleDuplicateEvent = (eventId: string) => {
    const originalEvent = teamEvents.find(team => 
      team.eventTypes?.some(event => event.id === eventId)
    )?.eventTypes?.find(event => event.id === eventId);
    
    if (originalEvent) {
      const newEventId = `${eventId}-copy-${Date.now()}`;
      const duplicatedEvent: EventType = {
        ...originalEvent,
        id: newEventId,
        title: `${originalEvent.title} (Copy)`,
        url: `${originalEvent.url}-copy`,
        bookingsToday: 0
      };

      setTeamEvents(prevTeams => prevTeams.map(team => {
        const hasEvent = team.eventTypes?.some(event => event.id === eventId);
        if (hasEvent) {
          return { ...team, eventTypes: [...(team.eventTypes || []), duplicatedEvent] };
        }
        return team;
      }));

      setEventStates(prev => ({ ...prev, [newEventId]: true }));
    }
  };

  const handleDeleteEvent = (eventId: string) => {
    setTeamEvents(prevTeams => prevTeams.map(team => ({
      ...team,
      eventTypes: team.eventTypes?.filter(event => event.id !== eventId) || []
    })));
  };

  if (!teamEvents.length) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Horizontal Tabs */}
      <div className="bg-background border-b border-border">
        <div className="px-8">
          <div className="flex items-center">
            {/* Personal tab */}
            <button
              onClick={() => setSelectedTeam('personal')}
              className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                selectedTeam === 'personal'
                  ? 'border-primary text-primary'
                  : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
              }`}
            >
              <div className="flex items-center space-x-2">
                <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${
                  selectedTeam === 'personal' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted-foreground/20'
                }`}>
                  S
                </div>
                <span>Sanskar Yadav</span>
              </div>
            </button>

            {/* Separator */}
            <div className="h-6 w-px bg-border mx-4"></div>

            {/* Team tabs - scrollable */}
            <div className="flex-1 overflow-x-auto">
              <div className="flex space-x-0">
                {teamEvents.filter(team => team.id !== 'personal').map((team) => (
                  <button
                    key={team.id}
                    onClick={() => setSelectedTeam(team.id)}
                    className={`py-4 px-6 border-b-0 font-medium text-sm whitespace-nowrap transition-colors ${
                      selectedTeam === team.id
                        ? 'border-primary text-primary'
                        : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                    }`}
                  >
                    <div className="flex items-center space-x-2">
                      <div className={`h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium ${
                        selectedTeam === team.id 
                          ? 'bg-primary text-primary-foreground' 
                          : 'bg-muted-foreground/20'
                      }`}>
                        {team.avatar}
                      </div>
                      <span>{team.name}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="px-8 pt-6 pb-6 space-y-4 w-full max-w-full">
        {/* Search Bar and New Button */}
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4 flex-1">
            <div className="relative w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search events..." 
                value={searchQuery} 
                onChange={e => setSearchQuery(e.target.value)} 
                className="w-full pl-10 pr-4 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm" 
              />
            </div>
            
            <div className="relative flex items-center space-x-1 px-2 py-1 bg-muted/50 rounded text-xs text-muted-foreground">
              <span className="text-sm">
                {selectedTeam === 'personal' ? 'cal.id/sanskar' : `cal.id/teams/${currentTeam?.url}`}
              </span>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                  <button 
                    onClick={handleCopyPublicLink} 
                    className="p-1 hover:bg-muted rounded flex items-center justify-center"
                  >
                    <Copy className="h-4 w-4" />
                  </button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs rounded-sm" side="bottom" sideOffset={6}>
                    Copy
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <TooltipProvider delayDuration={0}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={() => {
                        const publicUrl = selectedTeam === 'personal' ? 'https://cal.id/sanskar' : `https://cal.id/teams/${currentTeam?.url}`;
                        window.open(publicUrl, '_blank');
                      }}
                      className="p-1 hover:bg-muted rounded flex items-center justify-center"
                      title="Open public page"
                    >
                      <ExternalLink className="h-4 w-4" />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="px-2 py-1 text-xs rounded-sm" side="bottom" sideOffset={6}>
                    Preview
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
              {copiedPublicLink && (
                <div className="absolute top-full mt-1 left-1/2 ml-2 px-2 py-1 bg-white text-black text-xs rounded border border-gray-200 shadow-md animate-fade-in whitespace-nowrap z-50">
                  Copied!
                </div>
              )}
            </div>
          </div>
          
          <div className="relative" ref={newDropdownRef}>
            <button 
              onClick={() => setShowNewDropdown(!showNewDropdown)}
              className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
            >
              <Plus className="h-4 w-4 mr-2" />
              New
            </button>
            
            {showNewDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                <div className="py-1">
                  <button 
                    onClick={() => handleNewSelection('personal')} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 mr-2" />
                    Personal Event
                  </button>
                  {teamEvents.filter(team => team.id !== 'personal').map(team => (
                    <button 
                      key={team.id}
                      onClick={() => handleNewSelection(team.id)} 
                      className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                    >
                      <div className="h-4 w-4 rounded-full bg-primary flex items-center justify-center text-xs font-medium text-primary-foreground mr-2">
                        {team.avatar}
                      </div>
                      {team.name}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Draggable Event Types List */}
        <DraggableEventTypes
          events={filteredEvents}
          selectedTeam={selectedTeam}
          currentTeam={currentTeam!}
          eventStates={eventStates}
          copiedLink={copiedLink}
          onEventEdit={handleEventEdit}
          onCopyLink={handleCopyLink}
          onToggleEvent={handleToggleEvent}
          onDuplicateEvent={handleDuplicateEvent}
          onDeleteEvent={handleDeleteEvent}
          onReorderEvents={handleReorderEvents}
        />

        <CreateEventModal 
          isOpen={isCreateModalOpen} 
          onClose={() => setIsCreateModalOpen(false)} 
          teams={teamEvents} 
          selectedTeam={selectedTeam} 
          onCreateEvent={handleCreateEvent} 
        />

        <CreateTeamEventModal
          open={isCreateTeamModalOpen}
          onClose={() => setIsCreateTeamModalOpen(false)}
          teamId={selectedTeamForCreation}
          teamName={teamEvents.find(t => t.id === selectedTeamForCreation)?.name || ''}
        />
      </div>
    </div>
  );
};
