import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

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
  const { t } = useTranslation()

  return (
    <Container $invisible={homePage}>
      {username && <>{`${username}✨`}</>}
      <Link to='login'>
        {loggedIn ? (
          <button onClick={logout}>{t('login.logout-button')}</button>
        ) : (
          <button>{t('login.login-button')}</button>
        )}
      </Link>
    </Container>
  )
}
