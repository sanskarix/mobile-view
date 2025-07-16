
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

const tabs = [
  { id: 'setup', name: 'Event Setup', icon: Settings },
  { id: 'availability', name: 'Availability', icon: Clock },
  { id: 'limits', name: 'Limits', icon: Shield },
  { id: 'advanced', name: 'Advanced', icon: Zap },
  { id: 'recurring', name: 'Recurring', icon: RotateCcw },
  { id: 'apps', name: 'Apps', icon: Smartphone },
  { id: 'workflows', name: 'Workflows', icon: Workflow },
  { id: 'webhooks', name: 'Webhooks', icon: Webhook },
];

export const EditEvent = () => {
  const { eventId, tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'setup');
  const [eventEnabled, setEventEnabled] = useState(true);
  const navigate = useNavigate();

  // Mock event data - in real app this would come from an API
  const eventTitle = 'Sample Event Type';

  const handleBack = () => {
    navigate('/event-types');
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
      default:
        return <EventSetup />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
        <div className="h-full px-8 flex items-center justify-between w-full">
          <div className="flex items-center space-x-4">
            <button 
              onClick={handleBack} 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors"
              title="Back to Event Types"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Event Types
            </button>
            <div className="w-px h-5 bg-border"></div>
            <h1 className="text-xl font-semibold text-foreground">{eventTitle}</h1>
          </div>
          
          <div className="flex items-center space-x-2">
            <Switch checked={eventEnabled} onCheckedChange={setEventEnabled} />
            <span className="text-sm text-muted-foreground">
              {eventEnabled ? 'Enabled' : 'Disabled'}
            </span>
          </div>
        </div>
      </header>

      {/* Horizontal Tabs */}
      <div className="bg-background border-b border-border">
        <div className="px-8">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`py-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2 ${
                  activeTab === tabItem.id
                    ? 'border-primary text-primary'
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
                title={tabItem.name}
              >
                <tabItem.icon className="h-4 w-4" />
                <span>{tabItem.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <div className="bg-background">
        {renderTabContent()}
      </div>
    </div>
  );
};
