import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'

const LinkText = styled.span`
  color: ${(props) => props.theme.altButtonColor};
  text-decoration: underline;
`

export const BreadcrumbsTrails = (): JSX.Element => {
  const location = useLocation()
  const crumbs =
    location.pathname === '/'
      ? [location.pathname]
      : location.pathname.split('/')
  const { t } = useTranslation()
  return (
    <div>
      {crumbs.map((path, index) => {
        const linkTo = `.${crumbs.slice(0, index + 1).join('/')}`
        const pathName = `${index > 0 ? path : t('breadcrumbs.home')}`
        return (
          <Fragment key={index}>
            {crumbs.length - 1 === index ? (
              <>{pathName}</>
            ) : (
              <>
                <Link to={linkTo}>
                  <LinkText>{pathName}</LinkText>
                </Link>
                {' / '}
              </>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
