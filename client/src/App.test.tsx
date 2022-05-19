import React from 'react';
// @ts-ignore
import { test, render, screen, expect } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/github/i);
  expect(linkElement).toBeInTheDocument();
});
