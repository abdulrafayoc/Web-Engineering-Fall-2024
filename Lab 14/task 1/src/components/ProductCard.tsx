import React from 'react';
import { Product } from '../types/product';
import { useAppDispatch } from '../store/hooks';
import { addToCart } from '../store/slices/cartSlice';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const dispatch = useAppDispatch();

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      {/* Display product image */}
      <img 
        src={product.image} 
        alt={product.name} 
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        {/* Display product name */}
        <h3 className="text-lg font-semibold">{product.name}</h3>
        {/* Display product description */}
        <p className="text-gray-600 text-sm mt-1">{product.description}</p>
        <div className="mt-4 flex items-center justify-between">
          {/* Display product price */}
          <span className="text-xl font-bold">${product.price.toFixed(2)}</span>
          {/* Add to Cart button */}
          <button
            onClick={() => dispatch(addToCart(product))}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-blue-700 transition-colors"
            aria-label="Add to cart"
          >
            <ShoppingCart size={20} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};