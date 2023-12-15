import { connect } from 'react-redux'
import { RootState, priceSelectors } from '@store'
import { createPriceItem, deletePriceItem, updatePriceItem } from '@store'
import { PriceDetailsContainer } from './PriceItemDetailsContainer'
import { PriceItem } from '@types'
import { findWithId } from '@utils/listUtils'
import {
  getItemIdFromParams,
  getSectionSearchParam,
} from '@customHooks/routerDomHooks'

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
  const itemId: string | undefined = getItemIdFromParams()
  const getItem = (): PriceItem => {
    if (itemId === 'new') {
      const item: PriceItem = NewPriceItem
      const category: string | undefined = getSectionSearchParam()
      item.category = category || NewPriceItem.category
      return item
    }
    return (
      (itemId && findWithId<PriceItem>(props.priceList, parseInt(itemId))) ||
      NewPriceItem
    )
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
