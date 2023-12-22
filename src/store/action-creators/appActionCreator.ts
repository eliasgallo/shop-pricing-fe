import { Dispatch } from '@reduxjs/toolkit'
import { AppAction } from '../actions/app'
import { themeMode } from '../reducers/appReducer'
import { storeTheme } from '@utils/themeLocalStorage'

export const setThemeMode = (mode: string) => {
  return (dispatch: Dispatch<AppAction>): void => {
    storeTheme(mode)
    dispatch(themeMode(mode))
  }
}
