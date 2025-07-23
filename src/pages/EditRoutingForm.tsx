
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { ArrowLeft, FileText, AlertTriangle, BarChart3, Plus, ChevronDown, ChevronUp, Copy, ExternalLink, Download, Code, Eye, Trash2, X } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipTrigger } from '../components/ui/tooltip';

export interface FormField {
  id: string;
  label: string;
  identifier: string;
  type: 'short-text' | 'number' | 'long-text' | 'single-selection' | 'multiple-selection' | 'phone' | 'email';
  required: boolean;
  options?: string[];
  collapsed?: boolean;
}

export const EditRoutingForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('RFFFF');
  const [formDescription, setFormDescription] = useState('hwllUGELBVWufl');
  const [sendEmailToOwner, setSendEmailToOwner] = useState(true);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<string>('');
  const [fallbackRouteType, setFallbackRouteType] = useState<'custom' | 'external' | 'event'>('custom');
  const [fallbackRouteValue, setFallbackRouteValue] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'routing' | 'reporting'>('form');

  const handleCreateField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      label: '',
      identifier: '',
      type: 'short-text',
      required: false,
      collapsed: false
    };
    setFormFields(prev => [...prev, newField]);
  };

  const handleUpdateField = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(prev => prev.map(f => f.id === fieldId ? { ...f, ...updates } : f));
  };

  const handleDeleteField = (fieldId: string) => {
    setFormFields(prev => prev.filter(f => f.id !== fieldId));
  };

  const toggleFieldCollapse = (fieldId: string) => {
    setFormFields(prev => prev.map(f => 
      f.id === fieldId ? { ...f, collapsed: !f.collapsed } : f
    ));
  };

  const handleAddRoute = () => {
    const newRoute = {
      id: `route-${Date.now()}`,
      name: `Route ${routes.length + 1}`,
      conditions: []
    };
    setRoutes(prev => [...prev, newRoute]);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText('cal.id/forms/f860530b-f820-497a-9728-6b56b7ae7d7b');
  };

  const handlePreview = () => {
    window.open('cal.id/forms/f860530b-f820-497a-9728-6b56b7ae7d7b', '_blank');
  };

  const handleDownloadResponses = () => {
    console.log('Downloading responses...');
  };

  const handleEmbed = () => {
    console.log('Opening embed modal...');
  };

  const comparisonOptions = [
    'Equals',
    'Does not equal',
    'Contains',
    'Not contains',
    'Is empty',
    'Is not empty'
  ];

  const mockForms = ['Form1', 'Form2', 'Form3'];
  const mockEventTypes = ['30 Min Meeting', '60 Min Meeting', 'Team Meeting'];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-background">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate('/routing-forms')}
              className="p-2"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <div>
              <h1 className="text-lg font-semibold">{formName}</h1>
              <p className="text-sm text-muted-foreground">hwllUGELBVWufl</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-2">
            <Button>Save</Button>
          </div>
        </div>
      </div>

      <div className="flex">
        {/* Left Sidebar */}
        <div className="w-80 border-r border-border bg-background p-6">
          <div className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                rows={3}
              />
            </div>
            
            {/* Action Buttons */}
            <div className="flex items-center space-x-2">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handlePreview}>
                    <Eye className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Preview</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleCopyLink}>
                    <Copy className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Copy Link</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleDownloadResponses}>
                    <Download className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Download Responses</TooltipContent>
              </Tooltip>
              
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="outline" size="icon" onClick={handleEmbed}>
                    <Code className="h-4 w-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Embed</TooltipContent>
              </Tooltip>
            </div>
            
            <div className="flex items-start space-x-2">
              <Checkbox
                id="send-email"
                checked={sendEmailToOwner}
                onCheckedChange={setSendEmailToOwner}
              />
              <div className="space-y-1">
                <Label htmlFor="send-email">Send Email to Owner</Label>
                <p className="text-sm text-muted-foreground">
                  Sends an email to the owner when the form is submitted
                </p>
              </div>
            </div>
            
            <Button variant="outline" className="w-full">
              Test Preview
            </Button>
            
            {/* Warnings */}
            <div className="space-y-3">
              <div className="flex items-start space-x-2 p-3 bg-orange-50 border border-orange-200 rounded-lg">
                <AlertTriangle className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-medium text-orange-800">No routes defined</p>
                </div>
              </div>
              
              <div className="flex items-start space-x-2 p-3 bg-muted/50 border border-border rounded-lg">
                <BarChart3 className="h-4 w-4 text-muted-foreground mt-0.5" />
                <div className="text-sm text-muted-foreground">
                  <p>No responses yet</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* Updated Tabs */}
          <div className="border-b border-border px-6">
            <div className="flex space-x-0">
              <button
                onClick={() => setActiveTab('form')}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'form' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Form
              </button>
              <button
                onClick={() => setActiveTab('routing')}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'routing' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Routing
              </button>
              <button
                onClick={() => setActiveTab('reporting')}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'reporting' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                Reporting
              </button>
            </div>
          </div>
          
          {/* Form Tab Content */}
          {activeTab === 'form' && (
            <div className="p-6">
              {formFields.length === 0 ? (
                <div className="flex-1 flex items-center justify-center min-h-[600px]">
                  <div className="text-center space-y-4">
                    <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mx-auto">
                      <FileText className="h-12 w-12 text-muted-foreground" />
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold mb-2">Create your first field</h3>
                      <p className="text-muted-foreground mb-6">
                        Fields are the form fields that the booker would see.
                      </p>
                      <Button onClick={handleCreateField}>Create Field</Button>
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-4">
                  {formFields.map((field) => (
                    <div key={field.id} className="border rounded-lg p-4">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex-1">
                          <div className="flex items-center space-x-2 mb-2">
                            <Label className="text-sm font-medium">Label</Label>
                            <div className="flex items-center space-x-1 ml-auto">
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => toggleFieldCollapse(field.id)}
                                className="h-6 w-6"
                              >
                                {field.collapsed ? (
                                  <ChevronDown className="h-4 w-4" />
                                ) : (
                                  <ChevronUp className="h-4 w-4" />
                                )}
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => handleDeleteField(field.id)}
                                className="h-6 w-6 text-red-600 hover:text-red-700"
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                          <Input
                            value={field.label}
                            onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                            placeholder="This is what your users would see"
                            className="mb-4"
                          />
                        </div>
                      </div>
                      
                      {!field.collapsed && (
                        <div className="space-y-4">
                          <div className="space-y-2">
                            <Label>Identifier</Label>
                            <Input
                              value={field.identifier}
                              onChange={(e) => handleUpdateField(field.id, { identifier: e.target.value })}
                              placeholder="Identifies field by this name."
                            />
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Type</Label>
                            <Select
                              value={field.type}
                              onValueChange={(value: FormField['type']) => handleUpdateField(field.id, { type: value })}
                            >
                              <SelectTrigger>
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="short-text">Short Text</SelectItem>
                                <SelectItem value="number">Number</SelectItem>
                                <SelectItem value="long-text">Long Text</SelectItem>
                                <SelectItem value="single-selection">Single Selection</SelectItem>
                                <SelectItem value="multiple-selection">Multiple Selection</SelectItem>
                                <SelectItem value="phone">Phone</SelectItem>
                                <SelectItem value="email">Email</SelectItem>
                              </SelectContent>
                            </Select>
                          </div>
                          
                          <div className="space-y-2">
                            <Label>Required</Label>
                            <div className="flex space-x-2">
                              <Button
                                variant={field.required ? 'default' : 'outline'}
                                onClick={() => handleUpdateField(field.id, { required: true })}
                                size="sm"
                                className="px-4"
                              >
                                Yes
                              </Button>
                              <Button
                                variant={!field.required ? 'default' : 'outline'}
                                onClick={() => handleUpdateField(field.id, { required: false })}
                                size="sm"
                                className="px-4"
                              >
                                No
                              </Button>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}
                  <Button variant="outline" onClick={handleCreateField} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Add field
                  </Button>
                </div>
              )}
            </div>
          )}
          
          {/* Routing Tab Content */}
          {activeTab === 'routing' && (
            <div className="p-6 space-y-6">
              {/* Add a new Route Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Add a new Route</h3>
                <div className="space-y-2">
                  <Label>Select a router</Label>
                  <Select value={selectedRouter} onValueChange={setSelectedRouter}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a router" />
                    </SelectTrigger>
                    <SelectContent>
                      {mockForms.map(form => (
                        <SelectItem key={form} value={form}>
                          {form}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {selectedRouter && (
                  <div className="p-4 bg-muted/50 rounded-lg">
                    <p className="text-sm text-muted-foreground mb-2">
                      Fields available in <strong>{selectedRouter}</strong> will be added to this form.
                    </p>
                    <Button onClick={handleAddRoute} className="mt-2">
                      Add a new route
                    </Button>
                  </div>
                )}
              </div>
              
              {/* Fallback Route Section */}
              <div className="space-y-4">
                <h3 className="text-lg font-semibold">Fallback Route</h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label>Send Booker to</Label>
                    <Select 
                      value={fallbackRouteType} 
                      onValueChange={(value: 'custom' | 'external' | 'event') => setFallbackRouteType(value)}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="custom">Custom Page</SelectItem>
                        <SelectItem value="external">External Redirect</SelectItem>
                        <SelectItem value="event">Event Redirect</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  {fallbackRouteType === 'event' ? (
                    <div className="space-y-2">
                      <Label>Select Event Type</Label>
                      <Select value={fallbackRouteValue} onValueChange={setFallbackRouteValue}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select an event type" />
                        </SelectTrigger>
                        <SelectContent>
                          {mockEventTypes.map(eventType => (
                            <SelectItem key={eventType} value={eventType}>
                              {eventType}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <Label>
                        {fallbackRouteType === 'custom' ? 'Custom Page URL' : 'External Redirect URL'}
                      </Label>
                      <Textarea
                        value={fallbackRouteValue}
                        onChange={(e) => setFallbackRouteValue(e.target.value)}
                        placeholder={fallbackRouteType === 'custom' 
                          ? 'Thank you for your interest! We will be in touch soon.' 
                          : 'Enter URL'
                        }
                        rows={3}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* Reporting Tab Content */}
          {activeTab === 'reporting' && (
            <div className="p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Reporting dashboard will go here</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
