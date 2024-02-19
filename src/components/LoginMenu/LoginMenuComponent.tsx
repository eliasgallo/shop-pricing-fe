import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Container = styled.div<{ $invisible: boolean }>`
  display: flex;
  justify-content: end;
  visibility: ${(props) => (props.$invisible ? 'hidden' : 'visible')};
  padding: 10px 0;
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
  const { t } = useTranslation()

  return (
    <Container $invisible={false}>
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
