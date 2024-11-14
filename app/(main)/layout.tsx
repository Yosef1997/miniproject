import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
import { Toaster } from "@/components/ui/toaster"
import React from "react"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
      <Toaster />
    </div>
  )
}
