import React, { useContext, type ReactElement, useState } from 'react'

import AppContext from '../context/appContext'
import { convertToCurrency } from '../utils'
import { LineItemDataInterface, QuoteType } from '../types'

import FileSvg from '../files.svg'
import NewSvg from '../new.svg'

import Slider from './Slider'
import LineItem from './LineItem'

export default function Quote(): ReactElement {
  const [sliderIsOpen, setSliderIsOpen] = useState<boolean>(false)

  const { quote, handleUpdateDiscounts, handleUpdateTax, handleSaveQuote, handleAddQuoteName, quoteList, handleUpdateQuote, handleResetQuote } = useContext(AppContext)

  const noQuote = quote?.lineItems.length === 0 || quote === null
  const quoteExists = quoteList.some((q: QuoteType) => q.id === quote.id)

  return (
    <section id="browser" className="quote">
      <span className="browser-header">
        <h2>Quote Builder</h2>
        <span className='quote-buttons'>
          <button onClick={handleResetQuote}>
            <img className="download" src={NewSvg} alt="files button" loading="eager" />
          </button>
          {quoteList.length > 0 && (
            <button onClick={() => setSliderIsOpen(!sliderIsOpen)}>
              <img className="download" src={FileSvg} alt="files button" loading="eager" />
            </button>
          )}
        </span>
      </span>
      <Slider className={sliderIsOpen ? 'is-open' : ''} sliderIsOpen={sliderIsOpen} setSliderIsOpen={setSliderIsOpen} />
      {noQuote && <div className='existing-quotes'>
        <h3>Select a product to start a quote.</h3>
      </div>}
      {quote?.lineItems.length > 0 && (
        <>
          <input className='quote-name' type='text' placeholder='Give your quote a name' onChange={handleAddQuoteName} value={quote.name} />
          {quote?.lineItems?.map((item: LineItemDataInterface) => (
            <LineItem key={item.sku} item={item} />
          ))}
          <div id="total">
            <p> Subtotal: {convertToCurrency(quote.subtotal, 'CAD')}</p>
            <span>
              <input
                type="number"
                name="discounts"
                onChange={(e) => handleUpdateDiscounts(Number(e.target.value))}
                value={quote.discounts}
              />
              <label>Discounts</label>
            </span>
            <span>
              <input
                type="number"
                name="tax"
                onChange={(e) => handleUpdateTax(Number(e.target.value))}
                value={quote.tax}
              />
              <label>Tax</label>
            </span>

            <div className="spacer"></div>
            <p>Total: {quote.total > 0 ? convertToCurrency(quote.total, 'CAD') : 0}</p>
          </div>
          <button className='action-button' onClick={quoteExists ? handleUpdateQuote : handleSaveQuote}>
            {quoteExists ? 'Update' : 'Save'}
          </button>
        </>
      )}
    </section>
  )
}
