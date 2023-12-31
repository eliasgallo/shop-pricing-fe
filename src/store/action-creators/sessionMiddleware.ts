import { Dispatch, Middleware, MiddlewareAPI } from '@reduxjs/toolkit'
import { clearUser, retrieveUser, storeUser } from '@utils/localStorage'
import { SessionState } from '../reducers/sessionReducer'
import { SessionAction } from '../actions'
import { priceResetState } from '../reducers/priceReducer'
import { shopResetState } from '../reducers/shopListReducer'
import { loginResetState } from '../reducers/loginReducer'

export const sessionMiddleware: Middleware =
  (api: MiddlewareAPI) => (next: Dispatch<SessionAction>) => (action) => {
    switch (action.type) {
      case 'session/addSession': {
        const { token, expiry, username } = action.payload
        if (token && username && expiry) {
          storeUser({ token, username, expiry })
        }
        break
      }
      case 'session/updateSessionExpiry': {
        const sessionState: SessionState = api.getState().session
        const { token, username } = Object.keys(sessionState).length
          ? { ...sessionState }
          : { ...retrieveUser() }
        if (token && username) {
          storeUser({ token, username, expiry: action.payload })
        }
        break
      }
      case 'session/removeSession': {
        clearUser()
        api.dispatch(priceResetState())
        api.dispatch(loginResetState())
        api.dispatch(shopResetState())
        break
      }
    }
    return next(action)
  }
