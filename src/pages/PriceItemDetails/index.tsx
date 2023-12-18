import { connect } from 'react-redux'
import { RootState, priceSelectors } from '@store'
import { createPriceItem, deletePriceItem, updatePriceItem } from '@store'
import { PriceItem } from '@types'
import { useItemFromParams } from '@customHooks/useFetchItem'
import { PriceDetailsContainer } from './PriceItemDetailsContainer'

type StateProps = {
  priceList: PriceItem[]
  loading: boolean
  error: string | null
}

type DispatchProps = {
  saveItem: (item: PriceItem) => void
  deleteItem: (item: PriceItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  priceList: priceSelectors.getPriceList(state),
  loading: priceSelectors.getLoading(state),
  error: priceSelectors.getError(state),
})

const mapDispatchToProps: DispatchProps = {
  saveItem: (item: PriceItem) =>
    item.id ? updatePriceItem(item) : createPriceItem(item),
  deleteItem: (item: PriceItem) => (item.id ? deletePriceItem(item) : () => {}),
}

const NewPriceItem: PriceItem = {
  name: '',
  comparison_price: 0,
  comparison_price_unit: 'krUnit',
  reliability: 'sure',
  category: 'unknown',
  tags: [],
}

const PriceDetailsWrapper = (props: StateProps & DispatchProps) => {
  const item = useItemFromParams(props.priceList, NewPriceItem, 'category')

  return (
    <PriceDetailsContainer
      {...props}
      key={item ? item.id : -1}
      priceItem={item}
    />
  )
}

export const PriceItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceDetailsWrapper)
