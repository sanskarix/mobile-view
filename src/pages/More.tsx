import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Clock2, 
  Users, 
  Blocks, 
  ListTree, 
  Workflow, 
  ChartNoAxesColumnIncreasing, 
  Settings,
  ChevronRight 
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

interface MoreItem {
  name: string;
  href: string;
  icon: React.ElementType;
  description: string;
}

export const More = () => {
  const navigate = useNavigate();

  const moreItems: MoreItem[] = [
    {
      name: 'Availability',
      href: '/availability',
      icon: Clock2,
      description: 'Manage your schedule and working hours'
    },
    {
      name: 'Teams',
      href: '/teams',
      icon: Users,
      description: 'Create and manage team calendars'
    },
    {
      name: 'Apps',
      href: '/apps',
      icon: Blocks,
      description: 'Connect integrations and third-party apps'
    },
    {
      name: 'Routing Forms',
      href: '/routing-forms',
      icon: ListTree,
      description: 'Create smart booking forms'
    },
    {
      name: 'Workflows',
      href: '/workflows',
      icon: Workflow,
      description: 'Automate your booking processes'
    },
    {
      name: 'Insights',
      href: '/insights',
      icon: ChartNoAxesColumnIncreasing,
      description: 'View analytics and performance metrics'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Configure your account preferences'
    }
  ];

  return (
    <div className="p-4 pb-20 space-y-4">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold text-foreground">More</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Access additional features and settings
        </p>
      </div>

      <div className="space-y-3">
        {moreItems.map((item) => (
          <Card 
            key={item.name}
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => navigate(item.href)}
          >
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="font-medium text-foreground">{item.name}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 text-muted-foreground" />
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
