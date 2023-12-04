import { connect } from 'react-redux'
import { LoginComponent } from './LoginComponent'
import { RootState, login, resetLoginSuccessful } from '@store'

const mapStateToProps = (state: RootState) => ({
  loading: state.login.loading,
  error: state.login.error,
  loginSuccessful: state.login.loginSuccessful,
})

const mapDispatchToProps = { login, resetLoginSuccessful }

export const Login = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent)
