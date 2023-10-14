export const localStorageName = 'QUOTE_STATE'
export const localStorageData = window.localStorage.getItem(localStorageName)
export const localQuotes = localStorageData
  ? JSON.parse(localStorageData)?.quotes
  : []
export const currentLocalQuote =
  localStorageData && JSON.parse(localStorageData)?.currentQuote
