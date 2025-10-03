import type React from "react"
import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { Suspense } from "react"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Calapan City Connect",
  description: "Civic engagement platform for Calapan City",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}>
        {/* Sidebar for desktop */}
        <Suspense fallback={<div>Loading...</div>}>
          <Sidebar />
        </Suspense>

        {/* Main content with responsive margin */}
        <div className="lg:pl-64 lg:pr-4">{children}</div>

        {/* Bottom navigation for mobile */}
        <Suspense fallback={<div>Loading...</div>}>
          <BottomNav />
        </Suspense>

        <Analytics />
      </body>
    </html>
  )
}
