import { useContext, type ReactElement } from 'react'
import Product from './Product'
import LineItemData from './LineItemData'
import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'

interface Props {
  item: ProductType
}

export default function LineItem({ item }: Props): ReactElement {
  const { quote } = useContext(AppContext)
  const lineItem: any = quote?.lineItems.find((li: LineItemDataInterface) => li.id === item.id)

  return (<>
    <Product product={item} />
    <LineItemData lineItem={lineItem} />
  </>)
}
