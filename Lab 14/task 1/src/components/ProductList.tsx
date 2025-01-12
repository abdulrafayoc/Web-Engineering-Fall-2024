import React from 'react';
import { ProductCard } from './ProductCard';
import { products } from '../data/products';
import { ProductGrid } from './ProductGrid';

export const ProductList: React.FC = () => {
  return (
    <ProductGrid>
      {products.map(productItem => (
        <ProductCard key={productItem.id} product={productItem} />
      ))}
    </ProductGrid>
  );
};