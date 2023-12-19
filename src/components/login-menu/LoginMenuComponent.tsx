import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'

const Container = styled.div<{ $invisible: boolean }>`
  display: grid;
  justify-items: center;
  visibility: ${(props) => (props.$invisible ? 'hidden' : 'visible')};
`

type LoginMenuProps = {
  username?: string
  logout: () => void
  loggedIn: boolean
}

export const LoginMenuComponent = ({
  username,
  logout,
  loggedIn,
}: LoginMenuProps): JSX.Element => {
  const location = useLocation()
  const homePage = location.pathname !== '/'
  return (
    <Container $invisible={homePage}>
      {username && <>{`${username}✨`}</>}
      <Link to='login'>
        {loggedIn ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <button>Log in</button>
        )}
      </Link>
    </Container>
  )
}
