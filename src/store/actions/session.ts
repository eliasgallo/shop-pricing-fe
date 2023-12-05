import { SessionActionType } from '../action-types/sessionActionType'
import { SessionState } from '../reducers/sessionReducer'

interface AddSessionAction {
  type: SessionActionType.ADD_SESSION
  payload: SessionState
}

export type SessionAction = AddSessionAction
