import { memo, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import RenderCounter from '../../components/RenderCounter.tsx'

interface CardProps {
  title: string
  value: string
}

const Card = memo(function Card({ title, value }: CardProps) {
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-4 space-y-2">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-slate-900">{title}</h3>
        <RenderCounter />
      </div>
      <div className="text-3xl font-mono text-emerald-700">{value}</div>
    </div>
  )
})

const cards = [
  { title: 'Aktiva användare', value: '12 482' },
  { title: 'Konvertering', value: '3,7 %' },
  { title: 'MRR', value: '€84 200' },
  { title: 'Churn', value: '1,2 %' },
  { title: 'NPS', value: '47' },
  { title: 'Open rate', value: '28 %' },
]

export default function RerendersGood() {
  const [count, setCount] = useState(0)

  return (
    <DemoFrame
      title="Onödiga re-renders"
      variant="good"
      problem="Räknaren bor på parent. Varje klick re-renderar alla 6 kort, trots att deras props inte ändras."
      fix="Card är wrappad i React.memo. Props är primitiva → shallow-equal → ingen re-render."
      devtools="React Profiler → bara parent renderar. Korten är gråa i flame chart."
    >
      <div className="space-y-4">
        <div className="flex items-center gap-3">
          <button
            onClick={() => setCount((c) => c + 1)}
            className="px-4 py-2 bg-indigo-600 hover:bg-indigo-500 rounded text-white"
          >
            Klick: {count}
          </button>
          <span className="text-sm text-slate-500">
            (kort skippar render — kolla räknarna)
          </span>
          <RenderCounter label="parent" className="ml-auto" />
        </div>
        <div className="grid md:grid-cols-3 gap-3">
          {cards.map((c) => (
            <Card key={c.title} title={c.title} value={c.value} />
          ))}
        </div>
      </div>
    </DemoFrame>
  )
}
