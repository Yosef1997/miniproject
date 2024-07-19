"use client"
import useUploadImage from "@/hooks/useUploadImage"
import { BiImageAdd } from "@react-icons/all-files/bi/BiImageAdd"
import Image from "next/image"
import React, { ChangeEvent, useState } from "react"
import Error from "./Error"
import { ImageData } from "@/types/uploadImage"
import Loading from "./Loading"
import { UPLOAD_IMAGE_STORAGE } from "@/constant/constant"

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState<string>("")
  const [publicId, setPublicId] = useState<string>("")
  const [loading, setLoading] = useState(false)
  const { handleUpload, handleUpdate, error } = useUploadImage()

  const handleImageUpload = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return
    setLoading(true)
    try {
      let result: ImageData | undefined
      if (publicId !== "") {
        result = await handleUpdate(publicId, file)
      } else {
        result = await handleUpload(file)
      }

      if (result) {
        setImageUrl(result.url)
        setPublicId(result.publicId)
        sessionStorage.setItem(UPLOAD_IMAGE_STORAGE, JSON.stringify(result))
      }
    } catch (err) {
      console.error("Error uploading or updating image:", err)
    }
    setLoading(false)
  }

  if (error) {
    return <Error />
  }

  return (
    <div className='relative border border-border-line rounded-md p-9 w-fit'>
      <div className='flex flex-col justify-center items-center w-[177px] h-[272px]'>
        {loading ? (
          <Loading />
        ) : imageUrl ? (
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
