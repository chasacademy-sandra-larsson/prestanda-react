import { Link } from 'react-router'
import { demos } from '../routes.tsx'

const blocks = [
  'Block 2 — Renderingar & memoization',
  'Block 3 — Strukturella optimeringar',
  'Block 4 — Data & nätverk',
]

export default function Exempel() {
  return (
    <div className="space-y-10">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-white tracking-tight">Exempel</h1>
        <p className="text-slate-300 max-w-3xl">
          En isolerad demo per problem. Varje demo finns i en{' '}
          <span className="px-1.5 py-0.5 rounded bg-rose-600/20 text-rose-300">BAD</span>{' '}
          och en{' '}
          <span className="px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-300">GOOD</span>
          {' '}variant — växla under demonstrationen för att visa effekten i Chrome
          DevTools (Performance, Network, Coverage) och React Profiler.
        </p>
        <div className="text-sm text-slate-400">
          React Compiler: kör{' '}
          <code className="px-1.5 py-0.5 bg-slate-800 rounded text-slate-200">REACT_COMPILER=true npm run dev</code>{' '}
          för att slå på automatisk memoisering. Default är av.
        </div>
      </header>

      {blocks.map((block) => (
        <section key={block} className="space-y-3">
          <h2 className="text-xs uppercase tracking-widest text-slate-400">
            {block}
          </h2>
          <div className="grid md:grid-cols-2 gap-3">
            {demos
              .filter((d) => d.block === block)
              .map((d) => (
                <article
                  key={d.slug}
                  className="rounded-lg border border-slate-800 bg-slate-900 p-4 space-y-3"
                >
                  <h3 className="text-lg font-semibold text-white">{d.title}</h3>
                  <p className="text-sm text-slate-300">{d.blurb}</p>
                  <p className="text-xs text-slate-400">
                    DevTools: <span className="text-slate-200">{d.devtools}</span>
                  </p>
                  <div className="flex gap-2 pt-1">
                    <Link
                      to={`/${d.slug}/bad`}
                      className="px-3 py-1.5 rounded bg-rose-600 hover:bg-rose-500 text-white text-sm font-medium"
                    >
                      🔥 Bad
                    </Link>
                    <Link
                      to={`/${d.slug}/good`}
                      className="px-3 py-1.5 rounded bg-emerald-600 hover:bg-emerald-500 text-white text-sm font-medium"
                    >
                      ✅ Good
                    </Link>
                  </div>
                </article>
              ))}
          </div>
        </section>
      ))}
    </div>
  )
}
