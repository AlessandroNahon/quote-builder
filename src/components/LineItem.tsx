import { useContext, type ReactElement } from 'react'
import Product from './Product'
import { LineItemDataInterface, ProductType } from '../types'
import AppContext from '../context/appContext'
import { convertToCurrency } from '../utils'

import CloseSvg from '../trash.svg'

interface Props {
  item: ProductType
}

export default function LineItem({ item }: Props): ReactElement {
  const { quote, handleUpdateItemQty, handleUpdateItemUnitPrice, handleUpdateItemTotal, handleSelectProduct } =
    useContext(AppContext)
  const lineItem: any = quote?.lineItems.find((li: LineItemDataInterface) => li.id === item.id)

  function handleQtyInput(e: any) {
    handleUpdateItemQty!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  function handleUnitPriceInput(e: any) {
    handleUpdateItemUnitPrice!(lineItem, e.target.value)
    handleUpdateItemTotal!(lineItem.id)
  }

  return (
    <div className="line-item">
      <img className='list-item-delete' src={CloseSvg} alt='remove' onClick={() => handleSelectProduct!(lineItem)} />
      <Product product={item} />
      <div className="line-item-data">
        <span>
          <label>Qty</label>
          <input type="number" onChange={handleQtyInput} />
        </span>
        <span>
          <label>Unit Price</label>
          <input type="text" onChange={handleUnitPriceInput} />
        </span>

        <p>Unit Total: {convertToCurrency(lineItem?.totalPrice, 'CAD')}</p>
      </div>
    </div>
  )
}
