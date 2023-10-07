export type ProductType = {
  id: number
  name: string
  sku: string
}

export interface LineItemDataInterface extends ProductType {
  quantity: number
  unitPrice: number
  totalPrice: number
}

export interface QuoteInterface {
  lineItems: LineItemDataInterface[] | any
  tax: number
  subtotal: number
  discounts: number
  total: number
}

export type QuoteType = QuoteInterface
