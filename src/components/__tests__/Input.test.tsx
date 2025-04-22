import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Input from '../Input';

describe('Input Component', () => {
  const mockOnChange = jest.fn();
  
  beforeEach(() => {
    jest.clearAllMocks();
  });
  
  it('renders with the correct value', () => {
    render(<Input value="Test Value" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveValue('Test Value');
  });
  
  it('calls onChange when value changes', () => {
    render(<Input value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    
    fireEvent.change(input, { target: { value: 'New Value' } });
    
    expect(mockOnChange).toHaveBeenCalledTimes(1);
  });
  
  it('renders with the correct placeholder', () => {
    render(<Input value="" onChange={mockOnChange} placeholder="Test Placeholder" />);
    const input = screen.getByPlaceholderText('Test Placeholder');
    
    expect(input).toBeInTheDocument();
  });
  
  it('renders with the correct name attribute', () => {
    render(<Input value="" onChange={mockOnChange} name="test-input" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveAttribute('name', 'test-input');
  });
  
  it('renders with the correct type attribute', () => {
    render(<Input value="" onChange={mockOnChange} type="password" />);
    const input = screen.getByRole('textbox', { hidden: true });
    
    expect(input).toHaveAttribute('type', 'password');
  });
  
  it('applies additional className when provided', () => {
    render(<Input value="" onChange={mockOnChange} className="custom-class" />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass('custom-class');
  });
  
  it('renders with default props when not all props are provided', () => {
    render(<Input value="" onChange={mockOnChange} />);
    const input = screen.getByRole('textbox');
    
    expect(input).toHaveClass('input');
    expect(input).toHaveAttribute('type', 'text');
    expect(input).not.toHaveAttribute('name');
    expect(input).not.toHaveAttribute('placeholder');
  });
}); 