import { LineItemDataInterface, QuoteInterface } from '../types'

export default function quoteReducer(quote: QuoteInterface, action: any) {
	switch (action.type) {
		case 'updateItemQuantity': {
			const updatedLineItems = action.lineItems.map(
				(li: LineItemDataInterface) => {
					if (li.id === action.id) {
						return { ...li, quantity: action.quantity }
					} else {
						return li
					}
				}
			)
			return { ...quote, lineItems: updatedLineItems }
		}
		case 'updateItemUnitPrice': {
			const updateOk = quote.lineItems
			return { ...quote, lineItems: updateOk }
		}
		case 'updateItemTotal': {
			const updateOkOk = quote.lineItems
			return { ...quote, lineItems: updateOkOk }
		}
		case 'updateTotal': {
			return quote
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}
