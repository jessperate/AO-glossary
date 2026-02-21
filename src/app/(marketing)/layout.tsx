import Link from 'next/link'

export default function MarketingLayout({
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
      <main>{children}</main>
    </>
  )
}
