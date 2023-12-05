import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { SessionState } from './reducers/sessionReducer'
import { retrieveUser } from '@utils/localStorage'
// import logger from 'redux-logger'

const getSession = (): SessionState | undefined => {
  const user = retrieveUser()
  return user && { ...user }
}

export const store = configureStore({
  reducer: reducers,
  preloadedState: { session: getSession() },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
})
// from https://redux-toolkit.js.org/api/getDefaultMiddleware
