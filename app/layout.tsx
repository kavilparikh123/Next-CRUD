import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js CRUD with SQLite',
  description: 'A full CRUD app using Next.js App Router and Prisma',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-900">
        <div className="min-h-screen max-w-3xl mx-auto py-10 px-4">{children}</div>
      </body>
    </html>
  )
}
