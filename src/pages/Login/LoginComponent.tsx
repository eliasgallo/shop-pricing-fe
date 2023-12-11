import { Spinner } from '@shared/Spinner'
import { ChangeEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'

type LoginProps = {
  login: (username: string, pwd: string) => void
  resetLoginSuccessful: () => void
  loading: boolean
  error: string | null
  loginSuccessful: boolean
}

export const LoginComponent = ({
  login,
  resetLoginSuccessful,
  loading,
  error,
  loginSuccessful,
}: LoginProps): JSX.Element => {
  useEffect(() => {
    loginSuccessful && resetLoginSuccessful()
  }, [loginSuccessful])

  const [creds, setCreds] = useState({ username: 'elias', pwd: '' })
  return (
    <>
      {loginSuccessful ? (
        <Navigate to='/' />
      ) : (
        <>
          <input
            type='text'
            name='login'
            placeholder='username'
            value={creds.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCreds({ ...creds, username: e.target.value })
            }
          />
          <input
            hidden={true} // because BE currently ignores password
            type='password'
            name='password'
            placeholder='password'
            value={creds.pwd}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCreds({ ...creds, pwd: e.target.value })
            }
          />
          {error && `Error message: ${error}`}
          <button onClick={() => login(creds.username, creds.pwd)}>
            Login
          </button>
          {loading && <Spinner />}
        </>
      )}
    </>
  )
}
