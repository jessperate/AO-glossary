import Link from 'next/link'
import glossaryData from '../../../data/glossary.json'
import { GlossaryTerm } from '@/lib/types'
import { Sidebar } from '@/components/Sidebar'

const terms = glossaryData as GlossaryTerm[]

export default function AppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header className="border-b border-[var(--border)] bg-[var(--background)] sticky top-0 z-20">
        <div className="px-4 sm:px-6 py-4 flex items-center gap-2">
          <Link href="/" className="flex items-center gap-2">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/logo-airops.svg"
              alt="AirOps"
              className="h-5 sm:h-6"
            />
            <span className="text-lg sm:text-xl font-bold text-[var(--foreground)]">
              Glossary
            </span>
          </Link>
        </div>
      </header>
      <div className="flex">
        <Sidebar terms={terms} />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-auto min-h-[calc(100vh-73px)]">
          {children}
        </main>
      </div>
    </>
  )
}
