import type { Metadata } from 'next'
import Link from 'next/link'
import './globals.css'
import glossaryData from '../../data/glossary.json'
import { GlossaryTerm } from '@/lib/types'
import { Sidebar } from '@/components/Sidebar'

const terms = glossaryData as GlossaryTerm[]

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
        <header className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-20">
          <div className="px-6 py-4 flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/AO-glossary' : ''}/logo-airops.svg`}
                alt="AirOps"
                className="h-6 dark:invert"
              />
              <span className="text-xl font-bold text-[var(--foreground)]">
                Glossary
              </span>
            </Link>
          </div>
        </header>
        <div className="flex">
          <Sidebar terms={terms} />
          <main className="flex-1 p-8 overflow-auto">{children}</main>
        </div>
      </body>
    </html>
  )
}
