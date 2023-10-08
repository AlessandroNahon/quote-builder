import { useContext, type ReactElement, useRef } from 'react'

import AppContext from '../context/appContext'
import LineItem from './LineItem'
import { LineItemDataInterface } from '../types'
import DownloadSvg from '../download.svg'
import { convertToCurrency } from '../utils'

export default function Quote(): ReactElement {
  const ref = useRef<any>()

  const { quote, handleUpdateDiscounts, handleUpdateTax } = useContext(AppContext)

  function saveQuote(e: any) {
    e.preventDefault()

    const a = window.open('', '', 'height=660, width=750')
    a!.document.write('<html><body >')
    a!.document.write(ref.current.outerHTML.toString())
    a!.document.write('</body></html>')
    a!.document.close()
    a!.print()
  }

  return (
    <section id='browser' className='quote' ref={ref}>
      <span className='browser-header'>
        <h2>Quote</h2>
        {quote.lineItems.length > 0 && (
          <button onClick={saveQuote}>
            <img className='download' src={DownloadSvg} alt='download button' loading='eager' />
          </button>
        )}
      </span>
      {quote.lineItems.length === 0 && <h3>Select a product to start a quote.</h3>}
      {quote.lineItems.length > 0 && (
        <>
          {quote.lineItems?.map((item: LineItemDataInterface) => (
            <LineItem key={item.sku} item={item} />
          ))}
          <div id='total'>
            <p> Subtotal: {convertToCurrency(quote.subtotal, 'CAD')}</p>
            <span>
              <input
                type='number'
                name='discounts'
                onChange={(e) => handleUpdateDiscounts!(Number(e.target.value))}
              />
              <label>Discounts</label>
            </span>
            <span>
              <input
                type='number'
                name='tax'
                onChange={(e) => handleUpdateTax!(Number(e.target.value))}
              />
              <label>Tax</label>
            </span>

            <div className='spacer'></div>
            <p>Total: {quote.total > 0 ? convertToCurrency(quote.total, 'CAD') : 0}</p>
          </div>
        </>
      )}
    </section>
  )
}
