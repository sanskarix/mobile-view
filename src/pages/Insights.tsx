import React, { useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
// Removed unused import
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area,
  FunnelChart,
  Funnel,
  LabelList
} from 'recharts';
import { 
  Calendar, 
  TrendingUp, 
  TrendingDown, 
  Download, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Users,
  Target,
  BarChart3
} from 'lucide-react';
import { HeaderMeta } from '@/components/Layout';

// Mock data
const bookingConversionData = [
  { week: 'Week 1', rate: 68 },
  { week: 'Week 2', rate: 72 },
  { week: 'Week 3', rate: 65 },
  { week: 'Week 4', rate: 78 },
];

const totalBookingsData = [
  { day: 'Mon', bookings: 24 },
  { day: 'Tue', bookings: 28 },
  { day: 'Wed', bookings: 32 },
  { day: 'Thu', bookings: 29 },
  { day: 'Fri', bookings: 35 },
  { day: 'Sat', bookings: 12 },
  { day: 'Sun', bookings: 8 },
];

const showUpData = [
  { name: 'Attended', value: 85, color: 'hsl(var(--chart-1))' },
  { name: 'No-show', value: 15, color: 'hsl(var(--chart-2))' },
];

const popularTimesData = [
  { hour: '9AM', bookings: 12 },
  { hour: '10AM', bookings: 18 },
  { hour: '11AM', bookings: 25 },
  { hour: '2PM', bookings: 22 },
  { hour: '3PM', bookings: 19 },
  { hour: '4PM', bookings: 15 },
];

const routingFunnelData = [
  { name: 'Form Views', value: 1000, fill: 'hsl(var(--chart-1))' },
  { name: 'Form Completions', value: 750, fill: 'hsl(var(--chart-2))' },
  { name: 'Qualified Leads', value: 600, fill: 'hsl(var(--chart-3))' },
  { name: 'Bookings', value: 420, fill: 'hsl(var(--chart-4))' },
];

const workflowAutomationData = [
  { month: 'Jan', automated: 340, manual: 120 },
  { month: 'Feb', automated: 380, manual: 95 },
  { month: 'Mar', automated: 420, manual: 80 },
  { month: 'Apr', automated: 390, manual: 110 },
];

export const Insights = () => {
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  const [activeTab, setActiveTab] = useState('bookings');
  const [dateRange, setDateRange] = useState('7d');

  React.useEffect(() => {
    setHeaderMeta({
      title: 'Insights',
      description: 'Analytics and performance metrics for your scheduling activities',
    });
  }, [setHeaderMeta]);

  const MetricCard = ({ title, value, trend, icon: Icon, color = 'default' }) => (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        <Icon className="h-4 w-4 text-muted-foreground" />
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        <div className="flex items-center text-xs text-muted-foreground">
          {trend > 0 ? (
            <TrendingUp className="mr-1 h-3 w-3 text-green-500" />
          ) : (
            <TrendingDown className="mr-1 h-3 w-3 text-red-500" />
          )}
          {Math.abs(trend)}% from last period
        </div>
      </CardContent>
    </Card>
  );

<<<<<<< HEAD
  const getTabSpecificAlerts = () => {
    if (activeTab === 'bookings') {
    } else if (activeTab === 'routings') {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Form completion rate improved by 15% after simplifying questions.
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              Drop-off at "Company Size" question is 23% higher than other fields.
            </AlertDescription>
          </Alert>
        </div>
      );
    } else {
      return (
        <div className="grid gap-4 md:grid-cols-2">
          <Alert>
            <CheckCircle className="h-4 w-4" />
            <AlertDescription>
              Email workflows have 94% delivery rate - your highest performing channel!
            </AlertDescription>
          </Alert>
          <Alert>
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              SMS read rates dropped 8% this week. Consider updating message templates.
            </AlertDescription>
          </Alert>
        </div>
      );
    }
  };

