import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/swipoo entry task/i);
  expect(linkElement).toBeInTheDocument();
});
test('darkMode toggles when clicking toggle', () => {
  render(<App />);
  userEvent.click(screen.getByTestId(/dark-mode-switch/i));
  expect(document.querySelector('body')?.style.backgroundColor).toBe(
    'rgb(18, 18, 18)'
  );
  userEvent.click(screen.getByTestId(/dark-mode-switch/i));
  expect(document.querySelector('body')?.style.backgroundColor).toBe('white');
});
