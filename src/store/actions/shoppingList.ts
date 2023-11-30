import { ShopItem } from '../../types'
import { ShopActionType } from '../action-types'

interface LoadingShopAction {
  type: ShopActionType.LOADING
}

interface FailureShopAction {
  type: ShopActionType.LOADING_ERROR
  error: string
}

interface SuccessShopAction {
  type: ShopActionType.FETCH_SUCCESS
  payload: ShopItem[]
}

interface UpdateShopItemSuccessAction {
  type: ShopActionType.UPDATE_SUCCESS
  payload: { oldItem: ShopItem; newItem: ShopItem }
}

interface DeleteShopItemSuccessAction {
  type: ShopActionType.DELETE_SUCCESS
  payload: ShopItem
}

interface CreateShopItemSuccessAction {
  type: ShopActionType.CREATE_SUCCESS
  payload: ShopItem
}

export type ShoppingListAction =
  | LoadingShopAction
  | FailureShopAction
  | SuccessShopAction
  | UpdateShopItemSuccessAction
  | DeleteShopItemSuccessAction
  | CreateShopItemSuccessAction
