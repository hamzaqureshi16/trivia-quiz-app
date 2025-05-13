import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Card } from '../card';

describe('Card Component', () => {
  it('renders the Card with children', () => {
    render(
      <Card>
        <p>Card Content</p>
      </Card>,
    );
    expect(screen.getByText('Card Content')).toBeInTheDocument();
  });

  it('applies custom class names', () => {
    render(
      <Card className="custom-class">
        <p>Styled Card</p>
      </Card>,
    );
    const cardElement = screen.getByText('Styled Card').parentElement;
    expect(cardElement).toHaveClass('custom-class');
  });

  it('matches the snapshot', () => {
    const { container } = render(
      <Card>
        <p>Snapshot Card</p>
      </Card>,
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
