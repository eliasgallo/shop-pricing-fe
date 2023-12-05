import { RootState } from '@store'
import { connect } from 'react-redux'
import { Navigate } from 'react-router-dom'

type ProtectedProps = {
  isLoggedIn: boolean
  children?: React.ReactNode
}
const ProtectedComponent: React.FC<ProtectedProps> = ({
  isLoggedIn,
  children,
}) => {
  return (
    <>
      {isLoggedIn ? (
        children
      ) : (
        <Navigate
          to='/login'
          replace
        ></Navigate>
      )}
    </>
  )
}

const mapStateToProps = (state: RootState) => {
  const session = state.session
  return {
    isLoggedIn: Boolean(
      session &&
        session.token &&
        session.expiry &&
        new Date(session.expiry) > new Date()
    ),
  }
}

export const Protected = connect(mapStateToProps)(ProtectedComponent)
