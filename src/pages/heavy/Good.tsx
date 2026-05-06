import { useMemo, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'
import { expensiveFilterAndSort } from './data.ts'

export default function HeavyGood() {
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState('dark')

  const results = useMemo(() => expensiveFilterAndSort(query), [query])

  return (
    <DemoFrame
      title="Tung beräkning utan useMemo"
      variant="good"
      problem="Filter/sort över 5000 personer körs varje render — även när orelaterad state (tema) ändras."
      fix="useMemo med [query] som dep — beräkningen återanvänds när bara temat ändras."
      devtools="Performance: tema-klick ger nu mikroskopisk render — ingen long task."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3 flex-wrap">
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Sök namn…"
            className="px-3 py-2 rounded bg-slate-900 border border-slate-800 text-white"
          />
          <button
            onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
            className="px-3 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
          >
            Toggla tema (orelaterad)
          </button>
          <span
            className={`px-3 py-2 rounded font-mono text-sm ${
              theme === 'dark'
                ? 'bg-slate-900 text-slate-100 border border-slate-700'
                : 'bg-amber-100 text-slate-900 border border-amber-300'
            }`}
          >
            Tema: {theme}
          </span>
          <RenderCounter label="parent" className="ml-auto" />
        </div>
        <p className="text-sm text-slate-400">
          Tema-klick triggar render men beräkningen hoppas över — listan är cachad
          per query.
        </p>
        <ul className="grid md:grid-cols-2 gap-1 text-sm font-mono">
          {results.map((p) => (
            <li
              key={p.id}
              className="px-2 py-1 rounded bg-slate-900 border border-slate-800 flex justify-between"
            >
              <span>{p.name}</span>
              <span className="text-slate-400">{p.city}</span>
            </li>
          ))}
        </ul>
      </div>
    </DemoFrame>
  )
}
