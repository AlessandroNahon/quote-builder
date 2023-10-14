import React, { type ReactElement, useContext } from 'react'
import Product from './Product'
import { LineItemDataInterface } from '../types'
import AppContext from '../context/appContext'
import { convertToCurrency } from '../utils'

import CloseSvg from '../assets/trash.svg'

interface Props {
  item: LineItemDataInterface
}

export default function LineItem({ item }: Props): ReactElement {
  const {
    quote,
    handleUpdateItemQty,
    handleUpdateItemUnitPrice,
    handleUpdateItemTotal,
    handleSelectProduct
  } = useContext(AppContext)

  const lineItem: LineItemDataInterface = quote?.lineItems.find(
    (li: LineItemDataInterface) => li.id === item.id
  ) || {
    quantity: 0,
    unitPrice: 0,
    totalPrice: 0,
    id: 0,
    name: '',
    sku: ''
  }

  function handleQtyInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleUpdateItemQty(lineItem, Number(e.target.value))
    handleUpdateItemTotal(lineItem.id)
  }

  function handleUnitPriceInput(e: React.ChangeEvent<HTMLInputElement>) {
    handleUpdateItemUnitPrice(lineItem, Number(e.target.value))
    handleUpdateItemTotal(lineItem.id)
  }

  return (
    <div className="line-item">
      <img
        className="list-item-delete"
        src={CloseSvg}
        alt="remove"
        onClick={() => handleSelectProduct(lineItem)}
        loading="eager"
      />
      <Product product={item} />
      <div className="line-item-data">
        <span>
          <label>Qty</label>
          <input
            type="number"
            onChange={handleQtyInput}
            value={item.quantity}
          />
        </span>
        <span>
          <label>Unit Price</label>
          <input
            type="text"
            onChange={handleUnitPriceInput}
            value={item.unitPrice}
          />
        </span>

        <p>Unit Total: {convertToCurrency(lineItem?.totalPrice, 'CAD')}</p>
      </div>
    </div>
  )
}
