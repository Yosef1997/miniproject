import "next-auth"
import "next-auth/jwt"

declare module "next-auth" {
  interface Session {
    user: {
      id: string
      email: string
      role?: string
      avatar?: string
      username?: string
      phone?: string
      accessToken?: string
    }
  }

  interface User {
    role?: string
    token?: string
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    role?: string
    accessToken?: string
  }
}
