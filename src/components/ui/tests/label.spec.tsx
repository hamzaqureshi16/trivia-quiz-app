import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Label } from '../label';

describe('Label Component', () => {
  it('renders the Label with children', () => {
    render(<Label>Test Label</Label>);
    expect(screen.getByText('Test Label')).toBeInTheDocument();
  });

  it('applies the htmlFor prop correctly', () => {
    render(<Label htmlFor="test-input">Test Label</Label>);
    const labelElement = screen.getByText('Test Label');
    expect(labelElement).toHaveAttribute('for', 'test-input');
  });

  it('applies custom class names', () => {
    render(<Label className="custom-class">Styled Label</Label>);
    const labelElement = screen.getByText('Styled Label');
    expect(labelElement).toHaveClass('custom-class');
  });

  it('matches the snapshot', () => {
    const { container } = render(<Label htmlFor="snapshot-input">Snapshot Label</Label>);
    expect(container.firstChild).toMatchSnapshot();
  });
});
