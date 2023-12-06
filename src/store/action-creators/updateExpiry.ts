import { SessionActionType } from '../action-types/sessionActionType'

export const updateExpiry = (
  expiry: string
): { type: SessionActionType.UPDATE_SESSION_EXPIRY; payload: string } => ({
  payload: expiry,
  type: SessionActionType.UPDATE_SESSION_EXPIRY,
})
