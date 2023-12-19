import { Fragment } from 'react'
import { Link, useLocation } from 'react-router-dom'

export const BreadcrumbsTrails = (): JSX.Element => {
  const location = useLocation()
  const crumbs =
    location.pathname === '/'
      ? [location.pathname]
      : location.pathname.split('/')
  return (
    <div>
      {crumbs.map((path, index) => {
        const linkTo = `.${crumbs.slice(0, index + 1).join('/')}`
        const pathName = `${index > 0 ? path : '🏠'}`
        return (
          <Fragment key={index}>
            {crumbs.length - 1 === index ? (
              <>{pathName}</>
            ) : (
              <>
                <Link to={linkTo}>{pathName}</Link>
                {' / '}
              </>
            )}
          </Fragment>
        )
      })}
    </div>
  )
}
