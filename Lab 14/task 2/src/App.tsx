import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ShoppingCart, LayoutDashboard } from 'lucide-react';
import useStore from './store/useStore';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';
import { Checkout } from './components/Checkout';
import { Dashboard } from './components/Dashboard';

function App() {
  const { fetchProducts, cart } = useStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const cartItemsCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-white shadow-md">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <Link to="/" className="text-2xl font-bold text-blue-600">
                EShop
              </Link>
              <div className="flex items-center gap-6">
                <Link
                  to="/dashboard"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <LayoutDashboard size={24} />
                  Dashboard
                </Link>
                <Link
                  to="/cart"
                  className="flex items-center gap-2 text-gray-600 hover:text-blue-600"
                >
                  <div className="relative">
                    <ShoppingCart size={24} />
                    {cartItemsCount > 0 && (
                      <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                        {cartItemsCount}
                      </span>
                    )}
                  </div>
                  Cart
                </Link>
              </div>
            </div>
          </div>
        </nav>

        <main className="container mx-auto px-4 py-8">
          <Routes>
            <Route path="/" element={<ProductList />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;