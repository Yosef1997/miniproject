import { PROFILE_STORAGE } from "@/constant/constant"
import { User } from "@/types/users"
import { useEffect, useState } from "react"

const useProfile = (email: string = "") => {
  const [response, setResponse] = useState<User | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchProfile = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/users/detail/${email}`,
          {
            credentials: "include",
          }
        )

        if (!response.ok) {
          throw new Error("Failed to get detail event.")
        }

        const { data } = await response.json()
        localStorage.setItem(PROFILE_STORAGE, JSON.stringify(data))
        setResponse(data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }

    fetchProfile()
  }, [email])

  return { response, loading, error }
}

export default useProfile
