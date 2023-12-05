import { LoginActionType } from '../action-types'
import { LoginAction } from '../actions'

export type LoginState = {
  loading: boolean
  error: string | null
  loginSuccessful: boolean
}

const initialState: LoginState = {
  loading: false,
  error: null,
  loginSuccessful: false,
}

export const loginReducer = (
  state: LoginState = initialState,
  action: LoginAction
): LoginState => {
  switch (action.type) {
    case LoginActionType.LOADING:
      return {
        loading: true,
        error: null,
        loginSuccessful: false,
      }
    case LoginActionType.LOGIN_ERROR:
      return {
        loading: false,
        error: action.error,
        loginSuccessful: false,
      }
    case LoginActionType.LOGIN_SUCCESS: {
      return {
        loading: false,
        error: null,
        loginSuccessful: true,
      }
    }
    case LoginActionType.RESET_LOGIN_SUCCESSFUL:
      return { ...state, loginSuccessful: false }
    default:
      return state
  }
}
