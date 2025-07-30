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
  BarChart3,
  Filter,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Eye,
  XCircle
} from 'lucide-react';
import { HeaderMeta } from '@/components/Layout';
import { DatePickerWithRange } from '@/components/ui/date-range-picker';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';

// Mock data
const totalBookingsOverTimeData = [
  { week: 'Week 1', bookings: 145 },
  { week: 'Week 2', bookings: 168 },
  { week: 'Week 3', bookings: 152 },
  { week: 'Week 4', bookings: 189 },
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

const popularTimesData = [
  { hour: '9AM', bookings: 12 },
  { hour: '10AM', bookings: 18 },
  { hour: '11AM', bookings: 25 },
  { hour: '2PM', bookings: 22 },
  { hour: '3PM', bookings: 19 },
  { hour: '4PM', bookings: 15 },
];

const routingResponsesData = [
  { name: 'John Smith', email: 'john@example.com', city: 'San Francisco', role: 'Product Manager', bookingStatus: 'Accepted', submittedOn: '2024-01-15' },
  { name: 'Sarah Jones', email: 'sarah@example.com', city: 'New York', role: 'Designer', bookingStatus: 'Pending', submittedOn: '2024-01-14' },
  { name: 'Mike Brown', email: 'mike@example.com', city: 'Austin', role: 'Developer', bookingStatus: 'Canceled', submittedOn: '2024-01-13' },
  { name: 'Lisa Wilson', email: 'lisa@example.com', city: 'Seattle', role: 'Marketing Manager', bookingStatus: 'Accepted', submittedOn: '2024-01-12' },
];

const workflowMessages = [
  { workflow: 'Welcome Email', usage: 340, percentage: '28%' },
  { workflow: 'Reminder SMS', usage: 280, percentage: '23%' },
  { workflow: 'Follow-up WhatsApp', usage: 245, percentage: '20%' },
  { workflow: 'Confirmation Email', usage: 190, percentage: '16%' },
  { workflow: 'Cancellation Notice', usage: 160, percentage: '13%' },
];

export const Insights = () => {
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  const [activeTab, setActiveTab] = useState('bookings');
  const [dateRange, setDateRange] = useState('7d');
  const [showCustomDate, setShowCustomDate] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState('personal');
  const [selectedEventType, setSelectedEventType] = useState('all');
  const [selectedForm, setSelectedForm] = useState('all');
  const [selectedBookingStatus, setSelectedBookingStatus] = useState('all');
  const [selectedWorkflowType, setSelectedWorkflowType] = useState('email');

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

  return (
    <div className="space-y-6 p-6">
      {/* Header Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Select value={selectedAccount} onValueChange={setSelectedAccount}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="personal">Personal</SelectItem>
              <SelectItem value="team1">Team 1</SelectItem>
              <SelectItem value="team2">Team 2</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-4">
          <Select value={dateRange} onValueChange={(value) => {
            setDateRange(value);
            setShowCustomDate(value === 'custom');
          }}>
            <SelectTrigger className="w-[180px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
              <SelectItem value="1y">Last year</SelectItem>
              <SelectItem value="custom">Custom</SelectItem>
            </SelectContent>
          </Select>
          {showCustomDate && (
            <DatePickerWithRange className="w-auto" />
          )}
          <Button variant="outline" size="sm">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Alert Cards */}
      {getTabSpecificAlerts()}

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="bookings">Bookings</TabsTrigger>
          <TabsTrigger value="routings">Routings</TabsTrigger>
          <TabsTrigger value="workflows">Workflows</TabsTrigger>
        </TabsList>

        {/* Bookings Tab */}
        <TabsContent value="bookings" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={selectedEventType} onValueChange={setSelectedEventType}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Event Types" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Event Types</SelectItem>
                <SelectItem value="sales-demo">Sales Demo</SelectItem>
                <SelectItem value="discovery-call">Discovery Call</SelectItem>
                <SelectItem value="technical-interview">Technical Interview</SelectItem>
                <SelectItem value="follow-up">Follow-up Meeting</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard
              title="Total Bookings"
              value="168"
              trend={12.3}
              icon={Calendar}
            />
            <MetricCard
              title="Events Rescheduled"
              value="23"
              trend={-5.2}
              icon={Clock}
            />
            <MetricCard
              title="Events Canceled"
              value="12"
              trend={8.1}
              icon={XCircle}
            />
            <MetricCard
              title="Avg Meeting Duration"
              value="28 min"
              trend={3.2}
              icon={Clock}
            />
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Total Bookings Over Time */}
            <Card>
              <CardHeader>
                <CardTitle>Total Bookings Over Time</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={totalBookingsOverTimeData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="week" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="bookings" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={3}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            {/* Meeting Overview */}
            <Card>
              <CardHeader>
                <CardTitle>Meeting Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-primary">168</div>
                    <div className="text-sm text-muted-foreground">Total Booked</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-orange-500">12</div>
                    <div className="text-sm text-muted-foreground">Cancelled</div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-3xl font-bold text-red-500">25</div>
                    <div className="text-sm text-muted-foreground">No Show</div>
                  </div>
                </div>
                <div className="mt-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Attendance Rate</span>
                    <span>85%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div className="bg-primary h-2 rounded-full" style={{ width: '85%' }} />
                  </div>
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
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={selectedForm} onValueChange={setSelectedForm}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Select Forms" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Forms</SelectItem>
                <SelectItem value="sales-qualification">Sales Qualification</SelectItem>
                <SelectItem value="technical-assessment">Technical Assessment</SelectItem>
                <SelectItem value="general-inquiry">General Inquiry</SelectItem>
              </SelectContent>
            </Select>
            <Select value={selectedBookingStatus} onValueChange={setSelectedBookingStatus}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Booking Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Statuses</SelectItem>
                <SelectItem value="canceled">Canceled</SelectItem>
                <SelectItem value="accepted">Accepted</SelectItem>
                <SelectItem value="rejected">Rejected</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="awaiting-host">Awaiting host</SelectItem>
                <SelectItem value="no-booking">No booking</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Big Number Cards */}
          <div className="grid gap-4 md:grid-cols-3">
            <Card className="bg-blue-50 border-blue-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-blue-600">1,250</div>
                <div className="text-sm font-medium text-blue-800 mt-2">Total Responses</div>
                <div className="text-xs text-blue-600 mt-1">All users who submitted the form</div>
              </CardContent>
            </Card>
            <Card className="bg-green-50 border-green-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-green-600">840</div>
                <div className="text-sm font-medium text-green-800 mt-2">Responses With Booking</div>
                <div className="text-xs text-green-600 mt-1">Users who went on to book a meeting</div>
              </CardContent>
            </Card>
            <Card className="bg-orange-50 border-orange-200">
              <CardContent className="p-6 text-center">
                <div className="text-4xl font-bold text-orange-600">410</div>
                <div className="text-sm font-medium text-orange-800 mt-2">Responses Without Booking</div>
                <div className="text-xs text-orange-600 mt-1">Users who did not book after replying</div>
              </CardContent>
            </Card>
          </div>

          {/* Vertical Funnel Chart */}
          <Card>
            <CardHeader>
              <CardTitle>Routing Flow Visualization</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col items-center space-y-4 py-8">
                {/* Total Responses */}
                <div className="w-80 h-20 bg-blue-100 rounded-lg flex items-center justify-center border-2 border-blue-300">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-blue-700">1,250</div>
                    <div className="text-sm text-blue-600">Total Responses</div>
                  </div>
                </div>
                
                {/* Arrow Down */}
                <div className="text-muted-foreground">↓</div>
                
                {/* Split */}
                <div className="flex space-x-8">
                  {/* With Booking */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-sm text-green-600 font-medium">67% booked</div>
                    <div className="w-60 h-16 bg-green-100 rounded-lg flex items-center justify-center border-2 border-green-300">
                      <div className="text-center">
                        <div className="text-xl font-bold text-green-700">840</div>
                        <div className="text-xs text-green-600">With Booking</div>
                      </div>
                    </div>
                  </div>
                  
                  {/* Without Booking */}
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-sm text-orange-600 font-medium">33% did not book</div>
                    <div className="w-60 h-16 bg-orange-100 rounded-lg flex items-center justify-center border-2 border-orange-300">
                      <div className="text-center">
                        <div className="text-xl font-bold text-orange-700">410</div>
                        <div className="text-xs text-orange-600">Without Booking</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Responses Table */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Responses</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Booked By</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>City</TableHead>
                    <TableHead>Role</TableHead>
                    <TableHead>Booking Status</TableHead>
                    <TableHead>Submitted On</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {routingResponsesData.map((response, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        <CheckCircle className="h-4 w-4 text-green-500" />
                      </TableCell>
                      <TableCell className="font-medium">{response.name}</TableCell>
                      <TableCell>{response.email}</TableCell>
                      <TableCell>{response.city}</TableCell>
                      <TableCell>{response.role}</TableCell>
                      <TableCell>
                        <Badge variant={response.bookingStatus === 'Accepted' ? 'default' : 'secondary'}>
                          {response.bookingStatus}
                        </Badge>
                      </TableCell>
                      <TableCell>{response.submittedOn}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Workflows Tab */}
        <TabsContent value="workflows" className="space-y-6">
          {/* Filters */}
          <div className="flex items-center gap-4">
            <Select value={selectedWorkflowType} onValueChange={setSelectedWorkflowType}>
              <SelectTrigger className="w-[200px]">
                <Filter className="mr-2 h-4 w-4" />
                <SelectValue placeholder="Type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="h-4 w-4" />
                    Email
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    SMS
                  </div>
                </SelectItem>
                <SelectItem value="whatsapp">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="h-4 w-4" />
                    WhatsApp
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Key Metrics */}
          <div className="grid gap-4 md:grid-cols-4">
            <MetricCard
              title="Total Messages Triggered"
              value="4,280"
              trend={12.3}
              icon={Target}
            />
            <MetricCard
              title="Messages Sent"
              value="4,105"
              trend={10.1}
              icon={Send}
            />
            <MetricCard
              title="Messages Read"
              value="3,204"
              trend={8.5}
              icon={Eye}
            />
            <MetricCard
              title="Messages Failed"
              value="175"
              trend={-15.2}
              icon={XCircle}
            />
          </div>

          {/* Message Pipeline */}
          <Card>
            <CardHeader>
              <CardTitle>Message Flow Pipeline</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* Progress Bar */}
                <div className="relative">
                  <div className="flex justify-between text-sm font-medium mb-2">
                    <span>Messages Triggered</span>
                    <span>Messages Sent</span>
                    <span>Messages Read</span>
                    <span>Messages Failed</span>
                  </div>
                  <div className="flex">
                    <div className="flex-1 bg-blue-200 h-8 flex items-center justify-center text-sm font-medium text-blue-800 first:rounded-l-lg">
                      4,280 (100%)
                    </div>
                    <div className="flex-1 bg-green-200 h-8 flex items-center justify-center text-sm font-medium text-green-800">
                      4,105 (96%)
                    </div>
                    <div className="flex-1 bg-yellow-200 h-8 flex items-center justify-center text-sm font-medium text-yellow-800">
                      3,204 (78%)
                    </div>
                    <div className="flex-1 bg-red-200 h-8 flex items-center justify-center text-sm font-medium text-red-800 last:rounded-r-lg">
                      175 (4%)
                    </div>
                  </div>
                </div>

                {/* Summary Table */}
                <div className="grid grid-cols-4 gap-4 text-center">
                  <div className="space-y-1">
                    <div className="text-2xl font-bold">4,280</div>
                    <div className="text-sm text-muted-foreground">Triggered</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-green-600">96%</div>
                    <div className="text-sm text-muted-foreground">Delivery Rate</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-yellow-600">78%</div>
                    <div className="text-sm text-muted-foreground">Read Rate</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-2xl font-bold text-red-600">4%</div>
                    <div className="text-sm text-muted-foreground">Failure Rate</div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Most Used Workflows */}
          <Card>
            <CardHeader>
              <CardTitle>Most Used Workflows</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {workflowMessages.map((workflow, index) => (
                  <div key={index} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      {selectedWorkflowType === 'email' && <Mail className="h-5 w-5 text-blue-500" />}
                      {selectedWorkflowType === 'sms' && <Phone className="h-5 w-5 text-green-500" />}
                      {selectedWorkflowType === 'whatsapp' && <MessageSquare className="h-5 w-5 text-green-600" />}
                      <div>
                        <h4 className="font-medium">{workflow.workflow}</h4>
                        <p className="text-sm text-muted-foreground">{workflow.usage} messages</p>
                      </div>
                    </div>
                    <Badge variant="secondary">{workflow.percentage}</Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};