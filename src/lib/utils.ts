import { Category } from '@/features/types';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function mapCategoriesToOptions(categories: Category[] | null) {
  return categories
    ? categories.map(category => ({
        value: category.name,
        label: category.name,
      }))
    : [];
}
