import AppContext from './context/appContext'

import { QuoteBuilder } from './views';

import './App.css';

import useQuote from './hooks/useQuote';

function App() {
  const { quote, handleUpdateItemQty, handleUpdateItemUnitPrice, handleUpdateItemTotal, handleSelectProduct } = useQuote()

  const store = {
    quote,
    handleUpdateItemQty,
    handleUpdateItemUnitPrice,
    handleUpdateItemTotal,
    handleSelectProduct,
  }

  return (
    <AppContext.Provider value={store} >
      <div className="App">
        <QuoteBuilder />
      </div>
    </AppContext.Provider >
  );
}

export default App;
