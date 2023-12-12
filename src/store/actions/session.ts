import { SessionState } from '../reducers/sessionReducer'

interface AddSessionAction {
  type: 'session/addSession'
  payload: SessionState
}

interface UpdateSessionExpiryAction {
  type: 'session/updateSessionExpiry'
  payload: string
}

interface RemoveSessionAction {
  type: 'session/removeSession'
}

export type SessionAction =
  | AddSessionAction
  | UpdateSessionExpiryAction
  | RemoveSessionAction
