
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Copy, Eye } from 'lucide-react';

interface RoutingFormEmbedModalProps {
  open: boolean;
  onClose: () => void;
  formId: string;
}

export const RoutingFormEmbedModal: React.FC<RoutingFormEmbedModalProps> = ({
  open,
  onClose,
  formId
}) => {
  const [embedType, setEmbedType] = useState('inline');
  const [theme, setTheme] = useState('auto');
  const [hideEventTypeDetails, setHideEventTypeDetails] = useState(false);
  const [brandColorLight, setBrandColorLight] = useState('007ee5');
  const [brandColorDark, setBrandColorDark] = useState('fafafa');
  const [layout, setLayout] = useState('month');

  const generateEmbedCode = () => {
    const baseUrl = `cal.com/forms/${formId}`;
    
    if (embedType === 'inline') {
      return `<iframe src="${baseUrl}" width="100%" height="600" frameborder="0"></iframe>`;
    } else if (embedType === 'floating-button') {
      return `<script>
  (function (C, A, L) { 
    let p = function (a, ar) { 
      a.q.push(ar); 
    }; 
    let d = C.document; 
    C.Cal = C.Cal || function () { 
      let cal = C.Cal; 
      let ar = arguments; 
      if (!cal.loaded) { 
        cal.ns = {}; 
        cal.q = cal.q || []; 
        d.head.appendChild(d.createElement("script")).src = A; 
        cal.loaded = true; 
      } 
      if (ar[0] === L) { 
        const api = function () { 
          p(api, arguments); 
        }; 
        const namespace = ar[1]; 
        api.q = api.q || []; 
        typeof namespace === "string" ? (cal.ns[namespace] = api) && p(api, ar) : p(cal, ar); 
        return; 
      } 
      p(cal, ar); 
    }; 
  })(window, "https://app.cal.com/embed/embed.js", "init"); 
  Cal("init", {origin:"https://cal.com"});
  
  Cal("floatingButton", {
    calLink: "forms/${formId}",
    config: {
      theme: "${theme}",
      layout: "${layout}",
      branding: {
        brandColor: "${brandColorLight}",
        darkBrandColor: "${brandColorDark}"
      }
    }
  });
</script>`;
    } else if (embedType === 'popup') {
      return `<button onclick="openCalPopup()">Book a Meeting</button>
<script>
  function openCalPopup() {
    Cal("modal", {
      calLink: "forms/${formId}",
      config: {
        theme: "${theme}",
        layout: "${layout}",
        branding: {
          brandColor: "${brandColorLight}",
          darkBrandColor: "${brandColorDark}"
        }
      }
    });
  }
</script>`;
    }
    
    return '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(generateEmbedCode());
  };

  const handlePreview = () => {
    window.open(`cal.com/forms/${formId}`, '_blank');
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Embed Form</DialogTitle>
        </DialogHeader>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Left side - Configuration */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex space-x-2">
                <Button
                  variant={embedType === 'inline' ? 'default' : 'outline'}
                  onClick={() => setEmbedType('inline')}
                  className="flex-1"
                >
                  Inline
                </Button>
                <Button
                  variant={embedType === 'floating-button' ? 'default' : 'outline'}
                  onClick={() => setEmbedType('floating-button')}
                  className="flex-1"
                >
                  Floating Button
                </Button>
                <Button
                  variant={embedType === 'popup' ? 'default' : 'outline'}
                  onClick={() => setEmbedType('popup')}
                  className="flex-1"
                >
                  Pop up
                </Button>
              </div>
              
              <p className="text-sm text-muted-foreground">
                Embed the form directly into your webpage
              </p>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Theme</Label>
                <Select value={theme} onValueChange={setTheme}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="auto">Auto</SelectItem>
                    <SelectItem value="light">Light</SelectItem>
                    <SelectItem value="dark">Dark</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center space-x-2">
                <Switch
                  checked={hideEventTypeDetails}
                  onCheckedChange={setHideEventTypeDetails}
                />
                <Label>Hide event type details</Label>
              </div>

              <div className="space-y-4">
                <h4 className="font-medium">Brand Colors</h4>
                
                <div className="space-y-2">
                  <Label>Brand Color (Light Theme)</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: `#${brandColorLight}` }}
                    />
                    <Input
                      value={brandColorLight}
                      onChange={(e) => setBrandColorLight(e.target.value)}
                      placeholder="007ee5"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label>Brand Color (Dark Theme)</Label>
                  <div className="flex items-center space-x-2">
                    <div 
                      className="w-8 h-8 rounded border"
                      style={{ backgroundColor: `#${brandColorDark}` }}
                    />
                    <Input
                      value={brandColorDark}
                      onChange={(e) => setBrandColorDark(e.target.value)}
                      placeholder="fafafa"
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Layout</Label>
                <Select value={layout} onValueChange={setLayout}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="month">Month</SelectItem>
                    <SelectItem value="week">Week</SelectItem>
                    <SelectItem value="day">Day</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {/* Right side - Preview and Code */}
          <div className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Preview</h4>
                <Button variant="outline" size="sm" onClick={handlePreview}>
                  <Eye className="h-4 w-4 mr-2" />
                  Preview
                </Button>
              </div>
              
              <div className="border rounded-lg p-4 bg-muted/50 h-64 flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-2">
                    <Eye className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Form Preview</p>
                  <p className="text-xs text-muted-foreground">Theme: {theme} | Layout: {layout}</p>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <h4 className="font-medium">Ready to embed?</h4>
                <Button onClick={handleCopyCode}>
                  <Copy className="h-4 w-4 mr-2" />
                  Get Code
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                Get the code to add to your website
              </p>
              
              <Textarea
                value={generateEmbedCode()}
                readOnly
                rows={8}
                className="font-mono text-xs"
              />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
