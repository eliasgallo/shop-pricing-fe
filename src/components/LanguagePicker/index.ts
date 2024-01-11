import { connect } from 'react-redux'
import { RootState, appSelectors, setLanguage } from '@store'
import { SimplePicker } from '../SimplePicker'

const mapStateToProps = (state: RootState) => ({
  current: appSelectors.getLanguage(state),
  allOptions: appSelectors.getAllLanguages(state),
})

const mapDispatchToProps = { setCurrent: setLanguage }

export const LanguagePicker = connect(
  mapStateToProps,
  mapDispatchToProps
)(SimplePicker)
