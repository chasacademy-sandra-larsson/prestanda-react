import { Suspense } from 'react'
import { Link, NavLink, Outlet } from 'react-router'

const navItems = [
  { to: '/intro', label: 'Intro', activeClass: 'bg-sky-600' },
  { to: '/exempel', label: 'Exempel', activeClass: 'bg-indigo-600' },
  { to: '/sammanfattning', label: 'Sammanfattning', activeClass: 'bg-amber-600' },
]

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-slate-800 bg-slate-950/80 backdrop-blur sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-6">
          <Link to="/intro" className="font-bold tracking-tight text-white">
            ⚛️ React Prestanda
          </Link>
          <nav className="flex flex-wrap gap-1 text-sm">
            {navItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded ${
                    isActive
                      ? `${item.activeClass} text-white`
                      : 'text-slate-300 hover:bg-slate-800'
                  }`
                }
              >
                {item.label}
              </NavLink>
            ))}
          </nav>
        </div>
      </header>
      <main className="flex-1 max-w-6xl w-full mx-auto px-6 py-8">
        <Suspense fallback={<div className="text-slate-400">Laddar…</div>}>
          <Outlet />
        </Suspense>
      </main>
    </div>
  )
}
