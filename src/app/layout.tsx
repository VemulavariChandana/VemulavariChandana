import { cn } from "@/utils"
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from "next"
import { EB_Garamond, Inter } from "next/font/google"
import { Providers } from "./_components/providers"

import { ClerkProvider } from "@clerk/nextjs"
import "./globals.css"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const eb_garamond = EB_Garamond({
  subsets: ["latin"],
  variable: "--font-heading",
})

export const metadata: Metadata = {
  title: "PingPanda",
  description: "Monitor your SaaS with PingPanda",
  icons: [{ rel: "icon", url: "/brand-asset-profile-picture.png" }],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider>
      <html lang="en" className={cn(inter.variable, eb_garamond.variable)}>
        <body className="min-h-[calc(100vh-1px)] flex flex-col font-sans bg-brand-50 text-brand-950 antialiased">
          <main className="relative flex-1 flex flex-col">
            <Providers>{children}
              <Analytics />
              <SpeedInsights />
            </Providers>
          </main>
        </body>
      </html>
    </ClerkProvider>
  )
}
