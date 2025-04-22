import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import TodoItem from '../TodoItem';

describe('TodoItem Component', () => {
  const mockToggle = jest.fn();
  const mockDelete = jest.fn();
  
  const defaultProps = {
    id: 1,
    text: 'Test Todo',
    completed: false,
    onToggle: mockToggle,
    onDelete: mockDelete
  };
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders the todo text correctly', () => {
    render(<TodoItem {...defaultProps} />);
    expect(screen.getByText('Test Todo')).toBeInTheDocument();
  });
  
  it('applies completed class when todo is completed', () => {
    render(<TodoItem {...defaultProps} completed={true} />);
    const todoItem = screen.getByText('Test Todo').closest('li');
    expect(todoItem).toHaveClass('completed');
  });
  
  it('does not apply completed class when todo is not completed', () => {
    render(<TodoItem {...defaultProps} completed={false} />);
    const todoItem = screen.getByText('Test Todo').closest('li');
    expect(todoItem).not.toHaveClass('completed');
  });
  
  it('calls onToggle when the todo item is clicked', () => {
    render(<TodoItem {...defaultProps} />);
    const todoItem = screen.getByText('Test Todo');
    
    fireEvent.click(todoItem);
    
    expect(mockToggle).toHaveBeenCalledWith(1);
    expect(mockToggle).toHaveBeenCalledTimes(1);
  });
  
  it('calls onDelete when the delete button is clicked', () => {
    render(<TodoItem {...defaultProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    
    fireEvent.click(deleteButton);
    
    expect(mockDelete).toHaveBeenCalledWith(1);
    expect(mockDelete).toHaveBeenCalledTimes(1);
  });
  
  it('stops event propagation when delete button is clicked', () => {
    render(<TodoItem {...defaultProps} />);
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    
    // Create a spy on the stopPropagation method
    const stopPropagationSpy = jest.spyOn(Event.prototype, 'stopPropagation');
    
    fireEvent.click(deleteButton);
    
    expect(stopPropagationSpy).toHaveBeenCalled();
    stopPropagationSpy.mockRestore();
  });
}); 