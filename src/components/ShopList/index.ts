import { connect } from 'react-redux'
import { RootState } from '../../store'
import { ShopItem, ShopListType } from '../../types'
import { fetchShopList, updateShopItem } from '../../store/action-creators'
import { ShopListContainer } from './ShopListContainer'

type StateProps = {
  shopList: ShopListType
  loading: boolean
  error: string | null
}

type DispatchProps = {
  fetchList: () => void
  updateItem: (item: ShopItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  shopList: state.shop.shopList,
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
