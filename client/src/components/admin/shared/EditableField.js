import React, { useState } from 'react';
import FormField from '../../ui/FormField';

const EditableField = ({
  label,
  value,
  onSave,
  type = 'text',
  placeholder,
  options = [],
  rows = 4,
  maxLength,
  required = false,
  className = ''
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempValue, setTempValue] = useState(value || '');
  const [isSaving, setIsSaving] = useState(false);

  const handleEdit = () => {
    setTempValue(value || '');
    setIsEditing(true);
  };

  const handleSave = async () => {
    try {
      setIsSaving(true);
      await onSave(tempValue);
      setIsEditing(false);
    } catch (error) {
      console.error('Error saving field:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
    setTempValue(value || '');
  };

  const handleChange = (e) => {
    setTempValue(e.target.value);
  };

  return (
    <div className={`mb-6 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <label className="block text-sm font-medium text-gray-300">
          {label}
        </label>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="text-blue-400 hover:text-blue-300 text-sm flex items-center"
          >
            <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Upraviť
          </button>
        )}
      </div>
      
      {isEditing ? (
        <div className="space-y-3">
          <FormField
            type={type}
            value={tempValue}
            onChange={handleChange}
            placeholder={placeholder}
            options={options}
            rows={rows}
            inputClassName="bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500"
            disabled={isSaving}
          />
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving || (required && !tempValue.trim())}
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSaving ? 'Ukladám...' : 'Uložiť'}
            </button>
            <button
              onClick={handleCancel}
              disabled={isSaving}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors disabled:opacity-50"
            >
              Zrušiť
            </button>
          </div>
        </div>
      ) : (
        <div className="p-3 bg-gray-700 border border-gray-600 rounded-lg">
          <p className="text-white">
            {value || 'Žiadna hodnota nie je zadaná'}
          </p>
        </div>
      )}
    </div>
  );
};

export default EditableField;
