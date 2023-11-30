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
import { LocationStateNewItem, PriceItem } from '../types'
import { PriceListType } from '../store/reducers/priceReducer'
import { PriceDetailsForm } from './PriceDetailsForm'

export const NewPriceItem: PriceItem = {
  name: '',
  comparison_price: 0,
  comparison_price_unit: 'krUnit',
  reliability: 'sure',
  category: 'unknown',
  tags: [],
}

export const PriceDetailsPage: React.FC = () => {
  const navigate: NavigateFunction = useNavigate()
  const navigateBack = (): void => navigate('..', { relative: 'path' })
  const location = useLocation()

  const { updatePriceItem, deletePriceItem, createPriceItem } = useActions()
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
  const getItem = (): PriceItem => {
    let item = NewPriceItem
    if (id === 'new') {
      const state: LocationStateNewItem | null = location.state
      item.category = state?.data || NewPriceItem.category
    } else if (id) {
      const items: PriceItem[] = Object.values(priceList).flat()
      const foundItemWithId = findWithId<PriceItem>(items, parseInt(id))
      if (foundItemWithId) item = foundItemWithId
    }
    return item
  }

  const item = getItem()
  return (
    <>
      <PriceDetailsForm
        item={{ ...item }}
        onSave={(i) => {
          i.id ? updatePriceItem(i) : createPriceItem(i)
          navigateBack()
        }}
        onDelete={() => {
          if (item.id) deletePriceItem(item)
          navigateBack()
        }}
        isNewItem={!item.id}
      />
      {error && `Error message: ${error}`}
      {loading && <Spinner />}
    </>
  )
}
