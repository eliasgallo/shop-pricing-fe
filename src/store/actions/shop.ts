import { ShopItem } from '@types'

interface LoadingShopAction {
  type: 'shop/shopLoading'
}

interface FailureShopAction {
  type: 'shop/shopError'
  payload: string
}

interface SuccessShopAction {
  type: 'shop/shopFetch'
  payload: ShopItem[]
}

interface UpdateShopItemSuccessAction {
  type: 'shop/shopUpdate'
  payload: { oldItem: ShopItem; newItem: ShopItem }
}

interface DeleteShopItemSuccessAction {
  type: 'shop/shopDelete'
  payload: ShopItem
}

interface CreateShopItemSuccessAction {
  type: 'shop/shopCreate'
  payload: ShopItem
}

export type ShopListAction =
  | LoadingShopAction
  | FailureShopAction
  | SuccessShopAction
  | UpdateShopItemSuccessAction
  | DeleteShopItemSuccessAction
  | CreateShopItemSuccessAction
