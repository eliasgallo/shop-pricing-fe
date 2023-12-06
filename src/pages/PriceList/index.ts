import { connect } from 'react-redux'
import { RootState, fetchPriceList } from '@store'
import { PriceListType } from '@types'
import { PriceListContainer } from './PriceListContainer'

type StateProps = {
  priceList: PriceListType
  loading: boolean
  error: string | null
}

type DispatchProps = { fetchList: () => void }

const mapStateToProps = (state: RootState): StateProps => ({
  priceList: state.price.priceList,
  loading: state.price.loading,
  error: state.price.error,
})

const mapDispatchToProps: DispatchProps = {
  fetchList: fetchPriceList,
}

export const PriceList = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceListContainer)
