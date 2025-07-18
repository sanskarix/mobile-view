import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, Settings, Clock, Shield, Zap, RotateCcw, Smartphone, Workflow, Webhook } from 'lucide-react';
import { Switch } from '../components/ui/switch';
import { EventSetup } from '../components/EventSetup';
import { EventAvailability } from '../components/EventAvailability';
import { EventLimits } from '../components/EventLimits';
import { EventAdvanced } from '../components/EventAdvanced';
import { EventApps } from '../components/EventApps';
import { EventWorkflows } from '../components/EventWorkflows';
import { EventWebhooks } from '../components/EventWebhooks';
import { RecurringEvent } from '../components/RecurringEvent';
import { EventEmbed } from '../components/EventEmbed';
const tabs = [{
  id: 'setup',
  name: 'Event Setup',
  icon: Settings
}, {
  id: 'availability',
  name: 'Availability',
  icon: Clock
}, {
  id: 'limits',
  name: 'Limits',
  icon: Shield
}, {
  id: 'advanced',
  name: 'Advanced',
  icon: Zap
}, {
  id: 'recurring',
  name: 'Recurring',
  icon: RotateCcw
}, {
  id: 'apps',
  name: 'Apps',
  icon: Smartphone
}, {
  id: 'workflows',
  name: 'Workflows',
  icon: Workflow
}, {
  id: 'webhooks',
  name: 'Webhooks',
  icon: Webhook
}, {
  id: 'embed',
  name: 'Embed',
  icon: Settings
}];
export const EditEvent = () => {
  const {
    eventId,
    tab
  } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'setup');
  const [eventEnabled, setEventEnabled] = useState(true);
  const navigate = useNavigate();

  // Mock event data - in real app this would come from an API
  const eventTitle = 'Sample Event Type';
  const handleBack = () => {
    navigate('/event-types');
  };
  const handleSave = () => {
    // Handle save functionality
    console.log('Save clicked');
  };
  const renderTabContent = () => {
    switch (activeTab) {
      case 'setup':
        return <EventSetup />;
      case 'availability':
        return <EventAvailability />;
      case 'limits':
        return <EventLimits />;
      case 'advanced':
        return <EventAdvanced />;
      case 'recurring':
        return <RecurringEvent />;
      case 'apps':
        return <EventApps />;
      case 'workflows':
        return <EventWorkflows />;
      case 'webhooks':
        return <EventWebhooks />;
      case 'embed':
        return <EventEmbed />;
      default:
        return <EventSetup />;
    }
  };
  return <div className="min-h-screen bg-background">
      {/* Consolidated Header */}
      <header className="h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="h-full px-8 flex items-center justify-between w-full max-w-none">
          <div className="flex items-center space-x-4 mx-0">
            <button onClick={handleBack} className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors" title="Back to Event Types">
              <ArrowLeft className="h-4 w-4 mr-2" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">{eventTitle}</h1>
          </div>

          {/* Right-aligned content: Toggle | Save | Profile */}
          <div className="flex items-center space-x-4 ml-auto">
            <div className="flex items-center space-x-2">
              <Switch checked={eventEnabled} onCheckedChange={setEventEnabled} />
              <span className="text-sm text-muted-foreground">
                {eventEnabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
            
            <div className="w-px h-6 bg-border"></div>
            
            <button onClick={handleSave} className="px-4 py-2 bg-primary text-primary-foreground rounded-lg text-sm font-medium hover:bg-primary/90 transition-colors">
              Save
            </button>
            
            <div className="w-px h-6 bg-border"></div>

            {/* Profile */}
            <div className="flex items-center space-x-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors">
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">SY</span>
              </div>
              <span className="text-sm font-medium text-foreground">Sanskar Yadav</span>
            </div>
          </div>
        </div>
      </header>

      {/* Left-aligned Horizontal Tabs with Underlines */}
      <div className="bg-background">
        <div className="ml-20">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map(tabItem => <button key={tabItem.id} onClick={() => setActiveTab(tabItem.id)} className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2 ${activeTab === tabItem.id ? 'border-primary text-primary' : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'}`} title={tabItem.name}>
                <tabItem.icon className="h-4 w-4" />
                <span>{tabItem.name}</span>
              </button>)}
          </nav>
        </div>
      </div>

      {/* Content with proper alignment */}
      <div className="bg-background py-[13px] mx-[3px] px-[79px] my-[16px]">
        <div className="p-0 max-w-none mx-auto space-y-6">
          {renderTabContent()}
        </div>
      </div>
    </div>;
};