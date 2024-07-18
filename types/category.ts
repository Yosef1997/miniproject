export interface Category {
  id: number
  categoryName: string
}

export interface CategoryResponse {
  statusCode: number
  message: string
  success: boolean
  data: Category[]
}
