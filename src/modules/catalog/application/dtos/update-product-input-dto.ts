export interface UpdateProductInputDto {
  productId: string
  productName?: string
  priceInCents?: number
  amount?: number
  isActive?: boolean
}
