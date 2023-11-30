import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAppSelector } from '../hooks/useTypeSelector'
import { ShopItemDetailsForm } from './ShopItemDetailsForm'
import { useActions } from '../hooks/useActions'
import { Spinner } from './Spinner'
import { LocationStateNewItem, ShopItem, ShopListType } from '../types'
import { findWithId } from '../utils/listUtils'

export const NewShopItem: ShopItem = {
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
export const ShopItemDetailsPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const location = useLocation()

  const { updateShopItem, deleteShopItem, createShopItem } = useActions()
  const {
    shopList,
    loading,
    error,
    storeSuggestions,
  }: {
    shopList: ShopListType
    loading: boolean
    error: string | null
    storeSuggestions: string[]
  } = useAppSelector((state) => state.shop)
  const { id }: { id: string | undefined } = useParams<'id'>()
  const getItem = (): ShopItem => {
    if (id === 'new') {
      const item = NewShopItem
      const state: LocationStateNewItem | null = location.state
      item.store = state?.data || NewShopItem.store
      return item
    } else if (id) {
      const items: ShopItem[] = Object.values(shopList).flat()
      return findWithId<ShopItem>(items, parseInt(id!)) || NewShopItem
    }
    return NewShopItem
  }

  const item = getItem()
  return (
    <>
      <ShopItemDetailsForm
        item={{ ...item }}
        onSave={(i) => {
          i.id ? updateShopItem(i) : createShopItem(i)
          navigateBack()
        }}
        onDelete={() => {
          if (item.id) deleteShopItem(item)
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
