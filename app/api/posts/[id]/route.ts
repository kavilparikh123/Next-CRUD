// app/api/posts/[id]/route.ts
import { prisma } from '@/lib/prisma'
import { NextResponse } from 'next/server'

export async function PUT(req: Request, { params }: { params: { id: string } }) {
  try {
    const { title, content } = await req.json()
    const updatedPost = await prisma.post.update({
      where: { id: Number(params.id) },
      data: { title, content },
    })
    return NextResponse.json(updatedPost)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update post' }, { status: 500 })
  }
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
  try {
    await prisma.post.delete({
      where: { id: Number(params.id) },
    })
    return NextResponse.json({ message: 'Post deleted' })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to delete post' }, { status: 500 })
  }
}
