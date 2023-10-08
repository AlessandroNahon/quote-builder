import { type ReactElement } from 'react'

import { Quote, Products } from '../components'
import { products } from '../data'

export default function QuoteBuilder(): ReactElement {
  return (
    <main id="quote-builder">
      <Products products={products} />
      <Quote />
    </main>
  )
}
