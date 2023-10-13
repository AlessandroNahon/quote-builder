import { Dispatch, SetStateAction, createContext } from 'react'
import { LineItemDataInterface, ProductType, QuoteType } from '../types'
import { uuidv4 } from '../utils'

export interface AppContextInterface {
  handleSelectProduct: (product: ProductType) => void
  quote: QuoteType
  handleUpdateItemQty: (
    lineItem: LineItemDataInterface,
    quantity: number
  ) => void
  handleUpdateItemUnitPrice: (
    lineItem: LineItemDataInterface,
    unitPrice: number
  ) => void
  handleUpdateItemTotal: (id: number) => void
  handleUpdateSubTotal: () => void
  handleUpdateTotal: () => void
  handleUpdateDiscounts: (discounts: number) => void
  handleUpdateTax: (tax: number) => void
  setSearchValue: Dispatch<SetStateAction<string>>
  searchValue: string
  handleSaveQuote: () => void
  handleAddQuoteName: (e: React.ChangeEvent<HTMLInputElement>) => void
  quoteList: QuoteType[] | []
  handleSelectQuote: (
    e: React.MouseEvent<HTMLDivElement>,
    quote: QuoteType
  ) => void
  handleUpdateQuote: () => void
  handleResetQuote: () => void
  handleDeleteQuote: () => void
}

const defaultState: AppContextInterface = {
  quote: {
    id: uuidv4(),
    name: '',
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
  searchValue: '',
  handleSaveQuote: () => null,
  handleAddQuoteName: () => null,
  quoteList: [],
  handleSelectQuote: () => null,
  handleUpdateQuote: () => null,
  handleResetQuote: () => null,
  handleDeleteQuote: () => null
}

const AppContext = createContext(defaultState)

export default AppContext
