import { signIn } from "next-auth/react"

export const authenticate = async (data: {
  email: string
  password: string
}) => {
  try {
    await signIn("credentials", data)
  } catch (error) {
    console.log(error)
  }
}
