import { Middleware } from 'redux'
import { SessionActionType } from '../action-types/sessionActionType'
import { clearUser, retrieveUser, storeUser } from '@utils/localStorage'
import { SessionState } from '../reducers/sessionReducer'

export const sessionMiddleware: Middleware = (api) => (next) => (action) => {
  switch (action.type) {
    case SessionActionType.ADD_SESSION: {
      const { token, expiry, username } = action.payload
      if (token && username && expiry) {
        storeUser({ token, username, expiry })
      }
      break
    }
    case SessionActionType.UPDATE_SESSION_EXPIRY: {
      const sessionState: SessionState = api.getState().session
      const { token, username } = Object.keys(sessionState).length
        ? { ...sessionState }
        : { ...retrieveUser() }
      if (token && username) {
        storeUser({ token, username, expiry: action.payload })
      }
      break
    }
    case SessionActionType.REMOVE_SESSION: {
      clearUser()
      break
    }
  }
  return next(action)
}
