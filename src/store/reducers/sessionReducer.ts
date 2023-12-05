import { storeUser } from '@utils/localStorage'
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
    default:
      return state
  }
}
