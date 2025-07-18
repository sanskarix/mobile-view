
import React, { useState } from 'react';
import { Switch } from './ui/switch';
import { Edit, ChevronRight } from 'lucide-react';
import { BookingQuestionModal } from './BookingQuestionModal';

export const EventAdvanced = () => {
  const [showModal, setShowModal] = useState(false);
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [bookingQuestions, setBookingQuestions] = useState([
    {
      id: 1,
      question: "Please share anything that will help prepare for our meeting.",
      type: "Long text",
      required: false,
      enabled: true
    },
    {
      id: 2,
      question: "What is your company name?",
      type: "Short text",
      required: true,
      enabled: false
    },
    {
      id: 3,
      question: "What is your role?",
      type: "Select",
      required: false,
      enabled: true
    }
  ]);

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowModal(true);
  };

  const handleToggleQuestion = (id) => {
    setBookingQuestions(prev => 
      prev.map(q => 
        q.id === id ? { ...q, enabled: !q.enabled } : q
      )
    );
  };

  return (
    <div className="p-0 max-w-none mx-auto space-y-6">
      {/* General Settings */}
      <div className="space-y-6">
        <div>
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#384252' }}>
            General
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Lock timezone</p>
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Attendees can only book in your timezone
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Mark as busy</p>
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Show as busy on connected calendars
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>

        {/* URL Settings */}
        <div>
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#384252' }}>
            URL
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                Secret URL
              </label>
              <input 
                type="text" 
                readOnly
                className="w-full px-3 py-2 bg-gray-50 border border-gray-300 rounded"
                style={{ fontSize: '14px' }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>
                Only users with this link can book
              </p>
            </div>
          </div>
        </div>

        {/* Booking Questions */}
        <div>
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#384252' }}>
            Booking questions
          </h3>
          <div className="space-y-3">
            {bookingQuestions.map(question => (
              <div key={question.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3">
                  <Switch 
                    checked={question.enabled}
                    onCheckedChange={() => handleToggleQuestion(question.id)}
                  />
                  <div>
                    <p className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>
                      {question.question}
                    </p>
                    <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                      {question.type} • {question.required ? 'Required' : 'Optional'}
                    </p>
                  </div>
                </div>
                <button 
                  onClick={() => handleEditQuestion(question)}
                  className="p-2 hover:bg-gray-100 rounded transition-colors"
                >
                  <Edit className="h-4 w-4 text-gray-600" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Redirect Settings */}
        <div>
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#384252' }}>
            Redirect on booking
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
                Redirect URL
              </label>
              <input 
                type="url"
                placeholder="https://example.com/thank-you" 
                className="w-full px-3 py-2 border border-gray-300 rounded"
                style={{ fontSize: '14px' }}
              />
              <p className="text-muted-foreground mt-1" style={{ fontSize: '14px' }}>
                Redirect users to this URL after successful booking
              </p>
            </div>
          </div>
        </div>

        {/* Additional Options */}
        <div>
          <h3 className="font-semibold mb-4" style={{ fontSize: '14px', color: '#384252' }}>
            Additional options
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Disable guests</p>
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Don't allow attendees to add guests
                </p>
              </div>
              <Switch />
            </div>
            
            <div className="flex items-center justify-between py-3 border-b border-gray-100">
              <div>
                <p className="font-medium" style={{ fontSize: '14px', color: '#384252' }}>Hide event type details</p>
                <p className="text-muted-foreground" style={{ fontSize: '14px' }}>
                  Hide event type name and description on booking page
                </p>
              </div>
              <Switch />
            </div>
          </div>
        </div>
      </div>

      <BookingQuestionModal 
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        question={selectedQuestion}
      />
    </div>
  );
};
