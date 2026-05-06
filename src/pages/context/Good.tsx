import { createContext, memo, useContext, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'

const ThemeContext = createContext<string>('dark')
const UserContext = createContext<string>('Sandra')
const CartContext = createContext<number>(0)

const ThemeBadge = memo(function ThemeBadge() {
  const theme = useContext(ThemeContext)
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
      <span>Tema: <strong className="text-emerald-700">{theme}</strong></span>
      <RenderCounter label="ThemeBadge" />
    </div>
  )
})

const UserBadge = memo(function UserBadge() {
  const user = useContext(UserContext)
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
      <span>Användare: <strong className="text-emerald-700">{user}</strong></span>
      <RenderCounter label="UserBadge" />
    </div>
  )
})

const CartBadge = memo(function CartBadge() {
  const cartCount = useContext(CartContext)
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-3 flex items-center justify-between">
      <span>Kundvagn: <strong className="text-emerald-700">{cartCount}</strong></span>
      <RenderCounter label="CartBadge" />
    </div>
  )
})

export default function ContextGood() {
  const [theme, setTheme] = useState('dark')
  const [user, setUser] = useState('Sandra')
  const [cartCount, setCartCount] = useState(0)

  return (
    <DemoFrame
      title="Bred Context-omrendering"
      variant="good"
      problem="En context-värde bär 3 olika data. Ändrar man en av dem re-renderas ALLA consumers."
      fix="En context per orelaterad data — bara den berörda consumern re-renderar."
      devtools="React Profiler → ändra cart, bara CartBadge lyser."
    >
      <ThemeContext.Provider value={theme}>
        <UserContext.Provider value={user}>
          <CartContext.Provider value={cartCount}>
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
          </CartContext.Provider>
        </UserContext.Provider>
      </ThemeContext.Provider>
    </DemoFrame>
  )
}
