
import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { Calendar, Clock, Users, Settings, BarChart3, Workflow, FileText, Zap, Moon, Sun, Home, HelpCircle, MessageSquare, FileIcon, Mail } from 'lucide-react';

interface SidebarProps {
  darkMode: boolean;
  setDarkMode: (value: boolean) => void;
}

export const Sidebar = ({
  darkMode,
  setDarkMode
}: SidebarProps) => {
  const [showHelpDropdown, setShowHelpDropdown] = useState(false);

  const navigation = [
    {
      name: 'Home',
      href: '/',
      icon: Home
    },
    {
      name: 'Event Types',
      href: '/event-types',
      icon: Calendar
    }, 
    {
      name: 'Bookings',
      href: '/bookings',
      icon: Clock
    }, 
    {
      name: 'Availability',
      href: '/availability',
      icon: BarChart3
    }, 
    {
      name: 'Teams',
      href: '/teams',
      icon: Users
    }, 
    {
      name: 'Apps',
      href: '/apps',
      icon: Zap
    }, 
    {
      name: 'Routing Forms',
      href: '/routing-forms',
      icon: FileText
    }, 
    {
      name: 'Workflows',
      href: '/workflows',
      icon: Workflow
    }, 
    {
      name: 'Insights',
      href: '/insights',
      icon: BarChart3
    }
  ];

  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode);
  };

  const handleHelpClick = (action: string) => {
    setShowHelpDropdown(false);
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

  return (
    <div 
      className="fixed inset-y-0 left-0 z-50 w-64 bg-card border-r border-border flex flex-col"
      style={{
        background: 'linear-gradient(#eff6ff, #eef2ff, #faf5ff)'
      }}
    >
      <div className="flex h-20 items-center px-6">
        <img src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" alt="Cal ID" className="h-8 w-8" />
        <span className="ml-3 text-xl font-semibold">Cal ID</span>
      </div>
      
      <nav className="flex-1 px-4 py-6 space-y-1">
        {navigation.map(item => (
          <NavLink 
            key={item.name} 
            to={item.href} 
            className={({ isActive }) => 
              `group flex items-center px-3 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                isActive 
                  ? 'bg-primary text-primary-foreground shadow-sm' 
                  : 'text-muted-foreground hover:bg-muted hover:text-foreground'
              }`
            }
          >
            <item.icon className="mr-3 h-5 w-5 flex-shrink-0" />
            {item.name}
          </NavLink>
        ))}
      </nav>
      
      {/* Bottom section */}
      <div className="px-4 py-4 border-t border-border/50 space-y-3">
        {/* Help button with dropdown */}
        <div className="relative">
          <button 
            onClick={() => setShowHelpDropdown(!showHelpDropdown)}
            className="flex items-center w-full px-3 py-2 text-sm text-muted-foreground hover:text-foreground hover:bg-muted rounded-lg transition-colors group"
            title="Help & Support"
          >
            <HelpCircle className="mr-3 h-4 w-4" />
            Help & Support
          </button>
          
          {showHelpDropdown && (
            <div className="absolute bottom-full left-0 mb-1 w-48 bg-popover border border-border rounded-lg shadow-lg animate-scale-in z-10">
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

        {/* Footer links */}
        <div className="space-y-2 text-xs text-muted-foreground">
          <button className="block hover:text-foreground transition-colors">Privacy Policy</button>
          <button className="block hover:text-foreground transition-colors">Terms of Service</button>
          <span className="block">Version 1.0.0</span>
        </div>
      </div>
    </div>
  );
};
