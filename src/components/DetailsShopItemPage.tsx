import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAppSelector } from '../hooks/useTypeSelector'
import { DetailsShopItemForm } from './DetailsShopItemForm'
import { useActions } from '../hooks/useActions'
import { Spinner } from './Spinner'
import { ShoppingItem, ShoppingListType } from '../types'

export const NewShoppingItem: ShoppingItem = {
  checked: false,
  name: '',
  offer: true,
  price: 0,
  price_unit: 'krUnit',
  quantity_type: 'kg',
  quantity_value: 0,
  store: 'Any store',
}

// TODO: what happens if list is not fetched yet.
// Maybe fetch item if useParams has an id but there is no item in store
export const DetailsShopItemPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const location = useLocation()

  const { updateShoppingItem, deleteShoppingItem, createShoppingItem } =
    useActions()
  const {
    shopList,
    loading,
    error,
    storeSuggestions,
  }: {
    shopList: ShoppingListType
    loading: boolean
    error: string | null
    storeSuggestions: string[]
  } = useAppSelector((state) => state.shopping)
  let { id }: { id: string | undefined } = useParams<'id'>()
  const getItem = (): ShoppingItem => {
    if (id === 'new') {
      const store = location.state?.store || ''
      const item = NewShoppingItem
      item.store = store
      return item
    }
    // TODO: Move to an util file, also exists in reducer
    const findItem = (list: ShoppingItem[]): ShoppingItem | undefined =>
      list.find((e) => e.id === parseInt(id!))
    return findItem(Object.values(shopList).flat()) || NewShoppingItem
  }

  const item = getItem()
  return (
    <>
      <DetailsShopItemForm
        item={{ ...item }}
        onSave={(i) => {
          i.id ? updateShoppingItem(i) : createShoppingItem(i)
          navigateBack()
        }}
        onCancel={navigateBack}
        onDelete={(i) => {
          deleteShoppingItem(i)
          navigateBack()
        }}
        isNewItem={!item.id}
        storeSuggestions={storeSuggestions}
      />
      {error && `Error message: ${error}`}
      {loading && <Spinner />}
    </>
  )
}
