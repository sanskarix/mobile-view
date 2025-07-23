
import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Textarea } from '../components/ui/textarea';
import { Label } from '../components/ui/label';
import { Checkbox } from '../components/ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { CustomSelect } from '../components/ui/custom-select';
import { ArrowLeft, FileText, AlertTriangle, BarChart3, Plus, ChevronDown, ChevronUp, Copy, ExternalLink, Download, Code, Trash2, GripVertical } from 'lucide-react';
import { FormFieldModal, FormField } from '../components/FormFieldModal';
import { EmbedModal } from '../components/EmbedModal';

export const EditRoutingForm = () => {
  const { formId } = useParams();
  const navigate = useNavigate();
  const [formName, setFormName] = useState('RFFFF');
  const [formDescription, setFormDescription] = useState('hwllUGELBVWufl');
  const [sendEmailToOwner, setSendEmailToOwner] = useState(true);
  const [showFieldModal, setShowFieldModal] = useState(false);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [editingField, setEditingField] = useState<FormField | undefined>();
  const [formFields, setFormFields] = useState<FormField[]>([]);
  const [routes, setRoutes] = useState<any[]>([]);
  const [selectedRouter, setSelectedRouter] = useState('');
  const [fallbackRoute, setFallbackRoute] = useState('');
  const [fallbackValue, setFallbackValue] = useState('');

  const handleCreateField = () => {
    const newField: FormField = {
      id: `field-${Date.now()}`,
      label: 'Untitled Field',
      identifier: `field_${Date.now()}`,
      type: 'text',
      required: false,
      collapsed: false
    };
    setFormFields(prev => [...prev, newField]);
  };

  const handleFieldChange = (fieldId: string, updates: Partial<FormField>) => {
    setFormFields(prev => prev.map(f => 
      f.id === fieldId ? { ...f, ...updates } : f
    ));
  };

  const handleDeleteField = (fieldId: string) => {
    setFormFields(prev => prev.filter(f => f.id !== fieldId));
  };

  const toggleFieldCollapse = (fieldId: string) => {
    setFormFields(prev => prev.map(f => 
      f.id === fieldId ? { ...f, collapsed: !f.collapsed } : f
    ));
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

  const routerOptions = [
    { value: 'form1', label: 'Contact Form' },
    { value: 'form2', label: 'Support Request' },
    { value: 'form3', label: 'Sales Inquiry' }
  ];

  const fallbackOptions = [
    { value: 'custom', label: 'Custom Page' },
    { value: 'external', label: 'External Redirect' },
    { value: 'event', label: 'Event Redirect' }
  ];

  const eventTypes = [
    { value: 'meeting', label: '15 min Meeting' },
    { value: 'consultation', label: '30 min Consultation' },
    { value: 'demo', label: '1 hour Demo' }
  ];

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
            <Button variant="outline" size="sm">
              <ExternalLink className="h-4 w-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Copy className="h-4 w-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Download className="h-4 w-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Code className="h-4 w-4 mr-2" />
            </Button>
            <Button variant="outline" size="sm">
              <Trash2 className="h-4 w-4 mr-2" />
            </Button>
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
            
            {/* Moved buttons here */}
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handlePreview}>
                <ExternalLink className="h-4 w-4 mr-2" />
                Preview
              </Button>
              <Button variant="outline" size="sm" onClick={handleCopyLink}>
                <Copy className="h-4 w-4 mr-2" />
                Copy
              </Button>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" onClick={handleDownloadResponses}>
                <Download className="h-4 w-4 mr-2" />
                Download
              </Button>
              <Button variant="outline" size="sm" onClick={() => setShowEmbedModal(true)}>
                <Code className="h-4 w-4 mr-2" />
                Embed
              </Button>
            </div>
            
            {/* Changed to checkbox */}
            <div className="flex items-center space-x-2">
              <Checkbox
                id="send-email"
                checked={sendEmailToOwner}
                onCheckedChange={setSendEmailToOwner}
              />
              <Label htmlFor="send-email" className="text-sm">
                Send Email to Owner
              </Label>
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
          <Tabs defaultValue="form" className="w-full">
            <div className="border-b border-border px-6">
              <div className="flex">
                <button
                  className="py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors border-primary text-primary"
                >
                  Form
                </button>
                <button
                  className="py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                >
                  Routing
                </button>
                <button
                  className="py-4 px-6 border-b-2 font-medium text-sm whitespace-nowrap transition-colors border-transparent text-muted-foreground hover:text-foreground hover:border-gray-300"
                >
                  Reporting
                </button>
              </div>
            </div>
            
            <TabsContent value="form" className="mt-0 p-0">
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
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-2 mb-2">
                              <GripVertical className="h-4 w-4 text-muted-foreground" />
                              <Input
                                value={field.label}
                                onChange={(e) => handleFieldChange(field.id, { label: e.target.value })}
                                className="font-medium border-none p-0 h-auto"
                                placeholder="Field Label"
                              />
                            </div>
                            
                            {!field.collapsed && (
                              <div className="space-y-4 mt-4">
                                <div className="space-y-2">
                                  <Label>Identifier</Label>
                                  <Input
                                    value={field.identifier}
                                    onChange={(e) => handleFieldChange(field.id, { identifier: e.target.value })}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Type</Label>
                                  <CustomSelect
                                    value={field.type}
                                    onValueChange={(value) => handleFieldChange(field.id, { type: value })}
                                    options={[
                                      { value: 'text', label: 'Text' },
                                      { value: 'email', label: 'Email' },
                                      { value: 'number', label: 'Number' },
                                      { value: 'select', label: 'Select' },
                                      { value: 'textarea', label: 'Textarea' }
                                    ]}
                                  />
                                </div>
                                <div className="space-y-2">
                                  <Label>Required</Label>
                                  <div className="flex space-x-2">
                                    <Button
                                      variant={field.required ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => handleFieldChange(field.id, { required: true })}
                                    >
                                      Yes
                                    </Button>
                                    <Button
                                      variant={!field.required ? "default" : "outline"}
                                      size="sm"
                                      onClick={() => handleFieldChange(field.id, { required: false })}
                                    >
                                      No
                                    </Button>
                                  </div>
                                </div>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex items-center space-x-2 ml-4">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => toggleFieldCollapse(field.id)}
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
                              className="text-red-600 hover:text-red-700"
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
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
            </TabsContent>
            
            <TabsContent value="routing" className="mt-0 p-6">
              <div className="space-y-8">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Add a new Route</h3>
                  <div className="space-y-2">
                    <Label>Select a router</Label>
                    <CustomSelect
                      value={selectedRouter}
                      onValueChange={setSelectedRouter}
                      options={routerOptions}
                      placeholder="Choose a router"
                    />
                  </div>
                  
                  {selectedRouter && (
                    <Button onClick={() => console.log('Add route')}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Route
                    </Button>
                  )}
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Fallback Route</h3>
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label>Send Booker to</Label>
                      <CustomSelect
                        value={fallbackRoute}
                        onValueChange={setFallbackRoute}
                        options={fallbackOptions}
                        placeholder="Choose fallback option"
                      />
                    </div>
                    
                    {fallbackRoute && (
                      <div className="space-y-2">
                        <Label>
                          {fallbackRoute === 'custom' && 'Custom Page URL'}
                          {fallbackRoute === 'external' && 'External Redirect URL'}
                          {fallbackRoute === 'event' && 'Event Type'}
                        </Label>
                        {fallbackRoute === 'event' ? (
                          <CustomSelect
                            value={fallbackValue}
                            onValueChange={setFallbackValue}
                            options={eventTypes}
                            placeholder="Choose event type"
                          />
                        ) : (
                          <Input
                            value={fallbackValue}
                            onChange={(e) => setFallbackValue(e.target.value)}
                            placeholder={fallbackRoute === 'custom' ? 'Enter custom page URL' : 'Enter redirect URL'}
                          />
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </TabsContent>
            
            <TabsContent value="reporting" className="mt-0 p-6">
              <div className="text-center py-12">
                <p className="text-muted-foreground">Reporting dashboard will go here</p>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <EmbedModal open={showEmbedModal} onClose={() => setShowEmbedModal(false)} formId="f860530b-f820-497a-9728-6b56b7ae7d7b" />
    </div>
  );
};
