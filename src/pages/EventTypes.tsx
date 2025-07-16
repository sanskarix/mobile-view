
import React, { useState, useRef, useEffect } from 'react';
import { Plus, MoreHorizontal, ExternalLink, Edit, Copy as CopyIcon, Code, Trash2, ArrowUp, ArrowDown, Search, Copy } from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { useNavigate } from 'react-router-dom';
import { Switch } from '../components/ui/switch';

interface EventType {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
}

interface Team {
  id: string;
  name: string;
  url: string;
  avatar: string;
  eventTypes: EventType[];
}

export const EventTypes = () => {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [showNewDropdown, setShowNewDropdown] = useState(false);
  const [hoveredEvent, setHoveredEvent] = useState<string | null>(null);
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [copiedPublicLink, setCopiedPublicLink] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventStates, setEventStates] = useState<{[key: string]: boolean}>({});
  const [teamEvents, setTeamEvents] = useState<Team[]>([]);
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
            { id: 'p1', title: '15 Minute Meeting', description: 'Quick catch-up call for brief discussions', url: '/sanskar/15min', durations: [15], bookingsToday: 3, isActive: true },
            { id: 'p2', title: '30 Minute Meeting', description: 'Standard meeting for detailed conversations', url: '/sanskar/30min', durations: [30], bookingsToday: 5, isActive: true },
            { id: 'p3', title: '1 Hour Consultation', description: 'In-depth consultation and planning session', url: '/sanskar/consultation', durations: [60], bookingsToday: 2, isActive: true },
            { id: 'p4', title: 'Coffee Chat', description: 'Informal coffee meeting for networking', url: '/sanskar/coffee', durations: [30], bookingsToday: 1, isActive: true },
            { id: 'p5', title: 'Demo Session', description: 'Product demonstration and Q&A', url: '/sanskar/demo', durations: [45], bookingsToday: 4, isActive: true },
            { id: 'p6', title: 'Interview', description: 'Job interview and candidate assessment', url: '/sanskar/interview', durations: [60], bookingsToday: 0, isActive: true },
            { id: 'p7', title: 'Mentorship', description: 'One-on-one mentoring session', url: '/sanskar/mentorship', durations: [45], bookingsToday: 2, isActive: true },
            { id: 'p8', title: 'Project Review', description: 'Review project progress and feedback', url: '/sanskar/review', durations: [30], bookingsToday: 1, isActive: true },
            { id: 'p9', title: 'Strategy Planning', description: 'Strategic planning and roadmap discussion', url: '/sanskar/strategy', durations: [60], bookingsToday: 0, isActive: true },
            { id: 'p10', title: 'Quick Sync', description: 'Brief sync-up and status update', url: '/sanskar/sync', durations: [15], bookingsToday: 3, isActive: true },
          ]
        },
        {
          id: 'meta',
          name: 'Meta',
          url: 'meta',
          avatar: 'M',
          eventTypes: [
            { id: 'm1', title: 'Technical Interview', description: 'Software engineering technical assessment', url: '/meta/tech-interview', durations: [60], bookingsToday: 8, isActive: true },
            { id: 'm2', title: 'Product Review', description: 'Product feature review and feedback', url: '/meta/product-review', durations: [45], bookingsToday: 5, isActive: true },
            { id: 'm3', title: 'Design Critique', description: 'UI/UX design review session', url: '/meta/design-critique', durations: [30], bookingsToday: 3, isActive: true },
            { id: 'm4', title: 'Engineering Sync', description: 'Team engineering synchronization', url: '/meta/eng-sync', durations: [30], bookingsToday: 12, isActive: true },
            { id: 'm5', title: 'Leadership 1:1', description: 'One-on-one with engineering leadership', url: '/meta/leadership', durations: [30], bookingsToday: 2, isActive: true },
            { id: 'm6', title: 'Code Review', description: 'Collaborative code review session', url: '/meta/code-review', durations: [45], bookingsToday: 7, isActive: true },
            { id: 'm7', title: 'Architecture Discussion', description: 'System architecture planning meeting', url: '/meta/architecture', durations: [60], bookingsToday: 1, isActive: true },
            { id: 'm8', title: 'Sprint Planning', description: 'Agile sprint planning session', url: '/meta/sprint-planning', durations: [90], bookingsToday: 1, isActive: true },
            { id: 'm9', title: 'Performance Review', description: 'Employee performance evaluation', url: '/meta/performance', durations: [45], bookingsToday: 0, isActive: true },
            { id: 'm10', title: 'Innovation Workshop', description: 'Brainstorming and innovation session', url: '/meta/innovation', durations: [120], bookingsToday: 0, isActive: true },
          ]
        },
        {
          id: 'google',
          name: 'Google',
          url: 'google',
          avatar: 'G',
          eventTypes: [
            { id: 'g1', title: 'System Design Interview', description: 'Large-scale system design assessment', url: '/google/system-design', durations: [60], bookingsToday: 6, isActive: true },
            { id: 'g2', title: 'Coding Interview', description: 'Algorithm and data structure interview', url: '/google/coding', durations: [45], bookingsToday: 10, isActive: true },
            { id: 'g3', title: 'Behavioral Interview', description: 'Leadership and behavioral assessment', url: '/google/behavioral', durations: [45], bookingsToday: 4, isActive: true },
            { id: 'g4', title: 'Team Collaboration', description: 'Cross-team collaboration meeting', url: '/google/collaboration', durations: [30], bookingsToday: 15, isActive: true },
            { id: 'g5', title: 'Research Discussion', description: 'AI/ML research and development talk', url: '/google/research', durations: [60], bookingsToday: 2, isActive: true },
            { id: 'g6', title: 'Product Strategy', description: 'Product roadmap and strategy session', url: '/google/strategy', durations: [60], bookingsToday: 3, isActive: true },
            { id: 'g7', title: 'Tech Talk', description: 'Internal technology presentation', url: '/google/tech-talk', durations: [45], bookingsToday: 1, isActive: true },
            { id: 'g8', title: 'Peer Review', description: 'Peer performance and project review', url: '/google/peer-review', durations: [30], bookingsToday: 5, isActive: true },
            { id: 'g9', title: 'Innovation Time', description: '20% time project discussion', url: '/google/innovation', durations: [45], bookingsToday: 1, isActive: true },
            { id: 'g10', title: 'Onboarding Session', description: 'New hire onboarding and orientation', url: '/google/onboarding', durations: [90], bookingsToday: 2, isActive: true },
          ]
        },
        {
          id: 'tesla',
          name: 'Tesla',
          url: 'tesla',
          avatar: 'T',
          eventTypes: [
            { id: 't1', title: 'Engineering Review', description: 'Vehicle engineering design review', url: '/tesla/eng-review', durations: [60], bookingsToday: 4, isActive: true },
            { id: 't2', title: 'Safety Assessment', description: 'Vehicle safety protocol evaluation', url: '/tesla/safety', durations: [45], bookingsToday: 2, isActive: true },
            { id: 't3', title: 'Manufacturing Sync', description: 'Production line coordination meeting', url: '/tesla/manufacturing', durations: [30], bookingsToday: 8, isActive: true },
            { id: 't4', title: 'Battery Technology', description: 'Battery innovation and development', url: '/tesla/battery', durations: [60], bookingsToday: 3, isActive: true },
            { id: 't5', title: 'Autopilot Review', description: 'Self-driving technology assessment', url: '/tesla/autopilot', durations: [90], bookingsToday: 1, isActive: true },
            { id: 't6', title: 'Supply Chain', description: 'Supplier coordination and planning', url: '/tesla/supply-chain', durations: [45], bookingsToday: 6, isActive: true },
            { id: 't7', title: 'Quality Control', description: 'Product quality assurance meeting', url: '/tesla/quality', durations: [30], bookingsToday: 7, isActive: true },
            { id: 't8', title: 'Innovation Lab', description: 'R&D and future technology planning', url: '/tesla/innovation', durations: [120], bookingsToday: 0, isActive: true },
            { id: 't9', title: 'Sustainability', description: 'Environmental impact and sustainability', url: '/tesla/sustainability', durations: [45], bookingsToday: 1, isActive: true },
            { id: 't10', title: 'Market Analysis', description: 'Market research and competitive analysis', url: '/tesla/market', durations: [60], bookingsToday: 2, isActive: true },
          ]
        },
        {
          id: 'onehash',
          name: 'OneHash',
          url: 'onehash',
          avatar: 'O',
          eventTypes: [
            { id: 'o1', title: 'Client Onboarding', description: 'New client setup and training session', url: '/onehash/onboarding', durations: [60], bookingsToday: 5, isActive: true },
            { id: 'o2', title: 'Product Demo', description: 'ERP software demonstration', url: '/onehash/demo', durations: [45], bookingsToday: 8, isActive: true },
            { id: 'o3', title: 'Implementation Planning', description: 'ERP implementation strategy meeting', url: '/onehash/implementation', durations: [90], bookingsToday: 2, isActive: true },
            { id: 'o4', title: 'Support Session', description: 'Customer support and troubleshooting', url: '/onehash/support', durations: [30], bookingsToday: 12, isActive: true },
            { id: 'o5', title: 'Feature Request', description: 'Product feature discussion and planning', url: '/onehash/feature', durations: [45], bookingsToday: 3, isActive: true },
            { id: 'o6', title: 'Training Workshop', description: 'User training and best practices', url: '/onehash/training', durations: [120], bookingsToday: 1, isActive: true },
            { id: 'o7', title: 'Sales Consultation', description: 'Pre-sales consultation and needs analysis', url: '/onehash/sales', durations: [45], bookingsToday: 6, isActive: true },
            { id: 'o8', title: 'Integration Planning', description: 'Third-party integration discussion', url: '/onehash/integration', durations: [60], bookingsToday: 1, isActive: true },
            { id: 'o9', title: 'Business Review', description: 'Quarterly business review meeting', url: '/onehash/review', durations: [90], bookingsToday: 0, isActive: true },
            { id: 'o10', title: 'Custom Development', description: 'Custom feature development discussion', url: '/onehash/custom', durations: [60], bookingsToday: 2, isActive: true },
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

  const handleEventClick = (eventId: string) => {
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
      isActive: true
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
    const publicUrl = selectedTeam === 'personal' ? 'https://cal.id/sanskar' : `https://cal.id/${currentTeam?.url}`;
    navigator.clipboard.writeText(publicUrl);
    setCopiedPublicLink(true);
    setTimeout(() => setCopiedPublicLink(false), 1500);
  };

  const handleToggleEvent = (eventId: string, checked: boolean) => {
    setEventStates(prev => ({ ...prev, [eventId]: checked }));
  };

  const handleMenuAction = (action: string, eventId: string) => {
    setShowMoreOptions(null);
    switch (action) {
      case 'edit':
        handleEventClick(eventId);
        break;
      case 'duplicate':
        console.log('Duplicating event', eventId);
        break;
      case 'embed':
        console.log('Embed event', eventId);
        break;
      case 'delete':
        setTeamEvents(prevTeams => prevTeams.map(team => 
          team.id === selectedTeam 
            ? { ...team, eventTypes: team.eventTypes.filter(e => e.id !== eventId) }
            : team
        ));
        break;
    }
  };

  if (!teamEvents.length) {
    return <div className="p-8">Loading...</div>;
  }

  return (
    <div className="px-6 pt-3 pb-6 space-y-4 w-full max-w-full">
      {/* Tab Navigation */}
      <div className="border-b border-border">
        <nav className="flex space-x-8" aria-label="Tabs">
          {teamEvents.map((team) => (
            <button
              key={team.id}
              onClick={() => setSelectedTeam(team.id)}
              className={`py-2 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
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
        </nav>
      </div>

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
          
          <div className="relative">
            <button 
              onClick={handleCopyPublicLink} 
              className="flex items-center space-x-2 px-3 py-1.5 bg-muted/70 text-muted-foreground text-sm rounded-md hover:bg-muted transition-colors"
              title="Copy public link"
            >
              <span className="text-sm">
                {selectedTeam === 'personal' ? 'cal.id/sanskar' : `cal.id/${currentTeam?.url}`}
              </span>
              <Copy className="h-4 w-4" />
            </button>
            {copiedPublicLink && (
              <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                Copied
              </div>
            )}
          </div>
        </div>
        
        <button 
          onClick={() => setIsCreateModalOpen(true)}
          className="inline-flex items-center px-4 py-2 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4 mr-2" />
          New
        </button>
      </div>

      {/* Event Types List */}
      <div className="space-y-2">
        {filteredEvents.map(event => {
          const isEventActive = eventStates[event.id] ?? event.isActive;
          return (
            <div 
              key={event.id} 
              className="relative group animate-fade-in" 
              onMouseEnter={() => setHoveredEvent(event.id)} 
              onMouseLeave={() => setHoveredEvent(null)}
            >
              <div 
                onClick={() => handleEventClick(event.id)} 
                className={`bg-card border border-border rounded-lg p-4 hover:border-border/60 transition-all hover:shadow-sm cursor-pointer ${
                  !isEventActive ? 'opacity-50' : ''
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center mb-2 space-x-3">
                      <h3 className="font-semibold text-foreground text-base">
                        {event.title}
                      </h3>
                      <Switch 
                        checked={isEventActive} 
                        onCheckedChange={checked => handleToggleEvent(event.id, checked)}
                        onClick={e => e.stopPropagation()}
                      />
                      <div className="relative">
                        <button 
                          onClick={e => {
                            e.stopPropagation();
                            handleCopyLink(event.id, event.url);
                          }} 
                          className="flex items-center space-x-2 px-2 py-1 bg-muted/70 text-muted-foreground text-sm rounded hover:bg-muted transition-colors"
                          title="Copy event link"
                        >
                          <Copy className="h-3 w-3" />
                          <span className="text-sm">Copy</span>
                        </button>
                        {copiedLink === event.id && (
                          <div className="absolute left-full ml-2 top-1/2 -translate-y-1/2 px-2 py-1 bg-foreground text-background text-xs rounded animate-fade-in whitespace-nowrap">
                            Copied
                          </div>
                        )}
                      </div>
                    </div>
                    <p className="text-muted-foreground text-sm mb-3 line-clamp-2">{event.description}</p>
                    <div className="flex items-center">
                      {event.durations?.map(duration => (
                        <span key={duration} className="inline-flex items-center px-2 py-1 bg-muted text-foreground text-sm rounded mr-2">
                          {duration}m
                        </span>
                      ))}
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2 ml-4" onClick={e => e.stopPropagation()}>
                    <button 
                      className="p-1.5 hover:bg-muted rounded-md transition-colors"
                      title="Preview event"
                    >
                      <ExternalLink className="h-4 w-4 text-muted-foreground" />
                    </button>
                    <div className="relative">
                      <button 
                        onClick={() => setShowMoreOptions(showMoreOptions === event.id ? null : event.id)} 
                        className="p-1.5 hover:bg-muted rounded-md transition-colors"
                        title="More options"
                      >
                        <MoreHorizontal className="h-4 w-4 text-muted-foreground" />
                      </button>
                      
                      {showMoreOptions === event.id && (
                        <div className="absolute right-0 top-full mt-1 w-40 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                          <div className="py-1">
                            <button 
                              onClick={() => handleMenuAction('edit', event.id)} 
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                              title="Edit event"
                            >
                              <Edit className="h-4 w-4 mr-2" />
                              Edit
                            </button>
                            <button 
                              onClick={() => handleMenuAction('duplicate', event.id)} 
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                              title="Duplicate event"
                            >
                              <CopyIcon className="h-4 w-4 mr-2" />
                              Duplicate
                            </button>
                            <button 
                              onClick={() => handleMenuAction('embed', event.id)} 
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                              title="Embed event"
                            >
                              <Code className="h-4 w-4 mr-2" />
                              Embed
                            </button>
                            <button 
                              onClick={() => handleMenuAction('delete', event.id)} 
                              className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                              title="Delete event"
                            >
                              <Trash2 className="h-4 w-4 mr-2" />
                              Delete
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <CreateEventModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        teams={teamEvents} 
        selectedTeam={selectedTeam} 
        onCreateEvent={handleCreateEvent} 
      />
    </div>
  );
};
