import { createContext } from 'react'
import { ProductType } from '../types'

interface AppContextInterface {
  handleSelectProduct: ((product: ProductType, cart: ProductType[]) => void) | null,
  cart: ProductType[] | []
}

const defaultState: AppContextInterface = {
  handleSelectProduct: null,
  cart: []
}

const AppContext = createContext(defaultState)

export default AppContext
