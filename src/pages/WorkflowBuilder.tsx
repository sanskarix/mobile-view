import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, useOutletContext } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Plus, ArrowLeft, ChevronDown, Trash2, Mail, MessageSquare, MessageCircle } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { HeaderMeta } from '@/components/Layout';

const VariableDropdown: React.FC<{
  onSelect: (variable: string) => void;
}> = ({ onSelect }) => {
  const variables = ['{EVENT_NAME}', '{EVENT_DATE}', '{EVENT_TIME}', '{EVENT_END_TIME}', '{TIMEZONE}', '{LOCATION}', '{ORGANIZER_NAME}', '{ATTENDEE}', '{ATTENDEE_FIRST_NAME}'];
  
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="text-xs">
          Add variable
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {variables.map(variable => (
          <DropdownMenuItem key={variable} onClick={() => onSelect(variable)}>
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
  const { setHeaderMeta } = useOutletContext<{ setHeaderMeta: (meta: HeaderMeta) => void; }>();
  
  const template = location.state?.template;
  const editWorkflow = location.state?.editWorkflow;
  
  // Pre-fill data from template or edit workflow
  const [workflowName, setWorkflowName] = useState(
    template?.workflowName || editWorkflow?.title || template?.title || ''
  );
  const [selectedEventTypes, setSelectedEventTypes] = useState<string[]>(
    editWorkflow?.selectedEventTypes || template?.selectedEventTypes || []
  );
  const [trigger, setTrigger] = useState(
    editWorkflow?.trigger || template?.trigger || ''
  );
  const [triggerTiming, setTriggerTiming] = useState(
    editWorkflow?.triggerTiming || template?.triggerTiming || 'immediately'
  );
  const [customTime, setCustomTime] = useState(
    editWorkflow?.customTime || template?.customTime || ''
  );
  const [timeUnit, setTimeUnit] = useState(
    editWorkflow?.timeUnit || template?.timeUnit || 'hours'
  );

  // Progressive reveal states
  const [showEventTypeSection, setShowEventTypeSection] = useState(!!workflowName.trim());
  const [showTriggerSection, setShowTriggerSection] = useState(
    !!workflowName.trim() && selectedEventTypes.length > 0
  );
  const [showActionsSection, setShowActionsSection] = useState(
    !!workflowName.trim() && selectedEventTypes.length > 0 && !!trigger && !!triggerTiming
  );
  const [isCentered, setIsCentered] = useState(!workflowName.trim());

  const [actions, setActions] = useState(
    editWorkflow?.actions || template?.actions || [{
      id: '1',
      type: 'email-attendees',
      expanded: true, // First action starts expanded
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
    }]
  );

  const triggerOptions = [
    { value: 'new-booking', label: 'When new event is booked' },
    { value: 'before-event', label: 'Before event starts' },
    { value: 'event-rescheduled', label: 'When event is rescheduled' },
    { value: 'after-event', label: 'After event ends' },
    { value: 'event-cancelled', label: 'When event is canceled' },
    { value: 'no-show', label: 'Invitee is marked no-show' }
  ];

  const actionOptions = [
    { value: 'email-host', label: 'Send email to host' },
    { value: 'email-attendees', label: 'Send email to attendees' },
    { value: 'email-specific', label: 'Send email to a specific email address' },
    { value: 'sms-attendees', label: 'Send SMS to attendees' },
    { value: 'sms-specific', label: 'Send SMS to a specific number' },
    { value: 'whatsapp-attendee', label: 'Send WhatsApp message to attendee' },
    { value: 'whatsapp-specific', label: 'Send WhatsApp message to a specific number' }
  ];

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

  useEffect(() => {
    setHeaderMeta({
      title: editWorkflow ? 'Edit Workflow' : 'Create Workflow',
      description: editWorkflow ? 'Edit your workflow' : 'Build your custom workflow'
    });
  }, [setHeaderMeta, editWorkflow]);

  // Animation trigger: Show event types section after workflow name
  useEffect(() => {
    if (workflowName.trim() && !showEventTypeSection) {
      setTimeout(() => {
        setShowEventTypeSection(true);
        setIsCentered(false);
      }, 300);
    }
  }, [workflowName, showEventTypeSection]);

  // Animation trigger: Show trigger section after event type selection
  useEffect(() => {
    if (selectedEventTypes.length > 0 && !showTriggerSection) {
      setTimeout(() => {
        setShowTriggerSection(true);
      }, 500);
    }
  }, [selectedEventTypes, showTriggerSection]);

  // Animation trigger: Show actions section after trigger configuration
  useEffect(() => {
    if (trigger && triggerTiming && !showActionsSection) {
      setTimeout(() => {
        setShowActionsSection(true);
      }, 500);
    }
  }, [trigger, triggerTiming, showActionsSection]);

  const getTriggerText = () => {
    const selectedTrigger = triggerOptions.find(t => t.value === trigger);
    if (!selectedTrigger) return '';
    
    const baseText = selectedTrigger.label.toLowerCase();
    if (triggerTiming === 'immediately') {
      return `Immediately when ${baseText.replace('when ', '').replace('before ', '').replace('after ', '')}`;
    } else {
      const timeText = `${customTime} ${timeUnit}`;
      if (trigger === 'before-event') {
        return `${timeText} before event starts`;
      } else if (trigger === 'after-event') {
        return `${timeText} after event ends`;
      } else {
        return `${timeText} after ${baseText.replace('when ', '')}`;
      }
    }
  };

  const handleEventTypeSelection = (categoryId: string, typeId: string) => {
    const isSelected = selectedEventTypes.includes(typeId);
    if (isSelected) {
      setSelectedEventTypes(prev => prev.filter(id => id !== typeId));
    } else {
      setSelectedEventTypes(prev => [...prev, typeId]);
    }
  };

  const addAction = () => {
    if (actions.length >= 5) return; // Max 5 actions
    
    const newAction = {
      id: Date.now().toString(),
      type: 'email-attendees',
      expanded: true, // New actions open in expanded form
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

  const getActionIcon = (type: string) => {
    if (type.includes('email')) {
      return <Mail className="h-4 w-4 text-blue-600" />;
    } else if (type.includes('sms')) {
      return <MessageSquare className="h-4 w-4 text-yellow-600" />;
    } else if (type.includes('whatsapp')) {
      return <MessageCircle className="h-4 w-4 text-green-600" />;
    }
    return <Mail className="h-4 w-4 text-blue-600" />;
  };

  const getActionDisplayName = (type: string) => {
    const option = actionOptions.find(opt => opt.value === type);
    return option ? option.label : type;
  };

  const handleSaveWorkflow = () => {
    const workflowData = {
      id: editWorkflow?.id || `workflow-${Date.now()}`,
      title: workflowName,
      trigger: getTriggerText(),
      action: getActionDisplayName(actions[0]?.type || 'email-attendees'),
      actions: actions.map(action => getActionDisplayName(action.type)),
      enabled: editWorkflow?.enabled ?? true,
      eventTypeInfo: `Active on ${selectedEventTypes.length} event type${selectedEventTypes.length !== 1 ? 's' : ''}`,
      teamName: 'Personal',
      createdAt: editWorkflow?.createdAt || new Date().toISOString(),
      selectedEventTypes,
      triggerTiming,
      customTime,
      timeUnit,
      triggerType: trigger,
      workflowActions: actions
    };

    // Save to localStorage
    const existingWorkflows = JSON.parse(localStorage.getItem('workflows') || '[]');
    const updatedWorkflows = editWorkflow 
      ? existingWorkflows.map((w: any) => w.id === editWorkflow.id ? workflowData : w)
      : [...existingWorkflows, workflowData];
    
    localStorage.setItem('workflows', JSON.stringify(updatedWorkflows));
    navigate('/workflows');
  };

  return (
    <div className="flex p-6 bg-background justify-center min-h-screen">
      <div className="w-full mx-auto p-6 bg-background"> 
        {/* Workflow Name Section - Centered initially */}
        <div
          className={`workflow-center-transition ${
            isCentered ? 'mx-auto max-w-lg text-center mt-32' : 'mx-auto max-w-2xl'
          }`}
        >
          <div className={`w-full space-y-6 border rounded-lg p-6 bg-card ${isCentered ? 'text-center' : ''}`}>
            <div className="space-y-6">
              <div>
                <Label htmlFor="workflow-name" className={isCentered ? 'text-lg font-medium' : ''}>
                  Workflow name
                </Label>
                <Input 
                  id="workflow-name" 
                  value={workflowName} 
                  onChange={e => setWorkflowName(e.target.value)} 
                  className="mt-2" 
                  placeholder="Enter workflow name" 
                />
              </div>

              {/* Event Type Selection - Shows with animation after name is entered */}
              {showEventTypeSection && (
                <div className={`transition-all duration-700 ease-in-out animate-in slide-in-from-bottom-4 ${isCentered ? '' : 'animate-in slide-in-from-right-4'}`}>
                  <Label className={isCentered ? 'text-lg font-medium' : ''}>
                    Which event types will this apply to?
                  </Label>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="outline" className="w-full mt-2 justify-between">
                        {selectedEventTypes.length > 0 
                          ? `${selectedEventTypes.length} event types selected` 
                          : 'Select event types...'
                        }
                        <ChevronDown className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-80">
                      <div className="p-4 space-y-4">
                        <div>
                          <h4 className="font-medium mb-2">Personal</h4>
                          {eventTypes.personal.map(type => (
                            <div key={type.id} className="flex items-center space-x-2 mb-2">
                              <Checkbox 
                                id={type.id} 
                                checked={selectedEventTypes.includes(type.id)} 
                                onCheckedChange={() => handleEventTypeSelection('personal', type.id)} 
                              />
                              <Label htmlFor={type.id} className="text-sm">{type.name}</Label>
                            </div>
                          ))}
                        </div>
                        <Separator />
                        <div>
                          <h4 className="font-medium mb-2">Teams</h4>
                          {eventTypes.teams.map(type => (
                            <div key={type.id} className="flex items-center space-x-2 mb-2">
                              <Checkbox 
                                id={type.id} 
                                checked={selectedEventTypes.includes(type.id)} 
                                onCheckedChange={() => handleEventTypeSelection('teams', type.id)} 
                              />
                              <Label htmlFor={type.id} className="text-sm">{type.name}</Label>
                            </div>
                          ))}
                        </div>
                      </div>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Trigger Section - Shows with animation after event types selected */}
        {showTriggerSection && (
          <div className="transition-all duration-700 ease-in-out animate-in slide-in-from-bottom-8 mt-8 mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>When this happens</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Select value={trigger} onValueChange={setTrigger}>
                    <SelectTrigger className="mt-2">
                      <SelectValue placeholder="Select an occurrence" />
                    </SelectTrigger>
                    <SelectContent>
                      {triggerOptions.map(option => (
                        <SelectItem key={option.value} value={option.value}>
                          {option.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {trigger && (
                  <div className="transition-all duration-500 ease-in-out animate-in slide-in-from-bottom-4 space-y-4">
                    <div>
                      <Label className="text-sm">
                        How long {trigger === 'before-event' ? 'before' : 'after'} {
                          triggerOptions.find(t => t.value === trigger)?.label
                            .toLowerCase()
                            .replace('when ', '')
                            .replace('before ', '')
                            .replace('after ', '')
                        }?
                      </Label>
                      
                      <div className="mt-2 space-y-3">
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="immediately" 
                            name="timing" 
                            value="immediately" 
                            checked={triggerTiming === 'immediately'} 
                            onChange={e => setTriggerTiming(e.target.value)} 
                          />
                          <Label htmlFor="immediately" className="text-sm text-muted-foreground">
                            Immediately when {
                              triggerOptions.find(t => t.value === trigger)?.label
                                .toLowerCase()
                                .replace('when ', '')
                                .replace('before ', '')
                                .replace('after ', '')
                            }
                          </Label>
                        </div>
                        
                        <div className="flex items-center space-x-2">
                          <input 
                            type="radio" 
                            id="custom" 
                            name="timing" 
                            value="custom" 
                            checked={triggerTiming === 'custom'} 
                            onChange={e => setTriggerTiming(e.target.value)} 
                          />
                          <div className="flex items-center space-x-2 flex-1">
                            <Input 
                              value={customTime} 
                              onChange={e => setCustomTime(e.target.value)} 
                              className="w-20" 
                              placeholder="24" 
                              onClick={() => setTriggerTiming('custom')} 
                            />
                            <Select value={timeUnit} onValueChange={setTimeUnit}>
                              <SelectTrigger className="w-24">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="minutes">minutes</SelectItem>
                                <SelectItem value="hours">hours</SelectItem>
                                <SelectItem value="days">days</SelectItem>
                              </SelectContent>
                            </Select>
                            <span className="text-sm text-muted-foreground">
                              {trigger === 'before-event' ? 'before' : 'after'} {
                                triggerOptions.find(t => t.value === trigger)?.label
                                  .toLowerCase()
                                  .replace('when ', '')
                                  .replace('before ', '')
                                  .replace('after ', '')
                              }
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Actions Section - Shows with animation after trigger is configured */}
        {showActionsSection && (
          <div className="transition-all duration-700 ease-in-out animate-in slide-in-from-bottom-8 mt-8 mx-auto max-w-2xl">
            <Card>
              <CardHeader>
                <CardTitle>Do this</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {actions.map((action, index) => (
                  <Card 
                    key={action.id} 
                    className="border cursor-pointer" 
                    onClick={() => !action.expanded && toggleActionExpanded(action.id)}
                  >
                    <Collapsible open={action.expanded} onOpenChange={() => toggleActionExpanded(action.id)}>
                      <div className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3 flex-1">
                            <div className="w-8 h-8 bg-blue-100 rounded flex items-center justify-center">
                              {getActionIcon(action.type)}
                            </div>
                            {/* Action name as text in card view, dropdown in expanded view */}
                            {action.expanded ? (
                              <Select value={action.type} onValueChange={value => updateAction(action.id, 'type', value)}>
                                <SelectTrigger className="w-64">
                                  <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                  {actionOptions.map(option => (
                                    <SelectItem key={option.value} value={option.value}>
                                      {option.label}
                                    </SelectItem>
                                  ))}
                                </SelectContent>
                              </Select>
                            ) : (
                              <span className="text-sm font-medium">{getActionDisplayName(action.type)}</span>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <CollapsibleTrigger asChild>
                              <Button variant="ghost" size="sm" className="p-2">
                                <ChevronDown className={`h-4 w-4 transition-transform ${action.expanded ? 'rotate-180' : ''}`} />
                              </Button>
                            </CollapsibleTrigger>
                            {actions.length > 1 && (
                              <Button 
                                variant="ghost" 
                                size="sm" 
                                onClick={(e) => {
                                  e.stopPropagation();
                                  removeAction(action.id);
                                }} 
                                className="p-2"
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
                                    onChange={e => updateAction(action.id, 'senderName', e.target.value)} 
                                    className="mt-1" 
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`template-${action.id}`}>Choose a template</Label>
                                  <Select 
                                    value={action.messageTemplate} 
                                    onValueChange={value => updateAction(action.id, 'messageTemplate', value)}
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
                                    <VariableDropdown onSelect={variable => insertVariable(action.id, 'emailSubject', variable)} />
                                  </div>
                                  <Input 
                                    id={`subject-${action.id}`} 
                                    value={action.emailSubject} 
                                    onChange={e => updateAction(action.id, 'emailSubject', e.target.value)} 
                                    className="mt-1" 
                                  />
                                </div>

                                <div>
                                  <div className="flex items-center justify-between">
                                    <Label htmlFor={`body-${action.id}`}>Email Body</Label>
                                    <VariableDropdown onSelect={variable => insertVariable(action.id, 'emailBody', variable)} />
                                  </div>
                                  <Textarea 
                                    id={`body-${action.id}`} 
                                    value={action.emailBody} 
                                    onChange={e => updateAction(action.id, 'emailBody', e.target.value)} 
                                    className="mt-1 min-h-32" 
                                    placeholder="Enter email content..." 
                                  />
                                </div>

                                <div className="flex items-center space-x-2">
                                  <Checkbox 
                                    id={`calendar-${action.id}`} 
                                    checked={action.includeCalendar} 
                                    onCheckedChange={checked => updateAction(action.id, 'includeCalendar', checked)} 
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
                                      onValueChange={value => updateAction(action.id, 'countryCode', value)}
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
                                      onChange={e => updateAction(action.id, 'phoneNumber', e.target.value)} 
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
                                        onChange={e => updateAction(action.id, 'verificationCode', e.target.value)} 
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
                                    onChange={e => updateAction(action.id, 'senderId', e.target.value)} 
                                    className="mt-1" 
                                  />
                                </div>

                                <div>
                                  <Label htmlFor={`template-${action.id}`}>Choose a template</Label>
                                  <Select 
                                    value={action.messageTemplate} 
                                    onValueChange={value => updateAction(action.id, 'messageTemplate', value)}
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
                                    <VariableDropdown onSelect={variable => insertVariable(action.id, 'textMessage', variable)} />
                                  </div>
                                  <Textarea 
                                    id={`text-message-${action.id}`} 
                                    value={action.textMessage} 
                                    onChange={e => updateAction(action.id, 'textMessage', e.target.value)} 
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
                
                {actions.length < 5 && (
                  <Button variant="ghost" onClick={addAction} className="w-full border-dashed border-2">
                    <Plus className="h-4 w-4 mr-2" />
                    Add action
                  </Button>
                )}
                
                <div className="text-right text-xs text-muted-foreground">
                  {actions.length}/5 actions added
                </div>
              </CardContent>
            </Card>

            <div className="flex justify-end space-x-2 pt-6 mt-8">
              <Button variant="outline" onClick={() => navigate('/workflows')}>
                Delete Workflow
              </Button>
              <Button onClick={handleSaveWorkflow}>
                Save Workflow
              </Button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
