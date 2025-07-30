import React, { useEffect, useState } from 'react';
import { Plus, MoreHorizontal, Settings, Trash2, Search, Package } from 'lucide-react';
import { useOutletContext } from 'react-router-dom';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { HeaderMeta } from '@/components/Layout';
import { AppDetails } from '@/components/AppDetails';
interface App {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  installed?: boolean;
  installId?: string;
}
const availableApps: App[] = [{
  id: 'zapier',
  name: 'Zapier',
  category: 'Automation',
  description: 'Automate workflows with 6000+ apps',
  logo: '🧡'
}, {
  id: 'plausible',
  name: 'Plausible',
  category: 'Analytics',
  description: 'Privacy-focused website analytics',
  logo: '📊'
}, {
  id: 'google-analytics',
  name: 'Google Analytics',
  category: 'Analytics',
  description: 'Track and analyze your website traffic',
  logo: '📈'
}, {
  id: 'custom',
  name: 'Custom',
  category: 'Other',
  description: 'Build custom integrations with webhooks',
  logo: '⚙️'
}, {
  id: 'netlify',
  name: 'Netlify',
  category: 'Automation',
  description: 'Deploy and manage your web projects',
  logo: '🌐'
}, {
  id: 'youtube',
  name: 'YouTube',
  category: 'Social',
  description: 'Integrate YouTube content and analytics',
  logo: '📺'
}, {
  id: 'twitter',
  name: 'Twitter / X',
  category: 'Social',
  description: 'Connect your Twitter account for social management',
  logo: '🐦'
}, {
  id: 'github',
  name: 'GitHub',
  category: 'Development',
  description: 'Connect your GitHub repositories',
  logo: '🐙'
}, {
  id: 'senjo',
  name: 'Senjo',
  category: 'Marketing',
  description: 'Email marketing and automation platform',
  logo: '💜'
}, {
  id: 'tally',
  name: 'Tally',
  category: 'Forms',
  description: 'Create beautiful forms and surveys',
  logo: '⭐'
}, {
  id: 'typeform',
  name: 'Typeform',
  category: 'Forms',
  description: 'Form builder',
  logo: '📝'
}, {
  id: 'linear',
  name: 'Linear',
  category: 'Development',
  description: 'Issue tracking',
  logo: '🎯'
}, {
  id: 'figma',
  name: 'Figma',
  category: 'Development',
  description: 'Design collaboration',
  logo: '🎨'
}, {
  id: 'asana',
  name: 'Asana',
  category: 'Other',
  description: 'Project management',
  logo: '✅'
}];
const categories = ['All Integrations', 'Social', 'Analytics', 'Automation', 'Marketing', 'Development', 'Forms', 'Other'];
interface InstalledAppCardProps {
  app: App;
  onDelete: (appId: string) => void;
}
const InstalledAppCard: React.FC<InstalledAppCardProps> = ({
  app,
  onDelete
}) => {
  return <div className="bg-card border border-border rounded-lg p-6 hover:border-border/60 transition-all hover:shadow-sm group">
      <div className="flex flex-col items-center text-center space-y-4">
        <div className="w-12 h-12 rounded-lg bg-muted/50 flex items-center justify-center text-2xl">
          {app.logo}
        </div>
        <div className="space-y-2">
          <h3 className="font-semibold text-sm">{app.name}</h3>
          <p className="text-xs text-muted-foreground">{app.description}</p>
        </div>
        <div className="w-full space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
          <Button variant="outline" size="sm" className="w-full" onClick={() => console.log(`App settings for ${app.name}`)}>
            <Settings className="h-3 w-3 mr-1" />
            App settings
          </Button>
          <Button variant="outline" size="sm" className="w-full text-destructive hover:text-destructive" onClick={() => onDelete(app.id)}>
            <Trash2 className="h-3 w-3 mr-1" />
            Delete App
          </Button>
        </div>
      </div>
    </div>;
};
export const Apps = () => {
  const [selectedTab, setSelectedTab] = useState('store');
  const [showMoreOptions, setShowMoreOptions] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Integrations');
  const [installedApps, setInstalledApps] = useState<App[]>([]);
  const [selectedApp, setSelectedApp] = useState<App | null>(null);
  const {
    setHeaderMeta
  } = useOutletContext<{
    setHeaderMeta: (meta: HeaderMeta) => void;
  }>();
  useEffect(() => {
    setHeaderMeta({
      title: 'Apps',
      description: 'Connect all your favourite apps, plugins and tools'
    });
  }, [setHeaderMeta]);
  const handleInstallApp = (app: App) => {
    // Add a new install with unique timestamp to allow multiple installs
    const newInstall = {
      ...app,
      installed: true,
      installId: Date.now().toString() + Math.random().toString(36).substr(2, 9)
    };
    setInstalledApps(prev => [...prev, newInstall]);
  };
  const getInstalledCount = (appId: string) => {
    return installedApps.filter(installed => installed.id === appId).length;
  };
  const handleDeleteApp = (appId: string) => {
    setInstalledApps(prev => prev.filter(app => app.id !== appId));
  };
  const handleAppSettings = (appId: string) => {
    console.log('Opening settings for app:', appId);
    setShowMoreOptions(null);
  };
  const filteredStoreApps = availableApps.filter(app => {
    const matchesSearch = app.name.toLowerCase().includes(searchQuery.toLowerCase()) || app.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All Integrations' || app.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });
  const tabs = [{
    id: 'store',
    label: 'Store'
  }, {
    id: 'installed',
    label: 'Installed'
  }];
  const mainContent = <div className="px-8 pt-0 pb-6 space-y-4 w-full max-w-full">
      {/* Tab Navigation */}
      <div className="">
        <div className="">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              {tabs.map(tab => <button key={tab.id} onClick={() => setSelectedTab(tab.id)} className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${selectedTab === tab.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`}>
                  {tab.label}
                </button>)}
            </div>
          </div>
        </div>
      </div>

      {/* Horizontal Filters Section */}
      <div className="">
        <div className="flex items-center justify-between gap-4">
          {/* Search Bar */}
          <div className="relative w-80 flex-shrink-0">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input 
              type="text" 
              placeholder="Search integrations..." 
              value={searchQuery} 
              onChange={e => setSearchQuery(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 border border-border rounded-lg bg-background text-sm" 
            />
          </div>
          
          {/* Horizontal Category Filters */}
          <div className="w-1/2 overflow-x-auto">
            <div className="flex gap-2 pb-2">
              {categories.map(category => (
                <button 
                  key={category} 
                  onClick={() => setSelectedCategory(category)} 
                  className={`flex-shrink-0 px-4 py-2 text-sm rounded-full border transition-all ${
                    selectedCategory === category 
                      ? 'bg-primary text-primary-foreground border-primary' 
                      : 'bg-background text-muted-foreground border-border hover:text-foreground hover:border-muted-foreground'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="">
        {/* Apps Grid */}
        <div className="w-full">
            {selectedTab === 'store' ? <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
                {filteredStoreApps.map(app => {
              const isInstalled = installedApps.some(installed => installed.id === app.id);
              return <div key={app.id} className="h-64 w-full bg-card rounded-lg border border-border hover:shadow-md transition-all p-4 aspect-square flex flex-col relative">
                      {/* Status Tags */}
                      <div className="absolute top-3 right-3 flex gap-1">
                        {isInstalled && <span className="px-2 py-1 bg-green-100 text-green-700 text-xs font-medium rounded">
                            Installed
                          </span>}
                        <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs font-medium rounded">
                          default
                        </span>
                      </div>

                      {/* Left-aligned content */}
                      <div className="flex-1 flex flex-col justify-start text-left space-y-3">
                        <div className="w-12 h-12">
                          <span className="text-5xl">{app.logo}</span>
                        </div>
                        <div className="space-y-2">
                          <h4 className="font-semibold text-sm">{app.name}</h4>
                          <p className="text-muted-foreground line-clamp-3 text-xs">
                            {app.description}
                          </p>
                        </div>
                      </div>

                      {/* Side by side buttons */}
                      <div className="flex gap-2 mt-4">
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => setSelectedApp(app)}>
                          Details
                        </Button>
                        <Button variant="outline" size="sm" className="flex-1" onClick={() => handleInstallApp(app)}>
                          Install
                        </Button>
                      </div>
                    </div>;
            })}
              </div> : <div className="space-y-4">
                {installedApps.length === 0 ? <div className="text-center py-12">
                    <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No apps installed</h3>
                    <p className="text-muted-foreground">
                      Browse the All tab to install your first app.
                    </p>
                  </div> : <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {installedApps.map(app => <InstalledAppCard key={app.id} app={app} onDelete={handleDeleteApp} />)}
                  </div>}
              </div>}
        </div>
      </div>
    </div>;

  // Show AppDetails if an app is selected
  if (selectedApp) {
    return <AppDetails app={selectedApp} isInstalled={installedApps.some(installed => installed.id === selectedApp.id)} installedCount={getInstalledCount(selectedApp.id)} onBack={() => setSelectedApp(null)} onInstall={() => handleInstallApp(selectedApp)} />;
  }
  return mainContent;
};