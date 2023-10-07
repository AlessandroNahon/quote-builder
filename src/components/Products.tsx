import { type ReactElement, useState, useContext } from 'react'
import { ProductType } from '../types'
import { Product } from '.'
import Search from './Search'
import AppContext from '../context/appContext'

interface Props {
	products: ProductType[]
}

function startsWithNumber(str: string) {
	return /^\d+(?=\s|$)/.test(str)
}

export default function Products({ products }: Props): ReactElement {
	const [searchValue, setSearchValue] = useState('')
	const { handleSelectProduct } = useContext(AppContext)
	if (products.length === 0) return <p>Nothing to see here</p>

	function searchProduct(products: ProductType[]) {
		if (startsWithNumber(searchValue)) return products.filter((p) => p.sku.includes(searchValue))

		return products.filter((p) => p.name.toLowerCase().includes(searchValue.toLowerCase()))
	}

	return (
		<section id="browser" className="products">
			<h2>Products</h2>
			<Search placeholder="Search products" setSearchValue={setSearchValue} />
			<ul>
				{searchProduct(products)?.map((product: ProductType) => (
					<li key={product.sku} onClick={() => handleSelectProduct!(product)}>
						<Product product={product} />
					</li>
				))}
			</ul>
		</section>
	)
}
