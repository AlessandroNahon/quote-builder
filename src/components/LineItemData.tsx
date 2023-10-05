import { useContext, type ReactElement } from 'react'
import { LineItemDataInterface } from '../types'
import AppContext from '../context/appContext'

interface Props {
  lineItem: LineItemDataInterface
}

export default function LineItemData({ lineItem }: Props): ReactElement {

  const { handleUpdateItemQty } = useContext(AppContext)

  function handleQtyInput(e: any) {
    handleUpdateItemQty!(lineItem, e.target.value)
  }
  return (<>
    <input type='number' placeholder='Quantity' onChange={handleQtyInput} />
    <input type='text' placeholder='Unit Price' />
    <p>Total: ${lineItem.totalPrice}</p>
  </>)
}
