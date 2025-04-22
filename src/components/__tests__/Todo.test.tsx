import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import Todo from '../Todo';

describe('Todo Component', () => {
  // Test initial render
  it('renders the todo list with empty state', () => {
    render(<Todo />);
    
    // Check if the title is rendered
    expect(screen.getByText('Todo List')).toBeInTheDocument();
    
    // Check if the input field is rendered
    expect(screen.getByPlaceholderText('Add a new task...')).toBeInTheDocument();
    
    // Check if the add button is rendered
    expect(screen.getByRole('button', { name: /add/i })).toBeInTheDocument();
    
    // Check if the todo list is empty
    const todoItems = screen.queryAllByRole('listitem');
    expect(todoItems).toHaveLength(0);
  });

  // Test adding a new todo
  it('adds a new todo when form is submitted', () => {
    render(<Todo />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Type a new todo
    fireEvent.change(input, { target: { value: 'New Todo Item' } });
    
    // Submit the form
    fireEvent.click(addButton);
    
    // Check if the todo was added
    expect(screen.getByText('New Todo Item')).toBeInTheDocument();
    
    // Check if the input was cleared
    expect(input).toHaveValue('');
  });

  // Test that empty todos are not added
  it('does not add empty todos', () => {
    render(<Todo />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Try to add an empty todo
    fireEvent.change(input, { target: { value: '   ' } });
    fireEvent.click(addButton);
    
    // Check that no todo was added
    const todoItems = screen.queryAllByRole('listitem');
    expect(todoItems).toHaveLength(0);
  });

  // Test toggling a todo
  it('toggles a todo when clicked', () => {
    render(<Todo />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'Toggle Test' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    // Get the todo item
    const todoItem = screen.getByText('Toggle Test');
    
    // Check initial state (not completed)
    expect(todoItem.closest('li')).not.toHaveClass('completed');
    
    // Click the todo to toggle it
    fireEvent.click(todoItem);
    
    // Check if the todo is now completed
    expect(todoItem.closest('li')).toHaveClass('completed');
    
    // Click again to toggle back
    fireEvent.click(todoItem);
    
    // Check if the todo is not completed again
    expect(todoItem.closest('li')).not.toHaveClass('completed');
  });

  // Test deleting a todo
  it('deletes a todo when delete button is clicked', () => {
    render(<Todo />);
    
    // Add a todo first
    const input = screen.getByPlaceholderText('Add a new task...');
    fireEvent.change(input, { target: { value: 'Delete Test' } });
    fireEvent.click(screen.getByRole('button', { name: /add/i }));
    
    // Check if the todo was added
    expect(screen.getByText('Delete Test')).toBeInTheDocument();
    
    // Find and click the delete button
    const deleteButton = screen.getByRole('button', { name: /delete/i });
    fireEvent.click(deleteButton);
    
    // Check if the todo was deleted
    expect(screen.queryByText('Delete Test')).not.toBeInTheDocument();
  });

  // Test multiple todos
  it('handles multiple todos correctly', () => {
    render(<Todo />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Add multiple todos
    const todos = ['First Todo', 'Second Todo', 'Third Todo'];
    
    todos.forEach(todo => {
      fireEvent.change(input, { target: { value: todo } });
      fireEvent.click(addButton);
    });
    
    // Check if all todos were added
    todos.forEach(todo => {
      expect(screen.getByText(todo)).toBeInTheDocument();
    });
    
    // Check if the todo list has the correct number of items
    const todoItems = screen.getAllByRole('listitem');
    expect(todoItems).toHaveLength(todos.length);
  });

  // Test form submission with Enter key
  it('adds a todo when Enter key is pressed', () => {
    render(<Todo />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    
    // Type a new todo and press Enter
    fireEvent.change(input, { target: { value: 'Enter Key Test' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    
    // Check if the todo was added
    expect(screen.getByText('Enter Key Test')).toBeInTheDocument();
  });

  // Test add button active state
  it('changes add button appearance when input has text', () => {
    render(<Todo />);
    
    const input = screen.getByPlaceholderText('Add a new task...');
    const addButton = screen.getByRole('button', { name: /add/i });
    
    // Check initial state (not active)
    expect(addButton).not.toHaveClass('button--active');
    
    // Type some text
    fireEvent.change(input, { target: { value: 'Test Text' } });
    
    // Check if button is now active
    expect(addButton).toHaveClass('button--active');
    
    // Clear the input
    fireEvent.change(input, { target: { value: '' } });
    
    // Check if button is not active again
    expect(addButton).not.toHaveClass('button--active');
  });
}); 