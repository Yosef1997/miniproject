import { useToast } from "@/components/ui/use-toast"
import { auth } from "@/types/auth"
import { response } from "@/types/response"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useLogin = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleSignIn = async (request: auth) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/auth/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
        }
      )

      if (!response.ok) {
        throw new Error("Failed to login.")
      }

      const result: response = await response.json()
      setLoading(false)
      router.push("/")
      toast({
        variant: "success",
        title: "Sign In Success",
        description: result.message,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign In Failed",
      })
      setLoading(false)
      console.log("error sign in", error)
      setError(error)
    }
  }

  return {
    handleSignIn,
    response,
    loading,
    error,
  }
}

export default useLogin
