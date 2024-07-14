import { useToast } from "@/components/ui/use-toast"
import { CreateUserRequest } from "@/types/register"
import { response } from "@/types/response"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useSignup = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const { toast } = useToast()
  const router = useRouter()

  const handleRegister = async (request: CreateUserRequest) => {
    try {
      setLoading(true)
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/users/register`,
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
        title: "Sign Up Success",
        description: result.message,
      })
      router.push("/sign-in")
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Sign Up Failed",
      })
      setLoading(false)
      console.log("error sign up", error)
      setError(error)
    }
  }

  return {
    handleRegister,
    response,
    loading,
    error,
  }
}

export default useSignup
