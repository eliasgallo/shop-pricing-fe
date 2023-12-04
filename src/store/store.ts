import { configureStore } from '@reduxjs/toolkit'
import { reducers } from './reducers'
import { LoginState } from './reducers/loginReducer'
import { retrieveUser } from '@utils/localStorage'
// import logger from 'redux-logger'

const getSession = (): {
  username: string
  expiry: string
  token: string
} | null => {
  const user = retrieveUser()
  return user ? { ...user } : null
}

const init: LoginState = {
  session: getSession(),
  loading: false,
  error: null,
  loginSuccessful: false,
}

export const store = configureStore({
  reducer: reducers,
  preloadedState: { login: init },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(), //.concat(logger),
})
// from https://redux-toolkit.js.org/api/getDefaultMiddleware
