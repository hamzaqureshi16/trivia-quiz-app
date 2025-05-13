import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import * as React from 'react';
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
} from '../command';

jest.mock('cmdk', () => {
  const Command = ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
  }) => (
    <div data-testid="command" className={className} {...props}>
      {children}
    </div>
  );

  Command.Input = ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <input data-testid="command-input" className={className} {...props} />
  );

  Command.List = ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="command-list" className={className} {...props}>
      {children}
    </div>
  );

  Command.Empty = ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="command-empty" className={className} {...props}>
      {children}
    </div>
  );

  Command.Group = ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="command-group" className={className} {...props}>
      {children}
    </div>
  );

  Command.Item = ({
    className,
    children,
    ...props
  }: {
    className?: string;
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="command-item" className={className} {...props}>
      {children}
    </div>
  );

  Command.Separator = ({ className, ...props }: { className?: string; [key: string]: unknown }) => (
    <div data-testid="command-separator" className={className} {...props} />
  );

  return { Command };
});

jest.mock('@/components/ui/dialog', () => ({
  Dialog: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="dialog" {...props}>
      {children}
    </div>
  ),
  DialogContent: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid="dialog-content" className={className} {...props}>
      {children}
    </div>
  ),
  DialogHeader: ({
    children,
    className,
    ...props
  }: {
    children: React.ReactNode;
    className?: string;
    [key: string]: unknown;
  }) => (
    <div data-testid="dialog-header" className={className} {...props}>
      {children}
    </div>
  ),
  DialogTitle: ({ children, ...props }: { children: React.ReactNode; [key: string]: unknown }) => (
    <div data-testid="dialog-title" {...props}>
      {children}
    </div>
  ),
  DialogDescription: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    [key: string]: unknown;
  }) => (
    <div data-testid="dialog-description" {...props}>
      {children}
    </div>
  ),
}));

jest.mock('lucide-react', () => ({
  SearchIcon: () => <div data-testid="search-icon" />,
}));

jest.mock('@/lib/utils', () => ({
  cn: (...args: unknown[]) => args.filter(Boolean).join(' '),
}));

describe('Command Components', () => {
  describe('Command', () => {
    it('renders with default props', () => {
      render(<Command />);
      const command = screen.getByTestId('command');
      expect(command).toBeInTheDocument();
      expect(command).toHaveAttribute('data-slot', 'command');
    });

    it('applies custom className', () => {
      render(<Command className="custom-class" />);
      const command = screen.getByTestId('command');
      expect(command.className).toContain('custom-class');
    });

    it('passes additional props', () => {
      render(<Command data-custom="test-value" />);
      const command = screen.getByTestId('command');
      expect(command).toHaveAttribute('data-custom', 'test-value');
    });
  });

  describe('CommandDialog', () => {
    it('renders with default props', () => {
      render(<CommandDialog />);
      expect(screen.getByTestId('dialog')).toBeInTheDocument();
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Command Palette');
      expect(screen.getByTestId('dialog-description')).toHaveTextContent(
        'Search for a command to run...',
      );
    });

    it('renders with custom title and description', () => {
      render(<CommandDialog title="Custom Title" description="Custom Description" />);
      expect(screen.getByTestId('dialog-title')).toHaveTextContent('Custom Title');
      expect(screen.getByTestId('dialog-description')).toHaveTextContent('Custom Description');
    });

    it('renders children', () => {
      render(
        <CommandDialog>
          <div data-testid="test-child">Child content</div>
        </CommandDialog>,
      );
      expect(screen.getByTestId('test-child')).toBeInTheDocument();
    });
  });

  describe('CommandInput', () => {
    it('renders with default props', () => {
      render(<CommandInput />);
      expect(screen.getByTestId('command-input')).toBeInTheDocument();
      expect(screen.getByTestId('search-icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CommandInput className="custom-input" />);
      const input = screen.getByTestId('command-input');
      expect(input.className).toContain('custom-input');
    });

    it('forwards props to the input element', () => {
      render(<CommandInput placeholder="Search..." />);
      const input = screen.getByTestId('command-input');
      expect(input).toHaveAttribute('placeholder', 'Search...');
    });
  });

  describe('CommandList', () => {
    it('renders with default props', () => {
      render(<CommandList />);
      expect(screen.getByTestId('command-list')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CommandList className="custom-list" />);
      const list = screen.getByTestId('command-list');
      expect(list.className).toContain('custom-list');
    });

    it('renders children', () => {
      render(
        <CommandList>
          <div data-testid="test-list-child">List child</div>
        </CommandList>,
      );
      expect(screen.getByTestId('test-list-child')).toBeInTheDocument();
    });
  });

  describe('CommandEmpty', () => {
    it('renders with default props', () => {
      render(<CommandEmpty>No results found</CommandEmpty>);
      const empty = screen.getByTestId('command-empty');
      expect(empty).toBeInTheDocument();
      expect(empty).toHaveTextContent('No results found');
    });
  });

  describe('CommandGroup', () => {
    it('renders with default props', () => {
      render(<CommandGroup />);
      expect(screen.getByTestId('command-group')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CommandGroup className="custom-group" />);
      const group = screen.getByTestId('command-group');
      expect(group.className).toContain('custom-group');
    });

    it('renders children', () => {
      render(
        <CommandGroup>
          <div data-testid="test-group-child">Group child</div>
        </CommandGroup>,
      );
      expect(screen.getByTestId('test-group-child')).toBeInTheDocument();
    });
  });

  describe('CommandSeparator', () => {
    it('renders with default props', () => {
      render(<CommandSeparator />);
      expect(screen.getByTestId('command-separator')).toBeInTheDocument();
    });

    it('applies custom className', () => {
      render(<CommandSeparator className="custom-separator" />);
      const separator = screen.getByTestId('command-separator');
      expect(separator.className).toContain('custom-separator');
    });
  });

  describe('CommandItem', () => {
    it('renders with default props', () => {
      render(<CommandItem>Item text</CommandItem>);
      const item = screen.getByTestId('command-item');
      expect(item).toBeInTheDocument();
      expect(item).toHaveTextContent('Item text');
    });

    it('applies custom className', () => {
      render(<CommandItem className="custom-item">Item text</CommandItem>);
      const item = screen.getByTestId('command-item');
      expect(item.className).toContain('custom-item');
    });
  });

  describe('CommandShortcut', () => {
    it('renders with default props', () => {
      render(<CommandShortcut>⌘K</CommandShortcut>);
      expect(screen.getByText('⌘K')).toBeInTheDocument();
    });
  });

  describe('Command components integration', () => {
    it('renders a complete command pattern', () => {
      render(
        <Command>
          <CommandInput placeholder="Search..." />
          <CommandList>
            <CommandEmpty>No results found</CommandEmpty>
            <CommandGroup heading="Suggestions">
              <CommandItem>Calendar</CommandItem>
              <CommandItem>Search</CommandItem>
              <CommandItem>Settings</CommandItem>
            </CommandGroup>
            <CommandSeparator />
            <CommandGroup heading="Settings">
              <CommandItem>Profile</CommandItem>
              <CommandItem>Billing</CommandItem>
              <CommandItem>
                Settings
                <CommandShortcut>⌘S</CommandShortcut>
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>,
      );

      expect(screen.getByTestId('command')).toBeInTheDocument();
      expect(screen.getByTestId('command-input')).toBeInTheDocument();
      expect(screen.getByTestId('command-list')).toBeInTheDocument();
      expect(screen.getByTestId('command-empty')).toBeInTheDocument();
      expect(screen.getAllByTestId('command-group').length).toBe(2);
    });
  });
});
