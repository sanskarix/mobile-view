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

interface RouteCondition {
  id: string;
  fieldName: string;
  operator: string;
  value: string;
}

interface Route {
  id: string;
  name: string;
  conditions: RouteCondition[];
  conditionLogic: 'all' | 'any' | 'none';
  actionType: 'custom' | 'external' | 'event';
  actionValue: string;
}

export const EditRoutingForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('RFFFF');
  const [formDescription, setFormDescription] = useState('hwllUGELBVWufl');
  const [sendEmailToOwner, setSendEmailToOwner] = useState(true);
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [routes, setRoutes] = useState<Route[]>([]);
  const [selectedRouter, setSelectedRouter] = useState<string>('');
  const [showRouteCreator, setShowRouteCreator] = useState(false);
  const [showFallbackRoute, setShowFallbackRoute] = useState(false);
  const [fallbackRouteType, setFallbackRouteType] = useState<'custom' | 'external' | 'event'>('custom');
  const [fallbackRouteValue, setFallbackRouteValue] = useState('');
  const [activeTab, setActiveTab] = useState<'form' | 'routing' | 'reporting'>('form');
  const [newRoute, setNewRoute] = useState<Route>({
    id: '',
    name: 'Route 1',
    conditions: [{ id: 'condition-1', fieldName: '', operator: 'equals', value: '' }],
    conditionLogic: 'all',
    actionType: 'custom',
    actionValue: ''
  });

  const handleCreateField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      label: 'New Field',
      identifier: '',
      type: 'short-text',
      required: false,
      collapsed: true
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

  const handleRouterSelect = (value: string) => {
    if (value === 'create-new') {
      setShowRouteCreator(true);
      setSelectedRouter('');
    } else {
      setSelectedRouter(value);
      setShowFallbackRoute(true);
    }
  };

  const addCondition = () => {
    const newCondition: RouteCondition = {
      id: `condition-${Date.now()}`,
      fieldName: '',
      operator: 'equals',
      value: ''
    };
    setNewRoute(prev => ({
      ...prev,
      conditions: [...prev.conditions, newCondition]
    }));
  };

  const removeCondition = (conditionId: string) => {
    setNewRoute(prev => ({
      ...prev,
      conditions: prev.conditions.filter(c => c.id !== conditionId)
    }));
  };

  const updateCondition = (conditionId: string, updates: Partial<RouteCondition>) => {
    setNewRoute(prev => ({
      ...prev,
      conditions: prev.conditions.map(c => c.id === conditionId ? { ...c, ...updates } : c)
    }));
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
    { value: 'equals', label: 'Equals' },
    { value: 'does-not-equal', label: 'Does not equal' },
    { value: 'contains', label: 'Contains' },
    { value: 'does-not-contain', label: 'Does not contain' },
    { value: 'is-empty', label: 'Is empty' },
    { value: 'is-not-empty', label: 'Is not empty' }
  ];

  const mockForms = [
    { id: 'form1', name: 'Form1' },
    { id: 'form2', name: 'Form2' },
    { id: 'form3', name: 'Form3' }
  ];
  
  const mockEventTypes = [
    { id: 'event1', name: '30 Min Meeting' },
    { id: 'event2', name: '60 Min Meeting' },
    { id: 'event3', name: 'Team Meeting' }
  ];

  const handleReporting = () => {
    navigate('/apps');
  };

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
                onCheckedChange={(checked) => setSendEmailToOwner(checked === true)}
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
          {/* Tabs */}
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
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                    F
                  </div>
                  <span>Form</span>
                </div>
              </button>
              <button
                onClick={() => setActiveTab('routing')}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'routing' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                    R
                  </div>
                  <span>Routing</span>
                </div>
              </button>
              <button
                onClick={handleReporting}
                className={`py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors ${
                  activeTab === 'reporting' 
                    ? 'border-primary text-primary' 
                    : 'border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300'
                }`}
              >
                <div className="flex items-center space-x-2">
                  <div className="h-5 w-5 rounded-full flex items-center justify-center text-xs font-medium bg-primary text-primary-foreground">
                    Re
                  </div>
                  <span>Reporting</span>
                </div>
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
                    <div key={field.id} className="border rounded-lg transition-all duration-200">
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex-1">
                            {field.collapsed ? (
                              <div className="text-sm font-medium">
                                {field.label || 'New Field'}
                              </div>
                            ) : (
                              <Input
                                value={field.label}
                                onChange={(e) => handleUpdateField(field.id, { label: e.target.value })}
                                placeholder="Field label"
                                className="border-0 shadow-none p-0 text-sm font-medium focus-visible:ring-0"
                              />
                            )}
                          </div>
                          <div className="flex items-center space-x-1">
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
                        
                        <div className={`transition-all duration-200 ${field.collapsed ? 'max-h-0 overflow-hidden opacity-0' : 'max-h-none opacity-100'}`}>
                          {!field.collapsed && (
                            <div className="mt-4 space-y-4 animate-in slide-in-from-top-2">
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
                                    className="px-3 py-1 h-7 text-xs"
                                  >
                                    Yes
                                  </Button>
                                  <Button
                                    variant={!field.required ? 'default' : 'outline'}
                                    onClick={() => handleUpdateField(field.id, { required: false })}
                                    size="sm"
                                    className="px-3 py-1 h-7 text-xs"
                                  >
                                    No
                                  </Button>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
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
            <div className="p-6 border-l border-r border-b border-border bg-background">
              <div className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add a new Route</h3>
                  
                  {!showRouteCreator ? (
                    <div className="space-y-2">
                      <Label>Select a router</Label>
                      <Select onValueChange={handleRouterSelect}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a router" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="create-new">Create a new Route</SelectItem>
                          {mockForms.map(form => (
                            <SelectItem key={form.id} value={form.id}>
                              {form.name}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ) : (
                    <div className="space-y-6 p-4 border rounded-lg transition-all duration-300 animate-in slide-in-from-top-2">
                      <div className="space-y-2">
                        <Input
                          value={newRoute.name}
                          onChange={(e) => setNewRoute(prev => ({ ...prev, name: e.target.value }))}
                          className="font-medium"
                        />
                      </div>
                      
                      <hr className="border-border" />
                      
                      <div className="space-y-4">
                        <div className="flex items-center space-x-2">
                          <span className="text-sm text-muted-foreground">For responses matching the following criteria (matches</span>
                          <Select value={newRoute.conditionLogic} onValueChange={(value: 'all' | 'any' | 'none') => setNewRoute(prev => ({ ...prev, conditionLogic: value }))}>
                            <SelectTrigger className="w-20">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">All</SelectItem>
                              <SelectItem value="any">Any</SelectItem>
                              <SelectItem value="none">None</SelectItem>
                            </SelectContent>
                          </Select>
                          <span className="text-sm text-muted-foreground">by default)</span>
                        </div>
                        
                        {newRoute.conditions.length > 1 && (
                          <div className="flex items-center space-x-2">
                            <span className="text-sm text-muted-foreground">where</span>
                            <Select value={newRoute.conditionLogic} onValueChange={(value: 'all' | 'any' | 'none') => setNewRoute(prev => ({ ...prev, conditionLogic: value }))}>
                              <SelectTrigger className="w-20">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="all">All</SelectItem>
                                <SelectItem value="any">Any</SelectItem>
                                <SelectItem value="none">None</SelectItem>
                              </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">match</span>
                          </div>
                        )}
                        
                        <div className="space-y-2">
                          {newRoute.conditions.map((condition, index) => (
                            <div key={condition.id} className="flex items-center space-x-2">
                              <Select value={condition.fieldName} onValueChange={(value) => updateCondition(condition.id, { fieldName: value })}>
                                <SelectTrigger className="flex-1">
                                  <SelectValue placeholder="Select field" />
                                </SelectTrigger>
                                <SelectContent>
                                  {formFields.filter(field => field.label.trim() !== '').map(field => (
                                    <SelectItem key={field.id} value={field.label}>
                                      {field.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Select value={condition.operator} onValueChange={(value) => updateCondition(condition.id, { operator: value })}>
                                <SelectTrigger className="flex-1">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {comparisonOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                              
                              <Input
                                value={condition.value}
                                onChange={(e) => updateCondition(condition.id, { value: e.target.value })}
                                placeholder="Enter string"
                                className="flex-1"
                              />
                              
                              {newRoute.conditions.length > 1 && (
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeCondition(condition.id)}
                                  className="h-8 w-8 text-red-600 hover:text-red-700"
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          ))}
                        </div>
                        
                        <Button variant="outline" onClick={addCondition} className="w-full">
                          <Plus className="h-4 w-4 mr-2" />
                          Add rule
                        </Button>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Send Booker to</span>
                        <Select value={newRoute.actionType} onValueChange={(value: 'custom' | 'external' | 'event') => setNewRoute(prev => ({ ...prev, actionType: value }))}>
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom Page</SelectItem>
                            <SelectItem value="external">External Redirect</SelectItem>
                            <SelectItem value="event">Event Redirect</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {newRoute.actionType === 'event' ? (
                          <Select value={newRoute.actionValue} onValueChange={(value) => setNewRoute(prev => ({ ...prev, actionValue: value }))}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select event" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockEventTypes.map(eventType => (
                                <SelectItem key={eventType.id} value={eventType.id}>
                                  {eventType.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Input
                            value={newRoute.actionValue}
                            onChange={(e) => setNewRoute(prev => ({ ...prev, actionValue: e.target.value }))}
                            placeholder={newRoute.actionType === 'custom' ? 'Enter custom page content' : 'Enter URL'}
                            className="flex-1"
                          />
                        )}
                      </div>
                      
                      <div className="space-y-2">
                        <Label>Select a router</Label>
                        <Select onValueChange={handleRouterSelect}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a router" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="create-new">Create a new Route</SelectItem>
                            {mockForms.map(form => (
                              <SelectItem key={form.id} value={form.id}>
                                {form.name}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Fallback Route Section */}
                {showFallbackRoute && (
                  <div className="space-y-4 transition-all duration-300 animate-in slide-in-from-top-2">
                    <h3 className="text-lg font-semibold">Fallback Route</h3>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm">Send Booker to</span>
                        <Select 
                          value={fallbackRouteType} 
                          onValueChange={(value: 'custom' | 'external' | 'event') => setFallbackRouteType(value)}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="custom">Custom Page</SelectItem>
                            <SelectItem value="external">External Redirect</SelectItem>
                            <SelectItem value="event">Event Redirect</SelectItem>
                          </SelectContent>
                        </Select>
                        
                        {fallbackRouteType === 'event' ? (
                          <Select value={fallbackRouteValue} onValueChange={setFallbackRouteValue}>
                            <SelectTrigger className="flex-1">
                              <SelectValue placeholder="Select an event type" />
                            </SelectTrigger>
                            <SelectContent>
                              {mockEventTypes.map(eventType => (
                                <SelectItem key={eventType.id} value={eventType.id}>
                                  {eventType.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        ) : (
                          <Textarea
                            value={fallbackRouteValue}
                            onChange={(e) => setFallbackRouteValue(e.target.value)}
                            placeholder={fallbackRouteType === 'custom' 
                              ? 'Thank you for your interest! We will be in touch soon.' 
                              : 'Enter URL'
                            }
                            rows={3}
                            className="flex-1"
                          />
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
