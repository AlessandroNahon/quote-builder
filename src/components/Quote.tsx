import React, { type ReactElement, useContext, useState } from 'react'

import AppContext from '../context/appContext'
import { convertToCurrency } from '../utils'
import { LineItemDataInterface, QuoteType } from '../types'

import Slider from './Slider'
import LineItem from './LineItem'

import FileSvg from '../assets/files.svg'
import NewSvg from '../assets/new.svg'

export default function Quote(): ReactElement {
  const [sliderIsOpen, setSliderIsOpen] = useState<boolean>(false)

  const {
    quote,
    quoteList,
    isUpdated,
    handleAddQuoteName,
    handleUpdateDiscounts,
    handleUpdateTax,
    handleSaveQuote,
    handleUpdateQuote,
    handleResetQuote,
    handleDeleteQuote
  } = useContext(AppContext)

  const quoteExists = quoteList.some((q: QuoteType) => q.id === quote.id)
  const updatedTimestamp = new Date().toLocaleTimeString()
  return (
    <section id="browser" className="quote">
      <span className="browser-header">
        <h2>Quote Builder</h2>
        <span className="quote-buttons">
          <button onClick={handleResetQuote}>
            <img
              className="download"
              src={NewSvg}
              alt="files button"
              loading="eager"
            />
          </button>
          {quoteList.length > 0 && (
            <span className="file-button">
              <span className="count">{quoteList.length}</span>
              <button onClick={() => setSliderIsOpen(!sliderIsOpen)}>
                {
                  isUpdated ? <div className='loading'></div> : <img
                    className="download"
                    src={FileSvg}
                    alt="files button"
                    loading="eager"
                  />
                }
              </button>
            </span>
          )}
        </span>
      </span>
      <Slider
        className={sliderIsOpen ? 'is-open' : ''}
        sliderIsOpen={sliderIsOpen}
        setSliderIsOpen={setSliderIsOpen}
      />
      <>
        <input
          className="quote-name"
          type="text"
          placeholder="Give your quote a name"
          onChange={handleAddQuoteName}
          value={quote?.name}
        />
        {quote?.lineItems?.map((item: LineItemDataInterface) => (
          <LineItem key={item.sku} item={item} />
        ))}
        <div id="total">
          <p> Subtotal: {convertToCurrency(quote?.subtotal, 'CAD')}</p>
          <span>
            <input
              type="text"
              name="discounts"
              onChange={(e) => handleUpdateDiscounts(Number(e.target.value))}
              value={quote?.discounts}
            />
            <label>Discounts</label>
          </span>
          <span>
            <input
              type="text"
              name="tax"
              onChange={(e) => handleUpdateTax(Number(e.target.value))}
              value={quote?.tax}
            />
            <label>Tax</label>
          </span>

          <div className="spacer"></div>
          <p>
            Total:{' '}
            {quote?.total > 0 ? convertToCurrency(quote?.total, 'CAD') : 0}
          </p>
        </div>
        <button
          className="action-button"
          onClick={quoteExists ? handleUpdateQuote : handleSaveQuote}
        >
          {quoteExists ? 'Update' : 'Create'}
        </button>
        {quoteExists && (
          <button className="action-button delete" onClick={handleDeleteQuote}>
            Delete
          </button>
        )}
        <p className={isUpdated ? 'updated visible' : 'updated'}>{
          `Updated at ${updatedTimestamp}`
        }</p>
      </>
    </section>
  )
}
