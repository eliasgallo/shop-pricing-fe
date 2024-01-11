import 'styled-components'

type ThemeStyles = {
  background: string
  color: string
  fontFamily: string
  buttonMixin: string
  altButtonColor: string
}

export const themes: { [key: string]: ThemeStyles } = {
  light: {
    background: '#fff',
    color: 'ddd',
    fontFamily: 'Roboto',
    buttonMixin: 'background-color: #24a0ed; color: #fff',
    altButtonColor: '#24a0ed',
  },
  dark: {
    background: '#222',
    color: '#fff',
    fontFamily: 'Roboto',
    buttonMixin: 'background-color: #24a0ed; color: #fff',
    altButtonColor: '#24a0ed',
  },
}

export const themeStyles = (mode: string | number) => themes[mode]
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeStyles {}
}
