'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'

type EditFormProps = {
  id: number
  initialTitle: string
  initialContent: string
}

export default function EditForm({ id, initialTitle, initialContent }: EditFormProps) {
  const [title, setTitle] = useState(initialTitle)
  const [content, setContent] = useState(initialContent)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    })

    setLoading(false)
    router.push('/')
  }

  return (
    <form onSubmit={handleUpdate} className="space-y-4 border p-6 rounded">
      <h2 className="text-xl font-semibold">Edit Post</h2>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="w-full border p-2"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="w-full border p-2"
        required
      />
      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded"
        disabled={loading}
      >
        {loading ? 'Updating...' : 'Update'}
      </button>
    </form>
  )
}
