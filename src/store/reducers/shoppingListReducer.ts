import { ShoppingItem, ShoppingListType } from '../../types'
import { ShoppingListActionType } from '../action-types'
import { ShoppingListAction } from '../actions'

interface ShoppingListState {
  loading: boolean
  error: string | null
  shopList: ShoppingListType
}

const initialState = {
  loading: false,
  error: null,
  shopList: {},
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
      return { loading: true, error: null, shopList: state.shopList }
    case ShoppingListActionType.FETCH_SUCCESS:
      return {
        loading: false,
        error: null,
        shopList: sortList(storeSeperator(action.payload)),
      }
    case ShoppingListActionType.FETCH_ERROR:
      return {
        loading: false,
        error: action.payload,
        shopList: state.shopList,
      }
    case ShoppingListActionType.UPDATING:
      return { loading: true, error: null, shopList: state.shopList }
    case ShoppingListActionType.UPDATE_SUCCESS: {
      const findItem = (list: ShoppingItem[]): ShoppingItem | undefined =>
        list.find((e) => e.id === action.payload.newItem.id!)
      const oldItemStore = findItem(Object.values(state.shopList).flat())!.store
      const newList: ShoppingListType = replaceItem(
        { ...state.shopList },
        action.payload.newItem,
        oldItemStore
      )
      return { loading: false, error: null, shopList: newList }
    }
    case ShoppingListActionType.UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shopList: state.shopList,
      }
    case ShoppingListActionType.DELETING:
      return { loading: true, error: null, shopList: state.shopList }
    case ShoppingListActionType.DELETE_SUCCESS: {
      const { store, id } = action.payload
      // state.shoppingList[store] = sliceItemId(state.shoppingList[store], id!)
      // return { loading: false, error: null, shoppingList: state.shoppingList }
      const newStoreList = sliceItemId(state.shopList[store], id!)
      const newState = Object.assign(
        { ...state.shopList },
        { [store]: newStoreList }
      )
      return { loading: false, error: null, shopList: newState }
    }
    case ShoppingListActionType.DELETE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shopList: state.shopList,
      }
    case ShoppingListActionType.CREATING:
      return { loading: true, error: null, shopList: state.shopList }
    case ShoppingListActionType.CREATE_SUCCESS: {
      const newItem: ShoppingItem = action.payload
      const newStoreList: ShoppingItem[] = (state.shopList[newItem.store] || [])
        .concat(newItem)
        .sort(shopItemOrder)
      const newState: ShoppingListType = Object.assign(
        { ...state.shopList },
        { [newItem.store]: newStoreList }
      )
      return { loading: false, error: null, shopList: newState }
    }
    case ShoppingListActionType.CREATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shopList: state.shopList,
      }
    default:
      return state
  }
}
