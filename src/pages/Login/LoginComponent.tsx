import { PageTitle } from '@shared/PageTitle'
import { Spinner } from '@shared/Spinner'
import { ChangeEvent, useEffect, useState } from 'react'
import { Navigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { useTranslation } from 'react-i18next'

type LoginProps = {
  login: (username: string, pwd: string) => void
  resetLoginSuccessful: () => void
  loading: boolean
  error: string | null
  loginSuccessful: boolean
}

const Container = styled.form`
  display: grid;
  gap: 10px;
  margin-left: auto;
  margin-right: auto;
  width: fit-content;
`

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
  const { t } = useTranslation()

  return (
    <>
      {loginSuccessful ? (
        <Navigate to='/' />
      ) : (
        <Container>
          <PageTitle>{t('login.title')}</PageTitle>
          <input
            type='text'
            name='login'
            placeholder={t('login.username-input')}
            value={creds.username}
            onChange={(e: ChangeEvent<HTMLInputElement>) =>
              setCreds({ ...creds, username: e.target.value })
            }
          />
          {error && `Error message: ${error}`}
          <button
            onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
              e.preventDefault()
              login(creds.username, creds.pwd)
            }}
          >
            {t('login.login-button')}
          </button>
          {loading && <Spinner />}
        </Container>
      )}
    </>
  )
}
