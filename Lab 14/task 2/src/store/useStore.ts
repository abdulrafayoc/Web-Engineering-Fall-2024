import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Product, CartItem, User, Address } from '../types';
import { getLocalStorage, setLocalStorage } from '../lib/utils';

interface StoreState {
  // Products
  products: Product[];
  filteredProducts: Product[];
  searchTerm: string;
  selectedCategory: string;
  priceRange: { min: number; max: number };
  fetchProducts: () => Promise<void>;
  setSearchTerm: (term: string) => void;
  setCategory: (category: string) => void;
  setPriceRange: (range: { min: number; max: number }) => void;

  // Cart
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  updateQuantity: (productId: number, quantity: number) => void;
  clearCart: () => void;

  // User
  user: User | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
  
  // Checkout
  address: Address | null;
  setAddress: (address: Address) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      // Products
      products: [],
      filteredProducts: [],
      searchTerm: '',
      selectedCategory: '',
      priceRange: { min: 0, max: 1000 },
      
      fetchProducts: async () => {
        try {
          const response = await fetch('https://fakestoreapi.com/products');
          const products = await response.json();
          set({ products, filteredProducts: products });
        } catch (error) {
          console.error('Error fetching products:', error);
        }
      },

      setSearchTerm: (term) => {
        set({ searchTerm: term });
        const { products, selectedCategory, priceRange } = get();
        const filtered = products.filter(
          (product) =>
            product.title.toLowerCase().includes(term.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true) &&
            product.price >= priceRange.min &&
            product.price <= priceRange.max
        );
        set({ filteredProducts: filtered });
      },

      setCategory: (category) => {
        set({ selectedCategory: category });
        const { products, searchTerm, priceRange } = get();
        const filtered = products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (category ? product.category === category : true) &&
            product.price >= priceRange.min &&
            product.price <= priceRange.max
        );
        set({ filteredProducts: filtered });
      },

      setPriceRange: (range) => {
        set({ priceRange: range });
        const { products, searchTerm, selectedCategory } = get();
        const filtered = products.filter(
          (product) =>
            product.title.toLowerCase().includes(searchTerm.toLowerCase()) &&
            (selectedCategory ? product.category === selectedCategory : true) &&
            product.price >= range.min &&
            product.price <= range.max
        );
        set({ filteredProducts: filtered });
      },

      // Cart
      cart: getLocalStorage('cart', []),
      
      addToCart: (product) => {
        const { cart } = get();
        const existingItem = cart.find((item) => item.id === product.id);
        
        if (existingItem) {
          const updatedCart = cart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
          set({ cart: updatedCart });
          setLocalStorage('cart', updatedCart);
        } else {
          const updatedCart = [...cart, { ...product, quantity: 1 }];
          set({ cart: updatedCart });
          setLocalStorage('cart', updatedCart);
        }
      },

      removeFromCart: (productId) => {
        const { cart } = get();
        const updatedCart = cart.filter((item) => item.id !== productId);
        set({ cart: updatedCart });
        setLocalStorage('cart', updatedCart);
      },

      updateQuantity: (productId, quantity) => {
        const { cart } = get();
        const updatedCart = cart.map((item) =>
          item.id === productId ? { ...item, quantity } : item
        );
        set({ cart: updatedCart });
        setLocalStorage('cart', updatedCart);
      },

      clearCart: () => {
        set({ cart: [] });
        setLocalStorage('cart', []);
      },

      // User
      user: null,
      isAuthenticated: false,
      
      login: async (email, password) => {
        // Mock login - in real app, this would make an API call
        const mockUser = {
          id: '1',
          email,
          name: 'John Doe',
        };
        set({ user: mockUser, isAuthenticated: true });
      },

      logout: () => {
        set({ user: null, isAuthenticated: false });
      },

      // Checkout
      address: null,
      setAddress: (address) => {
        set({ address });
      },
    }),
    {
      name: 'ecommerce-storage',
      partialize: (state) => ({
        cart: state.cart,
        user: state.user,
        isAuthenticated: state.isAuthenticated,
      }),
    }
  )
);

export default useStore;