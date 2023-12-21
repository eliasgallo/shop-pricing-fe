import { connect } from 'react-redux'
import {
  RootState,
  clearAllPriceItems,
  fetchPriceList,
  priceSelectors,
} from '@store'
import { PriceItem } from '@types'
import { PriceListContainer } from './PriceListContainer'

type StateProps = {
  priceList: PriceItem[]
  sortedCategories: string[]
  loading: boolean
  error: string | null
}

type DispatchProps = { fetchList: () => void; clearList: () => void }

const mapStateToProps = (state: RootState): StateProps => ({
  priceList: priceSelectors.getPriceList(state),
  sortedCategories: priceSelectors.getSortedCateogries(state),
  loading: priceSelectors.getLoading(state),
  error: priceSelectors.getError(state),
})

const mapDispatchToProps: DispatchProps = {
  fetchList: fetchPriceList,
  clearList: clearAllPriceItems,
}

export const PriceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceListContainer)
