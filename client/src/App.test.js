import '@testing-library/jest-dom'
import React from 'react';
import { render, screen } from '@testing-library/react';
import CartHeader from './components/CartHeader';
import InventoryHeader from './components/InventoryHeader';
import {formatPrice, calculateSubtotal, calculateQuantityAndTotal} from './actions/cart';

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

test('format price correctly', () => {
  expect(formatPrice(-0)).toBe(0);
  expect(formatPrice(1.333333333)).toBe(1.33);
  expect(formatPrice(1.0000000000000000001)).toBe(1);
});

test('Calculate subtotal given a product object', () => {
  const testProduct = {price: 2.33, quantity: 25};
  expect(calculateSubtotal(testProduct)).toBe(58.25);
});

test('Calculate total price and quantity given a list of 1 product object', () => {
  const testProducts = [{price: 2.33, quantity: 25}];
  const ans = calculateQuantityAndTotal(testProducts);
  expect(ans.quantity).toBe(25);
  expect(ans.total).toBe(58.25);
});

test('Calculate total price and quantity given a list of multiple product objects', () => {
  const testProducts = [
    {price: 2.33, quantity: 25},
    {price: 1.33, quantity: 0},
    {price: 9.99, quantity: 9}
  ];
  const ans = calculateQuantityAndTotal(testProducts);
  expect(ans.quantity).toBe(34);
  expect(ans.total).toBe(148.16);
});
