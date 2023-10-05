import { useContext, type ReactElement } from 'react'
import Browser from './Browser'
import AppContext from '../context/appContext'
import LineItem from './LineItem'

export default function Quote(): ReactElement {

  const { cart } = useContext(AppContext)

  return (
    <Browser>
      <section id="quote">
        {cart.map(item => (
          <LineItem item={item} cart={cart} />
        ))}
      </section>
    </Browser>
  )
}
