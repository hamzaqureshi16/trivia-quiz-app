import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Input } from '../input';

describe('Input Component', () => {
  it('renders the Input component', () => {
    render(<Input />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(<Input className="custom-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('custom-class');
  });

  it('renders with placeholder text', () => {
    render(<Input placeholder="Enter text" />);
    const inputElement = screen.getByPlaceholderText('Enter text');
    expect(inputElement).toBeInTheDocument();
  });

  it('updates value when typing', () => {
    render(<Input placeholder="Type here" />);
    const inputElement = screen.getByPlaceholderText('Type here');
    fireEvent.change(inputElement, { target: { value: 'Hello' } });
    expect(inputElement).toHaveValue('Hello');
  });

  it('matches the snapshot', () => {
    const { container } = render(<Input placeholder="Snapshot Input" />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
