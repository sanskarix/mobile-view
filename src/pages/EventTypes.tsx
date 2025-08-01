import React, { useState, useRef, useEffect } from 'react';
import { Plus, Search, Copy, Calendar, Clock2, Users, Video, Coffee, Briefcase, GraduationCap, Heart, Zap, Target, User, MoreVertical, ExternalLink, Share2, ChevronDown } from 'lucide-react';
import * as LucideIcons from 'lucide-react';
import { CreateEventModal } from '../components/CreateEventModal';
import { CreateTeamEventModal } from '../components/CreateTeamEventModal';
import { useNavigate } from 'react-router-dom';
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '../components/ui/tooltip';
import { useOutletContext } from 'react-router-dom';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Button } from '../components/ui/button';
import type { HeaderMeta } from '../components/Layout';

interface EventType {
  id: string;
  title: string;
  description: string;
  url: string;
  durations: number[];
  bookingsToday: number;
  isActive: boolean;
  icon: any;
  iconName?: string;
  iconColor?: string;
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
  if (lowerTitle.includes('interview') || lowerTitle.includes('technical')) return 'Briefcase';
  if (lowerTitle.includes('coffee') || lowerTitle.includes('chat')) return 'Coffee';
  if (lowerTitle.includes('demo') || lowerTitle.includes('presentation')) return 'Video';
  if (lowerTitle.includes('meeting') || lowerTitle.includes('sync')) return 'Users';
  if (lowerTitle.includes('consultation') || lowerTitle.includes('1:1')) return 'Clock2';
  if (lowerTitle.includes('training') || lowerTitle.includes('workshop')) return 'GraduationCap';
  if (lowerTitle.includes('review') || lowerTitle.includes('assessment')) return 'Target';
  if (lowerTitle.includes('strategy') || lowerTitle.includes('planning')) return 'Zap';
  if (lowerTitle.includes('mentorship') || lowerTitle.includes('guidance')) return 'Heart';
  return 'Calendar';
};

