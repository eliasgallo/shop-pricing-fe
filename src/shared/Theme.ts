import { ThemeMode } from '@types'
import { CSSProp, css } from 'styled-components'

type ThemeStyles = {
  background: CSSProp
  color: CSSProp
  fontFamily: CSSProp
  buttonMixin: CSSProp
  secondaryButtonMixin: CSSProp
}

const TextShadow = '2px 2px 0 rgba(0, 0, 0, 0.1)'

const ButtonMixin = css`
  background-color: #ff7e5f;
  color: #fff;
  box-shadow: 5px 5px 5px 1px rgba(0, 0, 0, 0.1);
  border: 2px solid #636363;
  border-radius: 5px;
  text-shadow: '${TextShadow}';
`

const SecondaryButtonMixin = css`
  color: #ff7e5f;
  text-shadow: '${TextShadow}';
`

export const themes: { [key in ThemeMode]: ThemeStyles } = {
  light: {
    background: 'linear-gradient(135deg, #f5f5dc, #f5deb3)',
    color: `color: #333; text-shadow: ${TextShadow};`,
    fontFamily: 'Roboto',
    buttonMixin: ButtonMixin,
    secondaryButtonMixin: SecondaryButtonMixin,
  },
  dark: {
    background: 'linear-gradient(135deg, #333, #222)',
    color: `color: #f5f5dc; text-shadow: ${TextShadow};`,
    fontFamily: 'Roboto',
    buttonMixin: ButtonMixin,
    secondaryButtonMixin: SecondaryButtonMixin,
  },
}

export const themeStyles = (mode: ThemeMode) => themes[mode]
declare module 'styled-components' {
  export interface DefaultTheme extends ThemeStyles {}
}
