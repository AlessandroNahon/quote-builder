import { useContext, type ReactElement } from 'react'
import { LineItemDataInterface } from '../types'
import AppContext from '../context/appContext'

interface Props {
  lineItem: LineItemDataInterface
}

export default function LineItemData({ lineItem }: Props): ReactElement {

  const { handleUpdateItemQty, handleUpdateItemUnitPrice, handleUpdateItemTotal } = useContext(AppContext)

  function handleQtyInput(e: any) {
    handleUpdateItemQty!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  function handleUnitPriceInput(e: any) {
    handleUpdateItemUnitPrice!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  return (<>
    <label>Quantity</label>
    <input type='number' placeholder='Quantity' onChange={handleQtyInput} />
    <label>Unit Price</label>
    <input type='text' placeholder='Unit Price' onChange={handleUnitPriceInput} />
    <p>Unit Total: ${lineItem?.totalPrice}</p>
  </>)
}
