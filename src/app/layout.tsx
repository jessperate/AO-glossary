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
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script src="https://hypothes.is/embed.js" async></script>
      </head>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  )
}
