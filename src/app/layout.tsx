import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'AirOps Glossary',
  description: 'A searchable glossary of AirOps terminology and concepts',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen antialiased">
        <header className="border-b border-[var(--border)] bg-[var(--background)]">
          <div className="mx-auto max-w-4xl px-4 py-4">
            <a href="./" className="text-xl font-bold text-[var(--primary)]">
              AirOps Glossary
            </a>
          </div>
        </header>
        <main className="mx-auto max-w-4xl px-4 py-8">{children}</main>
        <footer className="border-t border-[var(--border)] mt-16">
          <div className="mx-auto max-w-4xl px-4 py-6 text-center text-sm text-[var(--muted-foreground)]">
            <a
              href="./contribute"
              className="text-[var(--primary)] hover:underline"
            >
              Suggest a new term
            </a>
          </div>
        </footer>
      </body>
    </html>
  )
}
