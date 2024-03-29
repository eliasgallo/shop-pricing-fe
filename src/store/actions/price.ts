import { PriceItem } from '@types'

interface LoadingPriceAction {
  type: 'price/priceLoading'
}

interface FailurePriceAction {
  type: 'price/priceError'
  payload: string
}

interface FetchPriceSuccessAction {
  type: 'price/priceFetch'
  payload: PriceItem[]
}

interface UpdatePriceSuccessAction {
  type: 'price/priceUpdate'
  payload: { oldItem: PriceItem; newItem: PriceItem }
}

interface DeletePriceSuccessAction {
  type: 'price/priceDelete'
  payload: PriceItem
}

interface CreatePriceSuccessAction {
  type: 'price/priceCreate'
  payload: PriceItem
}

interface FilterPriceListAction {
  type: 'price/setFilterValue'
  payload: string
}

interface ClearAllPriceItemsSuccessAction {
  type: 'price/priceClearAll'
}

export type PriceAction =
  | LoadingPriceAction
  | FailurePriceAction
  | FetchPriceSuccessAction
  | UpdatePriceSuccessAction
  | DeletePriceSuccessAction
  | CreatePriceSuccessAction
  | FilterPriceListAction
  | ClearAllPriceItemsSuccessAction
