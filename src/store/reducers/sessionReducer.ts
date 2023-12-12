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
      return { ...state, ...action.payload }
    }
    case SessionActionType.UPDATE_SESSION_EXPIRY: {
      return { ...state, expiry: action.payload }
    }
    case SessionActionType.REMOVE_SESSION: {
      return {}
    }
    default:
      return state
  }
}
