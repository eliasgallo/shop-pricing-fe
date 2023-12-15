import { connect } from 'react-redux'
import {
  RootState,
  createShopItem,
  deleteShopItem,
  updateShopItem,
  shopSelectors,
} from '@store'
import { ShopItem } from '@types'
import { findWithId } from '@utils/listUtils'
import { ShopItemDetailsContainer } from './ShopItemDetailsContainer'
import {
  getItemIdFromParams,
  getSectionSearchParam,
} from '@customHooks/routerDomHooks'

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
  const itemId: string | undefined = getItemIdFromParams()
  const getItem = (): ShopItem => {
    if (itemId === 'new') {
      const item = NewShopItem
      const store: string | undefined = getSectionSearchParam()
      item.store = store || NewShopItem.store
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
