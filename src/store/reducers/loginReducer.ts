import { storeUser } from '@utils/localStorage'
import { LoginActionType } from '../action-types'
import { LoginAction } from '../actions'

export type LoginState = {
  session: {
    token: string
    expiry: string
    username: string
  } | null
  loading: boolean
  error: string | null
  loginSuccessful: boolean
}

const initialState: LoginState = {
  session: null,
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
        session: null,
        loading: true,
        error: null,
        loginSuccessful: false,
      }
    case LoginActionType.LOGIN_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      }
    case LoginActionType.LOGIN_SUCCESS: {
      const { token, expiry, username } = action.payload
      storeUser({ token, expiry, username })
      return {
        ...state,
        session: { token, expiry, username },
        loading: false,
        loginSuccessful: true,
      }
    }
    case LoginActionType.RESET_LOGIN_SUCCESSFUL:
      return { ...state, loginSuccessful: false }
    default:
      return state
  }
}
