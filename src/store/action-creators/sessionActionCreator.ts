import { Dispatch } from 'redux'
import { SessionActionType } from '../action-types/sessionActionType'
import { SessionAction } from '../actions/session'
import { SessionState } from '../reducers/sessionReducer'

export const addSession = (
  dispatch: Dispatch<SessionAction>,
  session: SessionState
): void => {
  dispatch({ type: SessionActionType.ADD_SESSION, payload: session })
}
