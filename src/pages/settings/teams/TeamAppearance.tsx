
import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Button } from '../../../components/ui/button';
import { Input } from '../../../components/ui/input';
import { Label } from '../../../components/ui/label';
import { Switch } from '../../../components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select';

export const TeamAppearance = () => {
  const { teamId } = useParams();
  const [brandColor, setBrandColor] = useState('#007ee5');
  const [darkBrandColor, setDarkBrandColor] = useState('#fafafa');
  const [customBrandColors, setCustomBrandColors] = useState(true);
  const [disableBranding, setDisableBranding] = useState(true);
  const [hideTeamMemberButton, setHideTeamMemberButton] = useState(true);
  const [selectedTheme, setSelectedTheme] = useState('system');

  return (
    <div className="min-h-screen bg-background flex justify-center">
      <div className="p-8 max-w-4xl w-full">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold mb-2">Team Appearance</h1>
          <p className="text-muted-foreground">Customize how your team's booking pages look to your users</p>
        </div>

        <div className="space-y-8 mb-12 border rounded-lg p-6">
          {/* Booking page theme */}
          <div className="space-y-4">
            <div>
              <h3 className="text-lg font-medium">Booking page theme</h3>
              <p className="text-sm text-muted-foreground">This only applies to your public booking pages</p>
            </div>
            
            <div className="grid grid-cols-3 gap-4">
              {/* System Default */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedTheme === 'system' ? 'border-primary' : 'border-border'}`}
                onClick={() => setSelectedTheme('system')}
              >
                <div className="bg-muted rounded-lg p-4 mb-3 flex">
                  <div className="w-1/2 bg-background rounded-l p-2">
                    <div className="space-y-2">
                      <div className="h-2 bg-muted rounded"></div>
                      <div className="h-1 bg-muted rounded w-3/4"></div>
                      <div className="h-1 bg-muted rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="w-1/2 bg-foreground rounded-r p-2">
                    <div className="space-y-2">
                      <div className="h-2 bg-muted/20 rounded"></div>
                      <div className="h-1 bg-muted/20 rounded w-3/4"></div>
                      <div className="h-1 bg-muted/20 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm font-medium">System default</p>
              </div>

              {/* Light */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedTheme === 'light' ? 'border-primary' : 'border-border'}`}
                onClick={() => setSelectedTheme('light')}
              >
                <div className="bg-gray-100 rounded-lg p-4 mb-3">
                  <div className="bg-white rounded p-2">
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-300 rounded"></div>
                      <div className="h-1 bg-gray-300 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-300 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm font-medium">Light</p>
              </div>

              {/* Dark */}
              <div 
                className={`border-2 rounded-lg p-4 cursor-pointer transition-colors ${selectedTheme === 'dark' ? 'border-primary' : 'border-border'}`}
                onClick={() => setSelectedTheme('dark')}
              >
                <div className="bg-gray-800 rounded-lg p-4 mb-3">
                  <div className="bg-gray-900 rounded p-2">
                    <div className="space-y-2">
                      <div className="h-2 bg-gray-600 rounded"></div>
                      <div className="h-1 bg-gray-600 rounded w-3/4"></div>
                      <div className="h-1 bg-gray-600 rounded w-1/2"></div>
                    </div>
                  </div>
                </div>
                <p className="text-center text-sm font-medium">Dark</p>
              </div>
            </div>
          </div>

          {/* Custom brand colors */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium">Custom brand colors</h3>
                <p className="text-sm text-muted-foreground">Customize your own brand colour into your booking page.</p>
              </div>
              <Switch 
                checked={customBrandColors}
                onCheckedChange={setCustomBrandColors}
              />
            </div>

            {customBrandColors && (
              <div className="space-y-4 ml-4">
                <div className="space-y-2">
                  <Label htmlFor="brand-color-light">Brand Color (Light Theme)</Label>
                  <div className="flex space-x-2 items-center">
                    <Input
                      id="brand-color-light"
                      type="color"
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={brandColor}
                      onChange={(e) => setBrandColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="brand-color-dark">Brand Color (Dark Theme)</Label>
                  <div className="flex space-x-2 items-center">
                    <Input
                      id="brand-color-dark"
                      type="color"
                      value={darkBrandColor}
                      onChange={(e) => setDarkBrandColor(e.target.value)}
                      className="w-12 h-10 p-1 border rounded"
                    />
                    <Input
                      value={darkBrandColor}
                      onChange={(e) => setDarkBrandColor(e.target.value)}
                      className="flex-1"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Disable OneHash Cal branding */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Disable OneHash Cal branding</h3>
              <p className="text-sm text-muted-foreground">Removes any OneHash Cal related brandings, i.e. 'Powered by OneHash Cal.'</p>
            </div>
            <Switch 
              checked={disableBranding}
              onCheckedChange={setDisableBranding}
            />
          </div>

          {/* Hide Book a Team Member Button */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-lg font-medium">Hide Book a Team Member Button</h3>
              <p className="text-sm text-muted-foreground">Hide Book a Team Member Button from your public pages.</p>
            </div>
            <Switch 
              checked={hideTeamMemberButton}
              onCheckedChange={setHideTeamMemberButton}
            />
          </div>

          <Button>Save Changes</Button>
        </div>
      </div>
    </div>
  );
};
