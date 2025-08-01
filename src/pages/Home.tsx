import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  CheckCircle, 
  Plus, 
  Calendar as CalendarIcon,
  Smartphone,
  Route,
  Workflow,
  TrendingUp,
  ArrowRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { ChartContainer, ChartTooltip, ChartTooltipContent } from '@/components/ui/chart';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

// Mock data for the dashboard
const mockBookingData = [
  { date: '2024-01-01', bookings: 12 },
  { date: '2024-01-02', bookings: 19 },
  { date: '2024-01-03', bookings: 8 },
  { date: '2024-01-04', bookings: 15 },
  { date: '2024-01-05', bookings: 22 },
  { date: '2024-01-06', bookings: 18 },
  { date: '2024-01-07', bookings: 25 },
  { date: '2024-01-08', bookings: 14 },
  { date: '2024-01-09', bookings: 16 },
  { date: '2024-01-10', bookings: 20 },
  { date: '2024-01-11', bookings: 24 },
  { date: '2024-01-12', bookings: 17 },
  { date: '2024-01-13', bookings: 21 },
  { date: '2024-01-14', bookings: 19 },
  { date: '2024-01-15', bookings: 23 },
];

const chartConfig = {
  bookings: {
    label: "Bookings",
    color: "hsl(var(--primary))",
  },
};

const Home = () => {
  const navigate = useNavigate();

  const quickActions = [
    {
      label: 'Create Event Type',
      icon: Plus,
      description: 'Create a new event type',
      onClick: () => navigate('/event-types')
    },
    {
      label: 'New Booking',
      icon: CalendarIcon,
      description: 'Schedule a new booking',
      onClick: () => navigate('/bookings')
    },
    {
      label: 'Install App',
      icon: Smartphone,
      description: 'Install calendar app',
      onClick: () => navigate('/apps')
    },
    {
      label: 'New Routing Form',
      icon: Route,
      description: 'Create a routing form',
      onClick: () => navigate('/routing-forms')
    },
    {
      label: 'New Workflow',
      icon: Workflow,
      description: 'Create a new workflow',
      onClick: () => navigate('/workflows')
    }
  ];

  return (
    <div className="space-y-6 p-4 max-w-full overflow-hidden">
      {/* Hero Dashboard Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {/* Upcoming Bookings Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/bookings')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Upcoming Bookings</CardTitle>
            <Calendar className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-2 md:gap-4">
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">8</div>
                <p className="text-xs md:text-sm text-muted-foreground">Today</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">42</div>
                <p className="text-xs md:text-sm text-muted-foreground">This Week</p>
              </div>
              <div className="text-center">
                <div className="text-2xl md:text-3xl font-bold text-primary">156</div>
                <p className="text-xs md:text-sm text-muted-foreground">This Month</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Approvals Card */}
        <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate('/bookings')}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-lg font-semibold">Pending Approvals</CardTitle>
            <Clock className="h-5 w-5 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center py-4">
              <div className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-orange-500">12</div>
                <p className="text-xs md:text-sm text-muted-foreground">Awaiting confirmation</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
      {/* Footer */}
      <div className="flex justify-center">
        <Button 
          variant="ghost" 
          className="text-muted-foreground hover:text-foreground"
          onClick={() => navigate('/insights')}
        >
          Need help? Visit Insights
          <ArrowRight className="h-4 w-4 ml-2" />
        </Button>
      </div>
    </div>
  );
};

export default Home;
