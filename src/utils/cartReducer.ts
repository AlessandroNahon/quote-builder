import { ProductType } from '../types'

export default function cartReducer(products: ProductType[], action: any) {
	switch (action.type) {
		case 'added': {
			if (products.some((p) => p.id === action.id)) return products

			return [
				...products,
				{
					id: action.id,
					name: action.name,
					sku: action.sku,
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
