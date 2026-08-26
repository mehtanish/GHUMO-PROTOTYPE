import React from 'react';
import type { InputHTMLAttributes } from 'react';
import './Input.css';
import type { LucideIcon } from 'lucide-react';

export interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  icon?: LucideIcon;
  error?: string;
  fullWidth?: boolean;
}

export const Input: React.FC<InputProps> = ({
  label,
  icon: Icon,
  error,
  fullWidth = true,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || `input-${Math.random().toString(36).substring(2, 9)}`;

  const containerClasses = [
    'wanderly-input-container',
    fullWidth ? 'wanderly-input-container--full' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={containerClasses}>
      {label && (
        <label htmlFor={inputId} className="wanderly-input-label">
          {label}
        </label>
      )}
      <div className="wanderly-input-wrapper">
        {Icon && (
          <div className="wanderly-input-icon">
            <Icon size={18} />
          </div>
        )}
        <input
          id={inputId}
          className={`wanderly-input ${Icon ? 'wanderly-input--with-icon' : ''} ${error ? 'wanderly-input--error' : ''}`}
          {...props}
        />
      </div>
      {error && <span className="wanderly-input-error-msg">{error}</span>}
    </div>
  );
};
