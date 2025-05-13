import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Popover, PopoverTrigger, PopoverContent } from '../popover';

describe('Popover Component', () => {
  it('renders the Popover trigger', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );
    expect(screen.getByText('Open Popover')).toBeInTheDocument();
  });

  it('does not show the Popover content by default', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });

  it('shows the Popover content when the trigger is clicked', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByText('Open Popover');
    fireEvent.click(trigger);
    expect(screen.getByText('Popover Content')).toBeInTheDocument();
  });

  it('hides the Popover content when the trigger is clicked again', () => {
    render(
      <Popover>
        <PopoverTrigger>Open Popover</PopoverTrigger>
        <PopoverContent>Popover Content</PopoverContent>
      </Popover>,
    );
    const trigger = screen.getByText('Open Popover');
    fireEvent.click(trigger); // Open the popover
    fireEvent.click(trigger); // Close the popover
    expect(screen.queryByText('Popover Content')).not.toBeInTheDocument();
  });
});
