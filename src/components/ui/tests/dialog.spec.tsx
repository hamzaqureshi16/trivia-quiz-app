import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '../Dialog'; // Adjust the import path as needed

// Mock the @radix-ui/react-dialog
jest.mock('@radix-ui/react-dialog', () => {
  const actual = jest.requireActual('@radix-ui/react-dialog');
  return {
    ...actual,
    // Mock Portal to make it easier to test
    Portal: ({ children }) => <div data-testid="dialog-portal">{children}</div>,
  };
});

// Mock the lib/utils
jest.mock('@/lib/utils', () => ({
  cn: (...args) => args.filter(Boolean).join(' '),
}));

describe('Dialog Components', () => {
  describe('DialogTrigger', () => {
    it('renders with correct props', () => {
      render(
        <Dialog>
          <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        </Dialog>,
      );
      const trigger = screen.getByTestId('dialog-trigger');
      expect(trigger).toBeInTheDocument();
      expect(trigger).toHaveAttribute('data-slot', 'dialog-trigger');
      expect(trigger).toHaveTextContent('Open Dialog');
    });
  });

  describe('DialogClose', () => {
    it('renders with correct props', () => {
      render(
        <Dialog>
          <DialogClose data-testid="dialog-close">Close</DialogClose>
        </Dialog>,
      );
      const close = screen.getByTestId('dialog-close');
      expect(close).toBeInTheDocument();
      expect(close).toHaveAttribute('data-slot', 'dialog-close');
      expect(close).toHaveTextContent('Close');
    });
  });

  describe('DialogContent', () => {
    it('renders with correct structure and props', () => {
      render(
        <Dialog open>
          <DialogContent data-testid="content" className="test-class">
            Test Content
          </DialogContent>
        </Dialog>,
      );

      const content = screen.getByTestId('content');
      expect(content).toBeInTheDocument();
      expect(content).toHaveAttribute('data-slot', 'dialog-content');
      expect(content).toHaveClass('test-class');
      expect(content).toHaveClass('fixed');
      expect(content).toHaveClass('top-[50%]');
      expect(content).toHaveClass('left-[50%]');
      expect(content).toHaveClass('z-50');
      expect(content).toHaveTextContent('Test Content');

      // Check for close button
      const closeButton = screen.getByRole('button');
      expect(closeButton).toBeInTheDocument();

      // Check for screen reader text
      const srText = screen.getByText('Close');
      expect(srText).toHaveClass('sr-only');
    });
  });

  describe('DialogHeader', () => {
    it('renders with correct props and classes', () => {
      render(
        <DialogHeader data-testid="header" className="test-class">
          Header Content
        </DialogHeader>,
      );
      const header = screen.getByTestId('header');
      expect(header).toBeInTheDocument();
      expect(header).toHaveAttribute('data-slot', 'dialog-header');
      expect(header).toHaveClass('test-class');
      expect(header).toHaveClass('flex');
      expect(header).toHaveClass('flex-col');
      expect(header).toHaveClass('gap-2');
      expect(header).toHaveTextContent('Header Content');
    });
  });

  describe('DialogFooter', () => {
    it('renders with correct props and classes', () => {
      render(
        <DialogFooter data-testid="footer" className="test-class">
          Footer Content
        </DialogFooter>,
      );
      const footer = screen.getByTestId('footer');
      expect(footer).toBeInTheDocument();
      expect(footer).toHaveAttribute('data-slot', 'dialog-footer');
      expect(footer).toHaveClass('test-class');
      expect(footer).toHaveClass('flex');
      expect(footer).toHaveClass('flex-col-reverse');
      expect(footer).toHaveClass('gap-2');
      expect(footer).toHaveTextContent('Footer Content');
    });
  });

  describe('DialogTitle', () => {
    it('renders with correct props and classes', () => {
      render(
        <Dialog>
          <DialogTitle data-testid="title" className="test-class">
            Dialog Title
          </DialogTitle>
        </Dialog>,
      );
      const title = screen.getByTestId('title');
      expect(title).toBeInTheDocument();
      expect(title).toHaveAttribute('data-slot', 'dialog-title');
      expect(title).toHaveClass('test-class');
      expect(title).toHaveClass('text-lg');
      expect(title).toHaveClass('leading-none');
      expect(title).toHaveClass('font-semibold');
      expect(title).toHaveTextContent('Dialog Title');
    });
  });

  describe('DialogDescription', () => {
    it('renders with correct props and classes', () => {
      render(
        <Dialog>
          <DialogDescription data-testid="description" className="test-class">
            Dialog Description
          </DialogDescription>
        </Dialog>,
      );
      const description = screen.getByTestId('description');
      expect(description).toBeInTheDocument();
      expect(description).toHaveAttribute('data-slot', 'dialog-description');
      expect(description).toHaveClass('test-class');
      expect(description).toHaveClass('text-muted-foreground');
      expect(description).toHaveClass('text-sm');
      expect(description).toHaveTextContent('Dialog Description');
    });
  });
});

