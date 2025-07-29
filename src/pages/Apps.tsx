import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, Settings, Trash2, Search, Package } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeaderMeta } from '@/components/Layout';

interface App {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  installed?: boolean;
}

const availableApps: App[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    category: 'Social',
    description: 'Connect all your favourite apps, plugins and tools',
    logo: '📷'
  },
  {
    id: 'zapier',
    name: 'Zapier',
    category: 'Automation',
    description: 'Automate workflows with 6000+ apps',
    logo: '🧡'
  },
  {
    id: 'plausible',
    name: 'Plausible',
    category: 'Analytics',
    description: 'Privacy-focused website analytics',
    logo: '📊'
  },
  {
    id: 'google-analytics',
    name: 'Google Analytics',
    category: 'Analytics',
    description: 'Track and analyze your website traffic',
    logo: '📈'
  },
  {
    id: 'custom',
    name: 'Custom',
    category: 'Other',
    description: 'Build custom integrations with webhooks',
    logo: '⚙️'
  },
  {
    id: 'netlify',
    name: 'Netlify',
    category: 'Automation',
    description: 'Deploy and manage your web projects',
    logo: '🌐'
  },
  {
    id: 'youtube',
    name: 'YouTube',
    category: 'Social',
    description: 'Integrate YouTube content and analytics',
    logo: '📺'
  },
  {
    id: 'twitter',
    name: 'Twitter / X',
    category: 'Social',
    description: 'Connect your Twitter account for social management',
    logo: '🐦'
  },
  {
    id: 'github',
    name: 'GitHub',
    category: 'Development',
    description: 'Connect your GitHub repositories',
    logo: '🐙'
  },
  {
    id: 'senjo',
    name: 'Senjo',
    category: 'Marketing',
    description: 'Email marketing and automation platform',
    logo: '💜'
  },
  {
    id: 'tally',
    name: 'Tally',
    category: 'Forms',
    description: 'Create beautiful forms and surveys',
    logo: '⭐'
  },
  {
    id: 'typeform',
    name: 'Typeform',
    category: 'Forms',
    description: 'Form builder',
    logo: '📝'
  },
  {
    id: 'linear',
    name: 'Linear',
    category: 'Development',
    description: 'Issue tracking',
    logo: '🎯'
  },
  {
    id: 'figma',
    name: 'Figma',
    category: 'Development',
    description: 'Design collaboration',
    logo: '🎨'
  },
  {
    id: 'asana',
    name: 'Asana',
    category: 'Other',
    description: 'Project management',
    logo: '✅'
  }
];

const categories = ['All Integrations', 'Social', 'Analytics', 'Automation', 'Marketing', 'Development', 'Forms', 'Other'];

interface InstalledAppCardProps {
  app: App;
  onDelete: (appId: string) => void;
}

const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ app, onDelete }) => {
  return (
    <div className="bg-card border border-border rounded-lg p-6 hover:border-border/60 transition-all hover:shadow-sm group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
          {app.logo}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{app.name}</h3>
          <p className="text-xs text-muted-foreground">{app.description}</p>
        </div>
        <div className="w-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button
            variant="outline"
            size="sm"
            className="w-full"
            onClick={() => console.log(`App settings for ${app.name}`)}
          >
            <Settings className="h-3 w-3 mr-1" />
            App settings
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-full text-destructive hover:text-destructive"
            onClick={() => onDelete(app.id)}
          >
            <Trash2 className="h-3 w-3 mr-1" />
            Delete App
          </Button>
        </div>
      </div>
    </div>
  );
};

export const Apps = () => {
  const [selectedTab, setSelectedTab] = useState('store');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [installedApps, setInstalledApps] = useState<App[]>([
    {
      id: 'google-analytics',
      name: 'Google Analytics',
      category: 'Analytics',
      description: 'Track and analyze your website traffic',
      logo: '📈',
      installed: true
    },
    {
      id: 'zapier',
      name: 'Zapier',
      category: 'Automation',
      description: 'Automate workflows with 6000+ apps',
      logo: '🧡',
      installed: true
    }
  ]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Integrations');
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
    
  useEffect(() => {
    setHeaderMeta({
      title: 'Apps',
      description: 'Connect all your favourite apps, plugins and tools'
    });
  }, [setHeaderMeta]);

  const handleInstallApp = (app: App) => {
    setInstalledApps(prev => [...prev, { ...app, installed: true }]);
  };

  const handleDeleteApp = (appId: string) => {
    setInstalledApps(prev => prev.filter(app => app.id !== appId));
  };

  const handleAppSettings = (appId: string) => {
    console.log('Opening settings for app:', appId);
    setShowMoreOptions(null);
  };

  const filteredStoreApps = availableApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Integrations' || app.category === selectedCategory;
    const notInstalled = !installedApps.some(installed => installed.id === app.id);
    return matchesSearch && matchesCategory && notInstalled;
  });

  const tabs = [
    { id: 'store', label: 'Store' },
    { id: 'installed', label: 'Installed' }
  ];

  return (
    <div className="px-8 pt-0 pb-6 space-y-4 w-full max-w-full">
      {/* Tab Navigation */}
      <div className="">
        <div className="">
          <div className="flex items-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setSelectedTab(tab.id)}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  selectedTab === tab.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="">
        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search integrations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div className="flex gap-8">
          {/* Sidebar Filters */}
          <div className="w-64 flex-shrink-0 space-y-6">
            {/* Filter By Category */}
            <div>
              <div className="space-y-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`block w-full text-left text-sm py-1 px-3 rounded-md transition-all ${
                      selectedCategory === category
                        ? 'text-foreground font-medium bg-blue-50 text-blue-700 shadow-sm border-blue-200'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Apps Grid */}
          <div className="flex-1">
            {selectedTab === 'store' ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStoreApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-card rounded-lg border border-border hover:shadow-md transition-all p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center border border-border">
                        <span className="text-xl">{app.logo}</span>
                      </div>
                      <Button
                        onClick={() => handleInstallApp(app)}
                        size="sm"
                        className="flex items-center px-3 py-1.5 text-xs"
                      >
                        <Plus className="h-3 w-3 mr-1" />
                        Add
                      </Button>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <h4 className="font-medium text-sm">{app.name}</h4>
                        <span className="px-2 py-0.5 bg-muted text-muted-foreground rounded-full text-xs font-medium">
                          {app.category}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {app.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {installedApps.length === 0 ? (
                  <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No apps installed</h3>
                    <p className="text-muted-foreground">
                      Browse the Store tab to install your first app.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {installedApps.map((app) => (
                      <InstalledAppCard
                        key={app.id}
                        app={app}
                        onDelete={handleDeleteApp}
                      />
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
