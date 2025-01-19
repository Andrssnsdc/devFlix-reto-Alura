import { MonitorPlay } from 'lucide-react';

export function Footer() {
  return (
    <footer className="bg-gray-900 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-center items-center space-x-2">
          <MonitorPlay className="h-6 w-6 text-indigo-500" />
          <span className="text-xl font-bold bg-gradient-to-r from-indigo-500 to-purple-500 text-transparent bg-clip-text">
            devFlix
          </span>
        </div>
      </div>
    </footer>
  );
}