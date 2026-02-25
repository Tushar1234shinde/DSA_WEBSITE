import { Search, User, Moon, Sun } from 'lucide-react';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { useTheme } from '../contexts/ThemeContext';

export const Navbar = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <nav className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 px-6 flex items-center justify-between">
      <div className="flex items-center gap-8">
        <h1 className="text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-400 bg-clip-text text-transparent">
          DSA Visualizer
        </h1>
      </div>

      <div className="flex-1 max-w-md mx-8">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            type="text"
            placeholder="Search algorithms..."
            className="pl-10 bg-gray-50 dark:bg-gray-900 border-gray-200 dark:border-gray-800"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          className="rounded-full"
        >
          {theme === 'light' ? (
            <Moon className="w-5 h-5" />
          ) : (
            <Sun className="w-5 h-5" />
          )}
        </Button>
        <Button variant="ghost" size="icon" className="rounded-full">
          <User className="w-5 h-5" />
        </Button>
      </div>
    </nav>
  );
};
