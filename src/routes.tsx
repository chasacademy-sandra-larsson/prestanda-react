import { lazy } from 'react'
import { createBrowserRouter, redirect } from 'react-router'
import Layout from './Layout.tsx'

// Lazy-laddade routes ger en chunk per demo i produktionsbygget.
// Det gör Network-fliken pedagogiskt rik (route-level + komponent-level
// splitting) och löser dubbel-import-varningen för HeavyChart.
const Intro = lazy(() => import('./pages/Intro.tsx'))
const Exempel = lazy(() => import('./pages/Exempel.tsx'))
const Sammanfattning = lazy(() => import('./pages/Sammanfattning.tsx'))
const RerendersBad = lazy(() => import('./pages/rerenders/Bad.tsx'))
const RerendersGood = lazy(() => import('./pages/rerenders/Good.tsx'))
const HeavyBad = lazy(() => import('./pages/heavy/Bad.tsx'))
const HeavyGood = lazy(() => import('./pages/heavy/Good.tsx'))
const InlineBad = lazy(() => import('./pages/inline-props/Bad.tsx'))
const InlineGood = lazy(() => import('./pages/inline-props/Good.tsx'))
const ContextBad = lazy(() => import('./pages/context/Bad.tsx'))
const ContextGood = lazy(() => import('./pages/context/Good.tsx'))
const ListBad = lazy(() => import('./pages/list/Bad.tsx'))
const ListGood = lazy(() => import('./pages/list/Good.tsx'))
const CodeSplitBad = lazy(() => import('./pages/code-split/Bad.tsx'))
const CodeSplitGood = lazy(() => import('./pages/code-split/Good.tsx'))
const DataFetchingBad = lazy(() => import('./pages/data-fetching/Bad.tsx'))
const DataFetchingGood = lazy(() => import('./pages/data-fetching/Good.tsx'))

export const demos = [
  {
    slug: 'rerenders',
    title: '1. Onödiga re-renders',
    block: 'Block 2 — Renderingar & memoization',
    blurb: 'Parent triggar re-render i alla barn — även när deras props är oförändrade. Fix: React.memo memoiserar hela komponenten.',
    devtools: 'React Profiler → "Why did this render?"',
  },
  {
    slug: 'heavy',
    title: '2. Tung beräkning utan useMemo',
    block: 'Block 2 — Renderingar & memoization',
    blurb: 'En filter/sort körs varje render fast indatan är samma. Fix: useMemo cachar resultatet mellan renders.',
    devtools: 'Performance → main thread long task',
  },
  {
    slug: 'inline-props',
    title: '3. Inline-funktion bryter memo',
    block: 'Block 2 — Renderingar & memoization',
    blurb: 'Ny funktions- eller objekt-referens varje render → React.memo läcker. Fix: useCallback / useMemo stabiliserar referensen.',
    devtools: 'React Profiler → barnet renderar trots memo',
  },
  {
    slug: 'context',
    title: '4. Bred Context-omrendering',
    block: 'Block 2 — Renderingar & memoization',
    blurb: 'En context med många värden gör att alla consumers renderar vid varje förändring. Fix: dela upp i smalare contexts.',
    devtools: 'React Profiler → träd lyser brett',
  },
  {
    slug: 'list',
    title: '5. Lång lista utan virtualisering',
    block: 'Block 3 — Strukturella optimeringar',
    blurb: '10 000 rader i DOM gör scrolling och interaktion seg. Fix: react-window — bara synliga rader renderas.',
    devtools: 'Performance → scripting/rendering, FPS, DOM-storlek',
  },
  {
    slug: 'code-split',
    title: '6. Code-splitting med React.lazy',
    block: 'Block 3 — Strukturella optimeringar',
    blurb: 'Tung modul ligger i huvudbundlen och fördröjer inledande laddning. Fix: React.lazy + Suspense laddar den först när den behövs.',
    devtools: 'Network → chunks, Coverage → unused code',
  },
  {
    slug: 'data-fetching',
    title: '7. Data-fetching: waterfall, parallellisering & cache',
    block: 'Block 4 — Data & nätverk',
    blurb: 'Sekventiella useEffect-fetches utan cache → waterfall och dubbla anrop. Fix: TanStack Query — parallellt, cachat, deduplicerat.',
    devtools: 'Network → waterfall vs parallella staplar; cache-träffar vid återbesök',
  },
]

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, loader: () => redirect('/intro') },
      { path: 'intro', Component: Intro },
      { path: 'exempel', Component: Exempel },
      { path: 'sammanfattning', Component: Sammanfattning },
      { path: 'rerenders/bad', Component: RerendersBad },
      { path: 'rerenders/good', Component: RerendersGood },
      { path: 'heavy/bad', Component: HeavyBad },
      { path: 'heavy/good', Component: HeavyGood },
      { path: 'inline-props/bad', Component: InlineBad },
      { path: 'inline-props/good', Component: InlineGood },
      { path: 'context/bad', Component: ContextBad },
      { path: 'context/good', Component: ContextGood },
      { path: 'list/bad', Component: ListBad },
      { path: 'list/good', Component: ListGood },
      { path: 'code-split/bad', Component: CodeSplitBad },
      { path: 'code-split/good', Component: CodeSplitGood },
      { path: 'data-fetching/bad', Component: DataFetchingBad },
      { path: 'data-fetching/good', Component: DataFetchingGood },
    ],
  },
])
