import { useToast } from "@/components/ui/use-toast"
import { ForgotPassword } from "@/types/forgotPassword"
import { response } from "@/types/response"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useForgotPassword = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleForgotPassword = async (request: ForgotPassword) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/auth/forgot-password`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to add user.")
      }

      const result: response = await response.json()
      toast({
        variant: "success",
        title: "Forgot Password Success",
        description: result.message,
      })
      setLoading(false)
      router.push("/sign-in")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Forgot Password Failed",
      })
      setLoading(false)
      console.log("error sign up", error)
      setError(error)
    }
  }

  return {
    handleForgotPassword,
    response,
    loading,
    error,
  }
}

export default useForgotPassword
