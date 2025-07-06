'use client'

import { useEffect, useState } from 'react'
import PostForm from './components/PostForm'
import Link from 'next/link'

type Post = {
  id: number
  title: string
  content: string
  createdAt: string
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([])
  const [loading, setLoading] = useState(true)

  const fetchPosts = async () => {
    setLoading(true)
    const res = await fetch('/api/posts')
    const data = await res.json()
    setPosts(data)
    setLoading(false)
  }

  const deletePost = async (id: number) => {
    await fetch(`/api/posts/${id}`, { method: 'DELETE' })
    fetchPosts()
  }

  useEffect(() => {
    fetchPosts()
  }, [])

  return (
    <main className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Next.js CRUD with SQLite</h1>
      <PostForm onPostCreated={fetchPosts} />

      {loading ? (
        <p>Loading posts...</p>
      ) : posts.length === 0 ? (
        <p>No posts yet.</p>
      ) : (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{post.title}</h3>
              <p>{post.content}</p>
              <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleString()}</p>
              <button
                onClick={() => deletePost(post.id)}
                className="text-red-600 mt-2"
              >
                Delete
              </button>

              <Link href={`/edit/${post.id}`} className="text-blue-600 underline">
                Edit
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
