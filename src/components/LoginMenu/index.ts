import { connect } from 'react-redux'
import { dateInFuture } from '@utils/dateUtils'
import { RootState, logout, sessionSelectors } from '@store'
import { LoginMenuComponent } from './LoginMenuComponent'

const mapStateToProps = (state: RootState) => ({
  username: sessionSelectors.getUsername(state),
  loggedIn: dateInFuture(sessionSelectors.getExpiry(state) || ''),
})

const mapDispatchToProps = { logout }

export const LoginMenu = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginMenuComponent)
