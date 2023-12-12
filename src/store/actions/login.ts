interface LoadingLoginAction {
  type: 'login/loginLoading'
}

interface FailureLoginAction {
  type: 'login/loginError'
  payload: string
}

interface SuccessLoginAction {
  type: 'login/loginSuccess'
}

interface ResetFlagLoginSuccessful {
  type: 'login/resetFlagLoginSuccessful'
}

export type LoginAction =
  | LoadingLoginAction
  | FailureLoginAction
  | SuccessLoginAction
  | ResetFlagLoginSuccessful
