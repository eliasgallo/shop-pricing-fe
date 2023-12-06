import { Link } from 'react-router-dom'

type LoginMenuComponentProps = {
  username?: string
  logout: () => void
  loggedIn: boolean
}

export const LoginMenuComponent: React.FC<LoginMenuComponentProps> = ({
  username,
  logout,
  loggedIn,
}): JSX.Element => {
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
