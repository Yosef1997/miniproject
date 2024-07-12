"use client"
import { BiImageAdd } from "@react-icons/all-files/bi/BiImageAdd"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("")

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    const formData = new FormData()
    formData.append("file", file)
    formData.append(
      "upload_preset",
      process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET as string
    )

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      )

      if (!response.ok) {
        throw new Error("Failed to upload image")
      }

      const data = await response.json()
      setImageUrl(data.secure_url)
    } catch (error) {
      console.error("Error uploading image:", error)
    }
  }
  return (
    <div className='relative border border-border-line rounded-md p-9 w-fit'>
      <div className='flex flex-col justify-center items-center w-[177px] h-[272px]'>
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={imageUrl}
            width={177}
            height={272}
            style={{ width: "177px", height: "272px", borderRadius: 6 }}
          />
        ) : (
          <BiImageAdd size={200} />
        )}
      </div>
      <input
        type='file'
        onChange={handleImageUpload}
        className='absolute opacity-0 z-10 inset-0'
      />
    </div>
  )
}

export default UploadImage
