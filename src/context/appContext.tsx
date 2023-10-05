import { createContext } from 'react'
import { LineItemDataInterface, ProductType, QuoteInterface } from '../types'

interface AppContextInterface {
  handleSelectProduct: ((product: ProductType, cart: ProductType[]) => void) | null,
  cart: ProductType[] | []
  quote: QuoteInterface,
  handleUpdateItemQty: ((lineItem: LineItemDataInterface, quantity: number) => void) | null,
  handleUpdateItemUnitPrice: ((lineItem: LineItemDataInterface, unitPrice: number) => void) | null,
  onLoad: ((lineItems: LineItemDataInterface[]) => void) | null,
  handleUpdateItemTotal: ((id: number) => void) | null,
}

const defaultState: AppContextInterface = {
  handleSelectProduct: null,
  cart: [],
  quote: {
    lineItems: [],
    tax: 0,
    subtotal: 0,
    discounts: 0,
  },
  handleUpdateItemQty: null,
  handleUpdateItemUnitPrice: null,
  onLoad: null,
  handleUpdateItemTotal: null
}

const AppContext = createContext(defaultState)

export default AppContext
