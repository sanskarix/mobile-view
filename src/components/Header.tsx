import React, { useState, useEffect, useRef } from 'react';
import {
  Search, User
} from 'lucide-react';
import { Switch } from './ui/switch';
import { useLocation, useNavigate } from 'react-router-dom';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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

export const Header = () => {
  return (
    <header className="h-16 bg-background border-b border-border">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section: Logo and Cal ID */}
        <div className="flex items-center space-x-3">
          <img 
            src="https://cdn.prod.website-files.com/5e53d34464688e6f5960a338/682f1bb36cedcb0cd39a7027_Onehash-CalId-logo%20icon.svg" 
            alt="Cal ID" 
            className="h-8 w-8" 
          />
          <span className="text-xl font-semibold text-foreground">Cal ID</span>
        </div>

        {/* Right section: Search and Profile */}
        <div className="flex items-center space-x-3">
          <button className="p-2 rounded-lg hover:bg-muted transition-colors">
            <Search className="h-5 w-5 text-muted-foreground" />
          </button>
          <button className="p-1 rounded-lg hover:bg-muted transition-colors">
            <div className="h-8 w-8 rounded-full bg-primary flex items-center justify-center">
              <span className="text-sm font-medium text-primary-foreground">SY</span>
            </div>
          </button>
        </div>
      </div>
    </header>
  );
};
