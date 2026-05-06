import { Link } from 'react-router'

type Tool = {
  name: string
  mono?: boolean
  desc: string
  demoSlug?: string
}

type Group = {
  title: string
  subtitle: string
  tools: Tool[]
  note?: string
}

const groups: Group[] = [
  {
    title: 'Memoization',
    subtitle: 'För många onödiga omrenderingar sker',
    tools: [
      {
        name: 'React.memo',
        mono: true,
        desc: 'Komponenten skippar render om props är referens-lika.',
        demoSlug: 'rerenders',
      },
      {
        name: 'useMemo',
        mono: true,
        desc: 'Cachar resultatet av en beräkning mellan renders.',
        demoSlug: 'heavy',
      },
      {
        name: 'useCallback',
        mono: true,
        desc: 'Stabiliserar funktionsreferens — så ett memoizerat barn inte renderar i onödan.',
        demoSlug: 'inline-props',
      },
      {
        name: 'Dela upp Context',
        desc: 'Smalare contexts = färre consumers triggas vid en förändring.',
        demoSlug: 'context',
      },
    ],
    note: 'Memoisering minskar lagg snarare än att göra grundoperationen snabbare. Mät i React Profiler först.',
  },
  {
    title: 'Virtualization',
    subtitle: 'För mycket renderas samtidigt',
    tools: [
      {
        name: 'react-window',
        mono: true,
        desc: 'Renderar bara raderna som syns i viewporten. DOM hålls liten, scrolling stannar smooth.',
        demoSlug: 'list',
      },
    ],
    note: 'Alternativ: pagination — dela upp listan på flera sidor i UI:t. Ofta bättre ur både UX- och prestandaperspektiv när det passar.',
  },
  {
    title: 'Code-splitting',
    subtitle: 'För mycket kod laddas',
    tools: [
      {
        name: 'React.lazy + Suspense',
        mono: true,
        desc: 'Tunga komponenter (diagram, kartor, editors, modaler) laddas först när de renderas.',
        demoSlug: 'code-split',
      },
      {
        name: 'Route-nivå splitting',
        desc: 'Varje sida en egen chunk; mindre inledande bundle.',
      },
      {
        name: 'Vid interaktion',
        desc: 'Importera vid klick, öppnad flik eller modal — så laddningen sprids över tiden.',
      },
    ],
    note: 'Minskar inledande laddningstid — inte mängden kod som körs totalt eller långsam rendering.',
  },
  {
    title: 'Data & nätverk',
    subtitle: 'Server-state, cache, parallellisering',
    tools: [
      {
        name: 'TanStack Query (React Query)',
        desc: 'Cachning, parallella fetches, dedupe av samtidiga requests, bakgrundsuppdateringar.',
        demoSlug: 'data-fetching',
      },
    ],
    note: 'Browser-cache och en bra state manager är också prestandaoptimering — de minskar onödiga API-anrop och renderingar.',
  },
]

export default function Sammanfattning() {
  return (
    <div className="space-y-8 max-w-4xl">
      <header className="space-y-3">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          Sammanfattning
        </h1>
        <p className="text-slate-300">
          De tre orsakerna vi började med — och verktygen vi visat under
          demonstrationerna, mappat mot var och en.
        </p>
      </header>

      <div className="grid md:grid-cols-2 gap-4">
        {groups.map((g) => (
          <section
            key={g.title}
            className="rounded-lg border border-slate-800 bg-slate-900 p-5 space-y-3"
          >
            <div className="space-y-0.5">
              <h2 className="text-lg font-semibold text-white">{g.title}</h2>
              <p className="text-xs uppercase tracking-wide text-slate-400">
                {g.subtitle}
              </p>
            </div>
            <dl className="space-y-2 text-sm text-slate-300">
              {g.tools.map((t) => (
                <div key={t.name}>
                  <dt
                    className={`inline ${
                      t.mono ? 'font-mono' : ''
                    } text-emerald-300`}
                  >
                    {t.name}
                  </dt>
                  <span className="text-slate-400"> — </span>
                  {t.desc}
                  {t.demoSlug && (
                    <span className="ml-2 inline-flex gap-1 text-xs">
                      <Link
                        to={`/${t.demoSlug}/bad`}
                        className="px-1.5 py-0.5 rounded bg-rose-600/20 text-rose-300 hover:bg-rose-600/30"
                      >
                        bad
                      </Link>
                      <Link
                        to={`/${t.demoSlug}/good`}
                        className="px-1.5 py-0.5 rounded bg-emerald-600/20 text-emerald-300 hover:bg-emerald-600/30"
                      >
                        good
                      </Link>
                    </span>
                  )}
                </div>
              ))}
            </dl>
            {g.note && (
              <p className="text-xs text-slate-400 pt-1 border-t border-slate-800">
                {g.note}
              </p>
            )}
          </section>
        ))}
      </div>

      <section className="rounded-lg border border-slate-800 bg-slate-900/50 p-5 space-y-2">
        <h2 className="text-sm font-semibold text-white uppercase tracking-wide">
          Tre saker att ta med sig
        </h2>
        <ol className="text-sm text-slate-300 list-decimal pl-6 space-y-1.5">
          <li>
            <strong className="text-white">Mät innan du optimerar.</strong>{' '}
            Profiler / Performance-fliken visar var tiden faktiskt går.
          </li>
          <li>
            <strong className="text-white">Identifiera typen av problem</strong>{' '}
            — kod, rendering eller re-render — innan du väljer verktyg.
          </li>
          <li>
            <strong className="text-white">React Compiler</strong> automatiserar
            mycket av memoiseringen, men förståelsen för{' '}
            <em>varför</em> är fortfarande din bästa felsökningskompetens.
          </li>
        </ol>
      </section>
    </div>
  )
}
