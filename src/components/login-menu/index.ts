import { connect } from 'react-redux'
import { dateInFuture } from '@utils/dateUtils'
import { RootState, logout } from '@store'
import { LoginMenuComponent } from './LoginMenuComponent'

const mapStateToProps = (state: RootState) => ({
  username: state.session.username,
  loggedIn: dateInFuture(state.session.expiry || ''),
})

const mapDispatchToProps = { logout }

export const LoginMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginMenuComponent)
