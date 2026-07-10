import { Link, useLocation } from 'react-router-dom'

const navItems = [
  {
    title: 'Getting Started',
    items: [
      { label: 'Introduction', to: '/' },
      { label: 'Installation', to: '/getting-started' },
    ],
  },
  {
    title: 'Usage',
    items: [
      { label: 'Interactive Demo', to: '/demo' },
      { label: 'Examples', to: '/examples' },
    ],
  },
  {
    title: 'Reference',
    items: [
      { label: 'API Reference', to: '/api' },
    ],
  },
]

export default function Sidebar({ open, onClose }) {
  const location = useLocation()

  return (
    <>
      {open && (
        <div
          className="fixed inset-0 bg-black/20 z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      <aside
        className={`fixed top-16 bottom-0 left-0 w-72 bg-gray-50 border-r border-gray-200 overflow-y-auto z-40 transition-transform duration-200
          ${open ? 'translate-x-0' : '-translate-x-full'}
          lg:translate-x-0`}
      >
        <nav className="py-6 px-5 space-y-8">
          {navItems.map((group) => (
            <div key={group.title}>
              <h3 className="text-xs font-semibold text-gray-400 uppercase tracking-wider mb-3 px-3">
                {group.title}
              </h3>
              <ul className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to
                  return (
                    <li key={item.to}>
                      <Link
                        to={item.to}
                        onClick={onClose}
                        className={`block px-3 py-2 rounded-lg text-sm font-medium transition-all
                          ${isActive
                            ? 'bg-indigo-50 text-indigo-700'
                            : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                          }`}
                      >
                        {item.label}
                      </Link>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          <div className="px-3 pt-4 border-t border-gray-200">
            <div className="py-3 rounded-xl bg-gradient-to-br from-indigo-50 to-purple-50 border border-indigo-100">
              <p className="text-xs font-semibold text-indigo-800 mb-1 px-3">v4.12.2</p>
              <p className="text-xs text-indigo-600 px-3">
                Lightweight, customizable, and powerful.
              </p>
            </div>
          </div>
        </nav>
      </aside>
    </>
  )
}
