import { memo, useState, type CSSProperties } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'

interface ExpensiveButtonProps {
  label: string
  style: CSSProperties
  onClick: () => void
}

const ExpensiveButton = memo(function ExpensiveButton({ label, style, onClick }: ExpensiveButtonProps) {
  return (
    <button
      onClick={onClick}
      style={style}
      className="px-4 py-2 rounded text-slate-900"
    >
      <span className="flex items-center gap-2">
        {label}
        <RenderCounter label="child" />
      </span>
    </button>
  )
})

export default function InlineBad() {
  const [count, setCount] = useState(0)

  return (
    <DemoFrame
      title="Inline-funktion / objekt bryter memo"
      variant="bad"
      problem="React.memo ska få ExpensiveButton att hoppa över render när props är samma. Men varje gång parent renderar skapas nya onClick- och style-objekt inline. JavaScript jämför funktioner och objekt med referens — inte innehåll — så memo ser nya referenser och tror att något ändrats."
      fix="Wrappa onClick i useCallback och style i useMemo (eller flytta utanför komponenten)."
      devtools="React Profiler → 'Why did this render?' → props changed: onClick, style."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-slate-200 rounded text-slate-900"
          >
            Trigga parent-render: {count}
          </button>
          <RenderCounter label="parent" className="ml-auto" />
        </div>
        <div className="flex gap-3">
          <ExpensiveButton
            label="Spara"
            style={{ background: '#0ea5e9' }}
            onClick={() => console.log('save')}
          />
          <ExpensiveButton
            label="Avbryt"
            style={{ background: '#ef4444' }}
            onClick={() => console.log('cancel')}
          />
        </div>
        <p className="text-sm text-slate-500">
          Trots <code className="text-slate-800">memo</code> renderar barnen vid varje
          klick — för att <code className="text-slate-800">{`{ background: '...' }`}</code>{' '}
          och <code className="text-slate-800">{'() => ...'}</code> är nya referenser varje gång.
        </p>
      </div>
    </DemoFrame>
  )
}
