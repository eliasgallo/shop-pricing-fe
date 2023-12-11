import { ShopItem } from '@types'
import { ShopActionType } from '../action-types'
import { ShopListAction } from '../actions'
import { sliceItemId, distinct } from '@utils/listUtils'

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

const emptyStore = 'Any store'

type ShopListState = {
  loading: boolean
  error: string | null
  shopList: ShopItem[]
  sortedStores: string[]
  storeSuggestions: string[]
}

const initialState: ShopListState = {
  loading: false,
  error: null,
  shopList: [],
  sortedStores: [],
  storeSuggestions: defaultStores,
}

const shopItemOrder = (a: ShopItem, b: ShopItem): number => {
  if (a.checked === b.checked && a.created_at === b.created_at) return 0
  if (a.checked === b.checked)
    return (a.created_at || '') > (b.created_at || '') ? 1 : -1
  if (a.checked) return 1
  return -1 // b.checked === true
}

const storesOrder = (left: string, right: string): number => {
  if (left === emptyStore) return 1
  if (right === emptyStore) return -1
  return left.toLowerCase().localeCompare(right.toLowerCase())
}

const refreshStores = (list: ShopItem[]) =>
  distinct(list.map((item) => item.store)).sort(storesOrder)
const updateStoreSuggestions = (stores: string[]) =>
  distinct(stores.concat(defaultStores)).sort(storesOrder)

export const shopListReducer = (
  state: ShopListState = initialState,
  action: ShopListAction
): ShopListState => {
  switch (action.type) {
    case ShopActionType.LOADING: {
      return { ...state, loading: true, error: null }
    }
    case ShopActionType.LOADING_ERROR: {
      return { ...state, loading: false, error: action.error }
    }
    case ShopActionType.FETCH_SUCCESS: {
      const stores = refreshStores(action.payload)
      return {
        ...state,
        loading: false,
        shopList: action.payload.sort(shopItemOrder),
        sortedStores: stores,
        storeSuggestions: updateStoreSuggestions(stores),
      }
    }
    case ShopActionType.UPDATE_SUCCESS: {
      const newItem = action.payload.newItem
      const idToRemove: number = action.payload.oldItem.id || newItem.id!
      const newList: ShopItem[] = sliceItemId(state.shopList, idToRemove)
        .concat(newItem)
        .sort(shopItemOrder)
      const stores = refreshStores(newList)
      return {
        ...state,
        loading: false,
        shopList: newList.sort(shopItemOrder),
        sortedStores: stores,
        storeSuggestions: updateStoreSuggestions(stores),
      }
    }
    case ShopActionType.DELETE_SUCCESS: {
      const newList = sliceItemId(state.shopList, action.payload.id!)
      return { ...state, loading: false, shopList: newList }
    }
    case ShopActionType.CREATE_SUCCESS: {
      const newList: ShopItem[] = state.shopList
        .concat(action.payload)
        .sort(shopItemOrder)
      const stores = refreshStores(newList)
      return {
        ...state,
        loading: false,
        shopList: newList.sort(shopItemOrder),
        sortedStores: stores,
        storeSuggestions: updateStoreSuggestions(stores),
      }
    }
    default:
      return state
  }
}
