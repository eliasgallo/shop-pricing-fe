import { connect } from 'react-redux'
import { RootState } from '../../store'
import {
  createPriceItem,
  deletePriceItem,
  updatePriceItem,
} from '../../store/action-creators'
import { PriceDetailsContainer } from './PriceItemDetailsContainer'
import { LocationStateNewItem, PriceItem, PriceListType } from '../../types'
import { useLocation, useParams } from 'react-router-dom'
import { findWithId } from '../../utils/listUtils'

type StateProps = {
  priceList: PriceListType
  loading: boolean
  error: string | null
}

type DispatchProps = {
  saveItem: (item: PriceItem) => void
  deleteItem: (item: PriceItem) => void
}

const mapStateToProps = (state: RootState): StateProps => ({
  priceList: state.price.priceList,
  loading: state.price.loading,
  error: state.price.error,
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
  const location = useLocation()
  const { id }: { id?: string } = useParams<'id'>()

  const getItem = (): PriceItem => {
    let item = NewPriceItem
    if (id === 'new') {
      const state: LocationStateNewItem | null = location.state
      item.category = state?.data || NewPriceItem.category
    } else if (id) {
      const items: PriceItem[] = Object.values(props.priceList).flat()
      const foundItemWithId = findWithId<PriceItem>(items, parseInt(id))
      if (foundItemWithId) item = foundItemWithId
    }
    return item
  }

  return (
    <PriceDetailsContainer
      {...props}
      priceItem={getItem()}
    />
  )
}

export const PriceItemDetails = connect(
  mapStateToProps,
  mapDispatchToProps
)(PriceDetailsWrapper)
