import { useReducer } from 'react'
import { LineItemDataInterface } from '../types'
import quoteReducer from '../utils/quoteReducer'

export default function useQuote(cart: any) {
	const [quote, dispatch] = useReducer(quoteReducer, {
		lineItems: cart,
		tax: 0,
		subtotal: 0,
		discounts: 0,
	})

	function handleUpdateItemQty(
		lineItem: LineItemDataInterface,
		quantity: number
	) {
		dispatch({
			...lineItem,
			type: 'updateItemQuantity',
			quantity,
			lineItems: cart,
		})
	}

	function handleUpdateItemUnitPrice(
		lineItem: LineItemDataInterface,
		unitPrice: number
	) {
		dispatch({
			...lineItem,
			type: 'updateItemUnitPrice',
			unitPrice,
			lineItems: cart,
		})
	}

	function handleUpdateItemTotal(id: number) {
		dispatch({
			type: 'updateItemTotal',
			id,
		})
	}

	function onLoad(cart: any) {
		dispatch({
			type: 'onLoad',
			lineItems: cart,
		})
	}

	return {
		quote,
		handleUpdateItemQty,
		handleUpdateItemUnitPrice,
		onLoad,
		handleUpdateItemTotal,
	}
}
