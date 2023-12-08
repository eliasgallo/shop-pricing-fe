import { ShopItem, ShopListType } from '@types'
import { ShopActionType } from '../action-types'
import { ShopListAction } from '../actions'
import {
  findWithId,
  concatDistinct,
  keyList,
  sliceItemId,
  replaceItemInKeyList,
} from '@utils/listUtils'

// TODO: move to backend
const defaultStores = [
  'Willys',
  'Lidl',
  'Ica',
  'Ica kvantum',
  'Ica maxi',
  'Coop',
  'Coop stora',
  'Coop konsum',
  'Xtra',
  'Dollar store',
]

type ShopListState = {
  loading: boolean
  error: string | null
  shopList: ShopListType
  storeSuggestions: string[]
}

const initialState: ShopListState = {
  loading: false,
  error: null,
  shopList: {},
  storeSuggestions: defaultStores,
}

const sortList = (list: ShopListType): ShopListType => {
  const newSortedList: ShopListType = {}
  for (const key in list) newSortedList[key] = list[key].sort(shopItemOrder)
  return newSortedList
}

const shopItemOrder = (a: ShopItem, b: ShopItem): number => {
  if (a.checked === b.checked && a.created_at === b.created_at) return 0
  if (a.checked === b.checked)
    return (a.created_at || '') > (b.created_at || '') ? 1 : -1
  if (a.checked) return 1
  return -1 // b.checked === true
}

export const shopListReducer = (
  state: ShopListState = initialState,
  action: ShopListAction
): ShopListState => {
  switch (action.type) {
    case ShopActionType.LOADING:
      return { ...state, loading: true, error: null }
    case ShopActionType.LOADING_ERROR:
      return { ...state, loading: false, error: action.error }
    case ShopActionType.FETCH_SUCCESS:
      return {
        ...state,
        loading: false,
        shopList: sortList(keyList(action.payload, 'store')),
        storeSuggestions: concatDistinct(
          defaultStores,
          Object.keys(state.shopList)
        ),
      }
    case ShopActionType.UPDATE_SUCCESS: {
      const newItem = action.payload.newItem
      const oldItemInList = findWithId<ShopItem>(
        Object.values(state.shopList).flat(),
        newItem.id!
      )

      const newList: ShopListType = replaceItemInKeyList(
        state.shopList,
        oldItemInList?.store,
        newItem,
        newItem.store,
        shopItemOrder
      )
      return {
        ...state,
        loading: false,
        shopList: newList,
        storeSuggestions: concatDistinct(defaultStores, Object.keys(newList)),
      }
    }
    case ShopActionType.DELETE_SUCCESS: {
      const { store, id } = action.payload
      const newStoreList = sliceItemId(state.shopList[store], id!)
      const newState = { ...state.shopList, [store]: newStoreList }
      return { ...state, loading: false, shopList: newState }
    }
    case ShopActionType.CREATE_SUCCESS: {
      const newItem: ShopItem = action.payload
      const newStoreList: ShopItem[] = (state.shopList[newItem.store] || [])
        .concat(newItem)
        .sort(shopItemOrder)
      const newList: ShopListType = {
        ...state.shopList,
        [newItem.store]: newStoreList,
      }
      return {
        ...state,
        loading: false,
        shopList: newList,
        storeSuggestions: concatDistinct(defaultStores, Object.keys(newList)),
      }
    }
    default:
      return state
  }
}
