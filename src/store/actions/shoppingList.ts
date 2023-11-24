// TODO use namespace to group related actions?
import { ShoppingItem } from '../../types'
import { ShoppingListActionType } from '../action-types'

// Fetch shopping list
interface FetchShoppingListAction {
  type: ShoppingListActionType.FETCHING
}

interface FetchShoppingListSuccessAction {
  type: ShoppingListActionType.FETCH_SUCCESS
  payload: ShoppingItem[]
}

interface FetchShoppingListFailureAction {
  type: ShoppingListActionType.FETCH_ERROR
  payload: string
}

// Update shopping item
interface UpdateShoppingItemAction {
  type: ShoppingListActionType.UPDATING
}

interface UpdateShoppingItemSuccessAction {
  type: ShoppingListActionType.UPDATE_SUCCESS
  payload: { oldItem: ShoppingItem; newItem: ShoppingItem }
}

interface UpdateShoppingItemFailureAction {
  type: ShoppingListActionType.UPDATE_ERROR
  payload: string
}

// Delete shopping item
interface DeleteShoppingItemAction {
  type: ShoppingListActionType.DELETING
}

interface DeleteShoppingItemSuccessAction {
  type: ShoppingListActionType.DELETE_SUCCESS
  payload: ShoppingItem
}

interface DeleteShoppingItemFailureAction {
  type: ShoppingListActionType.DELETE_ERROR
  payload: string
}

// Create shopping item
interface CreateShoppingItemAction {
  type: ShoppingListActionType.CREATING
}

interface CreateShoppingItemSuccessAction {
  type: ShoppingListActionType.CREATE_SUCCESS
  payload: ShoppingItem
}

interface CreateShoppingItemFailureAction {
  type: ShoppingListActionType.CREATE_ERROR
  payload: string
}

export type ShoppingListAction =
  | FetchShoppingListAction
  | FetchShoppingListSuccessAction
  | FetchShoppingListFailureAction
  | UpdateShoppingItemAction
  | UpdateShoppingItemSuccessAction
  | UpdateShoppingItemFailureAction
  | DeleteShoppingItemAction
  | DeleteShoppingItemSuccessAction
  | DeleteShoppingItemFailureAction
  | CreateShoppingItemAction
  | CreateShoppingItemSuccessAction
  | CreateShoppingItemFailureAction
