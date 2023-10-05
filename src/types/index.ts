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
	lineItems: LineItemDataInterface[] | ProductType[] | []
	tax: number
	subtotal: number
	discounts: number
}
