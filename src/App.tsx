import AppContext from './context/appContext'

import { QuoteBuilder } from './views';

import './App.css';
import useCart from './hooks/useCart';
import useQuote from './hooks/useQuote';

function App() {
  const { cart, handleSelectProduct } = useCart()

  const { quote, handleUpdateItemQty, handleUpdateItemUnitPrice, onLoad, handleUpdateItemTotal } = useQuote(cart)

  const state = {
    handleSelectProduct,
    cart,
    quote,
    handleUpdateItemQty,
    handleUpdateItemUnitPrice,
    onLoad,
    handleUpdateItemTotal
  }

  return (
    <AppContext.Provider value={state} >
      <div className="App">
        <QuoteBuilder />
      </div>
    </AppContext.Provider >
  );
}

export default App;
