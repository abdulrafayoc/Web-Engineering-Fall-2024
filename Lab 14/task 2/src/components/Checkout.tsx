import React, { useState } from 'react';
import { CreditCard } from 'lucide-react';
import useStore from '../store/useStore';
import { formatPrice } from '../lib/utils';
import type { Address } from '../types';

// Shipping Address Form Component
const ShippingAddressForm = ({ address, handleAddressChange }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Shipping Address</h3>
    <div className="space-y-4">
      <input
        type="text"
        name="street"
        placeholder="Street Address"
        value={address?.street || ''}
        onChange={handleAddressChange}
        className="w-full px-4 py-2 border rounded"
        required
      />
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="city"
          placeholder="City"
          value={address?.city || ''}
          onChange={handleAddressChange}
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="state"
          placeholder="State"
          value={address?.state || ''}
          onChange={handleAddressChange}
          className="px-4 py-2 border rounded"
          required
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <input
          type="text"
          name="zipCode"
          placeholder="ZIP Code"
          value={address?.zipCode || ''}
          onChange={handleAddressChange}
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          name="country"
          placeholder="Country"
          value={address?.country || ''}
          onChange={handleAddressChange}
          className="px-4 py-2 border rounded"
          required
        />
      </div>
    </div>
  </div>
);

// Payment Details Form Component
const PaymentDetailsForm = () => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Payment Details</h3>
    <div className="space-y-4">
      <input
        type="text"
        placeholder="Card Number"
        className="w-full px-4 py-2 border rounded"
        required
      />
      <div className="grid grid-cols-3 gap-4">
        <input
          type="text"
          placeholder="MM/YY"
          className="px-4 py-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="CVC"
          className="px-4 py-2 border rounded"
          required
        />
      </div>
    </div>
  </div>
);

// Order Summary Component
const OrderSummary = ({ cart, total }) => (
  <div className="bg-white rounded-lg shadow-lg p-6">
    <h3 className="text-lg font-semibold mb-4">Order Summary</h3>
    <div className="space-y-2">
      {cart.map((item) => (
        <div key={item.id} className="flex justify-between">
          <span>
            {item.title} (x{item.quantity})
          </span>
          <span>{formatPrice(item.price * item.quantity)}</span>
        </div>
      ))}
      <div className="border-t pt-2 mt-2">
        <div className="flex justify-between font-bold">
          <span>Total</span>
          <span>{formatPrice(total)}</span>
        </div>
      </div>
    </div>
  </div>
);

export function Checkout() {
  const { cart, address, setAddress, clearCart } = useStore();
  const [isProcessing, setIsProcessing] = useState(false);

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    clearCart();
    setIsProcessing(false);
    alert('Order placed successfully!');
  };

  const handleAddressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setAddress({ ...address, [name]: value } as Address);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-6">Checkout</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <ShippingAddressForm address={address} handleAddressChange={handleAddressChange} />
        <PaymentDetailsForm />
        <OrderSummary cart={cart} total={total} />

        <button
          type="submit"
          disabled={isProcessing}
          className="w-full bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center gap-2 hover:bg-blue-700 transition-colors disabled:bg-blue-400"
        >
          <CreditCard size={20} />
          {isProcessing ? 'Processing...' : 'Place Order'}
        </button>
      </form>
    </div>
  );
}