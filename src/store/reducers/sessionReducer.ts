import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

export type SessionState = {
  token: string
  expiry: string
  username: string
}
const initialState = {
  token: '',
  expiry: '',
  username: '',
}

const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    addSession: (_state, action: PayloadAction<SessionState>) => action.payload,
    updateSessionExpiry: (
      state: SessionState,
      action: PayloadAction<string>
    ) => {
      state.expiry = action.payload
      return state
    },
    removeSession: () => initialState,
  },
})

export const { addSession, updateSessionExpiry, removeSession } =
  sessionSlice.actions
export const sessionReducer = sessionSlice.reducer

export const selectors = {
  getToken: (state: RootState) => state.session.token,
  getExpiry: (state: RootState) => state.session.expiry,
  getUsername: (state: RootState) => state.session.username,
}
