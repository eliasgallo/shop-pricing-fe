import {
  NavigateFunction,
  createSearchParams,
  useNavigate,
  useParams,
  useSearchParams,
} from 'react-router-dom'

export const useNavigation = (): {
  sectionNav: (section: string) => void
  editNav: (id?: number) => void
  newNav: () => void
  backNav: () => void
} => {
  const navigate: NavigateFunction = useNavigate()
  const sectionNav = (section: string) => {
    const searchParam = `?${createSearchParams({ section })}`
    navigate({ pathname: `./new`, search: searchParam }, { relative: 'path' })
  }
  const relativeTo = (to: string | number) =>
    navigate(`./${to}`, { relative: 'path' })
  const editNav = (id?: number) => relativeTo(id || 'new')
  const newNav = () => navigate(`./new`, { relative: 'path' })
  const backNav = () => navigate('..', { relative: 'path' })
  return { sectionNav, editNav, newNav, backNav }
}

export const getSectionSearchParam = (): string | undefined => {
  const [searchParams] = useSearchParams()
  return searchParams.get('section')?.toString()
}

export const getItemIdFromParams = (): 'new' | number => {
  const { itemId } = useParams<'itemId'>()
  return Number(itemId) || 'new'
}
