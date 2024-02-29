import ReactDOM from 'react-dom/client'
import React from 'react'
import { Provider } from 'react-redux'
import App from './App'
import store from './app/store'

// We need to get the store from the store.js file and pass it to the provider component as a prop 
// so we can use the store in our components.

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
)
