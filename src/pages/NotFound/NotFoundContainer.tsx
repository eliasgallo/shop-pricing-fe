import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'

type NotFoundPageProps = {
  loggedIn: boolean
}

export const NotFoundContainer = ({ loggedIn }: NotFoundPageProps) => {
  const { t } = useTranslation()
  return (
    <>
      <div>Could not find page</div>
      {loggedIn ? (
        <Link to='/'>{t('not-found.logged-in')}</Link>
      ) : (
        <Link to='/login'>{t('not-found.logged-out')}</Link>
      )}
    </>
  )
}
