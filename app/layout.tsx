import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Inter, Playfair_Display, DM_Sans, Caveat } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import "./globals.css"

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" })
const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })

export const metadata: Metadata = {
  title: "Holiday Study Buddy",
  description: "Your festive productivity companion",
  generator: "v0.app",
  icons: {
    icon: [
      {
        url: "/icon-light-32x32.png",
        media: "(prefers-color-scheme: light)",
      },
      {
        url: "/icon-dark-32x32.png",
        media: "(prefers-color-scheme: dark)",
      },
      {
        url: "/icon.svg",
        type: "image/svg+xml",
      },
    ],
    apple: "/apple-icon.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${fredoka.variable} ${playfair.variable} ${dmSans.variable} ${caveat.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="festive" enableSystem={false} themes={['festive', 'dark', 'calm']}>
          <AuthProvider>{children}</AuthProvider>
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}