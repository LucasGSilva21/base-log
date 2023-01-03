export interface CreateProductOutputDto {
  id: string
  productName: string
  priceInCents: number
  amount: number
  isActive: boolean
  createdAt: Date
  updatedAt: Date
}
