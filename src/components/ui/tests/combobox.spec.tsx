import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ComboBox } from '../combobox';

describe('Combobox Component', () => {
  const options = [
    {
      value: 'Option 1',
      label: 'Option 1',
    },
    {
      value: 'Option 2',
      label: 'Option 2',
    },
    {
      value: 'Option 3',
      label: 'Option 3',
    },
    {
      value: 'Option 4',
      label: 'Option 4',
    },
    {
      value: 'Option 5',
      label: 'Option 5',
    },
  ];

  it('renders the Combobox with a placeholder', () => {
    render(
      <ComboBox options={options} label="Select an option" value="" onValueChange={value => {
        console.log(value);
      }} />,
    );
    expect(screen.getByText('Select an option')).toBeInTheDocument();
  });
});
