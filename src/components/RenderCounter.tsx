import { useRef } from 'react'

interface RenderCounterProps {
  label?: string
  className?: string
}

export default function RenderCounter({ label = 'renders', className = '' }: RenderCounterProps) {
  const count = useRef(0)
  count.current += 1
  return (
    <span
      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded bg-slate-800 text-slate-300 text-xs font-mono ${className}`}
    >
      {label}: <span className="text-amber-300">{count.current}</span>
    </span>
  )
}
