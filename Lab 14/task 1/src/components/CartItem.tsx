import React from 'react';
import { Minus, Plus, Trash2 } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { removeFromCart, updateQuantity } from '../store/slices/cartSlice';
import type { CartItem as CartItemType } from '../types/product';

interface CartItemProps {
  item: CartItemType;
}

export const CartItem: React.FC<CartItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="flex items-center gap-4 py-4 border-b">
      {/* Display product image */}
      <img 
        src={item.image} 
        alt={item.name} 
        className="w-20 h-20 object-cover rounded"
      />
      <div className="flex-1">
        {/* Display product name */}
        <h3 className="font-semibold">{item.name}</h3>
        {/* Display product price */}
        <p className="text-gray-600">${item.price.toFixed(2)}</p>
      </div>
      <div className="flex items-center gap-2">
        {/* Decrease quantity button */}
        <button
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity - 1 }))}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Decrease quantity"
        >
          <Minus size={20} />
        </button>
        {/* Display current quantity */}
        <span className="w-8 text-center">{item.quantity}</span>
        {/* Increase quantity button */}
        <button
          onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
          className="p-1 hover:bg-gray-100 rounded"
          aria-label="Increase quantity"
        >
          <Plus size={20} />
        </button>
      </div>
      {/* Remove item from cart button */}
      <button
        onClick={() => dispatch(removeFromCart(item.id))}
        className="p-2 text-red-600 hover:bg-red-50 rounded"
        aria-label="Remove item"
      >
        <Trash2 size={20} />
      </button>
    </div>
  );
};