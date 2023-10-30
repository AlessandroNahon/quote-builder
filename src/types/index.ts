export type ProductType = {
  id: number
  name: string
  sku: string
  url?: string
}

export interface LineItemDataInterface extends ProductType {
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface QuoteInterface {
  id: string
  name: string
  lineItems: LineItemDataInterface[] | []
  tax: number
  subtotal: number
  discounts: number
  total: number
  createdAt?: Date
  updatedAt?: Date
}

export type QuoteType = QuoteInterface
