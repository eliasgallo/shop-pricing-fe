import { Dispatch } from 'redux'
import { LoginAction } from '../actions'
import axios from 'axios'
import { LoginActionType } from '../action-types'

const BASE_URL = process.env.BE_BASE_URL

export const login = (username: string, pwd: string) => {
  return async (dispatch: Dispatch<LoginAction>): Promise<void> => {
    dispatch({ type: LoginActionType.LOADING })
    try {
      const response = await axios.post(
        `${BASE_URL}/session`,
        JSON.stringify({ login: username, password: pwd }),
        { headers: { 'Content-Type': 'application/json' } }
      )

      dispatch({
        type: LoginActionType.LOGIN_SUCCESS,
        payload: {
          token: response.data['token'],
          expiry: response.data['expiry_date'],
          username: response.data['username'],
        },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to login'
        if (error instanceof Error) msg = error.message
        dispatch({ type: LoginActionType.LOGIN_ERROR, error: msg })
      }
    }
  }
}

export const resetLoginSuccessful = () => {
  return (dispatch: Dispatch<LoginAction>): void => {
    dispatch({ type: LoginActionType.RESET_LOGIN_SUCCESSFUL })
  }
}
