// Avsiktligt "tung" modul — genererar en stor inline payload så att chunken
// syns tydligt i Chrome DevTools → Network och Coverage.

const LOREM =
  'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur Excepteur sint occaecat cupidatat non proident sunt in culpa qui officia deserunt mollit anim id est laborum '

// ~80 KB textuell ballast som hamnar i den här modulens chunk.
export const HEAVY_PAYLOAD = LOREM.repeat(160)

const POINTS = Array.from({ length: 200 }, (_, i) => ({
  x: i,
  y: 50 + 40 * Math.sin(i / 6) + 10 * Math.cos(i / 2.3),
}))

export default function HeavyChart() {
  const w = 800
  const h = 220
  const path = POINTS.map(
    (p, i) =>
      `${i === 0 ? 'M' : 'L'}${(p.x / 199) * w},${h - (p.y / 100) * (h - 20) - 10}`,
  ).join(' ')

  return (
    <div className="space-y-2">
      <svg
        viewBox={`0 0 ${w} ${h}`}
        className="w-full bg-slate-900 rounded border border-slate-800"
      >
        <path d={path} fill="none" stroke="#34d399" strokeWidth="2" />
        {POINTS.filter((_, i) => i % 8 === 0).map((p) => (
          <circle
            key={p.x}
            cx={(p.x / 199) * w}
            cy={h - (p.y / 100) * (h - 20) - 10}
            r="3"
            fill="#34d399"
          />
        ))}
      </svg>
      <div className="text-xs text-slate-500 font-mono">
        chunk-payload: {(HEAVY_PAYLOAD.length / 1024).toFixed(1)} KB
      </div>
    </div>
  )
}
