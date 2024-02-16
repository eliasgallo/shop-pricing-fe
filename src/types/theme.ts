const LIGHT_THEME = 'light'
const DARK_THEME = 'dark'

export const ALL_THEMES: ThemeMode[] = [LIGHT_THEME, DARK_THEME]
export type ThemeMode = typeof LIGHT_THEME | typeof DARK_THEME

// export const isThemeMode = (theme: string): theme is ThemeMode =>
//   ALL_THEMES.includes(theme as ThemeMode)
