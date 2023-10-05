import { useContext, type ReactElement } from 'react'

import { ProductType } from '../types'
import AppContext from '../context/appContext'

interface Props {
  product: ProductType
}

export default function Product({ product }: Props): ReactElement {

  const { handleSelectProduct, cart } = useContext(AppContext)

  return (
    <li key={product.sku} onClick={() => handleSelectProduct!(product, cart)}>
      <p>{product.name}</p>
      <span>{product.sku}</span>
    </li>
  )
}
