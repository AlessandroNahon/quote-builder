import { LineItemDataInterface, QuoteInterface } from '../types'

type QuoteActionType =
  | { type: 'addLineItem'; lineItem: LineItemDataInterface }
  | { type: 'removeLineItem'; id: number }
  | { type: 'updateItemQuantity'; quantity: number; id: number }
  | { type: 'updateItemUnitPrice'; unitPrice: number; id: number }
  | { type: 'updateItemTotal'; id: number }
  | { type: 'updateSubTotal' }
  | { type: 'updateDiscounts'; discounts: number }
  | { type: 'updateTax'; tax: number }
  | { type: 'updateTotal' }

export default function quoteReducer(quote: QuoteInterface, action: QuoteActionType) {
  switch (action.type) {
    case 'addLineItem': {
      if (
        quote?.lineItems?.length > 0 &&
        quote?.lineItems?.some((p: LineItemDataInterface) => p.id === action.lineItem.id)
      )
        return quote

      const lineItems = quote?.lineItems ?? []
      const updatedLineItems: LineItemDataInterface[] = [...lineItems, action.lineItem]
      return { ...quote, lineItems: updatedLineItems }
    }
    case 'removeLineItem': {
      return {
        ...quote,
        lineItems: quote?.lineItems.filter((p: LineItemDataInterface) => p.id !== action.id)
      }
    }
    case 'updateItemQuantity': {
      const updatedLineItems = quote?.lineItems.map((li: LineItemDataInterface) => {
        if (li.id === action.id) {
          return { ...li, quantity: Number(action.quantity) }
        } else {
          return li
        }
      })

      return { ...quote, lineItems: updatedLineItems }
    }
    case 'updateItemUnitPrice': {
      const updatedLineItems = quote?.lineItems.map((li: LineItemDataInterface) => {
        if (li.id === action.id) {
          return { ...li, unitPrice: Number(action.unitPrice) }
        } else {
          return li
        }
      })

      return { ...quote, lineItems: updatedLineItems }
    }
    case 'updateItemTotal': {
      const updatedLineItems = quote?.lineItems.map((li: LineItemDataInterface) => {
        if (li.id === action.id) {
          return {
            ...li,
            totalPrice: Number(li.unitPrice) * Number(li.quantity)
          }
        } else {
          return li
        }
      })

      return { ...quote, lineItems: updatedLineItems }
    }
    case 'updateSubTotal': {
      const subtotal = quote?.lineItems
        .map((li: LineItemDataInterface) => li.totalPrice)
        .reduce((partialSum: number, a: number) => partialSum + a, 0)

      return { ...quote, subtotal: Number(subtotal) }
    }
    case 'updateTotal': {
      const total = quote?.subtotal - quote?.discounts + quote?.tax
      return { ...quote, total: Number(total) }
    }
    case 'updateDiscounts': {
      return { ...quote, discounts: action.discounts }
    }
    case 'updateTax': {
      return { ...quote, tax: action.tax }
    }
    default: {
      throw Error('Unknown action')
    }
  }
}
