import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers'
// import logger from 'redux-logger'

export const store = configureStore({
  reducer: reducers,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
})
// from https://redux-toolkit.js.org/api/getDefaultMiddleware
