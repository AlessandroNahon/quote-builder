import { useEffect, useReducer, useState } from 'react'
import { LineItemDataInterface, ProductType, QuoteType } from '../types'
import quoteReducer from '../utils/quoteReducer'
import { uuidv4 } from '../utils'
import {
  currentLocalQuote,
  localQuotes,
  setLocalStorageItem
} from '../utils/localStorage'

export default function useQuote() {
  const [quote, dispatch] = useReducer(quoteReducer, currentLocalQuote)
  const [quoteList, setQuoteList] = useState<QuoteType[]>(localQuotes)

  useEffect(() => setLocalStorageItem(quote, quoteList), [quote, quoteList])

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

  function handleSetQuote(quote: QuoteType) {
    dispatch({
      type: 'setQuote',
      quote
    })
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

  function handleSaveQuote() {
    if (quote.name === '' || !quote.name) {
      alert("Don't forget to give your quote a name!")
      return
    } else {
      const id = uuidv4()
      const updatedQuote = { ...quote, id }
      const updatedQl = [...quoteList, updatedQuote]

      setQuoteList(updatedQl)
      handleSetQuote(updatedQuote)
    }
  }

  function handleSelectProduct(product: ProductType) {
    const item: LineItemDataInterface | undefined = quote?.lineItems?.find(
      (p: LineItemDataInterface) => p.id === product.id
    )
    const isProduct = quote?.lineItems?.some(
      (p: LineItemDataInterface) => p.id === product.id
    )
    if (isProduct) {
      const hasDataValues =
        item?.quantity || item?.totalPrice || item?.unitPrice
      if (hasDataValues) {
        const value = prompt(
          'Enter the product SKU to remove it from the quote',
          ''
        )
        if (value === product.sku) handleDeleteLineItem(product.id)
      }
      handleDeleteLineItem(product.id)

      const isEmptyQuote =
        quote?.lineItems.length === 1 &&
        (!quote.name || quote.name.length === 0)

      if (isEmptyQuote) handleResetQuote()
    } else {
      handleAddLineItem(product)
    }

    handleUpdateSubTotal()
    handleUpdateTotal()
  }

  function handleUpdateQuote() {
    if (quote.name === '' || !quote.name) {
      alert('Your quote needs a name!')
      return
    } else {
      const updatedQuoteList = quoteList.map((q: QuoteType) => {
        if (q.id === quote.id) return quote
        return q
      })
      handleSetQuote(quote)
      setQuoteList(updatedQuoteList)
    }
  }

  function handleDeleteQuote() {
    if (window.confirm(`Are you sure you want to delete ${quote.name}?`)) {
      setQuoteList(quoteList.filter((q: QuoteType) => q.id != quote.id))
      handleResetQuote()
    }
  }

  return {
    quote,
    quoteList,
    handleSelectProduct,
    handleUpdateItemQty,
    handleUpdateItemUnitPrice,
    handleUpdateItemTotal,
    handleUpdateDiscounts,
    handleUpdateTax,
    handleUpdateSubTotal,
    handleUpdateTotal,
    handleAddQuoteName,
    handleSaveQuote,
    handleUpdateQuote,
    handleSelectQuote,
    handleResetQuote,
    handleDeleteQuote,
    handleSetQuote,
    handleDeleteLineItem,
    handleAddLineItem
  }
}
