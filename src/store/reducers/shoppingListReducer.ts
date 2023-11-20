import { ShoppingListActionType } from '../action-types'
import { ShoppingListAction } from '../actions'
import { ShoppingItem } from '../common-models/ShoppingItem'

interface ShoppingListState {
  loading: boolean
  error: string | null
  shoppingList: ShoppingItem[]
}

const initialState = {
  loading: false,
  error: null,
  shoppingList: [],
}

export const shopListReducer = (
  state: ShoppingListState = initialState,
  action: ShoppingListAction
): ShoppingListState => {
  switch (action.type) {
    case ShoppingListActionType.FETCH:
      return { loading: true, error: null, shoppingList: [] }
    case ShoppingListActionType.FETCH_SUCCESS:
      return { loading: false, error: null, shoppingList: action.payload }
    case ShoppingListActionType.FETCH_ERROR:
      return { loading: false, error: action.payload, shoppingList: [] }
    case ShoppingListActionType.UPDATE:
      return { loading: true, error: null, shoppingList: state.shoppingList }
    case ShoppingListActionType.UPDATE_SUCCESS:
      const newShoppingList = state.shoppingList.map((item) =>
        item.id === action.payload.id ? action.payload : item
      )
      const sortedList = newShoppingList.sort(
        (a: ShoppingItem, b: ShoppingItem): number => {
          if (a.checked === b.checked && a.created_at === b.created_at) return 0
          if (a.checked === b.checked)
            return a.created_at > b.created_at ? 1 : -1
          if (a.checked) return 1
          return -1 //if (b.checked)
        }
      )
      return { loading: false, error: null, shoppingList: sortedList }
    case ShoppingListActionType.UPDATE_ERROR:
      return {
        loading: false,
        error: action.payload,
        shoppingList: state.shoppingList,
      }
    default:
      return state
  }
}