describe('Dialog Integration Tests', () => {
  it('opens the dialog when trigger is clicked', async () => {
    render(
      <Dialog>
        <DialogTrigger data-testid="dialog-trigger">Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
            <DialogDescription>This is a test dialog</DialogDescription>
          </DialogHeader>
          <div>Dialog Body Content</div>
          <DialogFooter>
            <DialogClose data-testid="dialog-close-button">Close</DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    // Initial state - content shouldn't be visible
    expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();

    // Click trigger to open dialog
    const trigger = screen.getByTestId('dialog-trigger');
    fireEvent.click(trigger);

    // Dialog should now be visible
    const content = await screen.findByTestId('dialog-content');
    expect(content).toBeInTheDocument();
    expect(screen.getByText('Test Dialog')).toBeInTheDocument();
    expect(screen.getByText('This is a test dialog')).toBeInTheDocument();
    expect(screen.getByText('Dialog Body Content')).toBeInTheDocument();
  });

  it('closes the dialog when close button is clicked', async () => {
    render(
      <Dialog defaultOpen>
        <DialogTrigger>Open Dialog</DialogTrigger>
        <DialogContent data-testid="dialog-content">
          <DialogHeader>
            <DialogTitle>Test Dialog</DialogTitle>
          </DialogHeader>
          <DialogClose data-testid="dialog-close-button">Close</DialogClose>
        </DialogContent>
      </Dialog>,
    );

    // Dialog should be visible initially (defaultOpen)
    expect(screen.getByTestId('dialog-content')).toBeInTheDocument();

    // Click close button
    const closeButton = screen.getByTestId('dialog-close-button');

    fireEvent.click(closeButton);

    await waitFor(() => {
      expect(screen.queryByTestId('dialog-content')).not.toBeInTheDocument();
    });
  });

  it('renders a complex dialog with all components correctly', () => {
    render(
      <Dialog open>
        <DialogContent>
          <DialogHeader>
            <DialogTitle data-testid="dialog-title">Settings</DialogTitle>
            <DialogDescription data-testid="dialog-description">
              Configure your application settings
            </DialogDescription>
          </DialogHeader>
          <div data-testid="dialog-body" className="py-4">
            Form content would go here
          </div>
          <DialogFooter data-testid="dialog-footer">
            <DialogClose className="bg-gray-200 px-4 py-2 rounded">Cancel</DialogClose>
            <button className="bg-blue-500 text-white px-4 py-2 rounded">Save</button>
          </DialogFooter>
        </DialogContent>
      </Dialog>,
    );

    // Check all components render correctly
    expect(screen.getByTestId('dialog-title')).toHaveTextContent('Settings');
    expect(screen.getByTestId('dialog-description')).toHaveTextContent(
      'Configure your application settings',
    );
    expect(screen.getByTestId('dialog-body')).toHaveTextContent('Form content would go here');
    expect(screen.getByTestId('dialog-footer')).toBeInTheDocument();
    expect(screen.getByText('Cancel')).toBeInTheDocument();
    expect(screen.getByText('Save')).toBeInTheDocument();
  });
});
