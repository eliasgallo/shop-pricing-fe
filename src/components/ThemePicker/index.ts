import { connect } from 'react-redux'
import { RootState, appSelectors, setThemeMode } from '@store'
import { SimplePicker } from '../SimplePicker'

const mapStateToProps = (state: RootState) => ({
  current: appSelectors.getThemeMode(state),
  allOptions: appSelectors.getAllThemes(state),
})

const mapDispatchToProps = { setCurrent: setThemeMode }

export const ThemePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplePicker)
