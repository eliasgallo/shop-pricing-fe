import { connect } from 'react-redux'
import { ThemePickerComponent } from './ThemePickerComponent'
import { RootState, appSelectors, setThemeMode } from '@store'
import { ALL_THEMES } from '@shared/Theme'

const mapStateToProps = (state: RootState) => ({
  themeMode: appSelectors.getThemeMode(state) || ALL_THEMES[0],
  allThemeModes: ALL_THEMES,
})

const mapDispatchToProps = { setThemeMode }

export const ThemePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(ThemePickerComponent)
