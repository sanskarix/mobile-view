import React, { useState, useEffect } from 'react';
import { useParams, useOutletContext } from 'react-router-dom';
import { Shield, Zap, Workflow, Webhook, Bolt, Clock2, Code, RefreshCcw, Blocks } from 'lucide-react';
import { EventSetup } from '../components/EventSetup';
import { EventAvailability } from '../components/EventAvailability';
import { EventLimits } from '../components/EventLimits';
import { EventAdvanced } from '../components/EventAdvanced';
import { EventApps } from '../components/EventApps';
import { EventWorkflows } from '../components/EventWorkflows';
import { EventWebhooks } from '../components/EventWebhooks';
import { RecurringEvent } from '../components/RecurringEvent';
import { EventEmbed } from '../components/EventEmbed';
import type { HeaderMeta } from '../components/Layout';

const tabs = [
  {
    id: 'setup',
    name: 'Setup',
    icon: Bolt
  },
  {
    id: 'availability',
    name: 'Availability',
    icon: Clock2
  },
  {
    id: 'limits',
    name: 'Limits',
    icon: Shield
  },
  {
    id: 'advanced',
    name: 'Advanced',
    icon: Zap
  },
  {
    id: 'embed',
    name: 'Embed',
    icon: Code
  },
  {
    id: 'recurring',
    name: 'Recurring',
    icon: RefreshCcw
  },
  {
    id: 'apps',
    name: 'Apps',
    icon: Blocks
  },
  {
    id: 'workflows',
    name: 'Workflows',
    icon: Workflow
  },
  {
    id: 'webhooks',
    name: 'Webhooks',
    icon: Webhook
  }
];

export const EditEvent = () => {
  const { eventId, tab } = useParams();
  const [activeTab, setActiveTab] = useState(tab || 'setup');
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();

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

  useEffect(() => {
    setHeaderMeta({
      title: 'Edit Event',
      description: 'Configure event details, availability and integrations.',
      enabled: true,
      onEnabledChange: (enabled: boolean) => {
        setHeaderMeta({
          title: 'Edit Event',
          description: 'Configure event details, availability and integrations.',
          enabled,
          onEnabledChange: (newEnabled: boolean) => {
            setHeaderMeta({
              title: 'Edit Event',
              description: 'Configure event details, availability and integrations.',
              enabled: newEnabled,
              onEnabledChange: () => {}
            });
          }
        });
      }
    });
  }, [setHeaderMeta]);

  return (
    <div className="min-h-screen bg-background">
      {/* Horizontal Scrollable Tabs */}
      <div className="bg-background border-b border-border">
        <div className="px-4">
          <nav className="flex overflow-x-auto scrollbar-hide" aria-label="Tabs">
            {tabs.map((tabItem) => (
              <button
                key={tabItem.id}
                onClick={() => setActiveTab(tabItem.id)}
                className={`py-3 px-3 border-b-2 font-medium text-sm whitespace-nowrap transition-colors flex items-center space-x-2 min-w-fit ${
                  activeTab === tabItem.id 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-muted-foreground'
                }`}
                title={tabItem.name}
              >
                <tabItem.icon className="h-4 w-4" />
                <span className="hidden sm:inline">{tabItem.name}</span>
              </button>
            ))}
          </nav>
        </div>
      </div>

      {/* Content */}
      <div className="bg-background">
        <div className="p-4 max-w-full overflow-hidden">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
