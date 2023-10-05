import { LineItemDataInterface, QuoteInterface } from '../types'

export default function quoteReducer(quote: QuoteInterface, action: any) {
	switch (action.type) {
		case 'addLineItem': {
			if (
				quote.lineItems?.length > 0 &&
				quote.lineItems?.some((p: LineItemDataInterface) => p.id === action.id)
			)
				return quote

			const updatedLineItems: LineItemDataInterface[] = [
				...quote?.lineItems,
				action.lineItem,
			]
			return { ...quote, lineItems: updatedLineItems }
		}
		case 'removeLineItem': {
			return {
				...quote,
				lineItems: quote.lineItems.filter(
					(p: LineItemDataInterface) => p.id !== action.id
				),
			}
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
