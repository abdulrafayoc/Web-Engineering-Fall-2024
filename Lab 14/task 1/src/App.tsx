import React from 'react';
import { Provider } from 'react-redux';
import { store } from './store/store';
import { ProductList } from './components/ProductList';
import { Cart } from './components/Cart';

const App = () => (
  <Provider store={store}>
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-center mb-8">
          Welcome to Our Online Store
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <ProductList />
          </div>
          <div className="lg:col-span-1">
            <Cart />
          </div>
        </div>
      </div>
    </div>
  </Provider>
);

export default App;