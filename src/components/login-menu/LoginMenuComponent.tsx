import { Link } from 'react-router-dom'

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
  return (
    <>
      {username && <div>{`${username}✨`}</div>}
      <Link to='login'>
        {loggedIn ? (
          <button onClick={logout}>Log out</button>
        ) : (
          <button>Log in</button>
        )}
      </Link>
    </>
  )
}
