import { Dispatch } from '@reduxjs/toolkit'
import { changeLanguage } from 'i18next'
import { AppAction } from '../actions/app'
import { themeMode, language } from '../reducers/appReducer'
import { storeTheme } from '@utils/themeLocalStorage'
import { storeLanguage } from '@utils/languageLocalStorage'

export const setThemeMode = (mode: string) => {
  return (dispatch: Dispatch<AppAction>): void => {
    storeTheme(mode)
    dispatch(themeMode(mode))
  }
}

export const setLanguage = (newLanguage: string) => {
  return (dispatch: Dispatch<AppAction>): void => {
    storeLanguage(newLanguage)
    dispatch(language(newLanguage))
    changeLanguage(newLanguage)
  }
}
