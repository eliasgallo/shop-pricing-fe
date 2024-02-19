import { NavLink, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const Container = styled.div`
  display: flex;
  justify-content: center;
  gap: 10%;
  padding: 10px 0;
`

const PathContainer = styled(NavLink)`
  text-decoration: none;
  ${(props) => props.theme.secondaryButtonMixin};
  &.active {
    font-weight: bold;
  }
`

const paths: {
  title: 'home.title' | 'home.shop' | 'home.price'
  link: string
}[] = [
  { title: 'home.title', link: '/' },
  { title: 'home.price', link: '/price-control' },
  { title: 'home.shop', link: '/shop-list' },
]

export const TopNavigation = (): JSX.Element | null => {
  const { t } = useTranslation()
  const location = useLocation()
  const inLoginPage = location.pathname == '/login'
  if (inLoginPage) return null

  return (
    <Container>
      {paths.map((path) => {
        return (
          <PathContainer
            key={path.link}
            to={path.link}
          >
            <p>{t(path.title)}</p>
          </PathContainer>
        )
      })}
    </Container>
  )
}
