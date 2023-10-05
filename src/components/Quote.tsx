import { useContext, type ReactElement } from 'react'
import Browser from './Browser'
import AppContext from '../context/appContext'
import Product from './Product'

export default function Quote(): ReactElement {

  const { cart } = useContext(AppContext)

  const lineItems = cart
  return (
    <Browser>
      <section id="quote">
        {lineItems.map(item => (
          <Product product={item} />
        ))}
      </section>
    </Browser>
  )
}
