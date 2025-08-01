import React, { useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import {
  ChevronDown, Moon, HelpCircle, MapPin, LogOut, User, Settings,
  FileIcon, Mail, Search
} from 'lucide-react';

interface HeaderMeta {
  title: string;
  description?: string;
  enabled?: boolean;
  onEnabledChange?: (enabled: boolean) => void;
  onTitleChange?: (title: string) => void;
}

interface HeaderProps {
  metaData: HeaderMeta;
}

export const Header = ({ metaData }: HeaderProps) => {
  const [showProfileDropdown, setShowProfileDropdown] = useState(false);
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Pages that need search functionality
  const pagesWithSearch = ['/event-types', '/bookings', '/routing-forms'];
  const showSearchIcon = pagesWithSearch.includes(location.pathname);

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

  const handleHelpClick = (action: string) => {
    setShowHelpDropdown(false);
    setShowProfileDropdown(false);
    switch (action) {
      case 'docs':
        window.open('https://docs.cal.id', '_blank');
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
    <header className="h-16 bg-background border-b border-border">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section: Logo and Cal ID */}
        <div className="flex items-center">
          <img 
            src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
            alt="Cal ID" 
            className="h-8 w-8" 
          />
          <span className="ml-3 text-xl font-semibold">Cal ID</span>
        </div>

        {/* Right section: Search and Profile */}
        <div className="flex items-center space-x-4">
          {/* Search Icon */}
          <button className="text-muted-foreground hover:text-foreground transition-colors">
            <Search className="h-5 w-5" />
          </button>

          {/* Profile Dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setShowProfileDropdown(!showProfileDropdown)}
              className="flex items-center space-x-2 rounded-lg transition-colors"
            >
              <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
                <span className="text-sm font-medium text-primary-foreground">SY</span>
              </div>
              <ChevronDown className="h-4 w-4 text-muted-foreground hidden sm:block" />
            </button>

            {showProfileDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-50">
                <div className="py-1">
                  <button onClick={() => window.location.href = '/settings/profile'} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <User className="h-4 w-4 mr-2" /> My Profile
                  </button>
                  <button onClick={() => window.location.href = '/settings/out-of-office'} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Moon className="h-4 w-4 mr-2" /> Out of Office
                  </button>
                  <button onClick={() => window.open('https://roadmap.onehash.ai/', '_blank')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <MapPin className="h-4 w-4 mr-2" /> Roadmap
                  </button>
                  <button onClick={handleHelpAndSupportClick} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <HelpCircle className="h-4 w-4 mr-2" /> Help & Support
                  </button>
                  <div className="border-t border-border my-1" />
                  <button onClick={() => window.location.href = '/settings'} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Settings className="h-4 w-4 mr-2" /> Settings
                  </button>
                  <button className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors text-destructive">
                    <LogOut className="h-4 w-4 mr-2" /> Sign Out
                  </button>
                </div>
              </div>
            )}

            {showHelpDropdown && (
              <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-50">
                <div className="py-1">
                  <button onClick={() => handleHelpClick('docs')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <FileIcon className="h-4 w-4 mr-2" /> Documentation
                  </button>
                  <button onClick={() => handleHelpClick('contact')} className="flex items-center w-full px-3 py-2 text-sm hover:bg-muted transition-colors">
                    <Mail className="h-4 w-4 mr-2" /> Contact Us
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
