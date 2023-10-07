import { createContext } from 'react'
import { LineItemDataInterface, ProductType, QuoteType } from '../types'

interface AppContextInterface {
	handleSelectProduct: ((product: ProductType) => void) | null
	quote: QuoteType
	handleUpdateItemQty: ((lineItem: LineItemDataInterface, quantity: number) => void) | null
	handleUpdateItemUnitPrice: ((lineItem: LineItemDataInterface, unitPrice: number) => void) | null
	handleUpdateItemTotal: ((id: number) => void) | null
	handleUpdateSubTotal: (() => void) | null
	handleUpdateTotal: (() => void) | null
	handleUpdateDiscounts: ((discounts: number) => void) | null
	handleUpdateTax: ((tax: number) => void) | null
}

const defaultState: AppContextInterface = {
	quote: {
		lineItems: [],
		tax: 0,
		subtotal: 0,
		discounts: 0,
		total: 0
	},
	handleSelectProduct: null,
	handleUpdateItemQty: null,
	handleUpdateItemUnitPrice: null,
	handleUpdateItemTotal: null,
	handleUpdateSubTotal: null,
	handleUpdateTotal: null,
	handleUpdateDiscounts: null,
	handleUpdateTax: null
}

const AppContext = createContext(defaultState)

export default AppContext
