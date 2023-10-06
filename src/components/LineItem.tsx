import { useContext, type ReactElement } from 'react'
import Product from './Product'
import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'

interface Props {
  item: ProductType
}

export default function LineItem({ item }: Props): ReactElement {
  const { quote, handleUpdateItemQty, handleUpdateItemUnitPrice, handleUpdateItemTotal } = useContext(AppContext)
  const lineItem: any = quote?.lineItems.find((li: LineItemDataInterface) => li.id === item.id)

  function handleQtyInput(e: any) {
    handleUpdateItemQty!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  function handleUnitPriceInput(e: any) {
    handleUpdateItemUnitPrice!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  return (<>
    <Product product={item} />
    <label>Quantity</label>
    <input type='number' onChange={handleQtyInput} />
    <label>Unit Price</label>
    {'$'}<input type='text' onChange={handleUnitPriceInput} />
    <p>Unit Total: ${lineItem?.totalPrice}</p>
  </>)
}
