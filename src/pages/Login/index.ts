import { connect } from 'react-redux'
import { LoginComponent } from './LoginComponent'
import { RootState, login, loginSelectors, resetLoginSuccessful } from '@store'

const mapStateToProps = (state: RootState) => ({
  loading: loginSelectors.getLoading(state),
  error: loginSelectors.getError(state),
  loginSuccessful: loginSelectors.getLoginSuccessful(state),
})

const mapDispatchToProps = { login, resetLoginSuccessful }

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)
