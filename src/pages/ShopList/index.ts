import { connect } from 'react-redux'
import { RootState, fetchShopList, updateShopItem } from '@store'
import { ShopItem } from '@types'
import { ShopListContainer } from './ShopListContainer'

type StateProps = {
  shopList: ShopItem[]
  sortedStores: string[]
  loading: boolean
  error: string | null
}

type DispatchProps = {
  fetchList: () => void
  updateItem: (item: ShopItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  shopList: state.shop.shopList,
  sortedStores: state.shop.sortedStores,
  loading: state.shop.loading,
  error: state.shop.error,
})

const mapDispatchToProps: DispatchProps = {
  fetchList: fetchShopList,
  updateItem: updateShopItem,
}

export const ShopList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopListContainer)
