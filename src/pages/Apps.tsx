import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, Settings, Trash2, Search, ChevronDown } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeaderMeta } from '@/components/Layout';
import { Search, Zap, Settings, Trash2, Package } from 'lucide-react';

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
    description: 'Form builder',
    icon: '📝',
    category: 'productivity',
    installed: false
  },
  {
    id: 'linear',
    name: 'Linear',
    description: 'Issue tracking',
    icon: '🎯',
    category: 'productivity',
    installed: true
  },
  {
    id: 'figma',
    name: 'Figma',
    description: 'Design collaboration',
    icon: '🎨',
    category: 'productivity',
    installed: true
  },
  {
    id: 'github',
    name: 'GitHub',
    description: 'Code repository',
    icon: '🐙',
    category: 'productivity',
    installed: false
  },
  {
    id: 'asana',
    name: 'Asana',
    description: 'Project management',
    icon: '✅',
    category: 'productivity',
    installed: false
  }
];

const categories = ['All Integrations', 'Social', 'Analytics', 'Automation', 'Marketing', 'Development', 'Forms', 'Other'];

interface InstalledAppCardProps {
  app: App;
  onDelete: (appId: string) => void;
}

const InstalledAppCard: React.FC<InstalledAppCardProps> = ({ app, onDelete }) => {
  const [showOptions, setShowOptions] = useState(false);

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
  const [selectedTab, setSelectedTab] = useState('all');
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
  const [selectedTab, setSelectedTab] = useState('store');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [sortBy, setSortBy] = useState('featured');
  const [appList, setAppList] = useState<App[]>(apps);
  const [installedApps, setInstalledApps] = useState<App[]>(
    apps.filter(app => app.installed)
  );
    
  useEffect(() => {
    setHeaderMeta({
      title: 'Apps',
      description: 'Connect all your favourite apps, plugins and tools'
    });
  }, [setHeaderMeta]);

  const handleToggleInstall = (appId: string) => {
    setAppList(prev => prev.map(app => {
      if (app.id === appId) {
        const updatedApp = { ...app, installed: !app.installed };
        // Update installed apps list
        if (updatedApp.installed) {
          setInstalledApps(prevInstalled => {
            const exists = prevInstalled.find(installedApp => installedApp.id === appId);
            return exists ? prevInstalled : [...prevInstalled, updatedApp];
          });
        } else {
          setInstalledApps(prevInstalled => prevInstalled.filter(installedApp => installedApp.id !== appId));
        }
        return updatedApp;
      }
      return app;
    }));
  };

  const handleDeleteApp = (appId: string) => {
    setAppList(prev => prev.map(app =>
      app.id === appId ? { ...app, installed: false } : app
    ));
    setInstalledApps(prev => prev.filter(app => app.id !== appId));
  };

  const getFilteredApps = () => {
    const sourceApps = selectedTab === 'store' ? appList : installedApps;
    return sourceApps.filter(app => {
      const matchesSearch = app.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           app.description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || app.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  };

  const filteredApps = getFilteredApps();


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

  // Get available categories for installed apps
  const getAvailableCategories = () => {
    if (selectedTab === 'store') {
      return appCategories;
    }

    const installedCategories = [...new Set(installedApps.map(app => app.category))];
    const availableCategories = appCategories.filter(category =>
      category.id === 'all' || installedCategories.includes(category.id)
    );
    return availableCategories;
  };

  const availableCategories = getAvailableCategories();

  const tabs = [
    { id: 'all', label: 'All' },
    { id: 'installed', label: 'Installed' }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Tab Navigation */}
      <div className="">
        <div className="px-8">
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

        {selectedTab === 'all' && (
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
        {selectedTab === 'all' && (
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

            {/* Filter By Category */}
            <div>
              <div className="space-y-2">
                {availableCategories.map((category) => (
                  <button
                    key={category.id}
                    onClick={() => setSelectedCategory(category.id)}
                    className={`block w-full text-left text-sm py-1 px-3 rounded-md transition-all ${
                      selectedCategory === category.id
                      ? 'block w-full text-left text-sm py-1 px-3 rounded-md transition-all text-foreground font-medium bg-blue-50 text-blue-700 shadow-sm border-blue-200'
                        : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
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

          {/* Apps Grid */}
          <div className="flex-1">
            {selectedTab === 'installed' && installedApps.length === 0 ? (
              <div className="text-center py-12">
                <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">No apps installed</h3>
                <p className="text-muted-foreground">
                  Browse the Store tab to install your first app.
                </p>
              </div>
            ) : sortedApps.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {sortedApps.map((app) => (
                  selectedTab === 'store' ? (
                    <AppCard
                      key={app.id}
                      app={app}
                      onToggleInstall={handleToggleInstall}
                    />
                  ) : (
                    <InstalledAppCard
                      key={app.id}
                      app={app}
                      onDelete={handleDeleteApp}
                    />
                  )
                ))}
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
                  onClick={() => setSelectedTab('all')}
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
