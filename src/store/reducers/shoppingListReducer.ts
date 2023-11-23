import { ShoppingListActionType } from '../action-types'
import { ShoppingListAction } from '../actions'
import {
  ShoppingItem,
  ShoppingListType,
  emptyStore,
} from '../common-models/ShoppingItem'

interface ShoppingListState {
  loading: boolean
  error: string | null
  shoppingList: ShoppingListType
}

const initialState = {
  loading: false,
  error: null,
  shoppingList: {},
}

const storeSeperator = (list: ShoppingItem[]): ShoppingListType => {
  const result: { [key: string]: ShoppingItem[] } = {}
  list.forEach((item: ShoppingItem): void => {
    const store = item.store || emptyStore
    const storeList = (result[store] || []).concat([item])
    result[store] = storeList
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
  list[newItem.store] = list[newItem.store]
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
      return { loading: true, error: null, shoppingList: state.shoppingList }
    case ShoppingListActionType.FETCH_SUCCESS:
      return {
        loading: false,
        error: null,
        shoppingList: sortList(storeSeperator(action.payload)),
      }
    case ShoppingListActionType.FETCH_ERROR:
      return {
        loading: false,
        error: action.payload,
        shoppingList: state.shoppingList,
      }
    case ShoppingListActionType.UPDATING:
      return { loading: true, error: null, shoppingList: state.shoppingList }
    case ShoppingListActionType.UPDATE_SUCCESS: {
      const findItem = (list: ShoppingItem[]): ShoppingItem | undefined =>
        list.find((e) => e.id === action.payload.newItem.id!)
      const oldItemStore = findItem(Object.values(state.shopList).flat())!.store
      const newList: ShoppingListType = replaceItem(
        { ...state.shoppingList },
        action.payload.newItem,
        oldItemStore
      )
      return { loading: false, error: null, shoppingList: newList }
    }
    case ShoppingListActionType.UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shoppingList: state.shoppingList,
      }
    case ShoppingListActionType.DELETING:
      return { loading: true, error: null, shoppingList: state.shoppingList }
    case ShoppingListActionType.DELETE_SUCCESS: {
      const { store, id } = action.payload
      // state.shoppingList[store] = sliceItemId(state.shoppingList[store], id!)
      // return { loading: false, error: null, shoppingList: state.shoppingList }
      const newStoreList = sliceItemId(state.shoppingList[store], id!)
      const newState = Object.assign(
        { ...state.shoppingList },
        { [store]: newStoreList }
      )
      return { loading: false, error: null, shoppingList: newState }
    }
    case ShoppingListActionType.DELETE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shoppingList: state.shoppingList,
      }
    case ShoppingListActionType.CREATING:
      return { loading: true, error: null, shoppingList: state.shoppingList }
    case ShoppingListActionType.CREATE_SUCCESS: {
      const newItem: ShoppingItem = action.payload
      const newStoreList: ShoppingItem[] = state.shoppingList[newItem.store]
        .concat(newItem)
        .sort(shopItemOrder)
      const newState: ShoppingListType = Object.assign(
        { ...state.shoppingList },
        { [newItem.store]: newStoreList }
      )
      return { loading: false, error: null, shoppingList: newState }
    }
    case ShoppingListActionType.CREATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shoppingList: state.shoppingList,
      }
    default:
      return state
  }
}
