import Link from 'next/link'

const footerLinks = {
  Product: [
    { label: 'Platform', href: 'https://www.airops.com/platform' },
    { label: 'Insights', href: 'https://www.airops.com/platform/insights' },
    { label: 'Action', href: 'https://www.airops.com/platform/action' },
    { label: 'Grids', href: 'https://www.airops.com/platform/grids' },
    { label: 'Workflows', href: 'https://www.airops.com/platform/workflows' },
    { label: 'Knowledge Bases', href: 'https://www.airops.com/platform/knowledge-bases' },
  ],
  Solutions: [
    { label: 'Content & SEO Teams', href: 'https://www.airops.com/solutions/content-seo' },
    { label: 'Marketing Agencies', href: 'https://www.airops.com/solutions/agencies' },
    { label: 'Content Refresh', href: 'https://www.airops.com/solutions/content-refresh' },
    { label: 'Offsite', href: 'https://www.airops.com/solutions/offsite' },
  ],
  Resources: [
    { label: 'Academy', href: 'https://www.airops.com/academy' },
    { label: 'Blog', href: 'https://www.airops.com/blog' },
    { label: 'Case Studies', href: 'https://www.airops.com/case-studies' },
    { label: 'Documentation', href: 'https://docs.airops.com' },
    { label: 'Glossary', href: '/' },
  ],
  General: [
    { label: 'Pricing', href: 'https://www.airops.com/pricing' },
    { label: 'Careers', href: 'https://www.airops.com/careers' },
    { label: 'Affiliate', href: 'https://www.airops.com/affiliate' },
  ],
}

export function Footer() {
  return (
    <footer className="border-t border-[var(--border)] bg-[var(--background)]">
      <div className="px-6 py-10 sm:py-12 lg:py-14">
        {/* Top section: logo + link columns */}
        <div className="flex flex-col lg:flex-row lg:gap-16 gap-10">
          {/* Brand column */}
          <div className="lg:max-w-[220px] shrink-0">
            <Link href="https://www.airops.com" className="inline-block">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`${process.env.NODE_ENV === 'production' ? '/AO-glossary' : ''}/logo-airops.svg`}
                alt="AirOps"
                className="h-5"
              />
            </Link>
            <p className="mt-4 text-sm leading-relaxed text-[var(--muted-foreground)]">
              Craft content that wins AI search.
            </p>
          </div>

          {/* Link columns */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 flex-1">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <h3 className="text-sm font-semibold text-[var(--foreground)] mb-3">
                  {category}
                </h3>
                <ul className="flex flex-col gap-2.5">
                  {links.map((link) => (
                    <li key={link.label}>
                      {link.href.startsWith('/') ? (
                        <Link
                          href={link.href}
                          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                        >
                          {link.label}
                        </Link>
                      ) : (
                        <a
                          href={link.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-sm text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
                        >
                          {link.label}
                        </a>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-10 pt-6 border-t border-[var(--border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[var(--muted-foreground)]">
            &copy; {new Date().getFullYear()} AirOps. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <a
              href="https://www.airops.com/privacy"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="https://www.airops.com/terms"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
            >
              Terms of Service
            </a>
            <a
              href="https://twitter.com/AirOpsHQ"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="AirOps on X (Twitter)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/airops/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[var(--muted-foreground)] hover:text-[var(--foreground)] transition-colors"
              aria-label="AirOps on LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
