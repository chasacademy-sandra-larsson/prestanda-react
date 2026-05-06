import { List, type RowComponentProps } from 'react-window'
import DemoFrame from '../../components/DemoFrame.tsx'
import { ROWS, type Row as RowData } from './data.ts'

function Row({ index, style, rows }: RowComponentProps<{ rows: RowData[] }>) {
  const r = rows[index]
  return (
    <div
      style={style}
      className="px-3 py-2 flex justify-between text-sm font-mono border-b border-slate-800"
    >
      <span className="text-slate-200">
        #{r.id} · {r.name}
      </span>
      <span className="text-slate-400">
        {r.city} · {r.score.toFixed(1)}
      </span>
    </div>
  )
}

export default function ListGood() {
  return (
    <DemoFrame
      title="Lång lista utan virtualisering"
      variant="good"
      problem="10 000 rader läggs i DOM:en samtidigt. Initial render långsam, scroll laggig, minne fullt."
      fix="react-window — bara synliga rader monteras (~15 st åt gången)."
      devtools="Elements: bara ~15 rader i DOM. Performance: jämn 60 FPS vid scroll."
    >
      <div className="space-y-3">
        <p className="text-sm text-slate-400">
          {ROWS.length.toLocaleString('sv-SE')} rader, men endast synliga renderas.
          Inspektera DOM:en för att se skillnaden.
        </p>
        <div className="rounded border border-slate-800 bg-slate-900 overflow-hidden">
          <List
            rowCount={ROWS.length}
            rowHeight={36}
            defaultHeight={500}
            rowComponent={Row}
            rowProps={{ rows: ROWS }}
            style={{ height: 500 }}
          />
        </div>
      </div>
    </DemoFrame>
  )
}
