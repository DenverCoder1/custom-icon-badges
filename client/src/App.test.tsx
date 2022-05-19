import React from 'react';
// @ts-ignore
import { expect, render, screen, test } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/github/i);
  expect(linkElement).toBeInTheDocument();
});
