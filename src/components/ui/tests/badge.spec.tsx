import { render, screen } from '@testing-library/react';
import { Badge } from '../badge';
import '@testing-library/jest-dom';

describe('Badge component', () => {
  it('renders with "correct" variant', () => {
    render(<Badge variant="correct">Correct Answer</Badge>);
    const badge = screen.getByText('Correct Answer');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-green-600');
  });

  it('renders with "incorrect" variant', () => {
    render(<Badge variant="incorrect">Wrong Answer</Badge>);
    const badge = screen.getByText('Wrong Answer');
    expect(badge).toBeInTheDocument();
    expect(badge).toHaveClass('bg-red-600');
  });

  it('renders with "outline" variant by default', () => {
    render(<Badge>Neutral</Badge>);
    const badge = screen.getByText('Neutral');
    expect(badge).toBeInTheDocument();
  });

  it('matches snapshot', () => {
    const { asFragment } = render(<Badge variant="correct">Snapshot</Badge>);
    expect(asFragment()).toMatchSnapshot();
  });
});
