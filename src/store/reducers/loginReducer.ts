import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
const loginSlice = createSlice({
  name: 'login', // A string name for this slice of state. Generated action type constants will use this as a prefix.
  initialState,
  reducers: {
    loginLoading: () => {
      return { loading: true, error: null, loginSuccessful: false }
    },
    loginError: (_state, action: PayloadAction<string>) => {
      return {
        loading: false,
        error: action.payload,
        loginSuccessful: false,
      }
    },
    loginSuccess: () => {
      return {
        loading: false,
        error: null,
        loginSuccessful: true,
      }
    },
    resetFlagLoginSuccessful: (state: LoginState) => {
      state.loginSuccessful = false
    },
    loginResetState: () => initialState,
  },
})

export const {
  loginLoading,
  loginError,
  loginSuccess,
  resetFlagLoginSuccessful,
  loginResetState,
} = loginSlice.actions
export const loginReducer = loginSlice.reducer
