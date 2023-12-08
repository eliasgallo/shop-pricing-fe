import { clearUser, retrieveUser, storeUser } from '@utils/localStorage'
import { dateMinutesOffset } from '@utils/dateUtils'
import { SessionActionType } from '../action-types/sessionActionType'
import { SessionAction } from '../actions/session'

export type SessionState = {
  token?: string
  expiry?: string
  username?: string
}

export const sessionReducer = (
  state: SessionState = {},
  action: SessionAction
): SessionState => {
  switch (action.type) {
    case SessionActionType.ADD_SESSION: {
      const { token, expiry, username } = action.payload
      if (token && username && expiry) {
        storeUser({ token, username, expiry })
      }
      return { ...state, ...action.payload }
    }
    case SessionActionType.UPDATE_SESSION_EXPIRY: {
      const { token, username } = state ? { ...state } : { ...retrieveUser() }
      if (token && username) {
        const newExpiry = dateMinutesOffset(new Date(), 30)
        storeUser({ token, username, expiry: newExpiry })
        return { ...state, ...{ token, username, expiry: newExpiry } }
      }
      return state
    }
    case SessionActionType.REMOVE_SESSION: {
      clearUser()
      return {}
    }
    default:
      return state
  }
}
