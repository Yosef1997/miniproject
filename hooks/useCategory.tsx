import { Category, CategoryResponse } from "@/types/category"
import { useEffect, useState } from "react"

const useCategory = () => {
  const [response, setResponse] = useState<Category[]>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchCategory = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/category`,
          {
            credentials: "include",
          }
        )

        if (!response.ok) {
          throw new Error("Failed to get category.")
        }

        const result: CategoryResponse = await response.json()
        console.log("response >>>", result.data)

        setResponse(result.data)
      } catch (error) {
        setError(error)
        console.log(error)
      }
      setLoading(false)
    }

    fetchCategory()
  }, [])

  return {
    response,
    loading,
    error,
  }
}

export default useCategory
