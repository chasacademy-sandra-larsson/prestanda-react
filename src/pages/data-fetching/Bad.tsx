import { useEffect, useState } from 'react'
import DemoFrame from '../../components/DemoFrame.tsx'
import {
  fetchUser,
  fetchUserAlbums,
  fetchUserPosts,
  fetchUserTodos,
  type Album,
  type Post,
  type Todo,
  type User,
} from './api.ts'

export default function WaterfallBad() {
  const [userId, setUserId] = useState(1)
  const [user, setUser] = useState<User | null>(null)
  const [posts, setPosts] = useState<Post[] | null>(null)
  const [todos, setTodos] = useState<Todo[] | null>(null)
  const [albums, setAlbums] = useState<Album[] | null>(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    let alive = true
    async function load() {
      setLoading(true)
      setUser(null); setPosts(null); setTodos(null); setAlbums(null)
      // BAD: sekventiellt — varje await blockerar nästa fetch.
      const u = await fetchUser(userId)
      if (!alive) return
      setUser(u)
      const p = await fetchUserPosts(userId)
      if (!alive) return
      setPosts(p)
      const t = await fetchUserTodos(userId)
      if (!alive) return
      setTodos(t)
      const a = await fetchUserAlbums(userId)
      if (!alive) return
      setAlbums(a)
      setLoading(false)
    }
    load()
    return () => { alive = false }
  }, [userId])

  return (
    <DemoFrame
      title="Data-fetching: waterfall, parallellisering & cache"
      variant="bad"
      problem="4 oberoende fetches sker sekventiellt (await i kedja). Varje vänta på sin föregående trots att de inte beror på varandra. Inget cache."
      fix="useQueries (parallellt) + automatisk cache via TanStack Query. Switcha user-id fram och tillbaka — Good svarar direkt från cache."
      devtools="Network → throttla till Slow 3G. Se waterfall: 4 staplar i kedja."
    >
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <span className="text-slate-500 text-sm">User-id:</span>
          {[1, 2, 3].map((id) => (
            <button
              key={id}
              onClick={() => setUserId(id)}
              className={`px-3 py-1.5 rounded text-sm ${
                userId === id ? 'bg-rose-600 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              {id}
            </button>
          ))}
          <span className="ml-auto text-sm text-slate-500">
            {loading ? 'Laddar…' : 'Klar'}
          </span>
        </div>
        <Summary user={user} posts={posts} todos={todos} albums={albums} />
      </div>
    </DemoFrame>
  )
}

interface SummaryProps {
  user: User | null
  posts: Post[] | null
  todos: Todo[] | null
  albums: Album[] | null
}

function Summary({ user, posts, todos, albums }: SummaryProps) {
  return (
    <div className="grid md:grid-cols-2 gap-3 text-sm">
      <Box label="User" value={user?.name ?? '—'} />
      <Box label="Posts" value={posts ? `${posts.length} st` : '—'} />
      <Box label="Todos" value={todos ? `${todos.length} st` : '—'} />
      <Box label="Albums" value={albums ? `${albums.length} st` : '—'} />
    </div>
  )
}

interface BoxProps {
  label: string
  value: string
}

function Box({ label, value }: BoxProps) {
  return (
    <div className="rounded border border-slate-200 bg-slate-50 p-3">
      <div className="text-xs uppercase text-slate-500">{label}</div>
      <div className="text-slate-800 font-mono">{value}</div>
    </div>
  )
}
