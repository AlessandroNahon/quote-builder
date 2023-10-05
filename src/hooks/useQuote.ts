import { useReducer } from 'react'
import { LineItemDataInterface, ProductType } from '../types'
import quoteReducer from '../utils/quoteReducer'

const initialArg = {
	lineItems: [],
	tax: 0,
	subtotal: 0,
	discounts: 0,
}

export default function useQuote() {
	const [quote, dispatch] = useReducer(quoteReducer, initialArg)

	function handleAddLineItem(lineItem: ProductType) {
		dispatch({
			type: 'addLineItem',
			lineItem: {
				...lineItem,
				quantity: 0,
				unitPrice: 0,
				totalPrice: 0,
			},
		})
	}

	function handleDeleteLineItem(itemId: number) {
		console.log('id', itemId)
		dispatch({
			type: 'removeLineItem',
			id: itemId,
		})
	}

	function handleUpdateItemQty(
		lineItem: LineItemDataInterface,
		quantity: number
	) {
		dispatch({
			...lineItem,
			type: 'updateItemQuantity',
			quantity,
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
		})
	}

	function handleUpdateItemTotal(id: number) {
		dispatch({
			type: 'updateItemTotal',
			id,
		})
	}

	function handleSelectProduct(product: ProductType) {
		if (
			quote.lineItems?.some((p: LineItemDataInterface) => p.id === product.id)
		) {
			handleDeleteLineItem(product.id)
		} else {
			handleAddLineItem(product)
		}
	}

	return {
		quote,
		handleSelectProduct,
		handleUpdateItemQty,
		handleUpdateItemUnitPrice,
		handleUpdateItemTotal,
	}
}
