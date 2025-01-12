import React from 'react';
import { Search, Filter } from 'lucide-react';
import useStore from '../store/useStore';
import { ProductCard } from './ProductCard';

export function ProductList() {
  const {
    filteredProducts,
    searchTerm,
    selectedCategory,
    priceRange,
    setSearchTerm,
    setCategory,
    setPriceRange,
  } = useStore();

  const handleSearchChange = (e) => setSearchTerm(e.target.value);
  const handleCategoryChange = (e) => setCategory(e.target.value);
  const handleMinPriceChange = (e) => setPriceRange({ ...priceRange, min: Number(e.target.value) });
  const handleMaxPriceChange = (e) => setPriceRange({ ...priceRange, max: Number(e.target.value) });

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8 space-y-4">
        <div className="flex gap-4 items-center">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search products..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <select
            value={selectedCategory}
            onChange={handleCategoryChange}
            className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="">All Categories</option>
            <option value="electronics">Electronics</option>
            <option value="jewelery">Jewelery</option>
            <option value="men's clothing">Men's Clothing</option>
            <option value="women's clothing">Women's Clothing</option>
          </select>
        </div>
        <div className="flex items-center gap-4">
          <Filter className="text-gray-400" />
          <div className="flex items-center gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={priceRange.min}
              onChange={handleMinPriceChange}
              className="w-24 border rounded-lg px-2 py-1"
            />
            <span>-</span>
            <input
              type="number"
              placeholder="Max Price"
              value={priceRange.max}
              onChange={handleMaxPriceChange}
              className="w-24 border rounded-lg px-2 py-1"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}