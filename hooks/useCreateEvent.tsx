import { toast } from "@/components/ui/use-toast"
import { CreateEventReq } from "@/types/createEvent"
import { Events } from "@/types/event"
import { useState } from "react"

export interface CreateEventResponse {
  statusCode: number
  message: string
  success: boolean
  data: Events
}

const useCreateEvent = () => {
  const [response, setResponse] = useState<CreateEventResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleCreateEvent = async (request: CreateEventReq) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/event`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(request),
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to create order.")
      }

      const result: CreateEventResponse = await response.json()
      setResponse(result)
      toast({
        variant: "success",
        title: "Create Event Success",
        description: result.message,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Create Event Failed",
      })
      console.log("error Create Event", error)
      setError(error)
    }
    setLoading(false)
  }

  return {
    handleCreateEvent,
    response,
    loading,
    error,
  }
}

export default useCreateEvent
