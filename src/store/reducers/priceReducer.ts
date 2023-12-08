import { PriceItem, PriceListType } from '@types'
import {
  findWithId,
  keyList,
  replaceItemInKeyList,
  sliceItemId,
} from '@utils/listUtils'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'

export type PriceListState = {
  loading: boolean
  error: string | null
  priceList: PriceListType
}

const initialState: PriceListState = {
  loading: false,
  error: null,
  priceList: {},
}

const lowerCaseSort = (
  left: { name: string },
  right: { name: string }
): number => left.name.toLowerCase().localeCompare(right.name.toLowerCase())

const sortLists = (list: PriceListType): PriceListType => {
  const newList: PriceListType = {}
  for (const key in list) {
    newList[key] = list[key].sort(lowerCaseSort)
  }
  return newList
}

export const priceListReducer = (
  state: PriceListState = initialState,
  action: PriceAction
): PriceListState => {
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
      const newItem = action.payload.newItem
      const oldItemInList = findWithId<PriceItem>(
        Object.values(state.priceList).flat(),
        newItem.id!
      )

      const newList: PriceListType = replaceItemInKeyList(
        state.priceList,
        oldItemInList?.category,
        newItem,
        newItem.category,
        lowerCaseSort
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
        .sort(lowerCaseSort)
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
