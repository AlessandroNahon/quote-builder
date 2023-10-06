import { useContext, type ReactElement } from 'react'
import Browser from './Browser'
import AppContext from '../context/appContext'
import LineItem from './LineItem'
import { LineItemDataInterface } from '../types'

export default function Quote(): ReactElement {
  const { quote, handleUpdateDiscounts, handleUpdateTax } = useContext(AppContext)

  return (
    <Browser>
      <h2>Quote</h2>
      {quote.lineItems.length === 0 && <h3>Select a product.</h3>}
      {quote.lineItems.length > 0 && <>
        {quote.lineItems?.map((item: LineItemDataInterface) => (
          <LineItem item={item} />
        ))}
        <div id="total">
          <div className='spacer'></div>
          <p> Subtotal: ${quote.subtotal}</p>
          <label>Discounts</label>
          <input type='number' name='discount' onChange={(e) => handleUpdateDiscounts!(Number(e.target.value))} />
          <label>Tax</label>
          <input type='number' name='tax' onChange={(e) => handleUpdateTax!(Number(e.target.value))} />
          <div className='spacer'></div>
          <p>Total: ${quote.total}</p>
        </div>
      </>}
    </Browser>
  )
}
