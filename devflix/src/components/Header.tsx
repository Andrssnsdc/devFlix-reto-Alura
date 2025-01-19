import { Link, useLocation } from 'react-router-dom';
import { MonitorPlay, PlusCircle, Home } from 'lucide-react';

export function Header() {
  const location = useLocation();
  const isHome = location.pathname === '/';

  return (
    <header className="bg-gray-900 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex justify-between items-center">
          <Link to="/" className="flex items-center space-x-2">
            <MonitorPlay className="h-8 w-8 text-indigo-500" />
            <span className="text-2xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
              devFlix
            </span>
          </Link>
          
          <nav className="flex space-x-4">
            {!isHome && (
              <Link
                to="/"
                className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition"
              >
                <Home className="h-5 w-5" />
                <span>Home</span>
              </Link>
            )}
            <Link
              to="/new"
              className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-indigo-600 text-white hover:bg-indigo-700 transition"
            >
              <PlusCircle className="h-5 w-5" />
              <span>New Video</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}