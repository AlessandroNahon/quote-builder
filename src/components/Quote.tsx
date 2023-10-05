import { useContext, type ReactElement, useEffect } from 'react'
import Browser from './Browser'
import AppContext from '../context/appContext'
import LineItem from './LineItem'

export default function Quote(): ReactElement {
  const { cart, onLoad } = useContext(AppContext)

  useEffect(() => {
    if (cart.length > 0 && onLoad) onLoad(cart as any)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cart])

  return (
    <Browser>
      <section id="quote">
        {cart.map(item => (
          <LineItem item={item} />
        ))}
      </section>
    </Browser>
  )
}
