import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Toaster } from 'react-hot-toast';
import { Sidebar } from './components/ui/Sidebar';
import { TopBar } from './components/ui/TopBar';
import { useTheme } from './hooks/useTheme';
import { Dashboard } from './pages/Dashboard';
import { Products } from './pages/Products';
import { Orders } from './pages/Orders';
import { Inbox } from './pages/Inbox';
import { Stock } from './pages/Stock';

const queryClient = new QueryClient();

function App() {
  const { isDark } = useTheme();

  return (
    <QueryClientProvider client={queryClient}>
      <div className={isDark ? 'dark' : ''}>
        <Router>
          <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
            <Sidebar />
            <div className="flex flex-1 flex-col overflow-hidden">
              <TopBar />
              <main className="flex-1 overflow-y-auto p-4">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/products" element={<Products />} />
                  <Route path="/orders" element={<Orders />} />
                  <Route path="/inbox" element={<Inbox />} />
                  <Route path="/stock" element={<Stock />} />
                </Routes>
              </main>
            </div>
          </div>
        </Router>
        <Toaster position="top-right" />
      </div>
    </QueryClientProvider>
  );
}

export default App;