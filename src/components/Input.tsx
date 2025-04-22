import React from 'react';
import '../styles/Input.scss';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  name?: string;
  type?: string;
  autoFocus?: boolean;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  className = '',
  name = '',
  type = 'text',
  autoFocus = false
}) => {
  return (
    <input
      type={type}
      className={`input ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      name={name}
      autoFocus={autoFocus}
    />
  );
};

export default Input; 