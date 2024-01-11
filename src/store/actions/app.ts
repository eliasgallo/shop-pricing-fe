interface SetThemeModeAction {
  type: 'app/themeMode'
}
interface SetLanguageAction {
  type: 'app/language'
}
export type AppAction = SetThemeModeAction | SetLanguageAction
