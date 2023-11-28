import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders github link', () => {
  render(<App />);
  const linkElement = screen.getByText(/github/i);
  expect(linkElement).toBeInTheDocument();
});
