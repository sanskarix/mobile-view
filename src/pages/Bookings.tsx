import React, { useState, useRef, useEffect } from 'react';
import { Filter, Search, Calendar, MapPin, Video, MoreVertical, Edit, Clock, ChevronDown, Users, Mail, Globe, Trash2, CheckCircle, XCircle, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import { Checkbox } from '../components/ui/checkbox';
import { useToast } from '../hooks/use-toast';
import type { HeaderMeta } from '../components/Layout';
import { useOutletContext } from 'react-router-dom';

interface Meeting {
  id: string;
  title: string;
  date: string;
  time: string;
  endTime: string;
  attendees: Array<{
    name: string;
    email: string;
    avatar?: string;
    timezone?: string;
  }>;
  location: {
    type: 'online' | 'physical';
    name: string;
    address?: string;
    logo?: string;
  };
  eventType: string;
  status: 'upcoming' | 'unconfirmed' | 'recurring' | 'past' | 'canceled';
  duration?: string;
  host?: string;
  isHost?: boolean;
}

const mockMeetings: Meeting[] = [
  {
    id: '1',
    title: 'Product Hunt Chats',
    date: 'Mon, 14 Jul',
    time: '9:00am',
    endTime: '9:30am',
    duration: '30 minutes',
    host: 'You',
    isHost: true,
    attendees: [{ name: 'Sanskar Yadav', email: 'sanskar@example.com', timezone: 'Asia/Calcutta' }],
    location: { type: 'online', name: 'Google Meet', logo: '📹' },
    eventType: 'Product Hunt Chats',
    status: 'upcoming',
  },
  {
    id: '2',
    title: 'Discovery Call',
    date: 'Mon, 14 Jul',
    time: '2:00pm',
    endTime: '2:15pm',
    duration: '15 minutes',
    host: 'You',
    isHost: true,
    attendees: [{ name: 'Emily Rodriguez', email: 'emily.r@techcorp.com', timezone: 'America/New_York' }],
    location: { type: 'online', name: 'Zoom', logo: '📹' },
    eventType: 'Discovery Call',
    status: 'upcoming',
  },
  {
    id: '3',
    title: 'Team Standup',
    date: 'Tue, 15 Jul',
    time: '10:00am',
    endTime: '10:30am',
    duration: '30 minutes',
    host: 'Sarah Wilson',
    isHost: false,
    attendees: [
      { name: 'Sarah Wilson', email: 'sarah@company.com' },
      { name: 'Mike Chen', email: 'mike@company.com' },
      { name: 'You', email: 'you@company.com' }
    ],
    location: { type: 'online', name: 'Microsoft Teams', logo: '📹' },
    eventType: 'Team Meeting',
    status: 'unconfirmed',
  }
];

const statusFilters = [
  { value: 'all', label: 'All Bookings' },
  { value: 'upcoming', label: 'Upcoming' },
  { value: 'unconfirmed', label: 'Unconfirmed' },
  { value: 'past', label: 'Past' },
  { value: 'canceled', label: 'Canceled' },
];

export default function Bookings() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [meetings, setMeetings] = useState<Meeting[]>(mockMeetings);
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();

  useEffect(() => {
    setHeaderMeta({
      title: 'Bookings',
      description: 'Manage your scheduled meetings and appointments',
    });
  }, [setHeaderMeta]);

  const filteredMeetings = meetings.filter(meeting => {
    const matchesStatus = selectedStatus === 'all' || meeting.status === selectedStatus;
    const matchesSearch = meeting.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         meeting.attendees.some(attendee => 
                           attendee.name.toLowerCase().includes(searchQuery.toLowerCase())
                         );
    return matchesStatus && matchesSearch;
  });

  const handleReschedule = (meetingId: string) => {
    toast({ title: "Reschedule", description: "Reschedule functionality would be implemented here" });
  };

  const handleCancel = (meetingId: string) => {
    setMeetings(prev => prev.map(meeting => 
      meeting.id === meetingId ? { ...meeting, status: 'canceled' as const } : meeting
    ));
    toast({ title: "Canceled", description: "Meeting has been canceled successfully" });
  };

  const handleEdit = (meetingId: string) => {
    toast({ title: "Edit", description: "Edit functionality would be implemented here" });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'text-green-600 bg-green-50';
      case 'unconfirmed': return 'text-yellow-600 bg-yellow-50';
      case 'past': return 'text-gray-600 bg-gray-50';
      case 'canceled': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className="p-4 max-w-full overflow-hidden">
      {/* Filters and Search */}
      <div className="flex flex-col space-y-4 mb-6">
        <div className="flex items-center justify-between">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm" className="flex items-center space-x-2">
                <Filter className="h-4 w-4" />
                <span className="max-w-20 truncate">{statusFilters.find(f => f.value === selectedStatus)?.label}</span>
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="start">
              {statusFilters.map((filter) => (
                <DropdownMenuItem 
                  key={filter.value}
                  onClick={() => setSelectedStatus(filter.value)}
                >
                  {filter.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>

          <Button size="sm" onClick={() => toast({ title: "New Booking", description: "Create new booking functionality" })}>
            <Plus className="h-4 w-4 mr-2" />
            New
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <input
            type="text"
            placeholder="Search bookings..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>
      </div>

      {/* Bookings List */}
      <div className="space-y-3">
        {filteredMeetings.map((meeting) => (
          <div
            key={meeting.id}
            className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => navigate(`/booking/${meeting.id}`)}
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-foreground truncate">{meeting.title}</h3>
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(meeting.status)}`}>
                    {meeting.status}
                  </span>
                </div>
                
                <div className="space-y-1">
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span>{meeting.date} • {meeting.time} - {meeting.endTime}</span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Users className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="truncate">
                      {meeting.attendees.map(a => a.name).join(', ')}
                    </span>
                  </div>
                  
                  <div className="flex items-center text-sm text-muted-foreground">
                    {meeting.location.type === 'online' ? (
                      <Video className="h-4 w-4 mr-2 flex-shrink-0" />
                    ) : (
                      <MapPin className="h-4 w-4 mr-2 flex-shrink-0" />
                    )}
                    <span className="truncate">{meeting.location.name}</span>
                  </div>
                </div>
              </div>

              <DropdownMenu>
                <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0 flex-shrink-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleEdit(meeting.id); }}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={(e) => { e.stopPropagation(); handleReschedule(meeting.id); }}>
                    <Calendar className="h-4 w-4 mr-2" />
                    Reschedule
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={(e) => { e.stopPropagation(); handleCancel(meeting.id); }}
                    className="text-destructive"
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Cancel
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {filteredMeetings.length === 0 && (
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">No bookings found</h3>
          <p className="text-muted-foreground mb-6">
            {searchQuery || selectedStatus !== 'all' 
              ? 'Try adjusting your filters or search terms.' 
              : 'You don\'t have any bookings yet.'}
          </p>
          <Button onClick={() => toast({ title: "New Booking", description: "Create new booking functionality" })}>
            <Plus className="h-4 w-4 mr-2" />
            Create Booking
          </Button>
        </div>
      )}
    </div>
  );
}
