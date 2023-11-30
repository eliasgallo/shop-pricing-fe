import { PriceItem } from '../../types'
import { findWithId, keyList } from '../../utils/listUtils'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'

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

export type PriceListType = { [key: string]: PriceItem[] }

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
  newItem: PriceItem,
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
  action: PriceAction
): PriceControlListState => {
  switch (action.type) {
    case PriceActionType.LOADING:
      return { ...state, loading: true, error: null }
    case PriceActionType.LOADING_ERROR:
      return { ...state, loading: false, error: action.error }
    case PriceActionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        priceList: sortLists(keyList(action.payload, 'category')),
      }
    case PriceActionType.UPDATE_SUCCESS: {
      const oldItemInList = findWithId<PriceItem>(
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
    case PriceActionType.DELETE_SUCCESS: {
      const { category, id } = action.payload
      const newStoreList = sliceItemId(state.priceList[category], id!)
      const newState = { ...state.priceList, [category]: newStoreList }
      return { ...state, loading: false, priceList: newState }
    }
    case PriceActionType.CREATE_SUCCESS: {
      const newItem: PriceItem = action.payload
      const newList: PriceItem[] = (state.priceList[newItem.category] || [])
        .concat(newItem)
        .sort((left, right) => lowerCaseSort(left.name, right.name))
      const newState: PriceListType = {
        ...state.priceList,
        [newItem.category]: newList,
      }
      return {
        ...state,
        loading: false,
        priceList: newState,
      }
    }
    default:
      return state
  }
}
