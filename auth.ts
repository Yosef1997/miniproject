import NextAuth from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { cookies } from "next/headers"

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null
        }
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({
                email: credentials.email,
                password: credentials.password,
              }),
            }
          )
          if (!response.ok) {
            throw new Error("Authentication failed")
          }
          const data = await response.json()

          const cookieStore = cookies()
          cookieStore.set("sid", data.data.token)

          console.log(data.data.user.avatar)
          return {
            id: data.data.user.id.toString(),
            email: data.data.user.email,
            role: data.data.user.role,
            avatar: data.data.user.avatar,
            token: data.data.token,
          }
        } catch (error) {
          console.error("Authentication error:", error)
          return null
        }
      },
    }),
  ],
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth
    },
    jwt: async ({ token, user }) => {
      if (user) {
        token.role = user.role
        token.accessToken = user.token
      }
      return token
    },
    session: async ({ session, token }) => {
      if (session.user && token.role) {
        session.user.role = token.role
        session.user.accessToken = token.accessToken
      }
      return session
    },
  },
  pages: {
    signIn: "/sign-in",
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 },
  jwt: {
    maxAge: 24 * 60 * 60,
  },
  cookies: {
    sessionToken: {
      name: `session-jwt`,
      options: {
        httpOnly: true,
        sameSite: "lax",
      },
    },
  },
})
