import { ImageData, UploadImageResponse } from "@/types/uploadImage"
import { useState } from "react"

const useUploadImage = () => {
  const [response, setResponse] = useState<ImageData>()
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<unknown>(null)

  const handleUpload = async (file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("file", file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/upload-image`,
        {
          method: "POST",
          body: formData,
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const result: UploadImageResponse = await response.json()
      setResponse(result.data)
      return result.data
    } catch (error) {
      console.error("Error uploading image:", error)
      setError(error)
    }
    setLoading(false)
  }

  const handleUpdate = async (publicId: string, file: File) => {
    setLoading(true)
    try {
      const formData = new FormData()
      formData.append("publicId", publicId)
      formData.append("file", file)

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_HOSTNAME_API}${process.env.NEXT_PUBLIC_PREFIX_API}/upload-image/update`,
        {
          method: "PUT",
          body: formData,
          credentials: "include",
        }
      )

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const result: UploadImageResponse = await response.json()
      setResponse(result.data)
      return result.data
    } catch (error) {
      console.error("Error update image:", error)
      setError(error)
    }
    setLoading(false)
  }

  return {
    handleUpload,
    handleUpdate,
    response,
    loading,
    error,
  }
}

export default useUploadImage
