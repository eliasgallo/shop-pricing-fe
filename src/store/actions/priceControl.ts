import { PriceItem } from '../../types'
import { PriceActionType } from '../action-types'

interface LoadingPriceAction {
  type: PriceActionType.LOADING
}

interface PriceFailureAction {
  type: PriceActionType.LOADING_ERROR
  error: string
}

interface FetchPriceSuccessAction {
  type: PriceActionType.FETCH_SUCCESS
  payload: PriceItem[]
}

interface UpdatePriceSuccessAction {
  type: PriceActionType.UPDATE_SUCCESS
  payload: { oldItem: PriceItem; newItem: PriceItem }
}

interface DeletePriceSuccessAction {
  type: PriceActionType.DELETE_SUCCESS
  payload: PriceItem
}

interface CreatePriceSuccessAction {
  type: PriceActionType.CREATE_SUCCESS
  payload: PriceItem
}

export type PriceAction =
  | LoadingPriceAction
  | PriceFailureAction
  | FetchPriceSuccessAction
  | UpdatePriceSuccessAction
  | DeletePriceSuccessAction
  | CreatePriceSuccessAction
