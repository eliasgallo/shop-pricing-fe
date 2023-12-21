import { AppDispatch, RootState } from '@store'
import { findWithId } from '@utils/listUtils'
import { getItemIdFromParams } from '@customHooks/routerDomHooks'
import { useAppDispatch, useAppSelector } from '@customHooks/useTypeSelector'
import { useEffect } from 'react'
import { Spinner } from '@shared/Spinner'

type VerifyIdProps<T> = {
  children?: React.ReactNode
  selectors: {
    list: (state: RootState) => T[]
    loading: (state: RootState) => boolean
  }
  fetchListAC: () => (
    dispatch: AppDispatch,
    getState: () => RootState
  ) => Promise<void>
}

export const VerifyItem = <T extends { id?: number }>({
  children,
  selectors,
  fetchListAC,
}: VerifyIdProps<T>): JSX.Element => {
  const dispatch = useAppDispatch()
  const list = useAppSelector(selectors.list)
  const loading = useAppSelector(selectors.loading)
  const itemId: 'new' | number = getItemIdFromParams()
  const emptyList = list.length === 0
  useEffect(() => {
    if (typeof itemId === 'number' && emptyList) {
      dispatch(fetchListAC())
    }
  }, [])
  const showChildren =
    itemId === 'new' || Boolean(findWithId(list, Number(itemId)))
  return (
    <>
      {showChildren ? children : noItemFound(emptyList)}
      {loading && <Spinner />}
    </>
  )
}

const noItemFound = (emptyList: boolean) =>
  `${emptyList ? 'Empty list!' : 'Item not found!'}`
