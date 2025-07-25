import React, { useState } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ArrowLeft, ChevronDown, ChevronRight, Trash2, Edit } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { HeaderMeta } from '@/components/Layout';

interface EventTypeDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onApply: (selectedTypes: string[]) => void;
}

const EventTypeDialog: React.FC<EventTypeDialogProps> = ({ open, onOpenChange, onApply }) => {
  const [selectedTab, setSelectedTab] = useState('personal');
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const eventTypes = {
    personal: [
      { id: '1', name: '15 Minute Meeting' },
      { id: '2', name: '30 Minute Meeting' },
      { id: '3', name: 'Quick Call' }
    ],
    teams: [
      { id: '4', name: 'Team Standup' },
      { id: '5', name: 'Project Review' },
      { id: '6', name: 'Client Meeting' }
    ]
  };

  const currentTypes = eventTypes[selectedTab as keyof typeof eventTypes];

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedTypes([]);
    } else {
      setSelectedTypes(currentTypes.map(type => type.id));
    }
    setSelectAll(!selectAll);
  };

  const handleTypeToggle = (typeId: string) => {
    setSelectedTypes(prev => 
      prev.includes(typeId) 
        ? prev.filter(id => id !== typeId)
        : [...prev, typeId]
    );
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Select Event Types</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          <div className="flex border-b">
            <button
              className={`px-4 py-2 text-sm ${selectedTab === 'personal' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setSelectedTab('personal')}
            >
              Personal
            </button>
            <button
              className={`px-4 py-2 text-sm ${selectedTab === 'teams' ? 'border-b-2 border-primary' : ''}`}
              onClick={() => setSelectedTab('teams')}
            >
              Teams
            </button>
          </div>

          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Checkbox
                id="select-all"
                checked={selectAll}
                onCheckedChange={handleSelectAll}
              />
              <Label htmlFor="select-all" className="font-medium">Select All</Label>
            </div>
            
            <Separator />
            
            {currentTypes.map((type) => (
              <div key={type.id} className="flex items-center space-x-2">
                <Checkbox
                  id={type.id}
                  checked={selectedTypes.includes(type.id)}
                  onCheckedChange={() => handleTypeToggle(type.id)}
                />
                <Label htmlFor={type.id}>{type.name}</Label>
              </div>
            ))}
          </div>

          <div className="flex justify-end space-x-2">
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button onClick={() => onApply(selectedTypes)}>
              Apply
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

const VariableDropdown: React.FC<{ onSelect: (variable: string) => void }> = ({ onSelect }) => {
  const variables = [
    '{EVENT_NAME}',
    '{EVENT_DATE}',
    '{EVENT_TIME}',
    '{EVENT_END_TIME}',
    '{TIMEZONE}',
    '{LOCATION}',
    '{ORGANIZER_NAME}',
    '{ATTENDEE}',
    '{ATTENDEE_FIRST_NAME}'
  ];

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">
          Add variable
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {variables.map((variable) => (
          <DropdownMenuItem 
            key={variable} 
            onClick={() => onSelect(variable)}
          >
            {variable}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export const WorkflowBuilder = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void }>();
  
  const template = location.state?.template;
  
  const [workflowName, setWorkflowName] = useState(template?.title || 'Custom workflow');
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>([]);
  const [showEventTypeDialog, setShowEventTypeDialog] = useState(false);
  const [actions, setActions] = useState([
    {
      id: '1',
      type: 'email-attendees',
      expanded: false,
      senderName: 'OneHash',
      messageTemplate: 'Reminder',
      emailSubject: 'Reminder: {EVENT_NAME} - {EVENT_DATE}',
      emailBody: 'Hi {ATTENDEE},\n\nThis is a reminder about your upcoming event.\n\nEvent: {EVENT_NAME}\nDate & Time: {EVENT_DATE} - {EVENT_END_TIME} {TIMEZONE}\n\nThis reminder was triggered by a Workflow in OneHash Cal.',
      includeCalendar: false,
      phoneNumber: '',
      countryCode: '+1',
      verificationCode: '',
      senderId: '',
      textMessage: ''
    }
  ]);

  const actionOptions = [
    { value: 'email-host', label: 'Send email to host' },
    { value: 'email-attendees', label: 'Send email to attendees' },
    { value: 'email-specific', label: 'Send email to a specific email address' },
    { value: 'sms-attendees', label: 'Send SMS to attendees' },
    { value: 'sms-specific', label: 'Send SMS to a specific number' },
    { value: 'whatsapp-attendee', label: 'Send WhatsApp message to attendee' },
    { value: 'whatsapp-specific', label: 'Send WhatsApp message to a specific number' }
  ];

  React.useEffect(() => {
    setHeaderMeta({
      title: 'Create Workflow',
      description: 'Build your custom workflow'
    });
  }, [setHeaderMeta]);

  const handleEventTypesApply = (types: string[]) => {
    setSelectedEventTypes(types);
    setShowEventTypeDialog(false);
  };

  const addAction = () => {
    const newAction = {
      id: Date.now().toString(),
      type: 'email-attendees',
      expanded: false,
      senderName: 'OneHash',
      messageTemplate: 'Reminder',
      emailSubject: '',
      emailBody: '',
      includeCalendar: false,
      phoneNumber: '',
      countryCode: '+1',
      verificationCode: '',
      senderId: '',
      textMessage: ''
    };
    setActions([...actions, newAction]);
  };

  const removeAction = (actionId: string) => {
    setActions(actions.filter(action => action.id !== actionId));
  };

  const updateAction = (actionId: string, field: string, value: any) => {
    setActions(actions.map(action => 
      action.id === actionId ? { ...action, [field]: value } : action
    ));
  };

  const toggleActionExpanded = (actionId: string) => {
    setActions(actions.map(action => 
      action.id === actionId ? { ...action, expanded: !action.expanded } : action
    ));
  };

  const insertVariable = (actionId: string, field: string, variable: string) => {
    const action = actions.find(a => a.id === actionId);
    if (action) {
      const currentValue = action[field as keyof typeof action] as string;
      updateAction(actionId, field, currentValue + variable);
    }
  };

  const isEmailAction = (type: string) => {
    return type.includes('email');
  };

  const isSMSAction = (type: string) => {
    return type.includes('sms') || type.includes('whatsapp');
  };

  return (
    <div className="p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center space-x-4 mb-8">
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => navigate('/workflows/templates')}
            className="gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back
          </Button>
          <div>
            <h1 className="text-2xl font-semibold">Create a workflow</h1>
            <p className="text-sm text-muted-foreground">Sanskar Yadav</p>
          </div>
        </div>
        
        <div className="space-y-6">
          <div>
            <Label htmlFor="workflow-name">Workflow name</Label>
            <Input
              id="workflow-name"
              value={workflowName}
              onChange={(e) => setWorkflowName(e.target.value)}
              className="mt-1"
            />
          </div>

          <div>
            <Label>Which event types will this apply to?</Label>
            <Button
              variant="outline"
              onClick={() => setShowEventTypeDialog(true)}
              className="w-full mt-1 justify-start text-muted-foreground"
            >
              {selectedEventTypes.length > 0 
                ? `${selectedEventTypes.length} event types selected`
                : 'Select...'
              }
            </Button>
          </div>

          {/* When this happens */}
          <Card>
            <CardHeader>
              <CardTitle>When this happens</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center justify-between p-4 bg-muted/50 rounded-lg">
                <span className="text-sm">24 hours after new event is booked</span>
                <Button variant="ghost" size="sm">
                  <Edit className="h-4 w-4" />
                  Edit
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Do this */}
          <Card>
            <CardHeader>
              <CardTitle>Do this</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {actions.map((action, index) => (
                <Card key={action.id} className="border">
                  <Collapsible>
                    <div className="p-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3 flex-1">
                          <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                            <span className="text-xs font-medium">📧</span>
                          </div>
                          <Select
                            value={action.type}
                            onValueChange={(value) => updateAction(action.id, 'type', value)}
                          >
                            <SelectTrigger className="w-64">
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              {actionOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex items-center space-x-2">
                          <CollapsibleTrigger asChild>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => toggleActionExpanded(action.id)}
                            >
                              {action.expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                            </Button>
                          </CollapsibleTrigger>
                          {actions.length > 1 && (
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={() => removeAction(action.id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          )}
                        </div>
                      </div>

                      <CollapsibleContent className="mt-4">
                        <div className="space-y-4">
                          {isEmailAction(action.type) && (
                            <>
                              <div>
                                <Label htmlFor={`sender-${action.id}`}>Sender name</Label>
                                <Input
                                  id={`sender-${action.id}`}
                                  value={action.senderName}
                                  onChange={(e) => updateAction(action.id, 'senderName', e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`template-${action.id}`}>Choose a template</Label>
                                <Select
                                  value={action.messageTemplate}
                                  onValueChange={(value) => updateAction(action.id, 'messageTemplate', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Custom">Custom</SelectItem>
                                    <SelectItem value="Reminder">Reminder</SelectItem>
                                    <SelectItem value="Thank You">Thank You</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`subject-${action.id}`}>Subject Line</Label>
                                  <VariableDropdown 
                                    onSelect={(variable) => insertVariable(action.id, 'emailSubject', variable)}
                                  />
                                </div>
                                <Input
                                  id={`subject-${action.id}`}
                                  value={action.emailSubject}
                                  onChange={(e) => updateAction(action.id, 'emailSubject', e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`body-${action.id}`}>Email Body</Label>
                                  <VariableDropdown 
                                    onSelect={(variable) => insertVariable(action.id, 'emailBody', variable)}
                                  />
                                </div>
                                <Textarea
                                  id={`body-${action.id}`}
                                  value={action.emailBody}
                                  onChange={(e) => updateAction(action.id, 'emailBody', e.target.value)}
                                  className="mt-1 min-h-32"
                                  placeholder="Enter email content..."
                                />
                              </div>

                              <div className="flex items-center space-x-2">
                                <Checkbox
                                  id={`calendar-${action.id}`}
                                  checked={action.includeCalendar}
                                  onCheckedChange={(checked) => updateAction(action.id, 'includeCalendar', checked)}
                                />
                                <Label htmlFor={`calendar-${action.id}`} className="text-sm">
                                  Include Calendar Event
                                </Label>
                              </div>
                            </>
                          )}

                          {isSMSAction(action.type) && (
                            <>
                              <div>
                                <Label htmlFor={`phone-${action.id}`}>Custom Phone Number</Label>
                                <div className="flex mt-1">
                                  <Select
                                    value={action.countryCode}
                                    onValueChange={(value) => updateAction(action.id, 'countryCode', value)}
                                  >
                                    <SelectTrigger className="w-20">
                                      <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                      <SelectItem value="+1">+1</SelectItem>
                                      <SelectItem value="+44">+44</SelectItem>
                                      <SelectItem value="+91">+91</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <Input
                                    id={`phone-${action.id}`}
                                    value={action.phoneNumber}
                                    onChange={(e) => updateAction(action.id, 'phoneNumber', e.target.value)}
                                    className="flex-1 ml-2"
                                    placeholder="Phone number"
                                  />
                                  <Button size="sm" className="ml-2">
                                    Send Code
                                  </Button>
                                </div>
                              </div>

                              {action.phoneNumber && (
                                <div>
                                  <Label htmlFor={`verification-${action.id}`}>Verification code</Label>
                                  <div className="flex mt-1">
                                    <Input
                                      id={`verification-${action.id}`}
                                      value={action.verificationCode}
                                      onChange={(e) => updateAction(action.id, 'verificationCode', e.target.value)}
                                      className="flex-1"
                                      placeholder="Enter verification code"
                                    />
                                    <Button size="sm" className="ml-2">
                                      Verify
                                    </Button>
                                  </div>
                                </div>
                              )}

                              <div>
                                <Label htmlFor={`sender-id-${action.id}`}>Sender ID</Label>
                                <Input
                                  id={`sender-id-${action.id}`}
                                  value={action.senderId}
                                  onChange={(e) => updateAction(action.id, 'senderId', e.target.value)}
                                  className="mt-1"
                                />
                              </div>

                              <div>
                                <Label htmlFor={`template-${action.id}`}>Choose a template</Label>
                                <Select
                                  value={action.messageTemplate}
                                  onValueChange={(value) => updateAction(action.id, 'messageTemplate', value)}
                                >
                                  <SelectTrigger className="mt-1">
                                    <SelectValue />
                                  </SelectTrigger>
                                  <SelectContent>
                                    <SelectItem value="Custom">Custom</SelectItem>
                                    <SelectItem value="Reminder">Reminder</SelectItem>
                                    <SelectItem value="Thank You">Thank You</SelectItem>
                                  </SelectContent>
                                </Select>
                              </div>

                              <div>
                                <div className="flex items-center justify-between">
                                  <Label htmlFor={`text-message-${action.id}`}>Text Message</Label>
                                  <VariableDropdown 
                                    onSelect={(variable) => insertVariable(action.id, 'textMessage', variable)}
                                  />
                                </div>
                                <Textarea
                                  id={`text-message-${action.id}`}
                                  value={action.textMessage}
                                  onChange={(e) => updateAction(action.id, 'textMessage', e.target.value)}
                                  className="mt-1 min-h-32"
                                  placeholder="Enter text message..."
                                />
                              </div>
                            </>
                          )}
                        </div>
                      </CollapsibleContent>
                    </div>
                  </Collapsible>
                </Card>
              ))}
              
              <Button variant="ghost" onClick={addAction} className="w-full border-dashed border-2">
                <Plus className="h-4 w-4 mr-2" />
                Add action
              </Button>
              
              <div className="text-right text-xs text-muted-foreground">
                {actions.length}/5 actions added
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="flex justify-end space-x-2 pt-6 border-t mt-8">
          <Button variant="outline" onClick={() => navigate('/workflows')}>
            Delete Workflow
          </Button>
          <Button onClick={() => navigate('/workflows')}>
            Save Workflow
          </Button>
        </div>
      </div>

      <EventTypeDialog
        open={showEventTypeDialog}
        onOpenChange={setShowEventTypeDialog}
        onApply={handleEventTypesApply}
      />
    </div>
  );
};