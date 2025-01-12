import React from 'react';
import { ShoppingCart } from 'lucide-react';
import { Product } from '../types';
import { formatPrice } from '../lib/utils';
import useStore from '../store/useStore';

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const addToCart = useStore((state) => state.addToCart);

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <ProductImage image={product.image} title={product.title} />
      <ProductDetails product={product} addToCart={addToCart} />
    </div>
  );
}

function ProductImage({ image, title }: { image: string; title: string }) {
  return (
    <div className="relative h-48">
      <img
        src={image}
        alt={title}
        className="w-full h-full object-contain p-4"
      />
    </div>
  );
}

function ProductDetails({ product, addToCart }: { product: Product; addToCart: (product: Product) => void }) {
  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold truncate">{product.title}</h3>
      <p className="text-sm text-gray-600 mt-1 h-12 overflow-hidden">
        {product.description}
      </p>
      <div className="mt-4 flex items-center justify-between">
        <span className="text-xl font-bold text-gray-900">
          {formatPrice(product.price)}
        </span>
        <AddToCartButton addToCart={() => addToCart(product)} />
      </div>
    </div>
  );
}

function AddToCartButton({ addToCart }: { addToCart: () => void }) {
  return (
    <button
      onClick={addToCart}
      className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
    >
      <ShoppingCart size={20} />
      Add to Cart
    </button>
  );
}