export const EventTypes = () => {
  const [selectedTeam, setSelectedTeam] = useState('personal');
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isCreateTeamModalOpen, setIsCreateTeamModalOpen] = useState(false);
  const [selectedTeamForCreation, setSelectedTeamForCreation] = useState('');
  const [copiedLink, setCopiedLink] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [eventStates, setEventStates] = useState<{[key: string]: boolean}>({});
  const [teamEvents, setTeamEvents] = useState<Team[]>([]);
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();

  const navigate = useNavigate();

  // Mock data
  useEffect(() => {
    const defaultTeams = [
      {
        id: 'personal',
        name: 'Sanskar Yadav',
        url: 'sanskar',
        avatar: 'S',
        eventTypes: [
          { id: 'p1', title: '15 Minute Meeting', description: 'Quick catch-up call', url: '/sanskar/15min', durations: [15], bookingsToday: 3, isActive: true, icon: Clock2, iconName: 'Clock2', iconColor: '#6366f1' },
          { id: 'p2', title: '30 Minute Meeting', description: 'Standard meeting', url: '/sanskar/30min', durations: [30], bookingsToday: 5, isActive: true, icon: Users, iconName: 'Users', iconColor: '#8b5cf6' },
          { id: 'p3', title: '1 Hour Consultation', description: 'In-depth consultation', url: '/sanskar/consultation', durations: [60], bookingsToday: 2, isActive: true, icon: Clock2, iconName: 'Clock2', iconColor: '#ec4899' },
          { id: 'p4', title: 'Coffee Chat', description: 'Informal coffee meeting', url: '/sanskar/coffee', durations: [30], bookingsToday: 1, isActive: true, icon: Coffee, iconName: 'Coffee', iconColor: '#f97316' },
          { id: 'p5', title: 'Demo Session', description: 'Product demonstration', url: '/sanskar/demo', durations: [45], bookingsToday: 4, isActive: true, icon: Video, iconName: 'Video', iconColor: '#ef4444' },
        ]
      },
      {
        id: 'meta',
        name: 'Meta',
        url: 'meta',
        avatar: 'M',
        eventTypes: [
          { id: 'm1', title: 'Technical Interview', description: 'Software engineering assessment', url: '/meta/tech-interview', durations: [60], bookingsToday: 8, isActive: true, icon: Briefcase, iconName: 'Briefcase', iconColor: '#6366f1' },
          { id: 'm2', title: 'Product Review', description: 'Product feature review', url: '/meta/product-review', durations: [45], bookingsToday: 5, isActive: true, icon: Target, iconName: 'Target', iconColor: '#8b5cf6' },
        ]
      }
    ];
    setTeamEvents(defaultTeams);
  }, []);

  useEffect(() => {
    setHeaderMeta({
      title: 'Event Types',
      description: 'Create and manage your booking links',
    });
  }, [setHeaderMeta]);

  const currentTeam = teamEvents.find(team => team.id === selectedTeam);
  const filteredEvents = currentTeam?.eventTypes.filter(event =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase())
  ) || [];

  const handleCopyLink = (url: string, eventId: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    navigator.clipboard.writeText(fullUrl);
    setCopiedLink(eventId);
    setTimeout(() => setCopiedLink(null), 2000);
  };

  const handleShareEvent = (eventTitle: string, url: string) => {
    const fullUrl = `${window.location.origin}${url}`;
    if (navigator.share) {
      navigator.share({
        title: eventTitle,
        url: fullUrl,
      });
    } else {
      handleCopyLink(url, 'shared');
    }
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Team Selector and Add Button */}
      <div className="flex items-center justify-between mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="flex items-center space-x-2">
              <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                {currentTeam?.avatar}
              </div>
              <span className="max-w-32 truncate">{currentTeam?.name}</span>
              <ChevronDown className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-56">
            {teamEvents.map((team) => (
              <DropdownMenuItem 
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                className="flex items-center space-x-2"
              >
                <div className="w-6 h-6 rounded-full bg-primary flex items-center justify-center text-white text-sm">
                  {team.avatar}
                </div>
                <span>{team.name}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button onClick={() => setIsCreateModalOpen(true)} size="sm">
          <Plus className="h-4 w-4 mr-2" />
          New
        </Button>
      </div>

      {/* Search Bar */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <input
          type="text"
          placeholder="Search event types..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
        />
      </div>

      {/* Event Types List */}
      <div className="space-y-3">
        {filteredEvents.map((event) => {
          const IconComponent = event.icon;
          return (
            <div
              key={event.id}
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3 flex-1 min-w-0">
                  <div 
                    className="w-10 h-10 rounded-lg flex items-center justify-center flex-shrink-0"
                    style={{ backgroundColor: `${event.iconColor}20` }}
                  >
                    <IconComponent 
                      className="h-5 w-5" 
                      style={{ color: event.iconColor }}
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-foreground truncate">{event.title}</h3>
                    <div className="flex items-center space-x-4 mt-1">
                      <span className="text-sm text-muted-foreground">
                        {event.durations[0]} min
                      </span>
                      {event.bookingsToday > 0 && (
                        <span className="text-sm text-muted-foreground">
                          {event.bookingsToday} today
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  {/* Options Menu */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem onClick={() => handleCopyLink(event.url, event.id)}>
                        <Copy className="h-4 w-4 mr-2" />
                        {copiedLink === event.id ? 'Copied!' : 'Copy Link'}
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => window.open(`${window.location.origin}${event.url}`, '_blank')}>
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Preview
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleShareEvent(event.title, event.url)}>
                        <Share2 className="h-4 w-4 mr-2" />
                        Share
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No event types found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery ? 'Try adjusting your search terms.' : 'Create your first event type to get started.'}
          </p>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Create Event Type
          </Button>
        </div>
      )}

      {/* Modals */}
      <CreateEventModal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        teamId={selectedTeam}
      />
      <CreateTeamEventModal
        isOpen={isCreateTeamModalOpen}
        onClose={() => setIsCreateTeamModalOpen(false)}
        teamId={selectedTeamForCreation}
        teamName={teamEvents.find(team => team.id === selectedTeamForCreation)?.name || ''}
      />
    </div>
  );
};
