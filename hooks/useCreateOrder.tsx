"use client"
import { toast } from "@/components/ui/use-toast"
import { TICKET_STORAGE } from "@/constant/constant"
import { OrderRequest, OrderResponse } from "@/types/order"
import { useRouter } from "next/navigation"
import { useState } from "react"

const useCreateOrder = () => {
  const [response, setResponse] = useState<OrderResponse>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)
  const router = useRouter()

  const handleCreateOrder = async (request: OrderRequest) => {
    setLoading(true)
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/order`,
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

      const result: OrderResponse = await response.json()
      sessionStorage.setItem(TICKET_STORAGE, JSON.stringify(result.data))
      setResponse(result)
      router.push("/ticket")
      toast({
        variant: "success",
        title: "Order Success",
        description: result.message,
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Order Failed",
      })
      console.log("error sign in", error)
      setError(error)
    }
    setLoading(false)
  }

  return {
    handleCreateOrder,
    response,
    loading,
    error,
  }
}

export default useCreateOrder
