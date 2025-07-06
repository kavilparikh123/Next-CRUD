import { prisma } from '@/lib/prisma'
import EditForm from '@/app/components/EditForm'
import { notFound } from 'next/navigation'

// Define the type for the params object, now as a Promise
interface EditPageProps {
  params: Promise<{
    id: string
  }>
}

export default async function EditPage({ params }: EditPageProps) {
  // Await the params to get the actual object
  const resolvedParams = await params;
  const postId = parseInt(resolvedParams.id, 10)

  const post = await prisma.post.findUnique({
    where: { id: postId },
  })

  if (!post) return notFound()

  return (
    <main className="max-w-2xl mx-auto p-6">
      <EditForm
        id={post.id}
        initialTitle={post.title}
        initialContent={post.content}
      />
    </main>
  )
}