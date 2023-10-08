import AppContext from './context/appContext'

import { QuoteBuilder } from './views'

import './App.css'

import useQuote from './hooks/useQuote'
import { useState } from 'react'

function App() {
  const [searchValue, setSearchValue] = useState<string>('')
  const quoteData = useQuote()

  const store = {
    ...quoteData,
    setSearchValue,
    searchValue
  }

  return (
    <AppContext.Provider value={store}>
      <div className="App">
        <QuoteBuilder />
      </div>
    </AppContext.Provider>
  )
}

export default App
