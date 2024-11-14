"use client"
import { toast } from "@/components/ui/use-toast"
import { DetailEventResponse } from "@/types/detailEvent"
import { useEffect, useState } from "react"

const useDetailEvent = (eventId: number) => {
  const [response, setResponse] = useState<DetailEventResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  useEffect(() => {
    const handleDetailEvent = async () => {
      setLoading(true)
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/event/${eventId}`
        )

        if (!response.ok) {
          throw new Error("Failed to get detail event.")
        }

        const result: DetailEventResponse = await response.json()
        setResponse(result)
      } catch (error) {
        toast({
          variant: "destructive",
          title: "Get Detail Event Failed",
        })

        console.log("error detail event", error)
        setError(error)
      }
      setLoading(false)
    }

    handleDetailEvent()
  }, [eventId])

  return { response, loading, error }
}

export default useDetailEvent
