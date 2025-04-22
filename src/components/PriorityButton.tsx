import React, { useState, useRef, useEffect } from 'react';
import '../styles/PriorityButton.scss';
import Portal from './Portal';

interface PriorityButtonProps {
  priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1';
  onPriorityChange: (priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1') => void;
  onDropdownStateChange?: (isOpen: boolean) => void;
}

const PriorityButton: React.FC<PriorityButtonProps> = ({ 
  priority, 
  onPriorityChange,
  onDropdownStateChange 
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });

  const priorities = [
    { value: 'p5', label: 'None', color: '#9e9e9e' },
    { value: 'p4', label: 'Low', color: '#4CAF50' },
    { value: 'p3', label: 'Medium', color: '#2196F3' },
    { value: 'p2', label: 'High', color: '#FF9800' },
    { value: 'p1', label: 'Urgent', color: '#F44336' },
  ];

  useEffect(() => {
    const updatePosition = () => {
      if (buttonRef.current) {
        const rect = buttonRef.current.getBoundingClientRect();
        setDropdownPosition({
          top: rect.bottom + window.scrollY,
          left: rect.left + window.scrollX,
        });
      }
    };

    if (isOpen) {
      updatePosition();
      window.addEventListener('resize', updatePosition);
      window.addEventListener('scroll', updatePosition);
    }

    return () => {
      window.removeEventListener('resize', updatePosition);
      window.removeEventListener('scroll', updatePosition);
    };
  }, [isOpen]);

  // Notify parent component when dropdown state changes
  useEffect(() => {
    if (onDropdownStateChange) {
      onDropdownStateChange(isOpen);
    }
  }, [isOpen, onDropdownStateChange]);

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling
    setIsOpen(!isOpen);
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the related target is within the dropdown
    if (dropdownRef.current && dropdownRef.current.contains(e.relatedTarget as Node)) {
      return; // Don't close if focus is moving to the dropdown
    }
    
    // Use setTimeout to allow click events on dropdown items to fire first
    setTimeout(() => {
      setIsOpen(false);
    }, 100);
  };

  const handlePrioritySelect = (newPriority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1', e: React.MouseEvent) => {
    e.preventDefault(); // Prevent form submission
    e.stopPropagation(); // Prevent event bubbling
    onPriorityChange(newPriority);
    setIsOpen(false);
  };

  const currentPriority = priorities.find(p => p.value === priority);

  return (
    <div className="priority-button-container">
      <button
        ref={buttonRef}
        className={`priority-button priority-${priority} ghost-button`}
        onClick={handleClick}
        onBlur={handleBlur}
        type="button" // Explicitly set type to button to prevent form submission
      >
        <span className="material-icons priority-icon" style={{ color: currentPriority?.color }}>
          flag
        </span>
      </button>

      {isOpen && (
        <Portal>
          <div
            ref={dropdownRef}
            className="priority-dropdown"
            style={{
              position: 'absolute',
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
            }}
          >
            {priorities.map((p) => (
              <button
                key={p.value}
                className={`priority-option priority-${p.value} ${
                  p.value === priority ? 'selected' : ''
                }`}
                onClick={(e) => handlePrioritySelect(p.value as 'p5' | 'p4' | 'p3' | 'p2' | 'p1', e)}
                type="button" // Explicitly set type to button to prevent form submission
              >
                <span className="priority-label" style={{ color: p.color }}>{p.label}</span>
              </button>
            ))}
          </div>
        </Portal>
      )}
    </div>
  );
};

export default PriorityButton; 