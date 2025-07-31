import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, Calendar } from "lucide-react"

const Meetings = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">My Meetings</h1>
          <p className="text-muted-foreground">View and manage all your scheduled meetings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              Upcoming Meetings
            </CardTitle>
            <CardDescription>All your scheduled appointments</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Meetings list will be here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Meetings;