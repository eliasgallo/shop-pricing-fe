import { styled } from 'styled-components'

type ThemePickerProps = {
  themeMode: string
  setThemeMode: (mode: string) => void
  allThemeModes: string[]
}

const ThemeSelect = styled.select`
  text-transform: capitalize;
`

export const ThemePickerComponent = ({
  themeMode,
  setThemeMode,
  allThemeModes,
}: ThemePickerProps): JSX.Element => {
  return (
    <ThemeSelect
      name='theme_select'
      value={themeMode}
      onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
        setThemeMode(e.target.value)
      }
    >
      {allThemeModes.map((mode: string) => (
        <option key={mode}>{mode}</option>
      ))}
    </ThemeSelect>
  )
}
