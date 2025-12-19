import type React from "react"
import type { Metadata } from "next"
import { Fredoka, Inter, Playfair_Display, DM_Sans, Caveat, Cherry_Cream_Soda } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import { AuthProvider } from "@/components/auth-provider"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/sonner"
import "./globals.css"

const fredoka = Fredoka({ subsets: ["latin"], variable: "--font-fredoka" })
const inter = Inter({ subsets: ["latin"] })
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" })
const dmSans = DM_Sans({ subsets: ["latin"], variable: "--font-dm" })
const caveat = Caveat({ subsets: ["latin"], variable: "--font-caveat" })
const cherryCreamSoda = Cherry_Cream_Soda({ weight: "400", subsets: ["latin"], variable: "--font-ice-cream" })

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
      <body className={`${fredoka.variable} ${playfair.variable} ${dmSans.variable} ${caveat.variable} ${cherryCreamSoda.variable} font-sans antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="festive" enableSystem={false} themes={['festive', 'dark', 'calm']}>
          <AuthProvider>{children}</AuthProvider>
          <Toaster 
            position="top-right" 
            richColors 
            expand 
            toastOptions={{
              style: {
                padding: '16px',
                fontSize: '18px',
                fontFamily: 'var(--font-ice-cream)',
                backgroundColor: '#000',
                color: '#fff',
                border: '2px solid #fff',
                minWidth: 'fit-content'
              },
              classNames: {
                error: 'bg-black text-red-400 border-2 border-red-500 shadow-[4px_4px_0px_0px_rgba(239,68,68,1)]',
                success: 'bg-black text-green-400 border-2 border-green-500 shadow-[4px_4px_0px_0px_rgba(74,222,128,1)]',
                warning: 'bg-black text-yellow-400 border-2 border-yellow-500 shadow-[4px_4px_0px_0px_rgba(250,204,21,1)]',
              }
            }}
          />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  )
}
