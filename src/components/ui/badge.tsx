import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center justify-center rounded-md border px-4 py-2 text-sm font-medium transition-all hover:cursor-pointer w-full',
  {
    variants: {
      variant: {
        default: 'border-muted-foreground/30 text-foreground bg-background hover:bg-background/90',
        selected: 'border-primary bg-primary/5 text-primary',
        correct: 'border-green-600 bg-green-600 text-white',
        incorrect: 'border-red-600 bg-red-600 text-white',
        unselected: 'border-green-500 bg-green-500/10 text-green-600',
        secondary:
          'border-transparent bg-secondary text-secondary-foreground [a&]:hover:bg-secondary/90',
        destructive: 'border-transparent bg-destructive text-white [a&]:hover:bg-destructive/90',
        outline:
          'text-foreground hover:bg-black hover:text-white [a&]:hover:bg-accent [a&]:hover:text-accent-foreground',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Badge({
  className,
  variant,
  asChild = false,
  ...props
}: React.ComponentProps<'span'> & VariantProps<typeof badgeVariants> & { asChild?: boolean }) {
  const Comp = asChild ? Slot : 'span';

  return (
    <Comp data-slot="badge" className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
