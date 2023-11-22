// TODO use namespace to group related actions?
import { ShoppingListActionType } from '../action-types'
import { ShoppingItem } from '../common-models/ShoppingItem'

// Fetch shopping list
interface FetchShoppingListAction {
  type: ShoppingListActionType.FETCH
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
  type: ShoppingListActionType.UPDATE
}

interface UpdateShoppingItemSuccessAction {
  type: ShoppingListActionType.UPDATE_SUCCESS
  payload: ShoppingItem
}

interface UpdateShoppingItemFailureAction {
  type: ShoppingListActionType.UPDATE_ERROR
  payload: string
}

// Delete shopping item
interface DeleteShoppingItemAction {
  type: ShoppingListActionType.DELETE
}

interface DeleteShoppingItemSuccessAction {
  type: ShoppingListActionType.DELETE_SUCCESS
  payload: number
}

interface DeleteShoppingItemFailureAction {
  type: ShoppingListActionType.DELETE_ERROR
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
