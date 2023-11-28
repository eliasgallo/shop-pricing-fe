import { PriceControlItem } from '../../types'
import { findWithId, keyList } from '../../utils/listUtils'
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

const lowerCaseSort = (left: string, right: string): number =>
  left.toLowerCase().localeCompare(right.toLowerCase())

const sortLists = (list: PriceListType): PriceListType => {
  const newList: PriceListType = {}
  for (const key in list) {
    newList[key] = list[key].sort((left, right) =>
      lowerCaseSort(left.name, right.name)
    )
  }
  return newList
}

const replaceItem = (
  list: PriceListType,
  newItem: PriceControlItem,
  oldItemCategory: string | undefined
): PriceListType => {
  const listAfterRemoval = oldItemCategory
    ? {
        ...list,
        [oldItemCategory]: sliceItemId(list[oldItemCategory], newItem.id!),
      }
    : { ...list }

  const newPriceList = (listAfterRemoval[newItem.category] || [])
    .concat([newItem])
    .sort((left, right) => lowerCaseSort(left.name, right.name))

  return { ...listAfterRemoval, [newItem.category]: newPriceList }
}

const sliceItemId = <T extends { id?: number }>(
  list: T[],
  removeId: number
): T[] => list.filter((i) => i.id !== removeId)

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
    case PriceControlActionType.UPDATING:
      return { ...state, loading: true, error: null }
    case PriceControlActionType.UPDATE_SUCCESS: {
      const oldItemInList = findWithId<PriceControlItem>(
        Object.values(state.priceList).flat(),
        action.payload.newItem.id!
      )

      const newList: PriceListType = replaceItem(
        state.priceList,
        action.payload.newItem,
        oldItemInList?.category
      )
      return {
        ...state,
        loading: false,
        priceList: newList,
      }
    }
    case PriceControlActionType.UPDATE_ERROR:
      return { ...state, loading: false, error: action.payload }
    default:
      return state
  }
}
