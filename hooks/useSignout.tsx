import { toast } from "@/components/ui/use-toast"
import { response } from "@/types/response"
import { signOut } from "next-auth/react"
import { useState } from "react"

const useSignout = () => {
  const [response, setResponse] = useState<response>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleSignOut = async () => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/auth/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to Sign out.")
      }

      const result: response = await response.json()

      await signOut()
      toast({
        variant: "success",
        title: "Sign Out Success",
      })
    } catch (error) {
      toast({
        variant: "success",
        title: "Sign Out Failed",
      })
      setError(error)
    }
    setLoading(false)
  }

  return { handleSignOut, response, loading, error }
}

export default useSignout
