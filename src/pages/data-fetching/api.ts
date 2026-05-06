const BASE = 'https://jsonplaceholder.typicode.com'

export interface User {
  id: number
  name: string
  email: string
}

export interface Post {
  id: number
  userId: number
  title: string
  body: string
}

export interface Todo {
  id: number
  userId: number
  title: string
  completed: boolean
}

export interface Album {
  id: number
  userId: number
  title: string
}

async function get<T>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`)
  if (!res.ok) throw new Error(`HTTP ${res.status} ${path}`)
  return res.json() as Promise<T>
}

export const fetchUser = (id: number) => get<User>(`/users/${id}`)
export const fetchUserPosts = (id: number) => get<Post[]>(`/users/${id}/posts`)
export const fetchUserTodos = (id: number) => get<Todo[]>(`/users/${id}/todos`)
export const fetchUserAlbums = (id: number) => get<Album[]>(`/users/${id}/albums`)
