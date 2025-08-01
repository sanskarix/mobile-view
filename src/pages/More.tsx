import React from 'react';
import { NavLink } from 'react-router-dom';
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

export const More = () => {
  const moreNavigationItems = [
    {
      name: 'Availability',
      href: '/availability',
      icon: Clock2,
      description: 'Set your available times'
    },
    {
      name: 'Teams',
      href: '/teams',
      icon: Users,
      description: 'Manage your teams'
    },
    {
      name: 'Apps',
      href: '/apps',
      icon: Blocks,
      description: 'Connect integrations'
    },
    {
      name: 'Routing Forms',
      href: '/routing-forms',
      icon: ListTree,
      description: 'Create smart forms'
    },
    {
      name: 'Workflows',
      href: '/workflows',
      icon: Workflow,
      description: 'Automate your process'
    },
    {
      name: 'Insights',
      href: '/insights',
      icon: ChartNoAxesColumnIncreasing,
      description: 'View analytics'
    },
    {
      name: 'Settings',
      href: '/settings',
      icon: Settings,
      description: 'Account settings'
    }
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <div className="px-4 py-6">
        <h1 className="text-2xl font-bold text-foreground mb-6">More Options</h1>
        
        <div className="space-y-2">
          {moreNavigationItems.map((item) => (
            <NavLink
              key={item.name}
              to={item.href}
              className="flex items-center justify-between p-4 bg-card border border-border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <item.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-medium text-foreground">{item.name}</h3>
                  <p className="text-sm text-muted-foreground">{item.description}</p>
                </div>
              </div>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </NavLink>
          ))}
        </div>
      </div>
    </div>
  );
};