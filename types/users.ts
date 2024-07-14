export interface User {
  id: number
  username: string | null
  avatar: string | null
  email: string
  role: string
  referralCode: string
  phone: string | null
  point: number
  referralVoucher: ReferralVoucher | null
}

export interface ReferralVoucher {
  id: number
  discountPercentage: number
  userId: number
  status: boolean
}
