import { lazy, Suspense, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'

const HeavyChart = lazy(() => import('./HeavyChart.tsx'))

export default function CodeSplitGood() {
  const [show, setShow] = useState(false)

  return (
    <DemoFrame
      title="Code-splitting med React.lazy"
      variant="good"
      problem="HeavyChart importeras eagerly överst. Hela ~80 KB-modulen ligger i main-bundlen även när chartet aldrig visas."
      fix="React.lazy + Suspense — chunk laddas först när användaren klickar 'Visa'."
      devtools="Network: filtrera JS, klicka 'Visa' → ny chunk dyker upp. Coverage förbättras."
    >
      <div className="space-y-3">
        <button
          onClick={() => setShow((s) => !s)}
          className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-500 text-white"
        >
          {show ? 'Dölj' : 'Visa'} chart
        </button>
        <p className="text-sm text-slate-500">
          Öppna Network-fliken (med rensad cache) och klicka 'Visa' — chunken
          laddas just-in-time.
        </p>
        {show && (
          <Suspense
            fallback={
              <div className="p-6 text-slate-500">Laddar chart…</div>
            }
          >
            <HeavyChart />
          </Suspense>
        )}
      </div>
    </DemoFrame>
  )
}
