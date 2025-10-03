"use client"

import type React from "react"
import { Sidebar } from "@/components/sidebar"
import { BottomNav } from "@/components/bottom-nav"
import { usePathname } from "next/navigation"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const pathname = usePathname()
  
  // Define routes where sidebar and bottom nav should be hidden
  const authRoutes = ["/login", "/register", "/sign-in", "/sign-up"]
  const isAuthPage = authRoutes.includes(pathname)

  // If it's an auth page, render children without layout
  if (isAuthPage) {
    return <>{children}</>
  }

  // Otherwise, render with sidebar and bottom nav
  return (
    <>
      {/* Sidebar for desktop */}
      <Sidebar />

      {/* Main content with responsive margin */}
      <div className="lg:pl-60 pb-20 lg:pb-0">{children}</div>

      {/* Bottom navigation for mobile */}
      <BottomNav />
    </>
  )
}