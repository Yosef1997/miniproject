"use client"

import { useState, useEffect, useCallback } from "react"
import { EventResponse, Events } from "@/types/event"
import { useRouter } from "next/navigation"
import { useSearchParams } from "next/navigation"

interface QueryParams {
  eventName?: string
  location?: string
  category?: string
  page?: number
  size?: number
  userId?: number
  upcoming?: boolean
  [key: string]: string | number | boolean | undefined
}

const useEvents = (initialParams: QueryParams = {}) => {
  const [data, setData] = useState<EventResponse | null>(null)
  const [events, setEvents] = useState<Events[]>([])
  const [loading, setLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)
  const router = useRouter()
  const searchParams = useSearchParams()

  const fetchEvents = async (params: QueryParams, append: boolean = false) => {
    setLoading(true)
    setError(null)

    // Filter out empty string values and undefined values
    const filteredParams = Object.entries(params).reduce(
      (acc, [key, value]) => {
        if (value !== "" && value !== undefined) {
          acc[key] = value.toString()
        }
        return acc
      },
      {} as Record<string, string>
    )

    const queryString = new URLSearchParams(filteredParams).toString()

    const url = `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/event?${queryString}`
    console.log(url)
    try {
      const response = await fetch(url)
      if (!response.ok) {
        throw new Error("Failed to fetch events")
      }
      const jsonData: EventResponse = await response.json()

      setData((prevData) => {
        if (append && prevData) {
          return {
            ...jsonData,
            data: {
              ...jsonData.data,
              content: [...prevData.data.content, ...jsonData.data.content],
            },
          }
        }
        return jsonData
      })
      console.log(data?.data.content)
      // Update the URL in the browser
      router.push(`?${queryString}`, { scroll: false })
    } catch (err) {
      setError(err instanceof Error ? err : new Error("An error occurred"))
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchEvents(initialParams)
  }, [])

  const refetch = useCallback(
    (newParams: QueryParams = {}, append: boolean = false) => {
      const currentParams = Object.fromEntries(searchParams.entries())
      const combinedParams = {
        ...initialParams,
        ...currentParams,
        ...newParams,
      }

      // Filter out empty string values and undefined values
      const filteredParams = Object.entries(combinedParams).reduce<QueryParams>(
        (acc, [key, value]) => {
          if (value !== "" && value !== undefined) {
            acc[key as keyof QueryParams] = value
          }
          return acc
        },
        {} as QueryParams
      )

      fetchEvents(filteredParams, append)
    },
    [searchParams, initialParams, fetchEvents]
  )

  return { data, events, loading, error, refetch }
}

export default useEvents
