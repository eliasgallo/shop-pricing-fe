import { RootState } from '@store'
import { findWithId } from '@utils/listUtils'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

type VerifyIdProps<T> = {
  children?: React.ReactNode
  listSelector: (state: RootState) => T[]
}

export const VerifyId = <T extends { id?: number }>({
  children,
  listSelector,
}: VerifyIdProps<T>): JSX.Element => {
  const { itemId } = useParams()
  const list = useSelector(listSelector)
  const showChildren = itemId === 'new' || findWithId(list, Number(itemId))

  return <>{showChildren ? children : <div>Item not found!</div>}</>
}