=======
>>>>>>> origin/main
  return (
    <div className="space-y-6 p-6">
      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="routings">Routings</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

<<<<<<< HEAD
        {/* Alert Cards */}
        {getTabSpecificAlerts()}
=======
      {/* Alert Cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Alert>
          <AlertTriangle className="h-4 w-4" />
          <AlertDescription>
            No-show rate increased by 12% this week. Consider implementing reminder workflows.
          </AlertDescription>
        </Alert>
        <Alert>
          <CheckCircle className="h-4 w-4" />
          <AlertDescription>
            Conversion rate is up 8% - your new routing logic is performing well!
          </AlertDescription>
        </Alert>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="routings">Routings</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>
>>>>>>> origin/main

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Booking Conversion Rate"
              value="73.2%"
              trend={5.1}
              icon={Target}
            />
            <MetricCard
              title="Total Bookings"
              value="168"
              trend={12.3}
              icon={Calendar}
            />
            <MetricCard
              title="Show-up Rate"
              value="85%"
              trend={-2.1}
              icon={CheckCircle}
            />
            <MetricCard
              title="Avg Meeting Duration"
              value="28 min"
              trend={3.2}
              icon={Clock}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Booking Conversion Trend */}
            <Card>
              <CardHeader>
                <CardTitle>Booking Conversion Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={bookingConversionData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="rate" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Show-up vs No-show */}
            <Card>
              <CardHeader>
                <CardTitle>Attendance Rate</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={showUpData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={120}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {showUpData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="flex justify-center gap-4 mt-4">
                  {showUpData.map((entry, index) => (
                    <div key={index} className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: entry.color }}
                      />
                      <span className="text-sm">{entry.name}: {entry.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Daily Bookings */}
            <Card>
              <CardHeader>
                <CardTitle>Bookings by Day</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={totalBookingsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="day" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Popular Booking Times */}
            <Card>
              <CardHeader>
                <CardTitle>Popular Booking Times</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={popularTimesData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="hour" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="bookings" fill="hsl(var(--chart-3))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>

          {/* Top Performing Meeting Types */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing Meeting Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { name: 'Sales Demo', bookings: 45, conversion: '82%' },
                  { name: 'Discovery Call', bookings: 38, conversion: '76%' },
                  { name: 'Technical Interview', bookings: 32, conversion: '68%' },
                  { name: 'Follow-up Meeting', bookings: 28, conversion: '91%' },
                ].map((type, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div>
                      <h4 className="font-medium">{type.name}</h4>
                      <p className="text-sm text-muted-foreground">{type.bookings} bookings</p>
                    </div>
                    <Badge variant="secondary">{type.conversion}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Routings Tab */}
        <TabsContent value="routings" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Routing Success Rate"
              value="42%"
              trend={8.2}
              icon={Target}
            />
            <MetricCard
              title="Form Completion Rate"
              value="75%"
              trend={-3.1}
              icon={CheckCircle}
            />
            <MetricCard
              title="Avg Completion Time"
              value="2.4 min"
              trend={-12.5}
              icon={Clock}
            />
            <MetricCard
              title="Qualified Leads"
              value="80%"
              trend={5.7}
              icon={Users}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Routing Funnel */}
            <Card>
              <CardHeader>
                <CardTitle>Routing Conversion Funnel</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={routingFunnelData} layout="horizontal">
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis type="number" />
                    <YAxis dataKey="name" type="category" width={120} />
                    <Tooltip />
                    <Bar dataKey="value" fill="hsl(var(--primary))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Routing Paths Performance */}
            <Card>
              <CardHeader>
                <CardTitle>Conversion by Routing Path</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { path: 'Sales Qualification', views: 320, conversions: 156, rate: '48.8%' },
                    { path: 'Technical Assessment', views: 180, conversions: 72, rate: '40.0%' },
                    { path: 'General Inquiry', views: 500, conversions: 190, rate: '38.0%' },
                  ].map((path, index) => (
                    <div key={index} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">{path.path}</span>
                        <Badge variant="outline">{path.rate}</Badge>
                      </div>
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: path.rate }}
                        />
                      </div>
                      <div className="flex justify-between text-sm text-muted-foreground">
                        <span>{path.conversions} conversions</span>
                        <span>{path.views} views</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Automation Rate"
              value="78%"
              trend={15.2}
              icon={BarChart3}
            />
            <MetricCard
              title="Avg Response Time"
              value="4.2 min"
              trend={-22.1}
              icon={Clock}
            />
            <MetricCard
              title="Workflow Success Rate"
              value="94%"
              trend={2.3}
              icon={CheckCircle}
            />
            <MetricCard
              title="Active Workflows"
              value="12"
              trend={0}
              icon={Target}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Automation vs Manual */}
            <Card>
              <CardHeader>
                <CardTitle>Automated vs Manual Handling</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={workflowAutomationData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="automated" stackId="a" fill="hsl(var(--chart-1))" />
                    <Bar dataKey="manual" stackId="a" fill="hsl(var(--chart-2))" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Top Automated Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Busiest Automated Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { action: 'Send Confirmation Email', triggers: 340, percentage: '28%' },
                    { action: 'Calendar Sync', triggers: 280, percentage: '23%' },
                    { action: 'Reminder Notifications', triggers: 245, percentage: '20%' },
                    { action: 'Follow-up Sequence', triggers: 190, percentage: '16%' },
                    { action: 'Slack Notifications', triggers: 160, percentage: '13%' },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                      <div>
                        <h4 className="font-medium">{item.action}</h4>
                        <p className="text-sm text-muted-foreground">{item.triggers} triggers</p>
                      </div>
                      <Badge variant="secondary">{item.percentage}</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};
