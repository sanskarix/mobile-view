import React, { useState } from 'react';
import { Bold, Italic, Link, MapPin, Plus, X, Clock, Settings, Copy, ExternalLink, Code, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';
interface EventSetupProps {
  onChange?: () => void;
}
export const EventSetup = ({
  onChange
}: EventSetupProps) => {
  const [formData, setFormData] = useState({
    title: 'Product Hunt Chats',
    description: 'The essence of Product Hunt reflects in communities- Select a time suitable for you, and let\'s talk products!',
    url: 'product-hunt-chats',
    durations: ['15', '30', '45', '60'],
    defaultDuration: '15',
    allowBookerToSelectDuration: true,
    location: 'google-meet',
    customDuration: '',
    showCustomDuration: false,
    durationInput: '',
    showDurationSuggestions: false
  });
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState('google-meet');
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [linkUrl, setLinkUrl] = useState('');
  const [copiedUrl, setCopiedUrl] = useState(false);
  const [locationDetails, setLocationDetails] = useState({
    meetingLink: '',
    address: '',
    phone: '',
    displayPhone: false,
    googleMapsLink: '',
    showGoogleMaps: false
  });
  const availableDurations = ['15', '30', '45', '60', '90', '120'];
  const locationOptions = [{
    id: 'conferencing',
    label: 'Conferencing',
    type: 'header'
  }, {
    id: 'zoom',
    label: 'Zoom',
    type: 'option',
    icon: '🎥'
  }, {
    id: 'google-meet',
    label: 'Google Meet',
    type: 'option',
    icon: 'GM'
  }, {
    id: 'teams',
    label: 'Microsoft Teams',
    type: 'option',
    icon: 'MT'
  }, {
    id: 'facetime',
    label: 'FaceTime',
    type: 'option',
    icon: '📞'
  }, {
    id: 'phone',
    label: 'Phone',
    type: 'header'
  }, {
    id: 'attendee-phone',
    label: 'Attendee phone number',
    type: 'option',
    icon: '📱'
  }, {
    id: 'organizer-phone',
    label: 'Organizer phone number',
    type: 'option',
    icon: '☎️'
  }, {
    id: 'others',
    label: 'Others',
    type: 'header'
  }, {
    id: 'link-meeting',
    label: 'Link meeting',
    type: 'option',
    icon: '🔗'
  }, {
    id: 'attendee-location',
    label: 'Custom attendee location',
    type: 'option',
    icon: '📍'
  }, {
    id: 'in-person',
    label: 'In Person',
    type: 'option',
    icon: '🏢'
  }];
  const handleFormChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    onChange?.();
  };
  const handleCopyUrl = () => {
    navigator.clipboard.writeText(`https://cal.id/sanskar/${formData.url}`);
    setCopiedUrl(true);
    setTimeout(() => setCopiedUrl(false), 1500);
  };
  const handlePreviewUrl = () => {
    window.open(`https://cal.id/sanskar/${formData.url}`, '_blank');
  };
  const handleDurationToggle = (duration: string) => {
    const newDurations = formData.durations.includes(duration) ? formData.durations.filter(d => d !== duration) : [...formData.durations, duration];
    handleFormChange('durations', newDurations);
  };
  const addCustomDuration = () => {
    if (formData.customDuration && !formData.durations.includes(formData.customDuration)) {
      handleFormChange('durations', [...formData.durations, formData.customDuration]);
      setFormData(prev => ({
        ...prev,
        customDuration: '',
        showCustomDuration: false
      }));
    }
  };
  const handleLocationSelect = (locationId: string) => {
    setSelectedLocation(locationId);
    setShowLocationDropdown(false);
    handleFormChange('location', locationId);
  };
  const handleDurationInputChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      durationInput: value,
      showDurationSuggestions: true
    }));
  };
  const addDurationFromInput = () => {
    if (formData.durationInput && !formData.durations.includes(formData.durationInput)) {
      handleFormChange('durations', [...formData.durations, formData.durationInput]);
      setFormData(prev => ({
        ...prev,
        durationInput: '',
        showDurationSuggestions: false
      }));
    }
  };
  const removeDuration = (duration: string) => {
    const newDurations = formData.durations.filter(d => d !== duration);
    handleFormChange('durations', newDurations);
  };
  const getSuggestedDurations = () => {
    return availableDurations.filter(duration => !formData.durations.includes(duration) && duration.includes(formData.durationInput));
  };
  const renderLocationDetails = () => {
    if (['zoom', 'facetime', 'link-meeting'].includes(selectedLocation)) {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg">
          <label className="block text-sm font-medium text-foreground mb-2">Meeting Link</label>
          <input type="url" value={locationDetails.meetingLink} onChange={e => setLocationDetails(prev => ({
          ...prev,
          meetingLink: e.target.value
        }))} placeholder="https://zoom.us/j/..." className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background h-10" />
        </div>;
    }
    if (selectedLocation === 'in-person') {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Address</label>
            <textarea value={locationDetails.address} onChange={e => setLocationDetails(prev => ({
            ...prev,
            address: e.target.value
          }))} placeholder="Enter the meeting address..." rows={3} className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background" />
          </div>
          <div className="space-y-3">
            <div className="flex items-center">
              <input type="checkbox" id="maps-link" checked={locationDetails.showGoogleMaps} onChange={e => setLocationDetails(prev => ({
              ...prev,
              showGoogleMaps: e.target.checked
            }))} className="mr-2" />
              <label htmlFor="maps-link" className="text-sm text-muted-foreground">Include Maps link</label>
            </div>
            {locationDetails.showGoogleMaps && <div className="animate-fade-in">
                <input type="url" value={locationDetails.googleMapsLink} onChange={e => setLocationDetails(prev => ({
              ...prev,
              googleMapsLink: e.target.value
            }))} placeholder="https://maps.google.com/..." className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background h-10" />
              </div>}
          </div>
        </div>;
    }
    if (selectedLocation === 'organizer-phone') {
      return <div className="mt-4 p-4 bg-muted/30 rounded-lg space-y-4">
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">Phone Number</label>
            <input type="tel" value={locationDetails.phone} onChange={e => setLocationDetails(prev => ({
            ...prev,
            phone: e.target.value
          }))} placeholder="+1 (555) 000-0000" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background h-10" />
          </div>
          <div className="flex items-center">
            <input type="checkbox" id="display-phone" checked={locationDetails.displayPhone} onChange={e => setLocationDetails(prev => ({
            ...prev,
            displayPhone: e.target.checked
          }))} className="mr-2" />
            <label htmlFor="display-phone" className="text-sm text-muted-foreground">
              Display phone number on booking page
            </label>
          </div>
        </div>;
    }
    return null;
  };
  return <div className="p-0 max-w-none mx-auto space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Title</label>
        <input type="text" value={formData.title} onChange={e => handleFormChange('title', e.target.value)} className="w-full px-2 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm text-gray-600 h-10" />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
        <div className="border border-border rounded-lg bg-background">
          <div className="flex items-center space-x-2 p-3 border-b border-border">
            <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => document.execCommand('bold')}>
              <Bold className="h-4 w-4 text-muted-foreground" />
            </button>
            <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => document.execCommand('italic')}>
              <Italic className="h-4 w-4 text-muted-foreground" />
            </button>
            <div className="relative">
              <button className="p-2 hover:bg-muted rounded transition-colors" onClick={() => setShowLinkInput(!showLinkInput)}>
                <Link className="h-4 w-4 text-muted-foreground" />
              </button>
              {showLinkInput && <div className="absolute top-full left-0 mt-1 p-3 bg-popover border border-border rounded-lg shadow-lg z-10 w-64 animate-scale-in">
                  <input type="url" placeholder="Enter URL" value={linkUrl} onChange={e => setLinkUrl(e.target.value)} className="w-full px-3 py-2 border border-border rounded mb-2 text-sm bg-background h-10" autoFocus />
                  <div className="flex justify-end space-x-2">
                    <button onClick={() => setShowLinkInput(false)} className="px-3 py-1 text-sm text-muted-foreground hover:text-foreground">
                      Cancel
                    </button>
                    <button onClick={() => {
                  if (linkUrl) {
                    document.execCommand('createLink', false, linkUrl);
                    setShowLinkInput(false);
                    setLinkUrl('');
                  }
                }} className="px-3 py-1 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90">
                      Insert
                    </button>
                  </div>
                </div>}
            </div>
          </div>
          <div contentEditable className="w-full p-4 min-h-[100px] focus:outline-none text-sm text-gray-600" dangerouslySetInnerHTML={{
          __html: formData.description
        }} onInput={e => handleFormChange('description', e.currentTarget.innerHTML)} />
        </div>
        <div className="flex items-center justify-between mt-2">
          <div className="flex items-center space-x-2">
            <Switch id="translate" />
            <label htmlFor="translate" className="text-sm" style={{
            fontSize: '14px',
            color: '#384252'
          }}>
              Translate description to the visitor's browser language using AI
            </label>
          </div>
        </div>
      </div>

      <div>
        <div className="flex items-center space-x-2 mb-2">
          <label className="block text-sm font-medium text-gray-700">URL</label>
        </div>
        <div className="flex items-center">
          <span className="inline-flex items-center px-4 py-3 border border-r-0 border-border bg-muted text-muted-foreground text-sm rounded-l-lg h-10">
            cal.id/sanskar/
          </span>
          <input type="text" value={formData.url} onChange={e => handleFormChange('url', e.target.value)} className="flex-1 px-4 py-3 border border-border focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm h-10" />
          <div className="flex items-center border border-l-0 border-border rounded-r-lg bg-background h-10">
            <button onClick={handleCopyUrl} title="Copy URL" className="p-3.5 transition-colors border-r border-border bg-[#64748b] hover:bg-[#64748b]/80 rounded-none h-10 flex items-center justify-center">
              <Copy className="h-4 w-4 text-white" />
            </button>
            <button onClick={handlePreviewUrl} className="p-3 hover:bg-muted transition-colors rounded-r-lg bg-[#64748b] hover:bg-[#64748b]/80 h-10 flex items-center justify-center" title="Preview">
              <ExternalLink className="h-4 w-4 text-white" />
            </button>
          </div>
          {copiedUrl && <div className="absolute bg-gray-800 text-white text-xs px-2 py-1 rounded ml-2 z-10">
              Copied!
            </div>}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-4">Available durations</label>
        
        {/* Duration Input with Suggestions */}
        <div className="relative mb-4">
          <input type="text" value={formData.durationInput} onChange={e => handleDurationInputChange(e.target.value)} onKeyDown={e => {
          if (e.key === 'Enter') {
            addDurationFromInput();
          }
        }} placeholder="Enter duration in minutes (e.g., 15, 30, 45)" className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-ring bg-background text-sm h-10" />
          
          {formData.showDurationSuggestions && formData.durationInput && getSuggestedDurations().length > 0 && <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-32 overflow-y-auto">
              {getSuggestedDurations().map(duration => <button key={duration} onClick={() => {
            handleFormChange('durations', [...formData.durations, duration]);
            setFormData(prev => ({
              ...prev,
              durationInput: '',
              showDurationSuggestions: false
            }));
          }} className="w-full text-left px-3 py-2 hover:bg-muted text-sm">
                  {duration} mins
                </button>)}
            </div>}
        </div>

        {/* Duration Bubbles */}
        <div className="flex flex-wrap gap-2 mb-4">
          {formData.durations.map(duration => <div key={duration} className="relative flex items-center space-x-1 px-3 py-2 text-sm rounded border bg-primary/10 border-primary text-primary group">
              <Clock className="h-3 w-3" />
              <span>{duration} mins</span>
              <button onClick={() => removeDuration(duration)} className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 text-white rounded-full flex items-center justify-center text-xs opacity-0 group-hover:opacity-100 transition-opacity">
                <X className="h-2 w-2" />
              </button>
            </div>)}
        </div>
        
        {!formData.showCustomDuration ? <button onClick={() => setFormData(prev => ({
        ...prev,
        showCustomDuration: true
      }))} className="text-sm text-primary hover:text-primary/80 flex items-center transition-colors">
            <Plus className="h-4 w-4 mr-1" />
            Add custom duration
          </button> : <div className="flex items-center space-x-2">
            <input type="number" value={formData.customDuration} onChange={e => setFormData(prev => ({
          ...prev,
          customDuration: e.target.value
        }))} placeholder="Duration" className="w-24 px-3 py-2 border border-border rounded text-sm bg-background h-10" />
            <span className="text-sm">mins</span>
            <button onClick={addCustomDuration} className="px-3 py-2 bg-primary text-primary-foreground rounded text-sm hover:bg-primary/90 transition-colors h-10">
              Add
            </button>
            <button onClick={() => setFormData(prev => ({
          ...prev,
          showCustomDuration: false,
          customDuration: ''
        }))} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
              <X className="h-4 w-4" />
            </button>
          </div>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Default duration</label>
        <div className="relative">
          <select value={formData.defaultDuration} onChange={e => handleFormChange('defaultDuration', e.target.value)} className="w-full px-4 py-3 border border-border rounded-lg focus:ring-2 focus:ring-ring focus:border-transparent bg-background text-sm h-10 appearance-none pr-10">
            {formData.durations.map(duration => <option key={duration} value={duration}>{duration} mins</option>)}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
        </div>
      </div>

      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Switch id="allowBookerToSelectDuration" checked={formData.allowBookerToSelectDuration} onCheckedChange={value => handleFormChange('allowBookerToSelectDuration', value)} />
            <label htmlFor="allowBookerToSelectDuration" className="text-sm" style={{
            fontSize: '14px',
            color: '#384252'
          }}>
              Allow booker to select duration
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
        <div className="relative">
          <button onClick={() => setShowLocationDropdown(!showLocationDropdown)} className="w-full flex items-center justify-between p-4 border border-border rounded-lg hover:border-border/60 focus:ring-2 focus:ring-ring bg-background transition-colors h-10">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-primary rounded flex items-center justify-center mr-3">
                <span className="text-primary-foreground text-xs font-bold">
                  {selectedLocation === 'google-meet' ? 'GM' : selectedLocation === 'zoom' ? '🎥' : '📍'}
                </span>
              </div>
              <span className="text-foreground">
                {locationOptions.find(opt => opt.id === selectedLocation)?.label || 'Select location'}
              </span>
            </div>
            {showLocationDropdown ? <ChevronUp className="h-4 w-4 text-muted-foreground" /> : <ChevronDown className="h-4 w-4 text-muted-foreground" />}
          </button>
          
          {showLocationDropdown && <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-lg z-10 max-h-60 overflow-y-auto animate-scale-in">
              {locationOptions.map(option => <div key={option.id}>
                  {option.type === 'header' ? <div className="px-4 py-2 text-xs font-semibold text-muted-foreground uppercase tracking-wide bg-muted/30">
                      {option.label}
                    </div> : <button onClick={() => handleLocationSelect(option.id)} className="w-full flex items-center px-4 py-3 text-left hover:bg-muted transition-colors">
                      <span className="mr-3 text-sm">{option.icon}</span>
                      <span className="text-sm">{option.label}</span>
                    </button>}
                </div>)}
            </div>}
        </div>
        
        {renderLocationDetails()}
        
        <p className="text-sm text-muted-foreground mt-2">
          Can't find the right conferencing app? Visit our{' '}
          <a href="#" className="text-primary hover:text-primary/80 transition-colors">App Store</a>.
        </p>
      </div>

      <div className="flex justify-between items-center pt-8 border-t border-border">
        <div className="flex -space-x-0 mx-0">
          <button className="flex items-center px-4 py-2 text-sm border border-red-200 text-red-600 rounded-lg hover:bg-red-50 transition-colors">
            <Trash2 className="h-4 w-4 mr-2" />
            Delete event
          </button>
        </div>
      </div>
    </div>;
};