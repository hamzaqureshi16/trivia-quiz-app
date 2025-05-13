import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Button } from '../button';

describe('Button Component', () => {
  it('renders the Button with children', () => {
    render(<Button>Click Me</Button>);
    expect(screen.getByText('Click Me')).toBeInTheDocument();
  });

  it('calls onClick handler when clicked', () => {
    const handleClick = jest.fn();
    render(<Button onClick={handleClick}>Click Me</Button>);
    const button = screen.getByText('Click Me');
    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it('applies the correct variant styles', () => {
    render(<Button variant="default">Primary Button</Button>);
    const button = screen.getByText('Primary Button');
    expect(button).toHaveClass('bg-primary');
  });

  it('applies custom class names', () => {
    render(<Button className="custom-class">Styled Button</Button>);
    const button = screen.getByText('Styled Button');
    expect(button).toHaveClass('custom-class');
  });

  it('matches the snapshot', () => {
    const { container } = render(<Button>Snapshot Button</Button>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
