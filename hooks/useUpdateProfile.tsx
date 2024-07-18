import { PROFILE_STORAGE } from "@/constant/constant"
import { User } from "@/types/users"
import { useState } from "react"

export interface UpdateProfileReq {
  username: string
  email: string
  password: string
  phone: string
  avatar?: string
}

const useUpdateProfile = () => {
  const [response, setResponse] = useState<User | undefined>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleUpdateProfile = async (request: UpdateProfileReq) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/users/profile`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
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

  return { handleUpdateProfile, response, loading, error }
}

export default useUpdateProfile
