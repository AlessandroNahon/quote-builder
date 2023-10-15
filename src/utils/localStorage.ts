import { QuoteType } from '../types'

export const localStorageName = 'QUOTE_STATE'
export const localStorageData = window.localStorage.getItem(localStorageName)
export const localQuotes = localStorageData
  ? JSON.parse(localStorageData)?.quotes
  : []
export const currentLocalQuote =
  localStorageData && JSON.parse(localStorageData)?.currentQuote

export function setLocalStorageItem(quote: QuoteType, quoteList: QuoteType[]) {
  window.localStorage.setItem(
    localStorageName,
    JSON.stringify({
      currentQuote: quote,
      quotes: quoteList
    })
  )
}
