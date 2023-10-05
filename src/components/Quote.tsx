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
    </Browser>
  )
}
