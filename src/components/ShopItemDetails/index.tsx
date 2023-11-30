import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  createShopItem,
  deleteShopItem,
  updateShopItem,
} from '../../store/action-creators'
import { LocationStateNewItem, ShopItem, ShopListType } from '../../types'
import { useLocation, useParams } from 'react-router-dom'
import { findWithId } from '../../utils/listUtils'
import { ShopItemDetailsContainer } from './ShopItemDetailsContainer'

type StateProps = {
  shopList: ShopListType
  loading: boolean
  error: string | null
  storeSuggestions: string[]
}

type DispatchProps = {
  onSave: (item: ShopItem) => void
  onDelete: (item: ShopItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  shopList: state.shop.shopList,
  loading: state.shop.loading,
  error: state.shop.error,
  storeSuggestions: state.shop.storeSuggestions,
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
  const { id }: { id?: string } = useParams<'id'>()

  const getItem = (): ShopItem => {
    if (id === 'new') {
      const item = NewShopItem
      const state: LocationStateNewItem | null = location.state
      item.store = state?.data || NewShopItem.store
      return item
    } else if (id) {
      const items: ShopItem[] = Object.values(props.shopList).flat()
      return findWithId<ShopItem>(items, parseInt(id!)) || NewShopItem
    }
    return NewShopItem
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
