import { useContext, type ReactElement } from 'react'
import Browser from './Browser'
import AppContext from '../context/appContext'
import LineItem from './LineItem'
import { LineItemDataInterface } from '../types'

export default function Quote(): ReactElement {
  const { quote } = useContext(AppContext)

  return (
    <Browser>
      <h2>Quote</h2>
      {quote.lineItems?.map((item: LineItemDataInterface) => (
        <LineItem item={item} />
      ))}
      <div className='spacer'></div>
      <p> Subtotal: ${quote.subtotal}</p>
      <label>Discounts</label>
      <input type='number' />
      <label>Tax</label>
      <input type='number' />
      <div className='spacer'></div>
      <p>Total: ${quote.total}</p>
    </Browser>
  )
}
