import React from 'react';
import { ArrowLeft, ExternalLink, Mail, Globe } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface App {
  id: string;
  name: string;
  category: string;
  description: string;
  logo: string;
  installed?: boolean;
  installId?: string;
}

interface AppDetailsProps {
  app: App;
  isInstalled: boolean;
  installedCount: number;
  onBack: () => void;
  onInstall: () => void;
}

export const AppDetails: React.FC<AppDetailsProps> = ({ 
  app, 
  isInstalled, 
  installedCount,
  onBack, 
  onInstall 
}) => {
  const productImages = [
    'https://cdn.builder.io/api/v1/image/assets%2Fd4a10180bf86487694b9b457d0ef97e4%2F0cd9373df53f44b09bda8c22ff613c51?format=webp&width=800',
    'https://cdn.builder.io/api/v1/image/assets%2Fd4a10180bf86487694b9b457d0ef97e4%2Fec6b7208490a4017b11ee4a9e4197409?format=webp&width=800'
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card/50" />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Product Images */}
          <div className="bg-slate-100 border rounded-lg overflow-hidden p-3">
            <div className="aspect-video bg-muted rounded-lg overflow-hidden" />
            <div className="grid grid-cols-2 gap-4 mt-4">
              <div className="aspect-video bg-muted rounded-lg overflow-hidden" />
              <div className="aspect-video bg-muted rounded-lg overflow-hidden" />
            </div>
          </div>

          {/* Right Column - App Info */}
          <div className="space-y-6">
            {/* App Header */}
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 bg-muted/50 rounded-lg flex items-center justify-center border border-border flex-shrink-0" />
              <div className="flex-1">
                <div className="text-2xl font-normal leading-8 gap-3 mb-2">
                  Google Calendar
                </div>
                <div className="flex flex-row">
                  <span className="px-1 py-0.5 bg-slate-100 text-gray-700 text-xs font-medium rounded border border-slate-100 self-stretch w-auto overflow-hidden">
                    Social
                  </span>
                  <p className="text-slate-500 mt-0.5 text-xs">
                    &nbsp;• Published by Cal.id
                  </p>
                </div>
              </div>
            </div>

            {/* Install Status & Button */}
            <div className="mt-6">
              <button className="bg-slate-100 rounded border-transparent text-slate-600 text-xs font-medium gap-2 h-7 leading-5 whitespace-nowrap transition-colors border-8 mr-2 px-4">
                <p>1 active install</p>
              </button>
              <button className="bg-blue-600 rounded text-white text-sm font-medium gap-2 h-7 leading-5 whitespace-nowrap transition-colors border-transparent w-auto self-stretch px-8">
                <p>Install Another</p>
              </button>
            </div>

            {/* Description */}
            <p className="leading-relaxed text-xs mt-3 text-gray-700">
              <div>
                Google Calendar is a time management and scheduling
                service developed by Google. Allows users to create
                and edit events, with options available for type and
                time. Available to anyone that has a Gmail account
                on both mobile and web versions.
              </div>
            </p>
            <div className="mt-6" />

            {/* How to Get Started */}
            <div className="mt-6">
              <h3 className="text-base font-semibold leading-7 mb-3">How to Get Started</h3>
              <ol className="text-xs text-gray-700 leading-5">
                <li className="flex gap-3">
                  <span className="block">
                    <span className="text-xs">- Log in to your </span>
                    <span className="text-xs">Instagram</span>
                    <span className="text-xs"> account by installing the app.</span>
                  </span>
                </li>
                <li className="text-xs gap-3 mt-2">
                  - Set up the Client SDK on your website.
                </li>
                <li className="text-xs gap-3 mt-2">
                  - Add app.cal.com to your Outbound Domains.
                </li>
                <li className="text-xs gap-3 mt-2">
                  - Once a booking event occurs, your tracking data will be captured.
                </li>
              </ol>
            </div>

            {/* Pricing */}
            <div className="mt-6">
              <h3 className="text-base font-semibold leading-7 mb-2">Pricing</h3>
              <p className="text-xs text-gray-700">Free</p>
            </div>

            {/* Contact */}
            <div className="mt-6">
              <h3 className="text-base font-semibold leading-7 mb-3">Contact</h3>
              <div>
                <div className="flex items-center gap-2 text-xs leading-5">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`https://${app.name.toLowerCase()}.co`}
                    className="text-blue-600 hover:underline flex items-center gap-1"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {app.name.toLowerCase()}.co
                    <ExternalLink className="h-3 w-3" />
                  </a>
                </div>
                <div className="flex items-center gap-2 text-xs leading-5 mt-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <a
                    href={`mailto:help@${app.name.toLowerCase()}.com`}
                    className="text-blue-600 hover:underline"
                  >
                    help@{app.name.toLowerCase()}.com
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
