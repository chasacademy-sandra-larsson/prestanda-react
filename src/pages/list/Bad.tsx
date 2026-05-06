import DemoFrame from '../../components/DemoFrame.tsx'
import { ROWS } from './data.ts'

export default function ListBad() {
  return (
    <DemoFrame
      title="Lång lista utan virtualisering"
      variant="bad"
      problem="10 000 rader läggs i DOM:en samtidigt. Initial render långsam, scroll laggig, minne fullt."
      fix="Virtualisering (react-window) — bara synliga rader monteras."
      devtools="Performance: spela in scroll. DevTools Elements: kolla DOM-nod-count. Memory: heap snapshot."
    >
      <div className="space-y-3">
        <p className="text-sm text-slate-400">
          {ROWS.length.toLocaleString('sv-SE')} rader. Scrolla — notera FPS i
          Performance-fliken. Inspektera <code className="text-slate-200">&lt;ul&gt;</code>{' '}
          och se hur många <code className="text-slate-200">&lt;li&gt;</code> som
          renderats.
        </p>
        <ul
          id="long-list"
          className="h-[500px] overflow-auto rounded border border-slate-800 bg-slate-900 divide-y divide-slate-800"
        >
          {ROWS.map((r) => (
            <li
              key={r.id}
              className="px-3 py-2 flex justify-between text-sm font-mono"
            >
              <span className="text-slate-200">
                #{r.id} · {r.name}
              </span>
              <span className="text-slate-400">
                {r.city} · {r.score.toFixed(1)}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </DemoFrame>
  )
}
