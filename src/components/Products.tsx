import { type ReactElement } from 'react'
import { ProductType } from '../types'
import { Browser, Product } from '.'

interface Props {
  products: ProductType[]
}

export default function Products({ products }: Props): ReactElement {

  if (products.length === 0) return <p>Nothing to see here</p>

  return (
    <Browser className="products">
      <h2>Products</h2>
      <ul>
        {
          products.map((product: ProductType) => (
            <Product product={product} />
          ))
        }
      </ul>
    </Browser>

  )
}
