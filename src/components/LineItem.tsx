import { type ReactElement } from 'react'
import Product from './Product'
import LineItemData from './LineItemData'
import { ProductType } from '../types'

interface Props {
  item: ProductType
  cart: any
}

export default function LineItem({ item, cart }: Props): ReactElement {
  const lineItemData = { ...item, quantity: 0, unitPrice: 0, totalPrice: 0 }

  return (<>
    <Product product={item} />
    <LineItemData lineItem={lineItemData} />
  </>)
}
