import React from 'react';
import '../styles/Button.scss';

interface ButtonProps {
  icon: string;
  onClick?: (e: React.MouseEvent) => void;
  variant?: 'ghost' | 'primary' | 'danger' | 'success';
  size?: 'small' | 'medium' | 'large';
  active?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
}

const Button: React.FC<ButtonProps> = ({
  icon,
  onClick,
  variant = 'ghost',
  size = 'medium',
  active = false,
  className = '',
  type = 'button',
}) => {
  return (
    <button
      className={`icon-button ${variant} ${size} ${active ? 'active' : ''} ${className}`}
      onClick={onClick}
      type={type}
    >
      <span className="material-icons">{icon}</span>
    </button>
  );
};

export default Button; 