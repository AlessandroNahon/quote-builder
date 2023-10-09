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
  lineItems: LineItemDataInterface[] | []
  tax: number
  subtotal: number
  discounts: number
  total: number
}

export type QuoteType = QuoteInterface
