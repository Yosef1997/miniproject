export interface ImageData {
  publicId: string
  url: string
}

export interface UploadImageResponse {
  statusCode: number
  message: string
  success: boolean
  data: ImageData
}
