import { PriceItem } from '@types'
import { distinct, sliceItemId } from '@utils/listUtils'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'

type PriceListState = {
  loading: boolean
  error: string | null
  priceList: PriceItem[]
  sortedCategories: string[]
}

const initialState: PriceListState = {
  loading: false,
  error: null,
  priceList: [],
  sortedCategories: [],
}

const lowerCaseNameSort = (
  left: { name: string },
  right: { name: string }
): number => left.name.toLowerCase().localeCompare(right.name.toLowerCase())

const lowerCaseSort = (left: string, right: string): number =>
  left.toLowerCase().localeCompare(right.toLowerCase())

const sortedCategoriesList = (list: PriceItem[]): string[] =>
  distinct(list.map((item) => item.category)).sort(lowerCaseSort)

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
        priceList: action.payload.sort(lowerCaseNameSort),
        sortedCategories: sortedCategoriesList(action.payload),
      }
    case PriceActionType.UPDATE_SUCCESS: {
      const newItem = action.payload.newItem
      const idToRemove: number = action.payload.oldItem.id || newItem.id!
      const newList: PriceItem[] = sliceItemId(state.priceList, idToRemove)
        .concat(newItem)
        .sort(lowerCaseNameSort)
      return {
        ...state,
        loading: false,
        priceList: newList,
        sortedCategories: sortedCategoriesList(newList),
      }
    }
    case PriceActionType.DELETE_SUCCESS: {
      const newList = sliceItemId(state.priceList, action.payload.id!)
      return {
        ...state,
        loading: false,
        priceList: newList,
        sortedCategories: sortedCategoriesList(newList),
      }
    }
    case PriceActionType.CREATE_SUCCESS: {
      const newList: PriceItem[] = state.priceList
        .concat(action.payload)
        .sort(lowerCaseNameSort)
      return {
        ...state,
        loading: false,
        priceList: newList,
        sortedCategories: sortedCategoriesList(newList),
      }
    }
    default:
      return state
  }
}
