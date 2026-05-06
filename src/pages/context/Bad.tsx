import { createContext, useContext, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'

interface AppContextValue {
  theme: string
  user: string
  cartCount: number
}

const AppContext = createContext<AppContextValue>({
  theme: 'dark',
  user: 'Sandra',
  cartCount: 0,
})

function ThemeBadge() {
  const { theme } = useContext(AppContext)
  return (
    <div className="rounded border border-slate-800 bg-slate-900 p-3 flex items-center justify-between">
      <span>Tema: <strong className="text-amber-300">{theme}</strong></span>
      <RenderCounter label="ThemeBadge" />
    </div>
  )
}

function UserBadge() {
  const { user } = useContext(AppContext)
  return (
    <div className="rounded border border-slate-800 bg-slate-900 p-3 flex items-center justify-between">
      <span>Användare: <strong className="text-amber-300">{user}</strong></span>
      <RenderCounter label="UserBadge" />
    </div>
  )
}

function CartBadge() {
  const { cartCount } = useContext(AppContext)
  return (
    <div className="rounded border border-slate-800 bg-slate-900 p-3 flex items-center justify-between">
      <span>Kundvagn: <strong className="text-amber-300">{cartCount}</strong></span>
      <RenderCounter label="CartBadge" />
    </div>
  )
}

export default function ContextBad() {
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState('Sandra')
  const [cartCount, setCartCount] = useState(0)

  // BAD: nytt objekt varje render → alla consumers re-renderar
  const value = { theme, user, cartCount }

  return (
    <DemoFrame
      title="Bred Context-omrendering"
      variant="bad"
      problem="En context-värde bär 3 olika data. Ändrar man en av dem (eller bara renderar parent) re-renderas ALLA consumers."
      fix="Dela upp i flera contexts (eller stabilisera value med useMemo)."
      devtools="React Profiler → ändra cart, hela trädet lyser."
    >
      <AppContext.Provider value={value}>
        <div className="space-y-4">
          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Toggla tema
            </button>
            <button
              onClick={() => setUser((u) => (u === 'Sandra' ? 'Maja' : 'Sandra'))}
              className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              Byt användare
            </button>
            <button
              onClick={() => setCartCount((c) => c + 1)}
              className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
            >
              + i kundvagn
            </button>
          </div>
          <div className="grid md:grid-cols-3 gap-3">
            <ThemeBadge />
            <UserBadge />
            <CartBadge />
          </div>
        </div>
      </AppContext.Provider>
    </DemoFrame>
  )
}
