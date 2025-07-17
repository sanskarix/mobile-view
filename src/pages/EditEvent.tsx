
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
  {
    id: 'setup',
    name: 'Event Setup',
    icon: Settings
  },
  {
    id: 'availability',
    name: 'Availability',
    icon: Clock
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
    id: 'recurring',
    name: 'Recurring',
    icon: RotateCcw
  },
  {
    id: 'apps',
    name: 'Apps',
    icon: Smartphone
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
        <div className="h-full px-8 flex items-center justify-between w-full max-w-none">
          <div className="flex items-center space-x-4 mx-0">
            <button 
              onClick={handleBack} 
              className="flex items-center text-sm text-muted-foreground hover:text-foreground transition-colors" 
              title="Back to Event Types"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
            </button>
            <h1 className="text-xl font-semibold text-foreground">{eventTitle}</h1>
            
            <div className="flex items-center space-x-2">
              <Switch checked={eventEnabled} onCheckedChange={setEventEnabled} />
            </div>
          </div>
        </div>
      </header>

      {/* Centered Horizontal Tabs */}
      <div className="bg-background">
        <div className="px-8 flex justify-center">
          <nav className="flex space-x-8" aria-label="Tabs">
            {tabs.map(tabItem => (
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

      {/* Centered Content with consistent width and applied styles */}
      <div 
        className="bg-background flex justify-center"
        style={{
          WebkitTextSizeAdjust: '100%',
          tabSize: 4,
          fontFeatureSettings: 'normal',
          fontVariationSettings: 'normal',
          WebkitTapHighlightColor: 'transparent',
          '--background': '0 0% 100%',
          '--foreground': '222.2 84% 4.9%',
          '--card': '0 0% 100%',
          '--card-foreground': '222.2 84% 4.9%',
          '--popover': '0 0% 100%',
          '--popover-foreground': '222.2 84% 4.9%',
          '--primary': '207 100% 45%',
          '--primary-foreground': '210 40% 98%',
          '--secondary': '210 40% 96%',
          '--secondary-foreground': '222.2 84% 4.9%',
          '--muted': '210 40% 96%',
          '--muted-foreground': '215.4 16.3% 46.9%',
          '--accent': '210 40% 96%',
          '--accent-foreground': '222.2 84% 4.9%',
          '--destructive': '0 84.2% 60.2%',
          '--destructive-foreground': '210 40% 98%',
          '--border': '214.3 31.8% 91.4%',
          '--input': '214.3 31.8% 91.4%',
          '--ring': '207 100% 45%',
          '--radius': '.5rem',
          '--chart-1': '12 76% 61%',
          '--chart-2': '173 58% 39%',
          '--chart-3': '197 37% 24%',
          '--chart-4': '43 74% 66%',
          '--chart-5': '27 87% 67%',
          lineHeight: 'inherit',
          fontFamily: 'Inter,sans-serif',
          color: 'hsl(var(--foreground))',
          '--tw-border-spacing-x': '0',
          '--tw-border-spacing-y': '0',
          '--tw-translate-x': '0',
          '--tw-translate-y': '0',
          '--tw-rotate': '0',
          '--tw-skew-x': '0',
          '--tw-skew-y': '0',
          '--tw-scale-x': '1',
          '--tw-scale-y': '1',
          '--tw-pan-x': '',
          '--tw-pan-y': '',
          '--tw-pinch-zoom': '',
          '--tw-scroll-snap-strictness': 'proximity',
          '--tw-gradient-from-position': '',
          '--tw-gradient-via-position': '',
          '--tw-gradient-to-position': '',
          '--tw-ordinal': '',
          '--tw-slashed-zero': '',
          '--tw-numeric-figure': '',
          '--tw-numeric-spacing': '',
          '--tw-numeric-fraction': '',
          '--tw-ring-inset': '',
          '--tw-ring-offset-width': '0px',
          '--tw-ring-offset-color': '#fff',
          '--tw-ring-color': 'rgb(59 130 246 / .5)',
          '--tw-ring-offset-shadow': '0 0 #0000',
          '--tw-ring-shadow': '0 0 #0000',
          '--tw-shadow': '0 0 #0000',
          '--tw-shadow-colored': '0 0 #0000',
          '--tw-blur': '',
          '--tw-brightness': '',
          '--tw-contrast': '',
          '--tw-grayscale': '',
          '--tw-hue-rotate': '',
          '--tw-invert': '',
          '--tw-saturate': '',
          '--tw-sepia': '',
          '--tw-drop-shadow': '',
          '--tw-backdrop-blur': '',
          '--tw-backdrop-brightness': '',
          '--tw-backdrop-contrast': '',
          '--tw-backdrop-grayscale': '',
          '--tw-backdrop-hue-rotate': '',
          '--tw-backdrop-invert': '',
          '--tw-backdrop-opacity': '',
          '--tw-backdrop-saturate': '',
          '--tw-backdrop-sepia': '',
          '--tw-contain-size': '',
          '--tw-contain-layout': '',
          '--tw-contain-paint': '',
          '--tw-contain-style': '',
          boxSizing: 'border-box',
          borderWidth: '0',
          borderStyle: 'solid',
          borderColor: 'hsl(var(--border))',
          display: 'flex',
          paddingLeft: '0',
          paddingRight: '0'
        }}
      >
        <div className="w-full" style={{ maxWidth: '982.63px' }}>
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
};
