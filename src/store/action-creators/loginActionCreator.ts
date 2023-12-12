import { LoginAction, SessionAction } from '../actions'
import axios from 'axios'
import { Dispatch } from '@reduxjs/toolkit'
import { addSession, removeSession } from '../reducers/sessionReducer'
import {
  loginLoading,
  loginError,
  loginSuccess,
  resetFlagLoginSuccessful,
} from '../reducers/loginReducer'

const BASE_URL = process.env.BE_BASE_URL

export const login = (username: string, pwd: string) => {
  return async (
    dispatch: Dispatch<LoginAction | SessionAction>
  ): Promise<void> => {
    dispatch(loginLoading())
    try {
      const response = await axios.post(
        `${BASE_URL}/session`,
        JSON.stringify({ login: username, password: pwd }),
        { headers: { 'Content-Type': 'application/json' } }
      )
      dispatch(
        addSession({
          token: response.data['token'],
          expiry: response.data['expiry_date'],
          username: response.data['username'],
        })
      )
      dispatch(loginSuccess())
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to login'
        if (error instanceof Error) msg = error.message
        dispatch(loginError(msg))
      }
    }
  }
}

export const logout = () => {
  return /* TODO: logout in BE (async & Promise<void>) */ (
    dispatch: Dispatch<SessionAction>
  ): void => {
    dispatch(removeSession())
  }
}

export const resetLoginSuccessful = () => {
  return (dispatch: Dispatch<LoginAction>): void => {
    dispatch(resetFlagLoginSuccessful())
  }
}
