import React, { useState, useRef, useEffect } from 'react';
import { DraggableProvidedDragHandleProps } from '@hello-pangea/dnd';
import Button from './Button';
import PriorityButton from './PriorityButton';
import '../styles/TodoItem.scss';

interface TodoItemProps {
  id: string;
  text: string;
  completed: boolean;
  priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1';
  isEditing: boolean;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
  onEdit: (id: string, newText: string) => void;
  onPriorityChange: (id: string, priority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1') => void;
  onStartEdit: (id: string) => void;
  onCancelEdit: () => void;
  dragHandleProps?: DraggableProvidedDragHandleProps;
}

const TodoItem: React.FC<TodoItemProps> = ({
  id,
  text,
  completed,
  priority,
  isEditing,
  onToggle,
  onDelete,
  onEdit,
  onPriorityChange,
  onStartEdit,
  onCancelEdit,
  dragHandleProps
}) => {
  const [editText, setEditText] = useState(text);
  const [isPriorityDropdownOpen, setIsPriorityDropdownOpen] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isEditing && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isEditing]);

  useEffect(() => {
    setEditText(text);
  }, [text]);

  const handleEditClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isEditing) {
      handleSaveEdit();
      onCancelEdit();
    } else {
      onStartEdit(id);
    }
  };

  const handleSaveEdit = () => {
    if (editText.trim()) {
      onEdit(id, editText.trim());
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      setEditText(text);
      onCancelEdit();
    }
  };

  const handleBlur = (e: React.FocusEvent) => {
    // Check if the related target is the save button
    const relatedTarget = e.relatedTarget as HTMLElement;
    if (relatedTarget?.classList.contains('edit-button')) {
      return; // Don't cancel edit if clicking the save button
    }
    // Reset to original text and exit edit mode
    setEditText(text);
    onCancelEdit();
  };

  const handleDelete = (e: React.MouseEvent) => {
    e.stopPropagation();
    onDelete(id);
  };

  const handlePriorityChange = (newPriority: 'p5' | 'p4' | 'p3' | 'p2' | 'p1') => {
    onPriorityChange(id, newPriority);
  };

  const handlePriorityDropdownStateChange = (isOpen: boolean) => {
    setIsPriorityDropdownOpen(isOpen);
  };

  const handleToggle = (e: React.MouseEvent) => {
    // Only toggle if not dragging
    if (!e.defaultPrevented && !e.isPropagationStopped()) {
      onToggle(id);
    }
  };

  return (
    <div
      className={`todo-item ${completed ? 'completed' : ''} priority-${priority} ${isEditing ? 'editing' : ''} ${isPriorityDropdownOpen ? 'priority-dropdown-open' : ''}`}
      onClick={handleToggle}
    >
      {dragHandleProps && (
        <div 
          className="drag-handle" 
          {...dragHandleProps}
          onClick={(e) => e.stopPropagation()}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <span className="material-icons">drag_indicator</span>
        </div>
      )}
      {isEditing ? (
        <input
          ref={inputRef}
          type="text"
          value={editText}
          onChange={(e) => setEditText(e.target.value)}
          onKeyDown={handleKeyDown}
          onBlur={handleBlur}
          className="edit-input"
          onClick={(e) => e.stopPropagation()}
        />
      ) : (
        <span className="todo-text">{text}</span>
      )}
      <div className="item-actions">
        <Button
          icon={isEditing ? "check" : "edit"}
          variant={isEditing ? "success" : "ghost"}
          onClick={handleEditClick}
          className="edit-button"
        />
        <PriorityButton
          priority={priority}
          onPriorityChange={handlePriorityChange}
          onDropdownStateChange={handlePriorityDropdownStateChange}
        />
        <Button
          icon="delete"
          variant="danger"
          onClick={handleDelete}
          className="delete-button"
        />
      </div>
    </div>
  );
};

export default TodoItem; 
