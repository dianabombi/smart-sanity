import React from 'react';

const FormField = ({
  label,
  type = 'text',
  name,
  value,
  onChange,
  required = false,
  placeholder,
  options = [],
  rows = 4,
  className = '',
  inputClassName = '',
  error,
  helpText,
  disabled = false
}) => {
  const baseInputClasses = `w-full px-4 py-1 border rounded-lg focus:outline-none focus:ring-1 ${
    disabled ? 'opacity-50 cursor-not-allowed' : ''
  }`;

  // Different styles for different contexts
  const getInputClasses = () => {
    if (inputClassName.includes('bg-gray-700')) {
      // Admin/dark theme
      return `${baseInputClasses} bg-gray-700 border-gray-600 text-white placeholder-gray-400 focus:border-blue-500 focus:ring-blue-500 ${inputClassName}`;
    } else {
      // Public/light theme
      return `${baseInputClasses} bg-gray-200 border-gray-300 text-black placeholder-gray-500 focus:border-gray-400 focus:ring-gray-400 ${inputClassName}`;
    }
  };

  const renderInput = () => {
    const inputClasses = getInputClasses();

    switch (type) {
      case 'textarea':
        return (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            rows={rows}
            disabled={disabled}
            className={`${inputClasses} resize-vertical`}
          />
        );
      
      case 'select':
        return (
          <select
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={`${inputClasses} text-center`}
          >
            {placeholder && <option value="" className="text-center">{placeholder}</option>}
            {options.map((option, index) => (
              <option key={index} value={option.value || option} className="text-left">
                {option.label || option}
              </option>
            ))}
          </select>
        );
      
      case 'file':
        return (
          <input
            type="file"
            name={name}
            onChange={onChange}
            required={required}
            disabled={disabled}
            className={inputClasses}
            {...(placeholder && { accept: placeholder })} // Use placeholder for accept attribute
          />
        );
      
      default:
        return (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            required={required}
            placeholder={placeholder}
            disabled={disabled}
            className={inputClasses}
          />
        );
    }
  };

  return (
    <div className={className}>
      {label && (
        <label className="block text-md font-medium text-gray-300 mb-2">
          {label}
          {required && <span className="text-red-400 ml-1">*</span>}
        </label>
      )}
      
      {renderInput()}
      
      {error && (
        <p className="text-red-400 text-sm mt-1">{error}</p>
      )}
      
      {helpText && (
        <p className="text-gray-400 text-sm mt-1">{helpText}</p>
      )}
    </div>
  );
};

export default FormField;
