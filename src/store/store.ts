import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { SessionState } from './reducers/sessionReducer'
import { retrieveUser } from '@utils/localStorage'
import { sessionMiddleware } from './action-creators/sessionMiddleware'
// import logger from 'redux-logger'

const getSession = (): SessionState | undefined => {
  const user = retrieveUser()
  return user && { ...user }
}

export const store = configureStore({
  reducer: reducers,
  preloadedState: { session: getSession() },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionMiddleware), //.concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
