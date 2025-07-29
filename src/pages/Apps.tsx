import React, { useState, useEffect } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeaderMeta } from '@/components/Layout';
import { Search, Zap } from 'lucide-react';

interface App {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: string;
  installed: boolean;
  featured?: boolean;
}

const appCategories = [
  { id: 'all', name: 'All Integrations' },
  { id: 'automation', name: 'Automation' },
  { id: 'analytics', name: 'Analytics' },
  { id: 'communication', name: 'Communication' },
  { id: 'crm', name: 'CRM' },
  { id: 'marketing', name: 'Marketing' },
  { id: 'productivity', name: 'Productivity' },
  { id: 'payment', name: 'Payment' },
  { id: 'video', name: 'Video' }
];

const apps: App[] = [
  {
    id: 'zoom',
    name: 'Zoom',
    description: 'Video conferencing',
    icon: '🎥',
    category: 'video',
    installed: true,
    featured: true
  },
  {
    id: 'google-meet',
    name: 'Google Meet',
    description: 'Google video calls',
    icon: '📹',
    category: 'video',
    installed: false,
    featured: true
  },
  {
    id: 'microsoft-teams',
    name: 'Microsoft Teams',
    description: 'Team collaboration',
    icon: '👥',
    category: 'communication',
    installed: false
  },
  {
    id: 'stripe',
    name: 'Stripe',
    description: 'Payment processing',
    icon: '💳',
    category: 'payment',
    installed: true,
    featured: true
  },
  {
    id: 'paypal',
    name: 'PayPal',
    description: 'Online payments',
    icon: '💰',
    category: 'payment',
    installed: false
  },
  {
    id: 'salesforce',
    name: 'Salesforce',
    description: 'CRM integration',
    icon: '☁️',
    category: 'crm',
    installed: false
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    description: 'Marketing automation',
    icon: '🎯',
    category: 'marketing',
    installed: false,
    featured: true
  },
  {
    id: 'mailchimp',
    name: 'Mailchimp',
    description: 'Email marketing',
    icon: '📧',
    category: 'marketing',
    installed: false
  },
  {
    id: 'zapier',
    name: 'Zapier',
    description: 'Workflow automation',
    icon: '⚡',
    category: 'automation',
    installed: true,
    featured: true
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    description: 'Website analytics',
    icon: '📊',
    category: 'analytics',
    installed: false
  },
  {
    id: 'slack',
    name: 'Slack',
    description: 'Team messaging',
    icon: '💬',
    category: 'communication',
    installed: false,
    featured: true
  },
  {
    id: 'notion',
    name: 'Notion',
    description: 'Note taking & docs',
    icon: '📝',
    category: 'productivity',
    installed: false
  },
  {
    id: 'trello',
    name: 'Trello',
    description: 'Project management',
    icon: '📋',
    category: 'productivity',
    installed: false
  },
  {
    id: 'discord',
    name: 'Discord',
    description: 'Community chat',
    icon: '🎮',
    category: 'communication',
    installed: false
  },
  {
    id: 'calendly',
    name: 'Calendly',
    description: 'Scheduling tool',
    icon: '📅',
    category: 'productivity',
    installed: false
  },
  {
    id: 'typeform',
    name: 'Typeform',
    description: 'Form builder',
    icon: '📝',
    category: 'productivity',
    installed: false
  }
];

interface AppCardProps {
  app: App;
  onToggleInstall: (appId: string) => void;
}

const AppCard: React.FC<AppCardProps> = ({ app, onToggleInstall }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-border/60 transition-all hover:shadow-sm group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
          {app.icon}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{app.name}</h3>
          <p className="text-xs text-muted-foreground">{app.description}</p>
        </div>
        <Button
          variant={app.installed ? "secondary" : "outline"}
          size="sm"
          onClick={() => onToggleInstall(app.id)}
          className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
        >
          {app.installed ? 'Installed' : 'Install'}
        </Button>
      </div>
    </div>
  );
};

export const Apps = () => {
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [appList, setAppList] = useState<App[]>(apps);

  useEffect(() => {
    setHeaderMeta({
      title: 'Apps',
      description: 'All your favourite apps, plugins and tools, integrated with OneHash Cal'
    });
  }, [setHeaderMeta]);

  const handleToggleInstall = (appId: string) => {
    setAppList(prev => prev.map(app => 
      app.id === appId ? { ...app, installed: !app.installed } : app
    ));
  };

  const filteredApps = appList.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const sortedApps = [...filteredApps].sort((a, b) => {
    if (sortBy === 'featured') {
      if (a.featured && !b.featured) return -1;
      if (!a.featured && b.featured) return 1;
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'a-z') {
      return a.name.localeCompare(b.name);
    }
    if (sortBy === 'installed') {
      if (a.installed && !b.installed) return -1;
      if (!a.installed && b.installed) return 1;
      return a.name.localeCompare(b.name);
    }
    return 0;
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="p-8">
        {/* Header Section */}
        <div className="text-center mb-8 space-y-4">
        
          {/* Search Bar */}
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 space-y-6">
            {/* Sort By */}
            <div>
              <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wide">
                Sort By
              </h3>
              <div className="space-y-2">
                <button
                  onClick={() => setSortBy('featured')}
                  className={`block w-full text-left text-sm py-1 px-0 transition-colors ${
                    sortBy === 'featured' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Most popular
                </button>
                <button
                  onClick={() => setSortBy('a-z')}
                  className={`block w-full text-left text-sm py-1 px-0 transition-colors ${
                    sortBy === 'a-z' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  A - Z
                </button>
                <button
                  onClick={() => setSortBy('installed')}
                  className={`block w-full text-left text-sm py-1 px-0 transition-colors ${
                    sortBy === 'installed' ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  Installed
                </button>
              </div>
            </div>

            {/* Filter By Category */}
            <div>
              <h3 className="font-medium text-sm mb-4 text-muted-foreground uppercase tracking-wide">
                Filter By
              </h3>
              <div className="space-y-2">
                {appCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left text-sm py-1 px-0 transition-colors ${
                      selectedCategory === category.id ? 'text-foreground font-medium' : 'text-muted-foreground hover:text-foreground'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="flex-1">
            {sortedApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedApps.map((app) => (
                  <AppCard
                    key={app.id}
                    app={app}
                    onToggleInstall={handleToggleInstall}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <Zap className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No apps found</h3>
                <p className="text-muted-foreground">
                  Try adjusting your search or filter criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
