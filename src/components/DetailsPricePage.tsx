import {
  NavigateFunction,
  useLocation,
  useNavigate,
  useParams,
} from 'react-router-dom'
import { useAppSelector } from '../hooks/useTypeSelector'
import { useActions } from '../hooks/useActions'
import { Spinner } from './Spinner'
import { findWithId } from '../utils/listUtils'
import { LocationStateNewItem, PriceControlItem } from '../types'
import { PriceListType } from '../store/reducers/priceControlReducer'
import { DetailsPriceForm } from './DetailsPriceForm'

export const NewPriceControlItem: PriceControlItem = {
  name: '',
  comparison_price: 0,
  comparison_price_unit: 'krUnit',
  reliability: 'sure',
  category: 'unknown',
  tags: [],
}

export const DetailsPricePage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const location = useLocation()

  const {
    updatePriceControlItem,
    deletePriceControlItem,
    createPriceControlItem,
  } = useActions()
  const {
    priceList,
    loading,
    error,
  }: {
    priceList: PriceListType
    loading: boolean
    error: string | null
  } = useAppSelector((state) => state.priceList)
  const { id }: { id: string | undefined } = useParams<'id'>()
  const getItem = (): PriceControlItem => {
    let item = NewPriceControlItem
    if (id === 'new') {
      const state: LocationStateNewItem | null = location.state
      item.category = state?.data || NewPriceControlItem.category
    } else if (id) {
      const items: PriceControlItem[] = Object.values(priceList).flat()
      const foundItemWithId = findWithId<PriceControlItem>(items, parseInt(id))
      if (foundItemWithId) item = foundItemWithId
    }
    return item
  }

  const item = getItem()
  return (
    <>
      <DetailsPriceForm
        item={{ ...item }}
        onSave={(i) => {
          i.id ? updatePriceControlItem(i) : createPriceControlItem(i)
          navigateBack()
        }}
        onDelete={() => {
          if (item.id) deletePriceControlItem(item)
          navigateBack()
        }}
        isNewItem={!item.id}
      />
      {error && `Error message: ${error}`}
      {loading && <Spinner />}
    </>
  )
}
