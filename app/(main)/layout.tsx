import Footer from "@/components/Footer"
import Navbar from "@/components/Navbar"
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
