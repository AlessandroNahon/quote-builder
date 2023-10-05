import { ProductType } from '../types'

export default function cartReducer(products: ProductType[], action: any) {
	switch (action.type) {
		case 'added': {
			const lineItems = products.map((product) => ({
				...product,
				quantity: 0,
				unitPrice: 0,
				totalPrice: 0,
			}))

			if (lineItems.some((p) => p.id === action.id)) return lineItems

			return [
				...lineItems,
				{
					id: action.id,
					name: action.name,
					sku: action.sku,
					quantity: 0,
					unitPrice: 0,
					totalPrice: 0,
				},
			]
		}
		case 'deleted': {
			return products.filter((p) => p.id !== action.id)
		}
		default: {
			throw Error('Unknown action: ' + action.type)
		}
	}
}
