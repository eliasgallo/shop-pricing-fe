import { PayloadAction, createSlice } from '@reduxjs/toolkit'

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
