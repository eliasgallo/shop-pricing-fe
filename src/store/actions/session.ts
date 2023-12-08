import { SessionActionType } from '../action-types/sessionActionType'
import { SessionState } from '../reducers/sessionReducer'

interface AddSessionAction {
  type: SessionActionType.ADD_SESSION
  payload: SessionState
}

interface UpdateSessionExpiryAction {
  type: SessionActionType.UPDATE_SESSION_EXPIRY
  payload: string
}

interface RemoveSessionAction {
  type: SessionActionType.REMOVE_SESSION
}

export type SessionAction =
  | AddSessionAction
  | UpdateSessionExpiryAction
  | RemoveSessionAction