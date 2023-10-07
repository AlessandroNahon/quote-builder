import { useContext, type ReactElement } from 'react'

import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'
import { toTitleCase } from '../utils'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props): ReactElement {
  const { quote } = useContext(AppContext)
  const ok = quote.lineItems.some((li: LineItemDataInterface) => li.id === product.id)

  return (
    <div className={ok ? 'product selected' : 'product'} key={product.sku}>
      <div>{toTitleCase(product.name)}</div>
      <span>SKU: {product.sku}</span>
    </div>
  )
}
