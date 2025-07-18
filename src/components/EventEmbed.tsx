
import React, { useState } from 'react';
import { ArrowLeft, Copy } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventEmbed = () => {
  const [selectedOption, setSelectedOption] = useState('inline');
  const [activeCodeTab, setActiveCodeTab] = useState('html');
  const [buttonText, setButtonText] = useState('Book my Cal');
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [buttonPosition, setButtonPosition] = useState('bottom-right');
  const [buttonColor, setButtonColor] = useState('000000');
  const [textColor, setTextColor] = useState('ffffff');
  const [theme, setTheme] = useState('auto');
  const [hideEventTypeDetails, setHideEventTypeDetails] = useState(false);
  const [layout, setLayout] = useState('month_view');
  const [windowWidth, setWindowWidth] = useState('100%');
  const [windowHeight, setWindowHeight] = useState('100%');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Calcutta');

  const getEmbedCode = () => {
    const codes = {
      inline: {
        html: `<div style="width:${windowWidth};height:${windowHeight};overflow:scroll" id="my-cal-inline"></div>
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
Cal.ns["product-hunt-chats"]("inline", {
elementOrSelector:"#my-cal-inline",
config: {"layout":"${layout}"},
calLink: "sanskar/product-hunt-chats",
});
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${hideEventTypeDetails},"layout":"${layout}"});
</script>`,
        react: `import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "product-hunt-chats",
        embedLibUrl: "https://app.cal.id/embed-link/embed.js"
      });
      cal("ui", { hideEventTypeDetails: ${hideEventTypeDetails}, layout: "${layout}" });
    })();
  }, []);

  return (
    <Cal
      namespace="product-hunt-chats"
      calLink="sanskar/product-hunt-chats"
      style={{ width: "${windowWidth}", height: "${windowHeight}", overflow: "scroll" }}
      config={{ layout: "${layout}" }}
      calOrigin="https://cal.id"
      embedJsUrl="https://app.cal.id/embed-link/embed.js"
    />
  );
}`
      },
      floating: {
        html: `<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
Cal.ns["product-hunt-chats"]("floatingButton", {"calLink":"sanskar/product-hunt-chats","config":{"layout":"${layout}"}});
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${hideEventTypeDetails},"layout":"${layout}"});
</script>`,
        react: `import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "product-hunt-chats",
        embedLibUrl: "https://app.cal.id/embed-link/embed.js"
      });
      cal("floatingButton", {
        calLink: "sanskar/product-hunt-chats",
        calOrigin: "https://cal.id",
        config: { layout: "${layout}" }
      });
      cal("ui", { hideEventTypeDetails: ${hideEventTypeDetails}, layout: "${layout}" });
    })();
  }, []);
}`
      },
      popup: {
        html: `<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// \`data-cal-link="sanskar/product-hunt-chats"\`
// data-cal-namespace="product-hunt-chats"
// \`data-cal-config='{"layout":"${layout}"}'\`
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":${hideEventTypeDetails},"layout":"${layout}"});
</script>`,
        react: `import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "product-hunt-chats",
        embedLibUrl: "https://app.cal.id/embed-link/embed.js"
      });
      cal("ui", { hideEventTypeDetails: ${hideEventTypeDetails}, layout: "${layout}" });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="product-hunt-chats"
      data-cal-link="sanskar/product-hunt-chats"
      data-cal-origin="https://cal.id"
      data-cal-config='{"layout":"${layout}"}'
    >
      Click me
    </button>
  );
}`
      }
    };

    return codes[selectedOption as keyof typeof codes]?.[activeCodeTab as keyof typeof codes.inline] || '';
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
  };

  const timezones = [
    'Asia/Calcutta',
    'America/New_York',
    'America/Los_Angeles',
    'Europe/London',
    'Europe/Paris',
    'Asia/Tokyo',
    'Australia/Sydney'
  ];

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="font-semibold mb-2" style={{ fontSize: '20px', color: '#384252' }}>
          How do you want to add OneHash Cal to your site?
        </h2>
        <p className="text-muted-foreground" style={{ fontSize: '14px', color: '#384252' }}>
          Choose one of the following ways to put OneHash Cal on your site.
        </p>
      </div>

      {/* Embed Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedOption === 'inline' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60'
          }`}
          onClick={() => setSelectedOption('inline')}
        >
          <div className="h-32 bg-muted rounded mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/92491f6b-a294-4db7-b4eb-646336d2da2d.png" 
              alt="Inline Embed" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Inline Embed
          </h3>
          <p className="text-center text-muted-foreground" style={{ fontSize: '12px', color: '#6b7280' }}>
            Loads your event type directly inline with your other website content.
          </p>
        </div>

        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedOption === 'floating' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60'
          }`}
          onClick={() => setSelectedOption('floating')}
        >
          <div className="h-32 bg-muted rounded mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/c399a0e4-4c10-49b7-8510-c419c5332297.png" 
              alt="Floating Button" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Floating pop-up button
          </h3>
          <p className="text-center text-muted-foreground" style={{ fontSize: '12px', color: '#6b7280' }}>
            Puts a floating button on your site that triggers a modal with your event type.
          </p>
        </div>

        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedOption === 'popup' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60'
          }`}
          onClick={() => setSelectedOption('popup')}
        >
          <div className="h-32 bg-muted rounded mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/adce374a-0ad2-48ce-b43a-6ef6b23a6353.png" 
              alt="Popup" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Pop up via element click
          </h3>
          <p className="text-center text-muted-foreground" style={{ fontSize: '12px', color: '#6b7280' }}>
            Open your calendar as a dialog when someone clicks an element.
          </p>
        </div>

        <div 
          className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${
            selectedOption === 'email' ? 'border-primary bg-primary/5' : 'border-border hover:border-border/60'
          }`}
          onClick={() => setSelectedOption('email')}
        >
          <div className="h-32 bg-muted rounded mb-4 flex items-center justify-center overflow-hidden">
            <img 
              src="/lovable-uploads/f8511c8d-3bfd-4fbb-9f0c-6ce1e7e50113.png" 
              alt="Email Embed" 
              className="w-full h-full object-cover"
            />
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Email Embed
          </h3>
          <p className="text-center text-muted-foreground" style={{ fontSize: '12px', color: '#6b7280' }}>
            Select a few available times and embed them in your Email
          </p>
        </div>
      </div>

      {/* Configuration Content */}
      <div className="border-t border-border pt-8">
        {selectedOption === 'inline' && (
          <div className="space-y-6">
            <div className="flex space-x-2 mb-6">
              <ArrowLeft className="h-4 w-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
                  Inline Embed
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: '14px', color: '#6b7280' }}>
                  Loads your event type directly inline with your other website content.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Window sizing
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block mb-1" style={{ fontSize: '12px', color: '#6b7280' }}>Width</label>
                      <input 
                        type="text" 
                        value={windowWidth}
                        onChange={(e) => setWindowWidth(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label className="block mb-1" style={{ fontSize: '12px', color: '#6b7280' }}>Height</label>
                      <input 
                        type="text" 
                        value={windowHeight}
                        onChange={(e) => setWindowHeight(e.target.value)}
                        className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Theme</label>
                  <select 
                    value={theme}
                    onChange={(e) => setTheme(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="auto">🌓 Auto</option>
                    <option value="light">☀️ Light</option>
                    <option value="dark">🌙 Dark</option>
                  </select>
                </div>

                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={hideEventTypeDetails}
                    onCheckedChange={setHideEventTypeDetails}
                  />
                  <label style={{ fontSize: '14px', color: '#384252' }}>Hide event type details</label>
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Layout</label>
                  <select 
                    value={layout}
                    onChange={(e) => setLayout(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="month_view">Month</option>
                    <option value="week_view">Week</option>
                    <option value="column_view">Column</option>
                  </select>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="bg-background border border-border rounded-lg p-4">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 rounded-full bg-primary"></div>
                      <div>
                        <div style={{ fontSize: '12px', color: '#6b7280' }}>Sanskar Yadav</div>
                        <div className="font-semibold" style={{ fontSize: '16px', color: '#384252' }}>Product Hunt Chats</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>July 2025</div>
                  </div>
                  <div className="grid grid-cols-7 gap-1 text-center mb-2" style={{ fontSize: '10px', color: '#6b7280' }}>
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="p-1">{day}</div>
                    ))}
                  </div>
                  <div className="grid grid-cols-7 gap-1" style={{ fontSize: '10px' }}>
                    {Array.from({length: 35}, (_, i) => (
                      <div key={i} className="p-2 text-center hover:bg-muted rounded cursor-pointer">
                        {i < 6 ? '' : i - 5}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'floating' && (
          <div className="space-y-6">
            <div className="flex space-x-2 mb-6">
              <ArrowLeft className="h-4 w-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
                  Floating pop-up button
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: '14px', color: '#6b7280' }}>
                  Puts a floating button on your site that triggers a modal with your event type.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                    Button text
                  </label>
                  <input 
                    type="text" 
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={showCalendarIcon}
                    onCheckedChange={setShowCalendarIcon}
                  />
                  <label style={{ fontSize: '14px', color: '#384252' }}>Display calendar icon</label>
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                    Position of button
                  </label>
                  <select 
                    value={buttonPosition}
                    onChange={(e) => setButtonPosition(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    style={{ fontSize: '14px' }}
                  >
                    <option value="bottom-right">Bottom right</option>
                    <option value="bottom-left">Bottom left</option>
                    <option value="top-right">Top right</option>
                    <option value="top-left">Top left</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                      Button color
                    </label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: `#${buttonColor}` }}
                      ></div>
                      <input 
                        type="text" 
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                      Text color
                    </label>
                    <div className="flex items-center space-x-2">
                      <div 
                        className="w-8 h-8 rounded border"
                        style={{ backgroundColor: `#${textColor}` }}
                      ></div>
                      <input 
                        type="text" 
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-border rounded-lg bg-background"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted/30 rounded-lg p-4 relative min-h-[300px]">
                <div 
                  className="absolute rounded-lg px-4 py-2 font-medium flex items-center space-x-2 cursor-pointer"
                  style={{
                    backgroundColor: `#${buttonColor}`,
                    color: `#${textColor}`,
                    fontSize: '14px',
                    [buttonPosition.includes('bottom') ? 'bottom' : 'top']: '16px',
                    [buttonPosition.includes('right') ? 'right' : 'left']: '16px'
                  }}
                >
                  {showCalendarIcon && <span>📅</span>}
                  <span>{buttonText}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'email' && (
          <div className="space-y-6">
            <div className="flex space-x-2 mb-6">
              <ArrowLeft className="h-4 w-4 mt-1" />
              <div>
                <h3 className="font-semibold mb-2" style={{ fontSize: '16px', color: '#384252' }}>
                  Email Embed
                </h3>
                <p className="text-muted-foreground" style={{ fontSize: '14px', color: '#6b7280' }}>
                  Select a few available times and embed them in your Email
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                    Timezone
                  </label>
                  <select 
                    value={selectedTimezone}
                    onChange={(e) => setSelectedTimezone(e.target.value)}
                    className="w-full px-3 py-2 border border-border rounded-lg bg-background"
                    style={{ fontSize: '14px' }}
                  >
                    {timezones.map(tz => (
                      <option key={tz} value={tz}>{tz}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                    Select Date
                  </label>
                  <div className="text-lg font-semibold mb-4">July 2025</div>
                  
                  <div className="grid grid-cols-7 gap-1 text-center mb-2" style={{ fontSize: '12px', color: '#6b7280' }}>
                    {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map(day => (
                      <div key={day} className="p-2 font-medium">{day}</div>
                    ))}
                  </div>
                  
                  <div className="grid grid-cols-7 gap-1" style={{ fontSize: '14px' }}>
                    {Array.from({length: 35}, (_, i) => {
                      const date = i - 5;
                      const isToday = date === 18;
                      return (
                        <div 
                          key={i} 
                          className={`p-2 text-center cursor-pointer rounded ${
                            date > 0 && date <= 31 
                              ? isToday 
                                ? 'bg-primary text-primary-foreground' 
                                : 'hover:bg-muted' 
                              : 'text-muted-foreground'
                          }`}
                        >
                          {date > 0 && date <= 31 ? date : ''}
                        </div>
                      );
                    })}
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Fri 18</div>
                  <div className="space-y-2">
                    {['10:15am', '10:30am', '10:45am', '11:00am', '11:15am', '11:30am'].map(time => (
                      <div 
                        key={time} 
                        className="border border-border rounded-lg p-3 text-center cursor-pointer hover:bg-muted bg-background"
                        style={{ fontSize: '14px' }}
                      >
                        {time}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-muted/30 rounded-lg p-4">
                <div className="bg-background border border-border rounded-lg p-6 max-w-sm">
                  <h3 className="font-semibold mb-2" style={{ fontSize: '18px', color: '#384252' }}>Product Hunt Chats</h3>
                  <p className="text-muted-foreground mb-1" style={{ fontSize: '14px', color: '#6b7280' }}>Duration: 15 mins</p>
                  <p className="text-muted-foreground mb-4" style={{ fontSize: '14px', color: '#6b7280' }}>Timezone: {selectedTimezone}</p>
                  <a 
                    href="#" 
                    className="inline-block bg-primary text-primary-foreground px-4 py-2 rounded font-medium hover:bg-primary/90"
                    style={{ fontSize: '14px' }}
                  >
                    See all available times
                  </a>
                  <p className="text-muted-foreground mt-4" style={{ fontSize: '12px', color: '#6b7280' }}>Powered by OneHash Cal</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Display */}
        <div className="border-t border-border pt-8 mt-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-1">
              <button 
                onClick={() => setActiveCodeTab('html')}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeCodeTab === 'html' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontSize: '14px' }}
              >
                HTML
              </button>
              <button 
                onClick={() => setActiveCodeTab('react')}
                className={`px-4 py-2 rounded font-medium transition-colors ${
                  activeCodeTab === 'react' 
                    ? 'bg-primary text-primary-foreground' 
                    : 'bg-muted text-muted-foreground hover:text-foreground'
                }`}
                style={{ fontSize: '14px' }}
              >
                React
              </button>
            </div>
            <button className="text-primary hover:text-primary/80 flex items-center space-x-1" style={{ fontSize: '14px' }}>
              <span>📋 Preview</span>
            </button>
          </div>

          <div className="bg-muted/50 rounded-lg p-4 mb-6">
            <p className="mb-3" style={{ fontSize: '14px', color: '#384252' }}>
              Place this code in your {activeCodeTab === 'html' ? 'HTML' : 'React component'} where you want your OneHash Cal widget to appear.
            </p>
            <div className="bg-background border border-border rounded-lg p-4 font-mono text-sm overflow-x-auto">
              <pre className="whitespace-pre-wrap" style={{ fontSize: '12px', color: '#384252' }}>
                {getEmbedCode()}
              </pre>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-border rounded-lg font-medium hover:bg-muted transition-colors" style={{ fontSize: '14px' }}>
              Close
            </button>
            <button 
              onClick={handleCopyCode}
              className="px-4 py-2 bg-primary text-primary-foreground rounded-lg font-medium hover:bg-primary/90 flex items-center space-x-2"
              style={{ fontSize: '14px' }}
            >
              <Copy className="h-4 w-4" />
              <span>Copy Code</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
