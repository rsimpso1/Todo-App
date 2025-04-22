import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '../Button';

describe('Button Component', () => {
  const mockOnClick = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders with the correct icon', () => {
    render(<Button icon="add" onClick={mockOnClick} />);
    expect(screen.getByText('add')).toBeInTheDocument();
  });
  
  it('calls onClick when clicked', () => {
    render(<Button icon="add" onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    
    fireEvent.click(button);
    
    expect(mockOnClick).toHaveBeenCalledTimes(1);
  });
  
  it('applies the correct variant class', () => {
    render(<Button icon="add" onClick={mockOnClick} variant="primary" />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('button--primary');
  });
  
  it('applies the correct size class', () => {
    render(<Button icon="add" onClick={mockOnClick} size="small" />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('button--small');
  });
  
  it('applies active class when active prop is true', () => {
    render(<Button icon="add" onClick={mockOnClick} active={true} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('button--active');
  });
  
  it('does not apply active class when active prop is false', () => {
    render(<Button icon="add" onClick={mockOnClick} active={false} />);
    const button = screen.getByRole('button');
    
    expect(button).not.toHaveClass('button--active');
  });
  
  it('applies additional className when provided', () => {
    render(<Button icon="add" onClick={mockOnClick} className="custom-class" />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('custom-class');
  });
  
  it('renders with default props when not all props are provided', () => {
    render(<Button icon="add" onClick={mockOnClick} />);
    const button = screen.getByRole('button');
    
    expect(button).toHaveClass('button--ghost');
    expect(button).toHaveClass('button--medium');
    expect(button).not.toHaveClass('button--active');
  });
}); 