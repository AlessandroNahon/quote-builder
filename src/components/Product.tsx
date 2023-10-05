import { useContext, type ReactElement } from 'react'

import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props): ReactElement {

  const { handleSelectProduct, quote } = useContext(AppContext)
  const ok = quote.lineItems.some((li: LineItemDataInterface) => li.id === product.id)

  console.log('ok', ok)
  return (
    <li className={ok ? 'selected' : ''} key={product.sku} onClick={() => handleSelectProduct!(product)}>
      <span>{product.name}</span>
      <span>SKU: {product.sku}</span>
    </li>
  )
}
