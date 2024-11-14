import { toast } from "@/components/ui/use-toast"
import { signIn } from "next-auth/react"

export const authenticate = async (data: {
  email: string
  password: string
}) => {
  try {
    await signIn("credentials", data)
    toast({
      variant: "success",
      title: "Sign In Success",
    })
  } catch (error) {
    console.log(error)
    toast({
      variant: "success",
      title: "Sign In Failed",
    })
  }
}
