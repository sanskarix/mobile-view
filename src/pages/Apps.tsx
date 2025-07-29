import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, Settings, Trash2, Search, ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '../components/ui/dropdown-menu';
import type { HeaderMeta } from '../components/Layout';

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
    id: 'chartmogul',
    name: 'ChartMogul',
    category: 'Analytics',
    description: 'Subscription analytics and metrics',
    logo: '📊'
  }
];

const categories = ['All Integrations', 'Social', 'Analytics', 'Automation', 'Marketing', 'Development', 'Forms', 'Other'];

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
    const newApp = { ...app, installed: true };
    setInstalledApps(prev => [...prev, newApp]);
  };

  const handleDeleteApp = (appId: string) => {
    setInstalledApps(prev => prev.filter(app => app.id !== appId));
    setShowMoreOptions(null);
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
    <div className="px-8 pt-3 pb-6 space-y-6 w-full max-w-full">
      <div className="flex items-center justify-between mb-6">
        {/* Custom Tabs */}
        <div className="flex">
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

        {selectedTab === 'installed' && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="inline-flex items-center px-4 py-2 text-sm font-medium rounded-lg transition-colors">
                Categories
                <ChevronDown className="h-4 w-4 ml-2" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              {categories.map((category) => (
                <DropdownMenuItem
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={selectedCategory === category ? 'bg-muted' : ''}
                >
                  {category}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {selectedTab === 'store' && (
          <div className="space-y-6">
            {/* Header Section */}
            <div className="text-center py-8">
              {/* Search */}
              <div className="relative max-w-md mx-auto">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  type="text"
                  placeholder="Search integrations..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 w-full"
                />
              </div>
            </div>

            {/* Filter Info */}
            {selectedCategory !== 'All Integrations' && (
              <div className="text-sm text-muted-foreground">
                Showing {selectedCategory} apps
              </div>
            )}

            {/* Apps Grid */}
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

            {filteredStoreApps.length === 0 && (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search className="h-6 w-6 text-muted-foreground" />
                </div>
                <h3 className="font-medium mb-2">No apps found</h3>
                <p className="text-muted-foreground text-sm">
                  Try adjusting your search or category filter
                </p>
              </div>
            )}
          </div>
        )}

        {selectedTab === 'installed' && (
          <div className="space-y-4">
            {installedApps.length === 0 ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-muted-foreground text-2xl">📱</span>
                </div>
                <h3 className="font-medium mb-2">No apps installed</h3>
                <p className="text-muted-foreground text-sm max-w-md mx-auto">
                  Browse the store to find and install apps that enhance your workflow
                </p>
                <Button
                  onClick={() => setSelectedTab('store')}
                  className="mt-4"
                >
                  Browse Store
                </Button>
              </div>
            ) : (
              <div className="grid gap-4">
                {installedApps.map((app) => (
                  <div
                    key={app.id}
                    className="bg-card rounded-lg border border-border hover:shadow-md transition-all cursor-pointer group"
                  >
                    <div className="p-6">
                      <div className="flex items-start justify-between">
                        <div className="flex items-start space-x-4 flex-1 min-w-0">
                          <div className="w-12 h-12 bg-muted/50 rounded-lg flex items-center justify-center border border-border flex-shrink-0">
                            <span className="text-xl">{app.logo}</span>
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="font-semibold text-foreground text-lg mb-1">
                              {app.name}
                            </h3>
                            <p className="text-muted-foreground text-sm">
                              {app.description}
                            </p>
                          </div>
                        </div>
                        
                        <div className="flex items-center space-x-2 ml-4" onClick={(e) => e.stopPropagation()}>
                          <div className="relative">
                            <button
                              onClick={() => setShowMoreOptions(showMoreOptions === app.id ? null : app.id)}
                              className="p-2 hover:bg-muted rounded-md transition-colors"
                            >
                              <MoreHorizontal className="h-4 w-4" />
                            </button>
                            
                            {showMoreOptions === app.id && (
                              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                                <div className="py-1">
                                  <button
                                    onClick={() => handleAppSettings(app.id)}
                                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                                  >
                                    <Settings className="h-4 w-4 mr-2 text-muted-foreground" />
                                    App settings
                                  </button>
                                  <button
                                    onClick={() => handleDeleteApp(app.id)}
                                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive"
                                  >
                                    <Trash2 className="h-4 w-4 mr-2" />
                                    Delete App
                                  </button>
                                </div>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};