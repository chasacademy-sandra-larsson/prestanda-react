import type { ReactNode } from 'react'
import { Link, useLocation } from 'react-router'

export type DemoVariant = 'bad' | 'good'

interface DemoFrameProps {
  title: string
  variant: DemoVariant
  problem: string
  fix: string
  devtools: string
  children: ReactNode
}

export default function DemoFrame({ title, variant, problem, fix, devtools, children }: DemoFrameProps) {
  const { pathname } = useLocation()
  const slug = pathname.split('/')[1]
  const otherVariant = variant === 'bad' ? 'good' : 'bad'

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-widest text-slate-400 mb-1">
            Demo · {slug}
          </p>
          <h1 className="text-2xl font-semibold text-white">{title}</h1>
        </div>
        <span
          className={`px-3 py-1 rounded text-sm font-semibold ${
            variant === 'bad'
              ? 'bg-rose-600 text-white'
              : 'bg-emerald-600 text-white'
          }`}
        >
          {variant === 'bad' ? '🔥 BAD' : '✅ GOOD'}
        </span>
      </div>

      <div className="grid md:grid-cols-3 gap-3 text-sm">
        <div className="rounded bg-slate-900 border border-slate-800 p-3">
          <div className="text-slate-400 text-xs uppercase mb-1">Problem</div>
          <div className="text-slate-200">{problem}</div>
        </div>
        <div className="rounded bg-slate-900 border border-slate-800 p-3">
          <div className="text-slate-400 text-xs uppercase mb-1">Fix</div>
          <div className="text-slate-200">{fix}</div>
        </div>
        <div className="rounded bg-slate-900 border border-slate-800 p-3">
          <div className="text-slate-400 text-xs uppercase mb-1">DevTools</div>
          <div className="text-slate-200">{devtools}</div>
        </div>
      </div>

      <div className="rounded-lg border border-slate-800 bg-slate-950 p-6">
        {children}
      </div>

      <div className="flex justify-between text-sm">
        <Link to="/exempel" className="text-slate-400 hover:text-white">
          ← Tillbaka till exempel
        </Link>
        <Link
          to={`/${slug}/${otherVariant}`}
          className="text-slate-300 hover:text-white"
        >
          Växla till {otherVariant.toUpperCase()} →
        </Link>
      </div>
    </div>
  )
}
