import { memo, useCallback, useState, type CSSProperties } from 'react'
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

const SAVE_STYLE = { background: '#0ea5e9' }
const CANCEL_STYLE = { background: '#ef4444' }

export default function InlineGood() {
  const [count, setCount] = useState(0)
  const onSave = useCallback(() => console.log('save'), [])
  const onCancel = useCallback(() => console.log('cancel'), [])

  return (
    <DemoFrame
      title="Inline-funktion / objekt bryter memo"
      variant="good"
      problem="React.memo ska få ExpensiveButton att hoppa över render när props är samma. Men varje gång parent renderar skapas nya onClick- och style-objekt inline. JavaScript jämför funktioner och objekt med referens — inte innehåll — så memo ser nya referenser och tror att något ändrats."
      fix="onClick i useCallback. style som modulkonstant (eller useMemo) — stabila referenser."
      devtools="React Profiler → endast parent renderar."
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
          <ExpensiveButton label="Spara" style={SAVE_STYLE} onClick={onSave} />
          <ExpensiveButton label="Avbryt" style={CANCEL_STYLE} onClick={onCancel} />
        </div>
        <p className="text-sm text-slate-500">
          Stabila referenser → memo håller — barnens räknare står still.
        </p>
      </div>
    </DemoFrame>
  )
}
