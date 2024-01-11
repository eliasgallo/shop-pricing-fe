import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { SessionState } from './reducers/sessionReducer'
import { retrieveUser } from '@utils/localStorage'
import { sessionMiddleware } from './action-creators/sessionMiddleware'
import { retrieveTheme } from '@utils/themeLocalStorage'
import {
  AppState,
  initialState as appInitialState,
} from './reducers/appReducer'
import { retrieveLanguage } from '@utils/languageLocalStorage'
// import logger from 'redux-logger'

const getSession = (): SessionState | undefined => {
  const user = retrieveUser()
  return user && { ...user }
}

const getApp = (): AppState => {
  return {
    ...appInitialState,
    themeMode: retrieveTheme() || appInitialState.themeMode,
    language: retrieveLanguage() || appInitialState.language,
  }
}

export const store = configureStore({
  reducer: reducers,
  preloadedState: { session: getSession(), app: getApp() },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(sessionMiddleware), //.concat(logger),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
