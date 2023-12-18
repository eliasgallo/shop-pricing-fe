import { connect } from 'react-redux'
import {
  RootState,
  createShopItem,
  deleteShopItem,
  updateShopItem,
  shopSelectors,
} from '@store'
import { ShopItem } from '@types'
import { useItemFromParams } from '@customHooks/useFetchItem'
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
  const item = useItemFromParams(props.shopList, NewShopItem, 'store')

  return (
    <ShopItemDetailsContainer
      {...props}
      key={item ? item.id : -1}
      shopItem={item}
    />
  )
}

export const ShopItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopDetailsWrapper)
