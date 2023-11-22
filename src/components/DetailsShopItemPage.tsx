import { NavigateFunction, useNavigate, useParams } from 'react-router-dom'
import { NewShoppingItem, ShoppingItem } from '../store'
import { useAppSelector } from '../hooks/useTypeSelector'
import { DetailsShopItemForm } from './DetailsShopItemForm'
import { useActions } from '../hooks/useActions'
import { Spinner } from './Spinner'

// TODO: what happens if list is not fetched yet.
// Maybe fetch item if useParams has an id but there is no item in store
export const DetailsShopItemPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const { updateShoppingItem, deleteShoppingItem } = useActions()
  const {
    shoppingList,
    loading,
    error,
  }: { shoppingList: ShoppingItem[]; loading: boolean; error: string | null } =
    useAppSelector((state) => state.shopping)
  let { id }: { id: string | undefined } = useParams<'id'>()
  const getItem = (): ShoppingItem => {
    if (!id) return NewShoppingItem
    const findItem = (list: ShoppingItem[]): ShoppingItem | undefined =>
      list.find((e) => e.id === parseInt(id!))
    return findItem(shoppingList) || NewShoppingItem
  }

  return (
    <>
      <DetailsShopItemForm
        item={{ ...getItem() }}
        onSave={(i) => {
          updateShoppingItem(i)
          navigateBack()
        }}
        onCancel={navigateBack}
        onDelete={(i) => {
          deleteShoppingItem(i)
          navigateBack()
        }}
      />
      {error && `Error message: ${error}`}
      {loading && <Spinner />}
    </>
  )
}
