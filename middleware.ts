import { auth } from "@/auth"
import { NextResponse } from "next/server"

export default auth((req) => {
  if (
    !req.auth &&
    (req.nextUrl.pathname.startsWith("/profile") ||
      req.nextUrl.pathname.startsWith("/dashboard"))
  ) {
    const newUrl = new URL("/sign-in", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (
    req.auth &&
    (req.nextUrl.pathname === "/sign-in" || req.nextUrl.pathname === "/sign-up")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (req.auth?.user.role === "ORGANIZER") {
    const newUrl = new URL("/dashboard", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (
    req.auth?.user.role === "ORGANIZER" &&
    req.nextUrl.pathname.startsWith("/order")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }

  if (
    req.auth?.user.role === "CUSTOMER" &&
    req.nextUrl.pathname.startsWith("/dashboard")
  ) {
    const newUrl = new URL("/", req.nextUrl.origin)
    return NextResponse.redirect(newUrl)
  }
})
