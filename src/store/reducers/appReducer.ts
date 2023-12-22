import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'
import { ALL_THEMES } from '@shared/Theme'

export type AppState = { themeMode: string }
export const initialState = {
  themeMode: ALL_THEMES[0],
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    themeMode: (state: AppState, action: PayloadAction<string>) => {
      state.themeMode = action.payload
    },
    resetApp: () => initialState,
  },
})

export const { themeMode } = appSlice.actions
export const appReducer = appSlice.reducer

export const selectors = {
  getThemeMode: (state: RootState) => state.app.themeMode,
}
