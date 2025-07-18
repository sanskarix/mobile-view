
import React, { useState } from 'react';
import { X } from 'lucide-react';
import { Switch } from './ui/switch';

interface BookingQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: {
    label: string;
    type: string;
    required: string;
  };
}

export const BookingQuestionModal = ({ isOpen, onClose, question }: BookingQuestionModalProps) => {
  const [inputType, setInputType] = useState('Name');
  const [splitName, setSplitName] = useState(false);
  const [identifier, setIdentifier] = useState('name');
  const [disableInput, setDisableInput] = useState(false);
  const [label, setLabel] = useState('your_name');
  const [placeholder, setPlaceholder] = useState('John Doe');
  const [required, setRequired] = useState('Yes');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-8 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold" style={{ fontSize: '20px', color: '#384252' }}>
            Add a question
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="h-6 w-6" />
          </button>
        </div>

        <p className="text-muted-foreground mb-6" style={{ fontSize: '14px', color: '#6b7280' }}>
          Customize the questions asked on the booking page
        </p>

        <div className="space-y-6">
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Input type
            </label>
            <select 
              value={inputType}
              onChange={(e) => setInputType(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            >
              <option value="Name">Name</option>
              <option value="Email">Email</option>
              <option value="Phone">Phone</option>
              <option value="Short Text">Short Text</option>
              <option value="Long Text">Long Text</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <Switch checked={splitName} onCheckedChange={setSplitName} />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Split "Full name" into "First name" and "Last name"
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Identifier
            </label>
            <input 
              type="text" 
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={disableInput}
              onChange={(e) => setDisableInput(e.target.checked)}
              className="rounded"
            />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Disable input if the URL identifier is prefilled
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Label
            </label>
            <input 
              type="text" 
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Placeholder
            </label>
            <input 
              type="text" 
              value={placeholder}
              onChange={(e) => setPlaceholder(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>
              Required
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setRequired('Yes')}
                className={`px-4 py-2 rounded font-medium ${
                  required === 'Yes' ? 'bg-gray-300' : 'bg-gray-100'
                }`}
                style={{ fontSize: '14px' }}
              >
                Yes
              </button>
              <button 
                onClick={() => setRequired('No')}
                className={`px-4 py-2 rounded font-medium ${
                  required === 'No' ? 'bg-gray-300' : 'bg-gray-100'
                }`}
                style={{ fontSize: '14px' }}
              >
                No
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <button 
            onClick={onClose}
            className="px-4 py-2 border border-gray-300 rounded-lg font-medium hover:bg-gray-50"
            style={{ fontSize: '14px' }}
          >
            Cancel
          </button>
          <button 
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700"
            style={{ fontSize: '14px' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
