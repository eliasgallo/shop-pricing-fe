import { connect } from 'react-redux'
import { RootState, fetchShopList, shopSelectors, updateShopItem } from '@store'
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
  shopList: shopSelectors.getShopList(state),
  loading: shopSelectors.getLoading(state),
  error: shopSelectors.getError(state),
  sortedStores: shopSelectors.getSortedStores(state),
})

const mapDispatchToProps: DispatchProps = {
  fetchList: fetchShopList,
  updateItem: updateShopItem,
}

export const ShopList = connect(
  mapStateToProps,
  mapDispatchToProps
)(ShopListContainer)
