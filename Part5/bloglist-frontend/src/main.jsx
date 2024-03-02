import ReactDOM from 'react-dom/client'
import App from './App'
import React from 'react'
// We import the Provider component from the react-redux library to get access to the store
import { Provider } from 'react-redux'
// We import the store from the ReduxStore folder
import store from './ReduxStore/store'


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
