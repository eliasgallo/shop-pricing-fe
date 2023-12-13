import { RootState, sessionSelectors } from '@store'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'

type ProtectedProps = { children?: React.ReactNode }

export const Protected = ({ children }: ProtectedProps): JSX.Element => {
  const token = useSelector((state: RootState) =>
    sessionSelectors.getToken(state)
  )
  const expiry = useSelector((state: RootState) =>
    sessionSelectors.getExpiry(state)
  )
  const isLoggedIn = Boolean(token && expiry && new Date(expiry) > new Date())
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
