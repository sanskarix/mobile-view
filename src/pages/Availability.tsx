import Layout from "@/components/Layout"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, Settings } from "lucide-react"

const Availability = () => {
  return (
    <Layout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Availability Settings</h1>
          <p className="text-muted-foreground">Configure when you're available for meetings</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Working Hours
            </CardTitle>
            <CardDescription>Set your regular working schedule</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-12 text-muted-foreground">
              Availability settings will be here
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Availability;