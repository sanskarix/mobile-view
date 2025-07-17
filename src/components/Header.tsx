
import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Settings, ExternalLink, MessageSquare, FileIcon, Mail } from 'lucide-react';
import { Switch } from './ui/switch';
import { useLocation } from 'react-router-dom';

interface HeaderProps {
  showEventTypesHeader?: boolean;
  eventData?: {
    title: string;
    url: string;
    enabled: boolean;
    onEnabledChange: (enabled: boolean) => void;
  };
}

export const Header = ({
  showEventTypesHeader = false,
  eventData
}: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowProfileDropdown(false);
        setShowHelpDropdown(false);
      }
    };

    if (showProfileDropdown || showHelpDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showProfileDropdown, showHelpDropdown]);

  const isHomePage = location.pathname === '/';
  const isEventTypesPage = location.pathname === '/event-types';
  const isBookingsPage = location.pathname === '/bookings';
  const isAvailabilityPage = location.pathname === '/availability';
  const isTeamsPage = location.pathname === '/teams';

  const renderPageContent = () => {
    if (isHomePage) return (
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground mb-1">Dashboard</h1>
        <p className="text-sm text-muted-foreground">Welcome to your scheduling dashboard overview.</p>
      </div>
    );
    
    if (showEventTypesHeader && !eventData) return (
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground mb-1">Event Types</h1>
        <p className="text-sm text-muted-foreground">Manage your event types and booking configurations.</p>
      </div>
    );
    
    if (isBookingsPage) return (
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground mb-1">Bookings</h1>
        <p className="text-sm text-muted-foreground">View and manage all your scheduled appointments.</p>
      </div>
    );
    
    if (isAvailabilityPage) return (
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground mb-1">Availability</h1>
        <p className="text-sm text-muted-foreground">Set your available hours and time preferences.</p>
      </div>
    );
    
    if (isTeamsPage) return (
      <div className="flex-1">
        <h1 className="text-xl font-semibold text-foreground mb-1">Teams</h1>
        <p className="text-sm text-muted-foreground">Collaborate with team members on shared calendars.</p>
      </div>
    );
    
    return null;
  };

  const handleHelpClick = (action: string) => {
    setShowHelpDropdown(false);
    setShowProfileDropdown(false);
    switch (action) {
      case 'discord':
        window.open('https://discord.gg/cal', '_blank');
        break;
      case 'docs':
        window.open('https://docs.cal.com', '_blank');
        break;
      case 'contact':
        window.location.href = 'mailto:support@cal.id';
        break;
    }
  };

  const handleHelpAndSupportClick = () => {
    setShowProfileDropdown(false);
    setShowHelpDropdown(true);
  };

  return (
    <header className="h-20 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-50">
      <div className="h-full px-8 flex items-center justify-between w-full">
        {renderPageContent()}
        
        {eventData && (
          <div className="flex-1">
            <div className="flex items-center space-x-3 mb-1">
              <h1 className="text-xl font-semibold text-foreground">
                {eventData.title}
              </h1>
            </div>
          </div>
        )}
        
        <div className="flex items-center space-x-4 ml-auto">
          {eventData && (
            <div className="flex items-center space-x-2">
              <Switch checked={eventData.enabled} onCheckedChange={eventData.onEnabledChange} />
              <span className="text-sm text-muted-foreground">
                {eventData.enabled ? 'Enabled' : 'Disabled'}
              </span>
            </div>
          )}

          {/* Profile */}
          <div className="relative" ref={dropdownRef}>
            <button 
              onClick={() => setShowProfileDropdown(!showProfileDropdown)} 
              className="flex items-center space-x-3 px-4 py-2 hover:bg-muted rounded-lg transition-colors w-full"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">SY</span>
              </div>
              <span className="text-sm font-medium text-foreground">Sanskar Yadav</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </button>
            
            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
                <div className="py-1">
                  <button 
                    onClick={() => {
                      window.location.href = '/settings/profile';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <User className="h-4 w-4 mr-2" />
                    My Profile
                  </button>
                  <button 
                    onClick={() => {
                      window.location.href = '/settings/out-of-office';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <Moon className="h-4 w-4 mr-2" />
                    Out of Office
                  </button>
                  <button 
                    onClick={() => {
                      window.open('https://roadmap.onehash.ai/', '_blank');
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <MapPin className="h-4 w-4 mr-2" />
                    Roadmap
                  </button>
                  
                  {/* Help & Support */}
                  <button 
                    onClick={handleHelpAndSupportClick} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <HelpCircle className="h-4 w-4 mr-2" />
                    Help & Support
                  </button>
                  
                  <div className="border-t border-border my-1"></div>
                  <button 
                    onClick={() => {
                      window.location.href = '/settings';
                      setShowProfileDropdown(false);
                    }} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <Settings className="h-4 w-4 mr-2" />
                    Settings
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign Out
                  </button>
                </div>
              </div>
            )}

            {showHelpDropdown && (
              <div className="absolute right-0 top-full mt-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-20">
                <div className="py-1">
                  <button 
                    onClick={() => handleHelpClick('discord')} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Community Support
                  </button>
                  <button 
                    onClick={() => handleHelpClick('docs')} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <FileIcon className="h-4 w-4 mr-2" />
                    Documentation
                  </button>
                  <button 
                    onClick={() => handleHelpClick('contact')} 
                    className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors"
                  >
                    <Mail className="h-4 w-4 mr-2" />
                    Contact Us
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
