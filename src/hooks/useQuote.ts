import { useReducer, useEffect, useState } from 'react'
import { LineItemDataInterface, ProductType, QuoteType } from '../types'
import quoteReducer from '../utils/quoteReducer'
import { uuidv4 } from '../utils'

const localStorage = window.localStorage.getItem('MY_APP_STATE')
const localQuotes = localStorage ? JSON.parse(localStorage)?.quotes : []
const currentLocalQuote = localStorage && JSON.parse(localStorage)?.currentQuote

const initialArg = currentLocalQuote

export default function useQuote() {
  const [quote, dispatch] = useReducer(quoteReducer, initialArg)

  const [quoteList, setQuoteList] = useState(localQuotes)

  useEffect(() => {
    window.localStorage.setItem(
      'MY_APP_STATE',
      JSON.stringify({
        currentQuote: quote,
        quotes: quoteList
      })
    )
  }, [quote])

  function handleAddQuoteName(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    dispatch({
      type: 'addQuoteName',
      name: e.target.value
    })
  }

  function handleAddLineItem(lineItem: ProductType) {
    dispatch({
      type: 'addLineItem',
      lineItem: {
        ...lineItem,
        quantity: 0,
        unitPrice: 0,
        totalPrice: 0
      }
    })
  }

  function handleDeleteLineItem(itemId: number) {
    dispatch({
      type: 'removeLineItem',
      id: itemId
    })
  }

  function handleUpdateItemQty(
    lineItem: LineItemDataInterface,
    quantity: number
  ) {
    dispatch({
      type: 'updateItemQuantity',
      quantity,
      id: lineItem.id
    })
  }

  function handleUpdateItemUnitPrice(
    lineItem: LineItemDataInterface,
    unitPrice: number
  ) {
    dispatch({
      type: 'updateItemUnitPrice',
      unitPrice,
      id: lineItem.id
    })
  }

  function handleUpdateItemTotal(id: number) {
    dispatch({
      type: 'updateItemTotal',
      id
    })

    handleUpdateSubTotal()
  }

  function handleUpdateSubTotal() {
    dispatch({
      type: 'updateSubTotal'
    })
    handleUpdateTotal()
  }

  function handleUpdateDiscounts(discounts: number) {
    dispatch({
      type: 'updateDiscounts',
      discounts
    })
    handleUpdateTotal()
  }

  function handleUpdateTax(tax: number) {
    dispatch({
      type: 'updateTax',
      tax
    })
    handleUpdateTotal()
  }

  function handleUpdateTotal() {
    dispatch({
      type: 'updateTotal'
    })
  }

  function handleResetQuote() {
    dispatch({
      type: 'resetQuote'
    })
  }

  function handleSelectProduct(product: ProductType) {
    const item: LineItemDataInterface | undefined = quote?.lineItems?.find(
      (p: LineItemDataInterface) => p.id === product.id
    )

    if (
      quote?.lineItems?.some((p: LineItemDataInterface) => p.id === product.id)
    ) {
      if (item?.quantity || item?.totalPrice || item?.unitPrice) {
        const value = prompt(
          'Enter the product SKU to remove it from the quote',
          ''
        )
        if (value === product.sku) handleDeleteLineItem(product.id)
      }
      handleDeleteLineItem(product.id)
      if (quote?.lineItems.length === 1) handleResetQuote()
    } else {
      handleAddLineItem(product)
    }

    handleUpdateSubTotal()
    handleUpdateTotal()
  }

  function handleSaveQuote() {
    if (quote.name === '' || !quote.name) {
      alert('Give your quote a name!')
      return
    } else {
      window.localStorage.setItem(
        'MY_APP_STATE',
        JSON.stringify({
          currentQuote: currentLocalQuote,
          quotes: (quoteList ?? []).push({ ...quote, id: uuidv4() })
        })
      )
      handleResetQuote()
    }
  }

  function handleUpdateQuote() {
    window.localStorage.setItem(
      'MY_APP_STATE',
      JSON.stringify({
        currentQuote: quote,
        quotes: quoteList.map((q: QuoteType) => {
          if (q.id === quote.id) return quote
          return q
        })
      })
    )

    setQuoteList(
      quoteList.map((q: QuoteType) => {
        if (q.id === quote.id) return quote
        return q
      })
    )
  }

  function handleSelectQuote(
    e: React.MouseEvent<HTMLDivElement>,
    q: QuoteType
  ) {
    e.preventDefault()
    dispatch({
      type: 'setQuote',
      quote: q
    })
  }

  return {
    quote,
    handleSelectProduct,
    handleUpdateItemQty,
    handleUpdateItemUnitPrice,
    handleUpdateItemTotal,
    handleUpdateDiscounts,
    handleUpdateTax,
    handleUpdateSubTotal,
    handleUpdateTotal,
    handleSaveQuote,
    handleAddQuoteName,
    quoteList,
    handleSelectQuote,
    handleUpdateQuote,
    handleResetQuote
  }
}
