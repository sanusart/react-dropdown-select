import { version } from 'root-pkg';
import { Link, useLocation } from 'react-router-dom';
import type { ReactNode } from 'react';

type IconName = 'home' | 'install' | 'demo' | 'examples' | 'api' | 'storybook';

const icons: Record<IconName, ReactNode> = {
  home: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-4 0a1 1 0 01-1-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 01-1 1"
      />
    </svg>
  ),
  install: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
      />
    </svg>
  ),
  demo: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
      />
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
      />
    </svg>
  ),
  examples: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
      />
    </svg>
  ),
  api: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
      />
    </svg>
  ),
  storybook: (
    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"
      />
    </svg>
  ),
};

interface NavLinkItem {
  label: string;
  icon: IconName;
  to: string;
}

interface NavHrefItem {
  label: string;
  icon: IconName;
  href: string;
}

type NavItem = NavLinkItem | NavHrefItem;

interface NavGroup {
  title: string;
  items: NavItem[];
}

const navItems: NavGroup[] = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', to: '/', icon: 'home' },
      { label: 'Installation', to: '/getting-started', icon: 'install' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { label: 'Interactive Demo', to: '/demo', icon: 'demo' },
      { label: 'Examples', to: '/examples', icon: 'examples' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'API Reference', to: '/api', icon: 'api' },
      { label: 'Storybook', href: '/react-dropdown-select/storybook/', icon: 'storybook' },
    ],
  },
];

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const location = useLocation();

  return (
    <>
      {open && <div className="fixed inset-0 bg-black/20 z-40 lg:hidden" onClick={onClose} />}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto z-40 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}>
        <nav className="py-6 px-5 space-y-8">
          {navItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {group.title}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = !('href' in item) && location.pathname === item.to;
                  const linkClass = `flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    isActive
                      ? 'bg-indigo-50 text-indigo-700'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`;
                  return (
                    <li key={item.label}>
                      {'href' in item ? (
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={onClose}
                          className={linkClass}>
                          {icons[item.icon]}
                          {item.label}
                          <svg
                            className="w-3 h-3 ml-auto opacity-30"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                            />
                          </svg>
                        </a>
                      ) : (
                        <Link to={item.to} onClick={onClose} className={linkClass}>
                          {icons[item.icon]}
                          {item.label}
                        </Link>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          ))}
          <div className="px-3 pt-4 border-t border-gray-200">
            <div className="py-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-800 mb-1 px-3">v{version}</p>
              <p className="text-xs text-indigo-600 px-3">
                Lightweight, customizable, and powerful.
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  );
}
