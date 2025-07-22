import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Copy, Info, ChevronDown, ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';
import { BookingQuestionModal } from './BookingQuestionModal';

export const EventAdvanced = () => {
  const [settings, setSettings] = useState({
    requiresConfirmation: false,
    confirmationMode: 'always',
    confirmationMinutes: 60,
    confirmationUnit: 'minutes',
    unconfirmedBlockSlots: false,
    enableCaptcha: true,
    requiresEmailVerification: true,
    hideNotesInCalendar: true,
    disableCancelReschedule: true,
    hideCalendarEventDetails: true,
    redirectOnBooking: true,
    privateLinks: true,
    offerSeats: true,
    shareAttendeeInfo: false,
    showAvailableSeats: true,
    lockTimezoneOnBooking: true,
    eventTypeColor: true,
    useOrganizerEmail: false,
    eventLayout: ['month'],
    defaultView: 'month',
    redirectUrl: 'https://example.com/redirect-to-my-success-page',
    privateUrl: 'https://cal.id/d/8PbkRpaPETyarTmT8ooyy/product-hunt-chats',
    seats: 2,
    lightThemeColor: '007ee5',
    darkThemeColor: 'fafafa'
  });

  const [privateLinks, setPrivateLinks] = useState([
    'https://cal.id/d/8PbkRpaPETyarTmT8ooyy/product-hunt-chats'
  ]);

  const [bookingQuestionStates, setBookingQuestionStates] = useState({
    name: true,
    email: true,
    phone: false,
    meetingAbout: false,
    additionalNotes: false,
    addGuests: false,
    rescheduleReason: false
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});

  const toggleDropdown = (key: string) => {
    setDropdownStates(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const CustomSelect = ({ 
    value, 
    options, 
    onChange, 
    placeholder, 
    dropdownKey 
  }: { 
    value: string; 
    options: { value: string; label: string }[]; 
    onChange: (value: string) => void; 
    placeholder?: string;
    dropdownKey: string;
  }) => {
    const isOpen = dropdownStates[dropdownKey] || false;
    const selectedOption = options.find(opt => opt.value === value);

    return (
      <div className="relative">
        <button
          type="button"
          onClick={() => toggleDropdown(dropdownKey)}
          className="w-full h-10 px-3 border border-border rounded-md bg-background text-left flex items-center justify-between hover:bg-muted/50 transition-colors text-sm"
        >
          <span className={selectedOption ? 'text-foreground' : 'text-muted-foreground'}>
            {selectedOption ? selectedOption.label : placeholder}
          </span>
          {isOpen ? (
            <ChevronUp className="h-4 w-4 text-muted-foreground" />
          ) : (
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          )}
        </button>

        {isOpen && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-md shadow-lg z-50 max-h-60 overflow-y-auto">
            {options.map((option) => (
              <button
                key={option.value}
                type="button"
                onClick={() => {
                  onChange(option.value);
                  toggleDropdown(dropdownKey);
                }}
                className="w-full px-3 py-2 text-left text-sm hover:bg-muted transition-colors text-foreground"
              >
                {option.label}
              </button>
            ))}
          </div>
        )}
      </div>
    );
  };

  const layoutOptions = [{
    id: 'month',
    name: 'Month',
    icon: Monitor,
    description: 'Monthly calendar view',
    image: '/lovable-uploads/ddd1363c-3f5b-4bb2-80fb-ba17af1d3406.png'
  }, {
    id: 'week',
    name: 'Weekly',
    icon: Smartphone,
    description: 'Weekly calendar view',
    image: '/lovable-uploads/9e8be59c-be3a-4863-84f1-0aea0f9736c3.png'
  }, {
    id: 'column',
    name: 'Column',
    icon: Tablet,
    description: 'Column layout view',
    image: '/lovable-uploads/250cba12-30a8-4629-9401-ee5a78dee766.png'
  }];

  const handleToggle = (setting: string, value: boolean) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const handleBookingQuestionToggle = (questionKey: string, value: boolean) => {
    setBookingQuestionStates(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const handleCopyPrivateLink = (link: string) => {
    navigator.clipboard.writeText(link);
  };

  const handleEditQuestion = (question: any) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setModalOpen(true);
  };

  const addNewPrivateLink = () => {
    const newLink = `https://cal.id/d/${Date.now()}/product-hunt-chats`;
    setPrivateLinks(prev => [...prev, newLink]);
  };

  const handleLayoutToggle = (layoutId: string) => {
    setSettings(prev => ({
      ...prev,
      eventLayout: prev.eventLayout.includes(layoutId)
        ? prev.eventLayout.filter(id => id !== layoutId)
        : [...prev.eventLayout, layoutId]
    }));
  };

  const bookingQuestions = [{
    label: 'Your name',
    type: 'Name',
    required: true,
    key: 'name'
  }, {
    label: 'Email Address',
    type: 'Email',
    required: true,
    key: 'email'
  }, {
    label: 'Phone Number',
    type: 'Phone',
    required: false,
    key: 'phone'
  }, {
    label: 'What is this meeting about?',
    type: 'Short Text',
    required: false,
    key: 'meetingAbout'
  }, {
    label: 'Additional notes',
    type: 'Long Text',
    required: false,
    key: 'additionalNotes'
  }, {
    label: 'Add guests',
    type: 'Multiple Emails',
    required: false,
    key: 'addGuests'
  }, {
    label: 'Reason for reschedule',
    type: 'Long Text',
    required: false,
    key: 'rescheduleReason'
  }];

  return <div className="p-0 max-w-none mx-auto space-y-8" style={{
    fontSize: '14px',
    color: '#384252'
  }}>
      {/* Add to calendar */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4" style={{
          fontSize: '16px',
          color: '#384252'
        }}>Add to calendar</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-medium mb-3" style={{
              fontSize: '14px',
              color: '#384252'
            }}>Default</label>
              <CustomSelect
                value="sanskarix@gmail.com"
                options={[{ value: 'sanskarix@gmail.com', label: 'sanskarix@gmail.com (Google Calendar - sanskarix@gmail.com)' }]}
                onChange={() => {}}
                dropdownKey="defaultCalendar"
              />
              <p className="mt-2" style={{
              fontSize: '12px',
              color: '#384252'
            }}>The calendar to add bookings to</p>
            </div>
            <div>
              <label className="block font-medium mb-3" style={{
              fontSize: '14px',
              color: '#384252'
            }}>With event name</label>
              <input type="text" placeholder="Product Hunt Chats between Sanskar Yadav and {Scheduler}" className="w-full h-10 px-3 border border-border rounded-md text-sm" />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Switch 
              checked={settings.useOrganizerEmail} 
              onCheckedChange={value => handleToggle('useOrganizerEmail', value)} 
            />
            <label className="font-medium flex items-center space-x-2" style={{
            fontSize: '14px',
            color: '#384252'
          }}>
              <span>Use "Add to calendar" email as the organizer</span>
              <div className="relative group">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-black text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  If enabled, we'll display the email address from your "Add to calendar" as organizer and send confirmation emails there
                </div>
              </div>
            </label>
          </div>
          
          {!settings.useOrganizerEmail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="mx-[58px]">
                <CustomSelect
                  value="sanskarix@gmail.com"
                  options={[{ value: 'sanskarix@gmail.com', label: 'sanskarix@gmail.com' }]}
                  onChange={() => {}}
                  dropdownKey="organizerEmail"
                />
                <p className="mt-2" style={{
                fontSize: '12px',
                color: '#384252'
              }}>We'll display this email address as the organizer, and send confirmation emails here.</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Layout */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="font-semibold mb-4" style={{
          fontSize: '16px',
          color: '#384252'
        }}>Layout</h3>
        <p className="mb-6" style={{
          fontSize: '14px',
          color: '#384252'
        }}>You can select multiple and your bookers can switch views.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {layoutOptions.map(layout => <div key={layout.id} className="space-y-3">
              <div className={`relative p-4 border-2 rounded-lg cursor-pointer transition-all aspect-video ${settings.eventLayout.includes(layout.id) ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => handleLayoutToggle(layout.id)}>
                <img src={layout.image} alt={layout.name} className="w-full h-full object-cover rounded" />
                {settings.eventLayout.includes(layout.id) && (
                  <div className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                )}
              </div>
              <div className="text-center">
                <label className="font-medium" style={{
                  fontSize: '14px',
                  color: '#384252'
                }}>{layout.name}</label>
              </div>
            </div>)}
        </div>

        <div>
          <h4 className="font-medium mb-4" style={{
            fontSize: '14px',
            color: '#384252'
          }}>Default view</h4>
          <div className="flex w-full border border-border rounded-lg overflow-hidden">
            {layoutOptions.map((layout, index) => (
              <button
                key={layout.id}
                onClick={() => setSettings(prev => ({ ...prev, defaultView: layout.id }))}
                className={`flex-1 py-3 px-4 text-sm font-medium transition-colors ${
                  settings.defaultView === layout.id 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-background text-foreground hover:bg-muted'
                } ${index > 0 ? 'border-l border-border' : ''}`}
              >
                {layout.name}
              </button>
            ))}
          </div>
          <p className="mt-3" style={{
            fontSize: '14px',
            color: '#384252'
          }}>
            You can manage this for all your event types in Settings → <a href="/settings/appearance" className="text-blue-600 hover:underline">Appearance</a> or Override for this event only.
          </p>
        </div>
      </div>

      {/* Booking questions */}
      <div className="border-t border-gray-200 pt-8">
        <h3 className="font-semibold mb-4" style={{
          fontSize: '16px',
          color: '#384252'
        }}>Booking questions</h3>
        <p className="mb-6" style={{
          fontSize: '14px',
          color: '#384252'
        }}>Customize the questions asked on the booking page</p>
        
        <div className="space-y-4 mb-6">
          {bookingQuestions.map((question, index) => <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
              <div className="flex items-center space-x-4 flex-1">
                <div className="flex-1">
                  <div className="flex items-center space-x-2">
                    <span className="font-medium" style={{
                      fontSize: '14px',
                      color: '#384252'
                    }}>
                      {question.label}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                    </span>
                  </div>
                  <p className="mt-1" style={{
                    fontSize: '12px',
                    color: '#384252'
                  }}>{question.type}</p>
                </div>
                <button onClick={() => handleEditQuestion(question)} className="text-blue-600 hover:text-blue-700 mr-4" style={{
                  fontSize: '14px'
                }}>
                  Edit
                </button>
              </div>
              <Switch checked={bookingQuestionStates[question.key]} onCheckedChange={value => handleBookingQuestionToggle(question.key, value)} />
            </div>)}
        </div>

        <button 
          onClick={handleAddQuestion}
          className="text-blue-600 hover:text-blue-700 font-medium" 
          style={{ fontSize: '14px' }}
        >
          + Add a question
        </button>
      </div>

      {/* Settings toggles */}
      <div className="border-t border-gray-200 pt-8 space-y-8">
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Requires confirmation</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>The booking needs to be manually confirmed before it is pushed to the integrations and a confirmation mail is sent.</p>
            </div>
            <Switch checked={settings.requiresConfirmation} onCheckedChange={value => handleToggle('requiresConfirmation', value)} />
          </div>
          
          {settings.requiresConfirmation && (
            <div className="pl-8 space-y-4">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="always"
                    name="confirmationMode"
                    checked={settings.confirmationMode === 'always'}
                    onChange={() => setSettings(prev => ({ ...prev, confirmationMode: 'always' }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="always" style={{ fontSize: '14px', color: '#384252' }}>
                    Always
                  </label>
                </div>
                
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    id="shortNotice"
                    name="confirmationMode"
                    checked={settings.confirmationMode === 'shortNotice'}
                    onChange={() => setSettings(prev => ({ ...prev, confirmationMode: 'shortNotice' }))}
                    className="w-4 h-4"
                  />
                  <label htmlFor="shortNotice" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
                    <span>When booked with less than</span>
                    <input
                      type="number"
                      value={settings.confirmationMinutes}
                      onChange={(e) => setSettings(prev => ({ ...prev, confirmationMinutes: parseInt(e.target.value) }))}
                      className="w-16 h-8 px-2 border border-border rounded text-sm"
                      min="1"
                      disabled={settings.confirmationMode !== 'shortNotice'}
                    />
                    <CustomSelect
                      value={settings.confirmationUnit}
                      options={[
                        { value: 'minutes', label: 'mins' },
                        { value: 'hours', label: 'hours' }
                      ]}
                      onChange={(value) => setSettings(prev => ({ ...prev, confirmationUnit: value }))}
                      dropdownKey="confirmationUnit"
                    />
                    <span>notice</span>
                  </label>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <input
                  type="checkbox"
                  checked={settings.unconfirmedBlockSlots}
                  onChange={(e) => handleToggle('unconfirmedBlockSlots', e.target.checked)}
                  className="w-4 h-4"
                />
                <label style={{ fontSize: '14px', color: '#384252' }}>
                  Unconfirmed bookings still block calendar slots.
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium" style={{
              fontSize: '14px',
              color: '#384252'
            }}>Enable captcha on Booking page</h3>
            <p style={{
              fontSize: '14px',
              color: '#384252'
            }}>By enabling captcha, you'll prevent automated bots from booking you.</p>
          </div>
          <Switch checked={settings.enableCaptcha} onCheckedChange={value => handleToggle('enableCaptcha', value)} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Requires booker email verification</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>To ensure booker's email verification before scheduling events</p>
            </div>
            <Switch checked={settings.requiresEmailVerification} onCheckedChange={value => handleToggle('requiresEmailVerification', value)} />
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium" style={{
              fontSize: '14px',
              color: '#384252'
            }}>Hide notes in calendar</h3>
            <p style={{
              fontSize: '14px',
              color: '#384252'
            }}>For privacy reasons, additional inputs and notes will be hidden in the calendar entry. They will still be sent to your email.</p>
          </div>
          <Switch checked={settings.hideNotesInCalendar} onCheckedChange={value => handleToggle('hideNotesInCalendar', value)} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium" style={{
              fontSize: '14px',
              color: '#384252'
            }}>Disable Cancel and Reschedule options for this event type</h3>
            <p style={{
              fontSize: '14px',
              color: '#384252'
            }}>Attendees will not be able to cancel or reschedule their bookings</p>
          </div>
          <Switch checked={settings.disableCancelReschedule} onCheckedChange={value => handleToggle('disableCancelReschedule', value)} />
        </div>

        <div className="flex items-center justify-between">
          <div className="flex-1">
            <h3 className="font-medium" style={{
              fontSize: '14px',
              color: '#384252'
            }}>Hide calendar event details on shared calendars</h3>
            <p style={{
              fontSize: '14px',
              color: '#384252'
            }}>When a calendar is shared, events are visible to readers but their details are hidden from those without write access.</p>
          </div>
          <Switch checked={settings.hideCalendarEventDetails} onCheckedChange={value => handleToggle('hideCalendarEventDetails', value)} />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Redirect on booking</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>Redirect to a custom URL after a successful booking</p>
            </div>
            <Switch checked={settings.redirectOnBooking} onCheckedChange={value => handleToggle('redirectOnBooking', value)} />
          </div>
          
          {settings.redirectOnBooking && <div className="pl-12">
              <input type="url" value={settings.redirectUrl} onChange={e => setSettings(prev => ({
            ...prev,
            redirectUrl: e.target.value
          }))} placeholder="https://example.com/redirect-to-my-success-page" className="w-full h-10 px-3 border border-border rounded-md text-sm" />
              <div className="flex items-center mt-3">
                <input type="checkbox" id="forward-params" className="mr-2" />
                <label htmlFor="forward-params" style={{
                  fontSize: '14px',
                  color: '#384252'
                }}>
                  Forward parameters such as ?email=...&name=... and more
                </label>
              </div>
            </div>}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Private Links</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>Generate private URLs without exposing the username, which will be destroyed once used</p>
            </div>
            <Switch checked={settings.privateLinks} onCheckedChange={value => handleToggle('privateLinks', value)} />
          </div>
          
          {settings.privateLinks && <div className="pl-8 space-y-4">
              {privateLinks.map((link, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-1" style={{
                    fontSize: '14px',
                    color: '#384252'
                  }}>{link}</span>
                  <button onClick={() => handleCopyPrivateLink(link)} className="p-1 hover:bg-gray-200 rounded" title="Copy private link">
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                </div>
              ))}
              <button 
                onClick={addNewPrivateLink}
                className="text-blue-600 hover:text-blue-700" 
                style={{ fontSize: '14px' }}
              >
                + Add new link
              </button>
            </div>}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Offer seats</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>Offer seats for booking. This automatically disables guest & opt-in bookings.</p>
            </div>
            <Switch checked={settings.offerSeats} onCheckedChange={value => handleToggle('offerSeats', value)} />
          </div>
          
          {settings.offerSeats && <div className="pl-8 space-y-4">
              <div className="flex items-center space-x-4">
                <input type="number" value={settings.seats} onChange={e => setSettings(prev => ({
              ...prev,
              seats: parseInt(e.target.value)
            }))} className="w-20 h-10 px-3 border border-border rounded-md text-sm" />
                <span style={{
                  fontSize: '14px',
                  color: '#384252'
                }}>seats</span>
              </div>
              
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="show-available-seats" checked={settings.showAvailableSeats} onChange={e => handleToggle('showAvailableSeats', e.target.checked)} />
                  <label htmlFor="show-available-seats" style={{
                    fontSize: '14px',
                    color: '#384252'
                  }}>
                    Show the number of available seats
                  </label>
                </div>
                <div className="flex items-center space-x-2">
                  <input type="checkbox" id="share-attendee-info" checked={settings.shareAttendeeInfo} onChange={e => handleToggle('shareAttendeeInfo', e.target.checked)} />
                  <label htmlFor="share-attendee-info" style={{
                    fontSize: '14px',
                    color: '#384252'
                  }}>
                    Share attendee information between guests
                  </label>
                </div>
              </div>
            </div>}
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Lock timezone on booking page</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>To lock the timezone on booking page, useful for in-person events.</p>
            </div>
            <Switch checked={settings.lockTimezoneOnBooking} onCheckedChange={value => handleToggle('lockTimezoneOnBooking', value)} />
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="flex-1">
              <h3 className="font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Event type color</h3>
              <p style={{
                fontSize: '14px',
                color: '#384252'
              }}>This is only used for event type & booking differentiation within the app. It is not displayed to bookers.</p>
            </div>
            <Switch checked={settings.eventTypeColor} onCheckedChange={value => handleToggle('eventTypeColor', value)} />
          </div>
          
          {settings.eventTypeColor && <div className="pl-8 space-y-6 bg-gray-50 p-6 rounded-lg">
              <div>
                <label className="block mb-3 font-medium" style={{
                  fontSize: '14px',
                  color: '#384252'
                }}>Event Type Color (Light Theme)</label>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={`#${settings.lightThemeColor}`}
                      onChange={(e) => setSettings(prev => ({ ...prev, lightThemeColor: e.target.value.replace('#', '') }))}
                      className="w-12 h-10 border border-border rounded cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={settings.lightThemeColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, lightThemeColor: e.target.value }))}
                    className="flex-1 h-10 px-3 border border-border rounded-md text-sm"
                    placeholder="007ee5"
                  />
                </div>
              </div>
              <div>
                <label className="block mb-3 font-medium" style={{
                  fontSize: '14px',
                  color: '#384252'
                }}>Event Type Color (Dark Theme)</label>
                <div className="flex items-center space-x-3">
                  <div className="relative">
                    <input
                      type="color"
                      value={`#${settings.darkThemeColor}`}
                      onChange={(e) => setSettings(prev => ({ ...prev, darkThemeColor: e.target.value.replace('#', '') }))}
                      className="w-12 h-10 border border-border rounded cursor-pointer"
                    />
                  </div>
                  <input
                    type="text"
                    value={settings.darkThemeColor}
                    onChange={(e) => setSettings(prev => ({ ...prev, darkThemeColor: e.target.value }))}
                    className="flex-1 h-10 px-3 border border-border rounded-md text-sm"
                    placeholder="fafafa"
                  />
                </div>
              </div>
            </div>}
        </div>
      </div>

      <BookingQuestionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} question={selectedQuestion} />
    </div>;
};
