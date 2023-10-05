import { QuoteInterface } from '../types'

export default function quoteReducer(quote: QuoteInterface, action: any) {
	switch (action.type) {
		case 'onLoad': {
			return { ...quote, lineItems: action.lineItems }
		}
		case 'updateItemQuantity': {
			const updatedLineItems = quote.lineItems.map((li: any) => {
				if (li.id === action.id) {
					return { ...li, quantity: Number(action.quantity) }
				} else {
					return li
				}
			})

			return { ...quote, lineItems: updatedLineItems }
		}
		case 'updateItemUnitPrice': {
			const updatedLineItems = quote.lineItems.map((li: any) => {
				if (li.id === action.id) {
					return { ...li, unitPrice: Number(action.unitPrice) }
				} else {
					return li
				}
			})

			return { ...quote, lineItems: updatedLineItems }
		}
		case 'updateItemTotal': {
			const updatedLineItems = quote.lineItems.map((li: any) => {
				if (li.id === action.id) {
					return {
						...li,
						totalPrice: Number(li.unitPrice) * Number(li.quantity),
					}
				} else {
					return li
				}
			})

			return { ...quote, lineItems: updatedLineItems }
		}
		case 'updateTotal': {
			return quote
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}
