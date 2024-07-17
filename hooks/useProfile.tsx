import { User } from "@/types/users"
import { useEffect, useState } from "react"

const useProfile = (email: string) => {
  const [response, setResponse] = useState<User>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/users/detail/${email}`
        )

        if (!response.ok) {
          throw new Error("Failed to get detail event.")
        }

        const result: User = await response.json()
        setResponse(result)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [])

  return { response, loading, error }
}

export default useProfile
