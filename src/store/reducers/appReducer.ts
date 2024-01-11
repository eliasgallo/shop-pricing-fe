import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

const ALL_LANGUAGES = ['en', 'sv']
const ALL_THEMES = ['light', 'dark']

export type AppState = {
  themeMode: string
  language: string
  allThemes: typeof ALL_THEMES
  allLanguages: typeof ALL_LANGUAGES
}

export const initialState = {
  themeMode: ALL_THEMES[0],
  language: ALL_LANGUAGES[0],
  allThemes: ALL_THEMES,
  allLanguages: ALL_LANGUAGES,
}

const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    themeMode: (state: AppState, action: PayloadAction<string>) => {
      state.themeMode = action.payload
    },
    language: (state: AppState, action: PayloadAction<string>) => {
      state.language = action.payload
    },
    resetApp: () => initialState,
  },
})

export const { themeMode, language } = appSlice.actions
export const appReducer = appSlice.reducer

export const selectors = {
  getThemeMode: (state: RootState) => state.app.themeMode,
  getLanguage: (state: RootState) => state.app.language,
  getAllThemes: (state: RootState) => state.app.allThemes,
  getAllLanguages: (state: RootState) => state.app.allLanguages,
}
