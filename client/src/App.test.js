import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import CartHeader from './components/CartHeader';
import InventoryHeader from './components/InventoryHeader';

test('Cart header has required colume names', () => {
  render(<CartHeader />);
  ["Name", "Quantity", "Subtotal", "Actions"].forEach(element => {
    expect(screen.getByText(element)).toBeInTheDocument();
  });
});

test('Inventory header has required colume names', () => {
  render(<InventoryHeader />);
  ["Name", "Price"].forEach(element => {
    expect(screen.getByText(element)).toBeInTheDocument();
  });
});