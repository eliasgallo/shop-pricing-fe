import { ShopItem, ShopListType } from '../../types'
import { ShopActionType } from '../action-types'
import { ShoppingListAction } from '../actions'
import { findWithId, concatDistinct, keyList } from '../../utils/listUtils'

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

interface ShoppingListState {
  loading: boolean
  error: string | null
  shopList: ShopListType
  storeSuggestions: string[]
}

const initialState: ShoppingListState = {
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

const replaceItem = (
  list: ShopListType,
  newItem: ShopItem,
  oldItemStore: string | undefined
): ShopListType => {
  const listAfterRemoval = oldItemStore
    ? { ...list, [oldItemStore]: sliceItemId(list[oldItemStore], newItem.id!) }
    : { ...list }

  const newStoreList = (listAfterRemoval[newItem.store] || [])
    .concat([newItem])
    .sort(shopItemOrder)
  return { ...listAfterRemoval, [newItem.store]: newStoreList }
}

const sliceItemId = <T extends { id?: number }>(
  list: T[],
  removeId: number
): T[] => list.filter((i) => i.id !== removeId)

export const shopListReducer = (
  state: ShoppingListState = initialState,
  action: ShoppingListAction
): ShoppingListState => {
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
        storeSuggestions: concatDistinct<string, string>(
          defaultStores,
          Object.keys(state.shopList)
        ),
      }
    case ShopActionType.UPDATE_SUCCESS: {
      const oldItemInList = findWithId<ShopItem>(
        Object.values(state.shopList).flat(),
        action.payload.newItem.id!
      )

      const newList: ShopListType = replaceItem(
        state.shopList,
        action.payload.newItem,
        oldItemInList?.store
      )
      return {
        ...state,
        loading: false,
        shopList: newList,
        storeSuggestions: concatDistinct<string, string>(
          defaultStores,
          Object.keys(newList)
        ),
      }
    }
    case ShopActionType.DELETE_SUCCESS: {
      const { store, id } = action.payload
      // state.shoppingList[store] = sliceItemId(state.shoppingList[store], id!)
      // return { loading: false, error: null, shoppingList: state.shoppingList }
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
