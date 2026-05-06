import { useState } from 'react'
import { useQueries } from '@tanstack/react-query'
import DemoFrame from '../../components/DemoFrame.tsx'
import { fetchUser, fetchUserAlbums, fetchUserPosts, fetchUserTodos } from './api.ts'

export default function WaterfallGood() {
  const [userId, setUserId] = useState(1)

  const [userQ, postsQ, todosQ, albumsQ] = useQueries({
    queries: [
      { queryKey: ['user', userId], queryFn: () => fetchUser(userId) },
      { queryKey: ['posts', userId], queryFn: () => fetchUserPosts(userId) },
      { queryKey: ['todos', userId], queryFn: () => fetchUserTodos(userId) },
      { queryKey: ['albums', userId], queryFn: () => fetchUserAlbums(userId) },
    ],
  })

  const allLoaded = [userQ, postsQ, todosQ, albumsQ].every((q) => !q.isPending)

  return (
    <DemoFrame
      title="Data-fetching: waterfall, parallellisering & cache"
      variant="good"
      problem="4 oberoende fetches sker sekventiellt (await i kedja). Varje vänta på sin föregående trots att de inte beror på varandra. Inget cache."
      fix="useQueries kör alla 4 parallellt. Cache per queryKey gör att switching mellan user-id är instant andra gången."
      devtools="Network → 4 staplar startar samtidigt. Switcha id 1→2→1: andra besöket kommer från cache (inga nya requests)."
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-400 text-sm">User-id:</span>
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`px-3 py-1.5 rounded text-sm ${
                userId === id ? 'bg-emerald-600 text-white' : 'bg-slate-800 text-slate-300'
              }`}
            >
              {id}
            </button>
          ))}
          <span className="ml-auto text-sm text-slate-400">
            {allLoaded ? 'Klar' : 'Laddar…'}
          </span>
        </div>
        <div className="grid md:grid-cols-2 gap-3 text-sm">
          <Box label="User" q={userQ} render={(d) => d.name} />
          <Box label="Posts" q={postsQ} render={(d) => `${d.length} st`} />
          <Box label="Todos" q={todosQ} render={(d) => `${d.length} st`} />
          <Box label="Albums" q={albumsQ} render={(d) => `${d.length} st`} />
        </div>
      </div>
    </DemoFrame>
  )
}

import type { UseQueryResult } from '@tanstack/react-query'

interface BoxProps<T> {
  label: string
  q: UseQueryResult<T>
  render: (data: T) => string
}

function Box<T>({ label, q, render }: BoxProps<T>) {
  return (
    <div className="rounded border border-slate-800 bg-slate-900 p-3">
      <div className="flex items-center justify-between text-xs uppercase text-slate-400">
        <span>{label}</span>
        <span className="text-emerald-400 normal-case">
          {q.isPending ? 'pending' : q.isFetching ? 'fetching' : 'cache'}
        </span>
      </div>
      <div className="text-slate-200 font-mono">
        {q.data ? render(q.data) : '—'}
      </div>
    </div>
  )
}
