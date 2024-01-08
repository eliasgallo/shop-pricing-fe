import { connect } from 'react-redux'
import { NotFoundContainer } from './NotFoundContainer'
import { sessionSelectors } from '../../store/reducers'
import { dateInFuture } from '@utils/dateUtils'
import { RootState } from '../../store/store'

const mapStateToProps = (state: RootState) => ({
  loggedIn: dateInFuture(sessionSelectors.getExpiry(state)),
})

export const NotFound = connect(mapStateToProps)(NotFoundContainer)
