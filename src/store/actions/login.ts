import { LoginActionType } from '../action-types'

interface LoadingLoginAction {
  type: LoginActionType.LOADING
}

interface FailureLoginAction {
  type: LoginActionType.LOGIN_ERROR
  error: string
}

interface SuccessLoginAction {
  type: LoginActionType.LOGIN_SUCCESS
  payload: { token: string; expiry: string; username: string }
}

interface ResetLoginSuccessful {
  type: LoginActionType.RESET_LOGIN_SUCCESSFUL
}

export type LoginAction =
  | LoadingLoginAction
  | FailureLoginAction
  | SuccessLoginAction
  | ResetLoginSuccessful
