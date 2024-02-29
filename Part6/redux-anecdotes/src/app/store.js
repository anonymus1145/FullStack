import { configureStore } from '@reduxjs/toolkit'

import anecdoteReducer from '../features/andecdoteSlice'
import notificationReducer from '../features/notificationReducer'

const store = configureStore({
  reducer: {
   anecdotes: anecdoteReducer,
   notification: notificationReducer,
  },
})


export default store;
