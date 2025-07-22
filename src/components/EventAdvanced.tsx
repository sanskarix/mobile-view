
import React, { useState } from 'react';
import { Monitor, Smartphone, Tablet, Copy, Info, Plus, X } from 'lucide-react';
import { Switch } from './ui/switch';
import { CustomSelect } from './ui/custom-select';
import { BookingQuestionModal } from './BookingQuestionModal';

export const EventAdvanced = () => {
  const [settings, setSettings] = useState({
    requiresConfirmation: false,
    confirmationType: 'always', // 'always' or 'notice'
    confirmationNoticeTime: '30',
    confirmationNoticeUnit: 'mins',
    blockUnconfirmed: false,
    enableCaptcha: true,
    captchaStrength: 'medium',
    requiresEmailVerification: true,
    hideNotesInCalendar: true,
    disableCancelReschedule: true,
    hideCalendarEventDetails: true,
    redirectOnBooking: true,
    forwardParams: false,
    privateLinks: true,
    offerSeats: true,
    seats: 2,
    shareAttendeeInfo: false,
    showAvailableSeats: true,
    lockTimezoneOnBooking: true,
    eventTypeColor: true,
    eventLayout: ['month'], // Changed to array for multi-select
    defaultView: 'month', // Single selection for default view
    redirectUrl: 'https://example.com/redirect-to-my-success-page',
    brandColorLight: '007ee5',
    brandColorDark: 'fafafa',
    useOrganizerEmail: false,
    organizerEmail: 'sanskarix@gmail.com'
  });

  const [privateUrls, setPrivateUrls] = useState([
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

  const handleLayoutToggle = (layoutId: string) => {
    setSettings(prev => ({
      ...prev,
      eventLayout: prev.eventLayout.includes(layoutId)
        ? prev.eventLayout.filter(id => id !== layoutId)
        : [...prev.eventLayout, layoutId]
    }));
  };

  const handleDefaultViewChange = (view: string) => {
    setSettings(prev => ({
      ...prev,
      defaultView: view
    }));
  };

  const handleBookingQuestionToggle = (questionKey: string, value: boolean) => {
    setBookingQuestionStates(prev => ({
      ...prev,
      [questionKey]: value
    }));
  };

  const handleCopyPrivateLink = (url: string) => {
    navigator.clipboard.writeText(url);
  };

  const handleAddPrivateLink = () => {
    const newUrl = `https://cal.id/d/${Math.random().toString(36).substr(2, 20)}/product-hunt-chats`;
    setPrivateUrls(prev => [...prev, newUrl]);
  };

  const handleRemovePrivateLink = (index: number) => {
    setPrivateUrls(prev => prev.filter((_, i) => i !== index));
  };

  const handleEditQuestion = (question: any) => {
    setSelectedQuestion(question);
    setModalOpen(true);
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setModalOpen(true);
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

  const captchaOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' }
  ];

  const noticeUnitOptions = [
    { value: 'mins', label: 'Minutes' },
    { value: 'hours', label: 'Hours' }
  ];

  const organizerEmailOptions = [
    { value: 'sanskarix@gmail.com', label: 'sanskarix@gmail.com' }
  ];

  const calendarOptions = [
    { value: 'sanskarix@gmail.com', label: 'sanskarix@gmail.com (Google Calendar - sanskarix@gmail.com)' }
  ];

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
                onChange={() => {}}
                options={calendarOptions}
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
              <input type="text" placeholder="Product Hunt Chats between Sanskar Yadav and {Scheduler}" className="w-full px-3 py-2 border border-gray-300 rounded-lg" style={{
              fontSize: '14px',
              height: '40px'
            }} />
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-4">
            <Switch checked={settings.useOrganizerEmail} onCheckedChange={value => handleToggle('useOrganizerEmail', value)} />
            <label className="font-medium flex items-center space-x-2" style={{
            fontSize: '14px',
            color: '#384252'
          }}>
              <span>Use "Add to calendar" email as the organizer</span>
              <div className="group relative">
                <Info className="h-4 w-4 text-muted-foreground cursor-help" />
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-3 py-2 bg-gray-900 text-white text-xs rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-200 whitespace-nowrap z-50">
                  If enabled, we'll display the email address from your "Add to calendar" as organizer and send confirmation emails there
                  <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
                </div>
              </div>
            </label>
          </div>
          {!settings.useOrganizerEmail && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 ml-12">
              <div>
                <CustomSelect
                  value={settings.organizerEmail}
                  onChange={(value) => setSettings(prev => ({ ...prev, organizerEmail: value }))}
                  options={organizerEmailOptions}
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
                <div className="absolute top-2 right-2">
                  <input 
                    type="checkbox" 
                    checked={settings.eventLayout.includes(layout.id)}
                    onChange={() => handleLayoutToggle(layout.id)}
                    className="w-4 h-4"
                  />
                </div>
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
          <div className="flex space-x-0 mb-3 border border-gray-200 rounded-lg overflow-hidden">
            {layoutOptions.map(layout => (
              <button
                key={layout.id}
                onClick={() => handleDefaultViewChange(layout.id)}
                className={`flex-1 px-4 py-2 text-sm font-medium transition-colors ${
                  settings.defaultView === layout.id 
                    ? 'bg-blue-500 text-white' 
                    : 'bg-white text-gray-700 hover:bg-gray-50'
                }`}
                style={{ fontSize: '14px' }}
              >
                {layout.name}
              </button>
            ))}
          </div>
          <p style={{
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
                  <div className="flex items-center space-x-3">
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
                <button onClick={() => handleEditQuestion(question)} className="text-blue-600 hover:text-blue-700" style={{
              fontSize: '14px'
            }}>
                  Edit
                </button>
              </div>
              <Switch 
                checked={bookingQuestionStates[question.key]} 
                onCheckedChange={value => handleBookingQuestionToggle(question.key, value)} 
              />
            </div>)}
        </div>

        <button onClick={handleAddQuestion} className="text-blue-600 hover:text-blue-700 font-medium" style={{
        fontSize: '14px'
      }}>
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
                <div className="flex items-center space-x-4">
                  <input 
                    type="radio" 
                    id="always" 
                    name="confirmationType"
                    checked={settings.confirmationType === 'always'}
                    onChange={() => setSettings(prev => ({ ...prev, confirmationType: 'always' }))}
                  />
                  <label htmlFor="always" style={{ fontSize: '14px', color: '#384252' }}>Always</label>
                </div>
                <div className="flex items-center space-x-4">
                  <input 
                    type="radio" 
                    id="notice" 
                    name="confirmationType"
                    checked={settings.confirmationType === 'notice'}
                    onChange={() => setSettings(prev => ({ ...prev, confirmationType: 'notice' }))}
                  />
                  <label htmlFor="notice" className="flex items-center space-x-2" style={{ fontSize: '14px', color: '#384252' }}>
                    <span>When booked with less than</span>
                    <input 
                      type="number" 
                      value={settings.confirmationNoticeTime}
                      onChange={(e) => setSettings(prev => ({ ...prev, confirmationNoticeTime: e.target.value }))}
                      className="w-16 px-2 py-1 border border-gray-300 rounded text-center"
                      style={{ height: '32px' }}
                    />
                    <CustomSelect
                      value={settings.confirmationNoticeUnit}
                      onChange={(value) => setSettings(prev => ({ ...prev, confirmationNoticeUnit: value }))}
                      options={noticeUnitOptions}
                      className="w-24"
                    />
                    <span>notice</span>
                  </label>
                </div>
              </div>
              <div className="flex items-center space-x-2">
                <input 
                  type="checkbox" 
                  id="block-unconfirmed"
                  checked={settings.blockUnconfirmed}
                  onChange={(e) => setSettings(prev => ({ ...prev, blockUnconfirmed: e.target.checked }))}
                />
                <label htmlFor="block-unconfirmed" style={{ fontSize: '14px', color: '#384252' }}>
                  Unconfirmed bookings still block calendar slots.
                </label>
              </div>
            </div>
          )}
        </div>

        <div className="space-y-6">
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
          
          {settings.enableCaptcha && <div className="pl-8">
              <label className="block mb-2" style={{
            fontSize: '14px',
            color: '#384252'
          }}>Select captcha strength</label>
              <CustomSelect
                value={settings.captchaStrength}
                onChange={(value) => setSettings(prev => ({ ...prev, captchaStrength: value }))}
                options={captchaOptions}
              />
            </div>}
        </div>

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

        {/* Redirect on booking */}
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
          
          {settings.redirectOnBooking && <div className="pl-8 space-y-4">
              <input type="url" value={settings.redirectUrl} onChange={e => setSettings(prev => ({
            ...prev,
            redirectUrl: e.target.value
          }))} placeholder="https://example.com/redirect-to-my-success-page" className="w-full px-3 py-2 border border-gray-300 rounded-lg" style={{
            fontSize: '14px',
            height: '40px'
          }} />
              <div className="flex items-center">
                <input 
                  type="checkbox" 
                  id="forward-params" 
                  checked={settings.forwardParams}
                  onChange={(e) => setSettings(prev => ({ ...prev, forwardParams: e.target.checked }))}
                  className="mr-2" 
                />
                <label htmlFor="forward-params" style={{
              fontSize: '14px',
              color: '#384252'
            }}>
                  Forward parameters such as ?email=...&name=... and more
                </label>
              </div>
            </div>}
        </div>

        {/* Private Links */}
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
          
          {settings.privateLinks && <div className="pl-8 space-y-3">
              {privateUrls.map((url, index) => (
                <div key={index} className="flex items-center space-x-2 p-3 bg-gray-50 rounded-lg">
                  <span className="flex-1" style={{
                fontSize: '14px',
                color: '#384252'
              }}>{url}</span>
                  <button onClick={() => handleCopyPrivateLink(url)} className="p-1 hover:bg-gray-200 rounded" title="Copy private link">
                    <Copy className="h-4 w-4 text-gray-500" />
                  </button>
                  {privateUrls.length > 1 && (
                    <button onClick={() => handleRemovePrivateLink(index)} className="p-1 hover:bg-gray-200 rounded" title="Remove link">
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  )}
                </div>
              ))}
              <button onClick={handleAddPrivateLink} className="text-blue-600 hover:text-blue-700 flex items-center space-x-1" style={{
            fontSize: '14px'
          }}>
                <Plus className="h-4 w-4" />
                <span>Add new link</span>
              </button>
            </div>}
        </div>

        {/* Offer seats */}
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
            }))} className="w-20 px-3 py-2 border border-gray-300 rounded-lg" style={{
              fontSize: '14px',
              height: '40px'
            }} />
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

        {/* Event type color */}
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
          
          {settings.eventTypeColor && <div className="pl-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <label className="block font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Event Type Color (Light Theme)</label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input 
                        type="color" 
                        value={`#${settings.brandColorLight}`}
                        onChange={(e) => setSettings(prev => ({ ...prev, brandColorLight: e.target.value.slice(1) }))}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={settings.brandColorLight}
                        onChange={(e) => setSettings(prev => ({ ...prev, brandColorLight: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono"
                        style={{ fontSize: '14px', height: '40px' }}
                        placeholder="007ee5"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="block font-medium" style={{
                fontSize: '14px',
                color: '#384252'
              }}>Event Type Color (Dark Theme)</label>
                  <div className="flex items-center space-x-3">
                    <div className="relative">
                      <input 
                        type="color" 
                        value={`#${settings.brandColorDark}`}
                        onChange={(e) => setSettings(prev => ({ ...prev, brandColorDark: e.target.value.slice(1) }))}
                        className="w-12 h-12 rounded-lg border border-gray-300 cursor-pointer"
                      />
                    </div>
                    <div className="flex-1">
                      <input 
                        type="text" 
                        value={settings.brandColorDark}
                        onChange={(e) => setSettings(prev => ({ ...prev, brandColorDark: e.target.value }))}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg font-mono"
                        style={{ fontSize: '14px', height: '40px' }}
                        placeholder="fafafa"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>}
        </div>
      </div>

      <BookingQuestionModal isOpen={modalOpen} onClose={() => setModalOpen(false)} question={selectedQuestion} />
    </div>;
};
