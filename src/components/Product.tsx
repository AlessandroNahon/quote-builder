import { useContext, type ReactElement } from 'react'

import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props): ReactElement {

  const { handleSelectProduct, quote } = useContext(AppContext)
  const ok = quote.lineItems.some((li: LineItemDataInterface) => li.id === product.id)

  return (
    <li className={ok ? 'selected' : ''} key={product.sku} onClick={() => handleSelectProduct!(product)}>
      <div>{product.name}</div>
      <span>SKU: {product.sku}</span>
    </li>
  )
}
