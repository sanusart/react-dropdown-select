import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Header from './Header';

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white">
      <Header onMenuToggle={() => setSidebarOpen(!sidebarOpen)} />
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />
      <div className="lg:pl-72 pt-16">
        <main className="min-h-[calc(100vh-4rem)]">
          <div className="max-w-4xl mx-auto px-8 py-12 lg:px-12 lg:py-16">
            <Outlet />
          </div>
          <footer className="border-t border-gray-200">
            <div className="max-w-4xl mx-auto px-8 py-8 lg:px-12">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-gray-500">
                <p>MIT License - {new Date().getFullYear()} Sasha Khamkov</p>
                <div className="flex gap-4">
                  <a
                    href="https://github.com/sanusart/react-dropdown-select"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors">
                    GitHub
                  </a>
                  <a
                    href="https://www.npmjs.com/package/react-dropdown-select"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-gray-900 transition-colors">
                    npm
                  </a>
                </div>
              </div>
            </div>
          </footer>
        </main>
      </div>
    </div>
  );
}
