import { Bell, Moon, Search, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';

export function TopBar() {
  const { isDark, toggle } = useTheme();

  return (
    <div className="flex h-16 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
      <div className="flex flex-1 items-center">
        <div className="flex w-full max-w-lg items-center">
          <Search className="h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search..."
            className="ml-2 flex-1 border-0 bg-transparent text-gray-900 placeholder:text-gray-400 focus:outline-none focus:ring-0 dark:text-white sm:text-sm"
          />
        </div>
      </div>

      <div className="flex items-center gap-4">
        <button
          onClick={toggle}
          className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
        >
          {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
        </button>

        <button className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800">
          <Bell className="h-5 w-5" />
        </button>

        <div className="flex items-center">
          <img
            className="h-8 w-8 rounded-full"
            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
            alt="User avatar"
          />
          <div className="ml-3">
            <p className="text-sm font-medium text-gray-700 dark:text-gray-200">Wasif Ali</p>
            <p className="text-xs text-gray-500 dark:text-gray-400">Admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}