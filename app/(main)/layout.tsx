import { Footer, Navbar } from "@/components"
import React from "react"

export default function mainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  )
}
