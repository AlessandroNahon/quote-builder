import { Dispatch, SetStateAction, createContext } from 'react'
import { LineItemDataInterface, ProductType, QuoteType } from '../types'

export interface AppContextInterface {
  handleSelectProduct: (product: ProductType) => void
  quote: QuoteType
  handleUpdateItemQty: (lineItem: LineItemDataInterface, quantity: number) => void
  handleUpdateItemUnitPrice: (lineItem: LineItemDataInterface, unitPrice: number) => void
  handleUpdateItemTotal: (id: number) => void
  handleUpdateSubTotal: () => void
  handleUpdateTotal: () => void
  handleUpdateDiscounts: (discounts: number) => void
  handleUpdateTax: (tax: number) => void
  setSearchValue: Dispatch<SetStateAction<string>>
  searchValue: string
}

const defaultState: AppContextInterface = {
  quote: {
    lineItems: [],
    tax: 0,
    subtotal: 0,
    discounts: 0,
    total: 0
  },
  handleSelectProduct: () => null,
  handleUpdateItemQty: () => null,
  handleUpdateItemUnitPrice: () => null,
  handleUpdateItemTotal: () => null,
  handleUpdateSubTotal: () => null,
  handleUpdateTotal: () => null,
  handleUpdateDiscounts: () => null,
  handleUpdateTax: () => null,
  setSearchValue: () => null,
  searchValue: ''
}

const AppContext = createContext(defaultState)

export default AppContext
