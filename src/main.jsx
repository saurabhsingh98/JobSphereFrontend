import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

//redux store wrapping
import { Provider } from 'react-redux'
import store from './redux/store.js'

//pesistance
import { persistStore } from 'redux-persist'
import { PersistGate } from 'redux-persist/integration/react'

const persistor= persistStore(store);

createRoot(document.getElementById('root')).render(
  <StrictMode>

    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>

      </PersistGate>
    <App />
    </Provider>

  </StrictMode>,
)