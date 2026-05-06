import { useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'
import { expensiveFilterAndSort } from './data.ts'

export default function HeavyBad() {
  const [query, setQuery] = useState('')
  const [theme, setTheme] = useState('dark')

  // BAD: Körs på varje render — även när bara `theme` ändras.
  const results = expensiveFilterAndSort(query)

  return (
    <DemoFrame
      title="Tung beräkning utan useMemo"
      variant="bad"
      problem="Filter/sort över 5000 personer körs varje render — även när orelaterad state (tema) ändras."
      fix="Wrappa beräkningen i useMemo med [query] som dep."
      devtools="Performance: spela in, klicka temat, se long task på main thread."
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
          Klicka tema-knappen — varje klick utlöser en hel filter/sort-pass trots
          att resultatet inte beror på temat.
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

        <aside className="rounded-lg border border-amber-700/50 bg-amber-950/30 p-4 text-sm space-y-2">
          <div className="flex items-center gap-2 font-semibold text-amber-200">
            🤔 Varför hjälper inte <code className="font-mono">async/await</code> här?
          </div>
          <p className="text-amber-100/90">
            <code className="font-mono">async/await</code> löser{' '}
            <strong>I/O-bound</strong> väntan (nätverk, disk, timers) — då väntar
            browsern någon annanstans medan JS-tråden är fri. Vår filter/sort är{' '}
            <strong>CPU-bound</strong> — riktiga loopar som körs på main thread.
            Att skriva <code className="font-mono">await expensiveFilterAndSort(...)</code>{' '}
            blockerar lika mycket; <code className="font-mono">async</code> ger inget av sig självt
            mer än ett Promise-wrap.
          </p>
          <p className="text-amber-100/90">
            För CPU-bound jobb behöver du istället: <strong>undvika jobbet</strong>{' '}
            (useMemo), <strong>flytta tråd</strong> (Web Worker),{' '}
            <strong>dela upp</strong> (time-slicing, <code className="font-mono">startTransition</code>),
            eller <strong>göra mindre</strong> (pagination, index).
          </p>
        </aside>
      </div>
    </DemoFrame>
  )
}
