import { Link } from 'react-router-dom'

type NotFoundPageProps = {
  loggedIn: boolean
}

export const NotFoundContainer = ({ loggedIn }: NotFoundPageProps) => {
  return (
    <>
      <div>Could not find page</div>
      {loggedIn ? (
        <Link to='/'>Go back to home page</Link>
      ) : (
        <Link to='/login'>Login here</Link>
      )}
    </>
  )
}
