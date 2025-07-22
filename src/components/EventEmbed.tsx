import React, { useState } from 'react';
import { ArrowLeft, Copy, ChevronDown, ChevronUp } from 'lucide-react';
import { Switch } from './ui/switch';

export const EventEmbed = () => {
  const [selectedOption, setSelectedOption] = useState('inline');
  const [buttonText, setButtonText] = useState('Book my Cal');
  const [showCalendarIcon, setShowCalendarIcon] = useState(true);
  const [buttonPosition, setButtonPosition] = useState('bottom-right');
  const [buttonColor, setButtonColor] = useState('000000');
  const [textColor, setTextColor] = useState('000000');
  const [theme, setTheme] = useState('auto');
  const [hideEventTypeDetails, setHideEventTypeDetails] = useState(false);
  const [layout, setLayout] = useState('month');
  const [windowWidth, setWindowWidth] = useState('100%');
  const [windowHeight, setWindowHeight] = useState('100%');
  const [brandColorLight, setBrandColorLight] = useState('007ee5');
  const [brandColorDark, setBrandColorDark] = useState('fafafa');
  const [selectedTimezone, setSelectedTimezone] = useState('Asia/Calcutta');
  const [codeType, setCodeType] = useState('HTML');
  const [showThemeDropdown, setShowThemeDropdown] = useState(false);
  const [showLayoutDropdown, setShowLayoutDropdown] = useState(false);
  const [showPositionDropdown, setShowPositionDropdown] = useState(false);
  const [showTimezoneDropdown, setShowTimezoneDropdown] = useState(false);

  const getEmbedCode = () => {
    if (codeType === 'React') {
      switch (selectedOption) {
        case 'inline':
          return `import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "product-hunt-chats",
        embedLibUrl: "https://app.cal.id/embed-link/embed.js"
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <Cal
      namespace="product-hunt-chats"
      calLink="sanskar/product-hunt-chats"
      style={{ width: "100%", height: "100%", overflow: "scroll" }}
      config={{ layout: "month_view" }}
      calOrigin="https://cal.id"
      embedJsUrl="https://app.cal.id/embed-link/embed.js"
    />
  );
}`;
        case 'floating':
          return `import { getCalApi } from "@calcom/embed-react";
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
        config: { layout: "month_view" }
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);
}`;
        case 'popup':
          return `import { getCalApi } from "@calcom/embed-react";
import { useEffect } from "react";

export default function MyApp() {
  useEffect(() => {
    (async function () {
      const cal = await getCalApi({
        namespace: "product-hunt-chats",
        embedLibUrl: "https://app.cal.id/embed-link/embed.js"
      });
      cal("ui", { hideEventTypeDetails: false, layout: "month_view" });
    })();
  }, []);

  return (
    <button
      data-cal-namespace="product-hunt-chats"
      data-cal-link="sanskar/product-hunt-chats"
      data-cal-origin="https://cal.id"
      data-cal-config='{"layout":"month_view"}'
    >
      Click me
    </button>
  );
}`;
        default:
          return '';
      }
    } else {
      switch (selectedOption) {
        case 'inline':
          return `<div style="width:100%;height:100%;overflow:scroll" id="my-cal-inline"></div>
<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
Cal.ns["product-hunt-chats"]("inline", {
elementOrSelector:"#my-cal-inline",
config: {"layout":"month_view"},
calLink: "sanskar/product-hunt-chats",
});
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
</script>`;
        case 'floating':
          return `<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
Cal.ns["product-hunt-chats"]("floatingButton", {"calLink":"sanskar/product-hunt-chats","config":{"layout":"month_view"}});
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
</script>`;
        case 'popup':
          return `<script type="text/javascript">
(function (C, A, L) { let p = function (a, ar) { a.q.push(ar); }; let d = C.document; C.Cal = C.Cal || function () { let cal = C.Cal; let ar = arguments; if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; d.head.appendChild(d.createElement("script")).src = A; cal.loaded = true; } if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if(typeof namespace === "string"){cal.ns[namespace] = cal.ns[namespace] || api;p(cal.ns[namespace], ar);p(cal, ["initNamespace", namespace]);} else p(cal, ar); return;} p(cal, ar); }; })(window, "https://app.cal.id/embed-link/embed.js", "init");
Cal("init", "product-hunt-chats", {origin:"https://cal.id"});
// Important: Please add the following attributes to the element that should trigger the calendar to open upon clicking.
// data-cal-link="sanskar/product-hunt-chats"
// data-cal-namespace="product-hunt-chats"  
// data-cal-config='{"layout":"month_view"}'
Cal.ns["product-hunt-chats"]("ui", {"hideEventTypeDetails":false,"layout":"month_view"});
</script>`;
        case 'email':
          return `<!-- Email embed code - simplified for email compatibility -->
<div style="border: 1px solid #e1e5e9; border-radius: 8px; padding: 16px; max-width: 400px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;">
  <h3 style="margin: 0 0 8px 0; font-size: 18px; font-weight: 600;">Product Hunt Chats</h3>
  <p style="margin: 0 0 8px 0; color: #666; font-size: 14px;">Duration: 15 mins</p>
  <p style="margin: 0 0 16px 0; color: #666; font-size: 14px;">Timezone: ${selectedTimezone}</p>
  <a href="https://cal.id/sanskar/product-hunt-chats" 
     style="display: inline-block; background: #007ee5; color: white; padding: 8px 16px; text-decoration: none; border-radius: 4px; font-size: 14px;">
    See all available times
  </a>
  <p style="margin: 16px 0 0 0; font-size: 12px; color: #999;">Powered by OneHash Cal</p>
</div>`;
        default:
          return '';
      }
    }
  };

  const handleCopyCode = () => {
    navigator.clipboard.writeText(getEmbedCode());
  };

  const timezones = ['Asia/Calcutta', 'America/New_York', 'America/Los_Angeles', 'Europe/London', 'Europe/Paris', 'Asia/Tokyo', 'Australia/Sydney'];

  return (
    <div className="p-0 max-w-none mx-auto space-y-8" style={{ fontSize: '14px', color: '#384252' }}>
      {/* Header */}
      <div className="mb-8"></div>

      {/* Embed Options */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedOption === 'inline' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedOption('inline')}>
          <div className="h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded mb-4 flex items-center justify-center">
            <div className="text-blue-600 text-xs font-medium">Inline Embed</div>
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Inline Embed
          </h3>
          <p className="text-sm text-center" style={{ fontSize: '12px', color: '#384252' }}>
            Loads your event type directly inline with your other website content.
          </p>
        </div>

        <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedOption === 'floating' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedOption('floating')}>
          <div className="h-16 bg-gradient-to-br from-green-50 to-green-100 rounded mb-4 flex items-center justify-center">
            <div className="text-green-600 text-xs font-medium">Floating Button</div>
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Floating pop-up button
          </h3>
          <p className="text-sm text-center" style={{ fontSize: '12px', color: '#384252' }}>
            Puts a floating button on your site that triggers a modal with your event type.
          </p>
        </div>

        <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedOption === 'popup' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedOption('popup')}>
          <div className="h-16 bg-gradient-to-br from-purple-50 to-purple-100 rounded mb-4 flex items-center justify-center">
            <div className="text-purple-600 text-xs font-medium">Pop-up Click</div>
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Pop up via element click
          </h3>
          <p className="text-sm text-center" style={{ fontSize: '12px', color: '#384252' }}>
            Open your calendar as a dialog when someone clicks an element.
          </p>
        </div>

        <div className={`p-6 border-2 rounded-lg cursor-pointer transition-all ${selectedOption === 'email' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`} onClick={() => setSelectedOption('email')}>
          <div className="h-16 bg-gradient-to-br from-orange-50 to-orange-100 rounded mb-4 flex items-center justify-center">
            <div className="text-orange-600 text-xs font-medium">Email Embed</div>
          </div>
          <h3 className="font-semibold text-center mb-2" style={{ fontSize: '14px', color: '#384252' }}>
            Email Embed
          </h3>
          <p className="text-sm text-center" style={{ fontSize: '12px', color: '#384252' }}>
            Select a few available times and embed them in your Email
          </p>
        </div>
      </div>

      {/* Configuration based on selected option */}
      <div className="border-t border-gray-200 pt-8">
        {selectedOption === 'inline' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Window sizing
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm mb-2" style={{ fontSize: '12px', color: '#384252' }}>W</label>
                      <input
                        type="text"
                        value={windowWidth}
                        onChange={(e) => setWindowWidth(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                    <div>
                      <label className="block text-sm mb-2" style={{ fontSize: '12px', color: '#384252' }}>H</label>
                      <input
                        type="text"
                        value={windowHeight}
                        onChange={(e) => setWindowHeight(e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Theme</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🌓</span>
                        <span>Auto</span>
                      </div>
                      {showThemeDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showThemeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setTheme('auto'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌓</span>
                          <span>Auto</span>
                        </button>
                        <button
                          onClick={() => { setTheme('light'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">☀️</span>
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => { setTheme('dark'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌙</span>
                          <span>Dark</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ fontSize: '14px', color: '#384252' }}>Hide event type details</label>
                  <Switch checked={hideEventTypeDetails} onCheckedChange={setHideEventTypeDetails} />
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Light Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorLight}` }}></div>
                    <input
                      type="text"
                      value={brandColorLight}
                      onChange={(e) => setBrandColorLight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Dark Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorDark}` }}></div>
                    <input
                      type="text"
                      value={brandColorDark}
                      onChange={(e) => setBrandColorDark(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Layout</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <span>Month</span>
                      {showLayoutDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showLayoutDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setLayout('month'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Month
                        </button>
                        <button
                          onClick={() => { setLayout('week'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Week
                        </button>
                        <button
                          onClick={() => { setLayout('column'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Column
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm mx-auto min-h-[300px] relative">
                  <div className="text-center text-gray-500 mb-4">Your website content</div>
                  <div className="absolute bottom-4 right-4">
                    <button
                      className="px-4 py-2 rounded-full text-white font-medium shadow-lg"
                      style={{ backgroundColor: `#${buttonColor}`, color: `#${textColor}` }}
                    >
                      {buttonText}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'floating' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Button text
                  </label>
                  <input
                    type="text"
                    value={buttonText}
                    onChange={(e) => setButtonText(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                    style={{ fontSize: '14px' }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ fontSize: '14px', color: '#384252' }}>Display calendar icon</label>
                  <Switch checked={showCalendarIcon} onCheckedChange={setShowCalendarIcon} />
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Position of button
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowPositionDropdown(!showPositionDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <span>Bottom right</span>
                      {showPositionDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showPositionDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setButtonPosition('bottom-right'); setShowPositionDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Bottom right
                        </button>
                        <button
                          onClick={() => { setButtonPosition('bottom-left'); setShowPositionDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Bottom left
                        </button>
                        <button
                          onClick={() => { setButtonPosition('top-right'); setShowPositionDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Top right
                        </button>
                        <button
                          onClick={() => { setButtonPosition('top-left'); setShowPositionDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Top left
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                      Button color
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${buttonColor}` }}></div>
                      <input
                        type="text"
                        value={buttonColor}
                        onChange={(e) => setButtonColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                      Text color
                    </label>
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${textColor}` }}></div>
                      <input
                        type="text"
                        value={textColor}
                        onChange={(e) => setTextColor(e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                        style={{ fontSize: '14px' }}
                      />
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Theme</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🌓</span>
                        <span>Auto</span>
                      </div>
                      {showThemeDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showThemeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setTheme('auto'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌓</span>
                          <span>Auto</span>
                        </button>
                        <button
                          onClick={() => { setTheme('light'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">☀️</span>
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => { setTheme('dark'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌙</span>
                          <span>Dark</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ fontSize: '14px', color: '#384252' }}>Hide event type details</label>
                  <Switch checked={hideEventTypeDetails} onCheckedChange={setHideEventTypeDetails} />
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Light Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorLight}` }}></div>
                    <input
                      type="text"
                      value={brandColorLight}
                      onChange={(e) => setBrandColorLight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Dark Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorDark}` }}></div>
                    <input
                      type="text"
                      value={brandColorDark}
                      onChange={(e) => setBrandColorDark(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Layout</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <span>Month</span>
                      {showLayoutDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showLayoutDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setLayout('month'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Month
                        </button>
                        <button
                          onClick={() => { setLayout('week'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Week
                        </button>
                        <button
                          onClick={() => { setLayout('column'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Column
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview */}
              
            </div>
          </div>
        )}

        {selectedOption === 'popup' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Theme</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowThemeDropdown(!showThemeDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <div className="flex items-center">
                        <span className="mr-2">🌓</span>
                        <span>Auto</span>
                      </div>
                      {showThemeDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showThemeDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setTheme('auto'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌓</span>
                          <span>Auto</span>
                        </button>
                        <button
                          onClick={() => { setTheme('light'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">☀️</span>
                          <span>Light</span>
                        </button>
                        <button
                          onClick={() => { setTheme('dark'); setShowThemeDropdown(false); }}
                          className="w-full flex items-center px-3 py-2 text-left hover:bg-gray-50"
                        >
                          <span className="mr-2">🌙</span>
                          <span>Dark</span>
                        </button>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <label style={{ fontSize: '14px', color: '#384252' }}>Hide event type details</label>
                  <Switch checked={hideEventTypeDetails} onCheckedChange={setHideEventTypeDetails} />
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Light Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorLight}` }}></div>
                    <input
                      type="text"
                      value={brandColorLight}
                      onChange={(e) => setBrandColorLight(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Brand Color (Dark Theme)
                  </label>
                  <div className="flex items-center space-x-3">
                    <div className="w-10 h-10 rounded border border-gray-300 flex-shrink-0" style={{ backgroundColor: `#${brandColorDark}` }}></div>
                    <input
                      type="text"
                      value={brandColorDark}
                      onChange={(e) => setBrandColorDark(e.target.value)}
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Layout</label>
                  <div className="relative">
                    <button
                      onClick={() => setShowLayoutDropdown(!showLayoutDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <span>Month</span>
                      {showLayoutDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showLayoutDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                        <button
                          onClick={() => { setLayout('month'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Month
                        </button>
                        <button
                          onClick={() => { setLayout('week'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Week
                        </button>
                        <button
                          onClick={() => { setLayout('column'); setShowLayoutDropdown(false); }}
                          className="w-full px-3 py-2 text-left hover:bg-gray-50"
                        >
                          Column
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm mx-auto min-h-[200px] flex items-center justify-center">
                  <button className="bg-gray-600 text-white px-4 py-2 rounded text-sm">
                    I am a button that exists on your website
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {selectedOption === 'email' && (
          <div className="space-y-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Select Date
                  </label>
                  <div className="bg-white border border-gray-200 rounded-lg p-4">
                    <div className="text-lg font-semibold mb-3">July 2025</div>
                    
                    <div className="grid grid-cols-7 gap-1 text-xs text-center mb-3">
                      {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN'].map((day) => (
                        <div key={day} className="p-2 font-medium">{day}</div>
                      ))}
                    </div>
                    
                    <div className="grid grid-cols-7 gap-1 text-sm">
                      {Array.from({ length: 35 }, (_, i) => {
                        const date = i - 5;
                        const isToday = date === 18;
                        return (
                          <div key={i} className={`p-2 text-center cursor-pointer rounded ${date > 0 && date <= 31 ? isToday ? 'bg-blue-500 text-white' : 'hover:bg-gray-100' : 'text-gray-300'}`}>
                            {date > 0 && date <= 31 ? date : ''}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>
                    Timezone
                  </label>
                  <div className="relative">
                    <button
                      onClick={() => setShowTimezoneDropdown(!showTimezoneDropdown)}
                      className="w-full flex items-center justify-between p-3 border border-gray-300 rounded-lg hover:border-gray-400 focus:ring-2 focus:ring-ring bg-background h-10"
                      style={{ fontSize: '14px' }}
                    >
                      <span>{selectedTimezone}</span>
                      {showTimezoneDropdown ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
                    </button>
                    {showTimezoneDropdown && (
                      <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-300 rounded-lg shadow-lg z-10 max-h-40 overflow-y-auto">
                        {timezones.map((tz) => (
                          <button
                            key={tz}
                            onClick={() => { setSelectedTimezone(tz); setShowTimezoneDropdown(false); }}
                            className="w-full px-3 py-2 text-left hover:bg-gray-50"
                          >
                            {tz}
                          </button>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <div className="font-medium mb-3" style={{ fontSize: '14px', color: '#384252' }}>Available Times - Fri 18</div>
                  <div className="space-y-2">
                    {['10:15am', '10:30am', '10:45am', '11:00am', '11:15am', '11:30am', '11:45am'].map((time) => (
                      <button
                        key={time}
                        className="w-full border border-gray-300 rounded-lg p-3 text-center text-sm cursor-pointer hover:bg-gray-50 transition-colors"
                      >
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>

              {/* Preview */}
              <div className="bg-gray-50 rounded-lg p-6 flex-shrink-0">
                <div className="bg-white border border-gray-200 rounded-lg p-4 max-w-sm mx-auto">
                  <h3 className="font-semibold text-lg mb-2">Product Hunt Chats</h3>
                  <p className="text-sm text-gray-600 mb-1">Duration: 15 mins</p>
                  <p className="text-sm text-gray-600 mb-4">Timezone: {selectedTimezone}</p>
                  <a
                    href="#"
                    className="inline-block bg-blue-500 text-white px-4 py-2 rounded text-sm font-medium hover:bg-blue-600 transition-colors"
                  >
                    See all available times
                  </a>
                  <p className="text-xs text-gray-400 mt-4">Powered by OneHash Cal</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Code Display */}
        <div className="border-t border-gray-200 pt-8 mt-10">
          <div className="flex items-center justify-between mb-6">
            <div className="flex space-x-4">
              <button
                onClick={() => setCodeType('HTML')}
                className={`px-4 py-2 rounded font-medium transition-colors ${codeType === 'HTML' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                style={{ fontSize: '14px' }}
              >
                HTML
              </button>
              <button
                onClick={() => setCodeType('React')}
                className={`px-4 py-2 rounded font-medium transition-colors ${codeType === 'React' ? 'bg-blue-100 text-blue-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
                style={{ fontSize: '14px' }}
              >
                React
              </button>
            </div>
            <button className="text-sm text-blue-600 hover:text-blue-700 flex items-center space-x-1">
              <span>📋 Preview</span>
            </button>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-6">
            <p className="text-sm mb-3" style={{ fontSize: '14px', color: '#384252' }}>
              Place this code in your HTML where you want your OneHash Cal widget to appear.
            </p>
            <div className="bg-white border border-gray-300 text-gray-800 p-4 rounded-lg text-sm font-mono overflow-x-auto max-h-80 overflow-y-auto">
              <pre className="whitespace-pre-wrap break-all">{getEmbedCode()}</pre>
            </div>
          </div>

          <div className="flex justify-end space-x-3">
            <button className="px-4 py-2 border border-gray-300 rounded text-sm font-medium hover:bg-gray-50">
              Close
            </button>
            <button
              onClick={handleCopyCode}
              className="px-4 py-2 bg-blue-600 text-white rounded text-sm font-medium hover:bg-blue-700 flex items-center space-x-2"
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
