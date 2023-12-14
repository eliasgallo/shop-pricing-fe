import { LocationStateNewItem } from '@types'
import { useEffect } from 'react'
import { NavigateFunction, useNavigate } from 'react-router-dom'

export const fetchListEffect = (
  currentList: unknown[],
  fetchList: () => void
) =>
  useEffect(() => {
    if (Object.keys(currentList).length === 0) fetchList()
  }, [])

export const navigation = () => {
  const navigate: NavigateFunction = useNavigate()
  const sectionNav = (data: string) => {
    const catState: LocationStateNewItem = { data }
    navigate(`./new`, { relative: 'path', state: catState })
  }
  const relativeTo = (to: string | number) =>
    navigate(`./${to}`, { relative: 'path' })
  const editNav = (id?: number) => relativeTo(id || 'new')
  const newNav = () => navigate(`./new`, { relative: 'path' })
  return { sectionNav, editNav, newNav }
}
