import { connect } from 'react-redux'
import {
  RootState,
  createShopItem,
  deleteShopItem,
  updateShopItem,
  shopSelectors,
} from '@store'
import { LocationStateNewItem, ShopItem } from '@types'
import { useLocation, useParams } from 'react-router-dom'
import { findWithId } from '@utils/listUtils'
import { ShopItemDetailsContainer } from './ShopItemDetailsContainer'

type StateProps = {
  shopList: ShopItem[]
  loading: boolean
  error: string | null
  storeSuggestions: string[]
}

type DispatchProps = {
  onSave: (item: ShopItem) => void
  onDelete: (item: ShopItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  shopList: shopSelectors.getShopList(state),
  loading: shopSelectors.getLoading(state),
  error: shopSelectors.getError(state),
  storeSuggestions: shopSelectors.getStoreSuggestions(state),
})

const mapDispatchToProps: DispatchProps = {
  onSave: (item: ShopItem) =>
    item.id ? updateShopItem(item) : createShopItem(item),
  onDelete: (item: ShopItem) => (item.id ? deleteShopItem(item) : () => {}),
}

const NewShopItem: ShopItem = {
  checked: false,
  name: '',
  offer: true,
  price: 0,
  price_unit: 'krUnit',
  quantity_type: 'kg',
  quantity_value: 0,
  store: 'Any store',
}

const ShopDetailsWrapper = (props: StateProps & DispatchProps) => {
  const location = useLocation()
  const { itemId }: { itemId?: string } = useParams<'itemId'>()
  const getItem = (): ShopItem => {
    if (itemId === 'new') {
      const item = NewShopItem
      const state: LocationStateNewItem | null = location.state
      item.store = state?.data || NewShopItem.store
      return item
    }
    return (
      (itemId && findWithId<ShopItem>(props.shopList, parseInt(itemId))) ||
      NewShopItem
    )
  }

  return (
    <ShopItemDetailsContainer
      {...props}
      shopItem={getItem()}
    />
  )
}

export const ShopItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopDetailsWrapper)
