import { useSelector } from 'react-redux'
import { RootState } from '@store'
import { findWithId } from '@utils/listUtils'
import { getItemIdFromParams } from '@customHooks/routerDomHooks'

type VerifyIdProps<T> = {
  children?: React.ReactNode
  listSelector: (state: RootState) => T[]
}

export const VerifyId = <T extends { id?: number }>({
  children,
  listSelector,
}: VerifyIdProps<T>): JSX.Element => {
  const itemId: 'new' | number = getItemIdFromParams()
  const showChildren =
    itemId === 'new' ||
    Boolean(findWithId(useSelector(listSelector), Number(itemId)))
  return <>{showChildren ? children : <div>Item not found!</div>}</>
}