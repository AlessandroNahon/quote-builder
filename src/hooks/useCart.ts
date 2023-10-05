import { useReducer } from 'react'
import { ProductType } from '../types'
import cartReducer from '../utils/cartReducer'

export default function useCart() {
	const [cart, dispatch] = useReducer(cartReducer, [])

	function handleAddProduct(product: ProductType) {
		dispatch({
			type: 'added',
			...product,
		})
	}

	function handleDeleteProduct(productId: number) {
		dispatch({
			type: 'deleted',
			id: productId,
		})
	}

	function handleSelectProduct(product: ProductType, cart: ProductType[]) {
		if (cart.some((p) => p.id === product.id)) {
			handleDeleteProduct(product.id)
		} else {
			handleAddProduct(product)
		}
	}

	return { cart, handleSelectProduct }
}
