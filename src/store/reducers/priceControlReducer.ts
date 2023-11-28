import { PriceControlItem } from '../../types'
import { keyList } from '../../utils/listUtils'
import { PriceControlActionType } from '../action-types'
import { PriceControlAction } from '../actions'

interface PriceControlListState {
  loading: boolean
  error: string | null
  priceList: PriceListType
}

const initialState: PriceControlListState = {
  loading: false,
  error: null,
  priceList: {},
}

export type PriceListType = { [key: string]: PriceControlItem[] }

const sortLists = (list: PriceListType): PriceListType => {
  const lowerCaseSort = (left: string, right: string): number =>
    left.toLowerCase().localeCompare(right.toLowerCase())
  const newList: PriceListType = {}
  for (const key in list) {
    newList[key] = list[key].sort((left, right) =>
      lowerCaseSort(left.name, right.name)
    )
  }
  return newList
}

export const priceListReducer = (
  state: PriceControlListState = initialState,
  action: PriceControlAction
): PriceControlListState => {
  switch (action.type) {
    case PriceControlActionType.FETCHING:
      return { ...state, loading: true, error: null }
    case PriceControlActionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        priceList: sortLists(keyList(action.payload, 'category')),
      }
    case PriceControlActionType.FETCH_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
