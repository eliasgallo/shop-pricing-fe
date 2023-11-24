import { ShoppingItem, ShoppingListType } from '../../types'
import { concatDistinct } from '../../utils/uniqueArray'
import { ShoppingListActionType } from '../action-types'
import { ShoppingListAction } from '../actions'

const defaultStores = [
  'Willys',
  'Lidl',
  'Ica',
  'Ica Kvantum',
  'Ica Maxi',
  'Coop',
  'Coop Stora',
  'Coop Konsum',
  'Xtra',
  'Dollar Store',
]

interface ShoppingListState {
  loading: boolean
  error: string | null
  shopList: ShoppingListType
  storeSuggestions: string[]
}

const initialState = {
  loading: false,
  error: null,
  shopList: {},
  storeSuggestions: defaultStores,
}

const storeSeperator = (list: ShoppingItem[]): ShoppingListType => {
  const result: { [key: string]: ShoppingItem[] } = {}
  list.forEach((item: ShoppingItem): void => {
    const store: string = item.store
    result[store] = (result[store] || []).concat([item])
  })
  return result
}

const sortList = (list: ShoppingListType): ShoppingListType => {
  const newSortedList: ShoppingListType = {}
  for (const key in list) newSortedList[key] = list[key].sort(shopItemOrder)
  return newSortedList
}

const shopItemOrder = (a: ShoppingItem, b: ShoppingItem): number => {
  if (a.checked === b.checked && a.created_at === b.created_at) return 0
  if (a.checked === b.checked)
    return (a.created_at || '') > (b.created_at || '') ? 1 : -1
  if (a.checked) return 1
  return -1 // b.checked === true
}

const replaceItem = (
  list: ShoppingListType,
  newItem: ShoppingItem,
  oldItemStore: string
): ShoppingListType => {
  // remove item
  list[oldItemStore] = sliceItemId(list[oldItemStore], newItem.id!)
  // add item
  list[newItem.store] = (list[newItem.store] || [])
    .concat([newItem])
    .sort(shopItemOrder)
  return list
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
    case ShoppingListActionType.FETCHING:
      return Object.assign({ ...state }, { loading: true, error: null })
    case ShoppingListActionType.FETCH_SUCCESS:
      return Object.assign(
        { ...state },
        {
          loading: false,
          shopList: sortList(storeSeperator(action.payload)),
          storeSuggestions: concatDistinct<string, string>(
            defaultStores,
            Object.keys(state.shopList)
          ),
        }
      )
    case ShoppingListActionType.FETCH_ERROR:
      return Object.assign(
        { ...state },
        { loading: false, error: action.payload }
      )
    case ShoppingListActionType.UPDATING:
      return Object.assign({ ...state }, { loading: true, error: null })
    case ShoppingListActionType.UPDATE_SUCCESS: {
      const findItem = (list: ShoppingItem[]): ShoppingItem | undefined =>
        list.find((e) => e.id === action.payload.newItem.id!)
      const oldItemStore = findItem(Object.values(state.shopList).flat())!.store
      const newList: ShoppingListType = replaceItem(
        { ...state.shopList },
        action.payload.newItem,
        oldItemStore
      )
      return Object.assign(
        { ...state },
        {
          loading: false,
          shopList: newList,
          storeSuggestions: concatDistinct<string, string>(
            defaultStores,
            Object.keys(newList)
          ),
        }
      )
    }
    case ShoppingListActionType.UPDATE_ERROR:
      return Object.assign(
        { ...state },
        { loading: false, error: action.payload }
      )
    case ShoppingListActionType.DELETING:
      return Object.assign({ ...state }, { loading: true, error: null })
    case ShoppingListActionType.DELETE_SUCCESS: {
      const { store, id } = action.payload
      // state.shoppingList[store] = sliceItemId(state.shoppingList[store], id!)
      // return { loading: false, error: null, shoppingList: state.shoppingList }
      const newStoreList = sliceItemId(state.shopList[store], id!)
      const newState = Object.assign(
        { ...state.shopList },
        { [store]: newStoreList }
      )
      return Object.assign({ ...state }, { loading: false, shopList: newState })
    }
    case ShoppingListActionType.DELETE_ERROR:
      return Object.assign(
        { ...state },
        { loading: true, error: action.payload }
      )
    case ShoppingListActionType.CREATING:
      return Object.assign({ ...state }, { loading: true, error: null })
    case ShoppingListActionType.CREATE_SUCCESS: {
      const newItem: ShoppingItem = action.payload
      const newStoreList: ShoppingItem[] = (state.shopList[newItem.store] || [])
        .concat(newItem)
        .sort(shopItemOrder)
      const newList: ShoppingListType = Object.assign(
        { ...state.shopList },
        { [newItem.store]: newStoreList }
      )
      return Object.assign(
        { ...state },
        {
          loading: false,
          shopList: newList,
          storeSuggestions: concatDistinct(defaultStores, Object.keys(newList)),
        }
      )
    }
    case ShoppingListActionType.CREATE_ERROR:
      return Object.assign(
        { ...state },
        { loading: false, error: action.payload }
      )
    default:
      return state
  }
}
