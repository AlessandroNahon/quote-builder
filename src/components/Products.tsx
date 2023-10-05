import { type ReactElement, useState } from 'react'
import { ProductType } from '../types'
import { Browser, Product } from '.'
import Search from './Search'

interface Props {
  products: ProductType[]
}

function startsWithNumber(str: string) {
  return /^\d+(?=\s|$)/.test(str);
}

export default function Products({ products }: Props): ReactElement {
  const [searchValue, setSearchValue] = useState('')
  if (products.length === 0) return <p>Nothing to see here</p>
  function searchProduct(products: ProductType[]) {
    if (startsWithNumber(searchValue)) {
      return products.filter((p) => p.sku.includes(searchValue))
    } else {
      return products.filter((p) => p.name.includes(searchValue))
    }
  }

  return (
    <Browser className="products">
      <h2>Products</h2>
      <Search placeholder='Search products' setSearchValue={setSearchValue} />
      <ul>
        {
          searchProduct(products)?.map((product: ProductType) => (
            <Product product={product} />
          ))
        }
      </ul>
    </Browser>

  )
}
