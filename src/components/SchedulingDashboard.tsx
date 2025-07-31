import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TimeSlot } from "./TimeSlot"
import { Calendar, Clock, Users, Plus, ArrowRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const todaySlots = [
  { time: "9:00 AM", duration: "30 min", available: true },
  { time: "9:30 AM", duration: "30 min", available: false },
  { time: "10:00 AM", duration: "30 min", available: true },
  { time: "10:30 AM", duration: "30 min", available: true },
  { time: "11:00 AM", duration: "30 min", available: false },
  { time: "11:30 AM", duration: "30 min", available: true },
]

const upcomingMeetings = [
  { title: "Product Demo", time: "2:00 PM", attendee: "Sarah Johnson", type: "Sales Call" },
  { title: "Team Standup", time: "3:30 PM", attendee: "Development Team", type: "Internal" },
  { title: "Client Review", time: "4:00 PM", attendee: "Alex Chen", type: "Review" },
]

export function SchedulingDashboard() {
  const [selectedDate, setSelectedDate] = useState(new Date())

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Manage your appointments and availability</p>
        </div>
        <Button variant="gradient" className="w-full lg:w-auto">
          <Plus className="h-4 w-4 mr-2" />
          New Meeting
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-primary/10 to-primary-glow/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-primary">Today's Meetings</CardTitle>
            <div className="text-2xl font-bold text-foreground">8</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              <span className="text-success">+2</span> from yesterday
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-success/10 to-success/5 border-success/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-success">Available Slots</CardTitle>
            <div className="text-2xl font-bold text-foreground">12</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Out of 20 total slots
            </p>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-warning/10 to-warning/5 border-warning/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-warning">This Week</CardTitle>
            <div className="text-2xl font-bold text-foreground">45</div>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              Total meetings scheduled
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Availability */}
        <div className="lg:col-span-2 space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Clock className="h-5 w-5 text-primary" />
                Today's Availability
              </CardTitle>
              <CardDescription>
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {todaySlots.map((slot, index) => (
                <TimeSlot
                  key={index}
                  time={slot.time}
                  duration={slot.duration}
                  available={slot.available}
                  onSelect={() => console.log(`Selected ${slot.time}`)}
                />
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Upcoming Meetings */}
        <div className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5 text-primary" />
                Upcoming Meetings
              </CardTitle>
              <CardDescription>Next 3 scheduled meetings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {upcomingMeetings.map((meeting, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-muted/30 rounded-lg">
                  <div className="space-y-1">
                    <p className="font-medium text-sm">{meeting.title}</p>
                    <p className="text-xs text-muted-foreground">{meeting.attendee}</p>
                    <Badge variant="secondary" className="text-xs">
                      {meeting.type}
                    </Badge>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-primary">{meeting.time}</p>
                    <Button variant="ghost" size="sm" className="p-1 h-auto">
                      <ArrowRight className="h-3 w-3" />
                    </Button>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Quick Actions</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <Button variant="outline" className="w-full justify-start">
                <Calendar className="h-4 w-4 mr-2" />
                View Full Calendar
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Clock className="h-4 w-4 mr-2" />
                Set Availability
              </Button>
              <Button variant="outline" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Manage Invites
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}