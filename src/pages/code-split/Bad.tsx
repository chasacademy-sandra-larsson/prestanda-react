import { useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import HeavyChart from './HeavyChart.tsx'

export default function CodeSplitBad() {
  const [show, setShow] = useState(false)

  return (
    <DemoFrame
      title="Code-splitting med React.lazy"
      variant="bad"
      problem="HeavyChart importeras eagerly överst. Hela ~80 KB-modulen ligger i main-bundlen även när chartet aldrig visas."
      fix="React.lazy(() => import('./HeavyChart')) + <Suspense>."
      devtools="Network: chunk laddas vid sidstart. Coverage: stor del oanvänd kod om man inte klickar 'Visa'."
    >
      <div className="space-y-3">
        <button
          onClick={() => setShow((s) => !s)}
          className="px-4 py-2 rounded bg-indigo-600 hover:bg-indigo-500 text-white"
        >
          {show ? 'Dölj' : 'Visa'} chart
        </button>
        <p className="text-sm text-slate-500">
          Öppna Network-fliken och ladda om sidan — modulen ligger redan i
          huvudbundlen, oavsett om du klickar.
        </p>
        {show && <HeavyChart />}
      </div>
    </DemoFrame>
  )
}
