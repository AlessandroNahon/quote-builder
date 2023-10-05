import AppContext from './context/appContext'

import { QuoteBuilder } from './views';

import './App.css';
import useCart from './hooks/useCart';

function App() {
  const { cart, handleSelectProduct } = useCart()

  const state = {
    handleSelectProduct,
    cart
  }

  return (
    <AppContext.Provider value={state}>
      <div className="App">
        <QuoteBuilder />
      </div>
    </AppContext.Provider>
  );
}

export default App;
