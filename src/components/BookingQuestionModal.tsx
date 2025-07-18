
import React, { useState, useEffect } from 'react';
import { X } from 'lucide-react';
import { Switch } from './ui/switch';

interface BookingQuestionModalProps {
  isOpen: boolean;
  onClose: () => void;
  question: any;
  onSave: (question: any) => void;
}

export const BookingQuestionModal: React.FC<BookingQuestionModalProps> = ({
  isOpen,
  onClose,
  question,
  onSave
}) => {
  const [formData, setFormData] = useState({
    inputType: 'Name',
    splitName: false,
    identifier: 'name',
    disableInput: false,
    label: 'your_name',
    placeholder: 'John Doe',
    required: 'Yes'
  });

  useEffect(() => {
    if (question) {
      setFormData({
        inputType: question.type || 'Name',
        splitName: false,
        identifier: 'name',
        disableInput: false,
        label: question.label || 'your_name',
        placeholder: 'John Doe',
        required: question.required === 'Required' ? 'Yes' : 'No'
      });
    }
  }, [question]);

  const handleSave = () => {
    onSave({
      type: formData.inputType,
      label: formData.label,
      required: formData.required === 'Yes' ? 'Required' : 'Optional'
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold" style={{ fontSize: '20px', color: '#384252' }}>Add a question</h2>
          <button onClick={onClose} className="p-1 hover:bg-gray-100 rounded">
            <X className="h-5 w-5" />
          </button>
        </div>
        
        <p className="text-gray-600 mb-6" style={{ fontSize: '14px' }}>
          Customize the questions asked on the booking page
        </p>

        <div className="space-y-4">
          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Input type</label>
            <select 
              value={formData.inputType}
              onChange={(e) => setFormData(prev => ({ ...prev, inputType: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            >
              <option>Name</option>
              <option>Email</option>
              <option>Phone</option>
              <option>Short Text</option>
              <option>Long Text</option>
              <option>Multiple Emails</option>
            </select>
          </div>

          <div className="flex items-center space-x-3">
            <Switch 
              checked={formData.splitName}
              onCheckedChange={(value) => setFormData(prev => ({ ...prev, splitName: value }))}
            />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Split "Full name" into "First name" and "Last name"
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Identifier</label>
            <input 
              type="text"
              value={formData.identifier}
              onChange={(e) => setFormData(prev => ({ ...prev, identifier: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-100"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div className="flex items-center space-x-3">
            <input 
              type="checkbox" 
              checked={formData.disableInput}
              onChange={(e) => setFormData(prev => ({ ...prev, disableInput: e.target.checked }))}
            />
            <label style={{ fontSize: '14px', color: '#384252' }}>
              Disable input if the URL identifier is prefilled
            </label>
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Label</label>
            <input 
              type="text"
              value={formData.label}
              onChange={(e) => setFormData(prev => ({ ...prev, label: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              style={{ fontSize: '14px' }}
            />
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Placeholder</label>
            <input 
              type="text"
              value={formData.placeholder}
              onChange={(e) => setFormData(prev => ({ ...prev, placeholder: e.target.value }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              style={{ fontSize: '14px' }}
              placeholder="John Doe"
            />
          </div>

          <div>
            <label className="block font-medium mb-2" style={{ fontSize: '14px', color: '#384252' }}>Required</label>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setFormData(prev => ({ ...prev, required: 'Yes' }))}
                className={`px-4 py-2 rounded-lg border ${formData.required === 'Yes' ? 'bg-gray-200 border-gray-400' : 'bg-white border-gray-300'}`}
                style={{ fontSize: '14px' }}
              >
                Yes
              </button>
              <button
                onClick={() => setFormData(prev => ({ ...prev, required: 'No' }))}
                className={`px-4 py-2 rounded-lg border ${formData.required === 'No' ? 'bg-gray-200 border-gray-400' : 'bg-white border-gray-300'}`}
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
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-50"
            style={{ fontSize: '14px' }}
          >
            Cancel
          </button>
          <button 
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            style={{ fontSize: '14px' }}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
