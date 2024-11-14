"use client"
import { ApiResponse } from "@/types/home"
import { useEffect, useState } from "react"

const useHome = () => {
  const [response, setResponse] = useState<ApiResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const fetchHomeData = async () => {
      try {
        setLoading(true)
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/home`
        )
        if (!response.ok) {
          throw new Error("Failed to fetch Users.")
        }
        const result: ApiResponse = await response.json()
        // console.log(result.data)
        setLoading(false)
        setResponse(result)
      } catch (error) {
        setError(error)
        setLoading(false)
      }
    }

    fetchHomeData()
  }, [])

  return {
    response,
    loading,
    error,
  }
}

export default useHome
