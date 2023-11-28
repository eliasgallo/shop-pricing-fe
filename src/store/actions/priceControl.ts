import { PriceControlItem } from '../../types'
import { PriceControlActionType } from '../action-types'

// Fetch price list
interface FetchPriceControlAction {
  type: PriceControlActionType.FETCHING
}

interface FetchPriceControlSuccessAction {
  type: PriceControlActionType.FETCH_SUCCESS
  payload: PriceControlItem[]
}

interface FetchPriceControlFailureAction {
  type: PriceControlActionType.FETCH_ERROR
  payload: string
}

// Update price item
interface UpdatePriceControlAction {
  type: PriceControlActionType.UPDATING
}

interface UpdatePriceControlSuccessAction {
  type: PriceControlActionType.UPDATE_SUCCESS
  payload: { oldItem: PriceControlItem; newItem: PriceControlItem }
}

interface UpdatePriceControlFailureAction {
  type: PriceControlActionType.UPDATE_ERROR
  payload: string
}

// Delete price item
interface DeletePriceControlAction {
  type: PriceControlActionType.DELETING
}

interface DeletePriceControlSuccessAction {
  type: PriceControlActionType.DELETE_SUCCESS
  payload: PriceControlItem
}

interface DeletePriceControlFailureAction {
  type: PriceControlActionType.DELETE_ERROR
  payload: string
}

// Create price item
interface CreatePriceControlAction {
  type: PriceControlActionType.CREATING
}

interface CreatePriceControlSuccessAction {
  type: PriceControlActionType.CREATE_SUCCESS
  payload: PriceControlItem
}

interface CreatePriceControlFailureAction {
  type: PriceControlActionType.CREATE_ERROR
  payload: string
}

export type PriceControlAction =
  | FetchPriceControlAction
  | FetchPriceControlSuccessAction
  | FetchPriceControlFailureAction
  | UpdatePriceControlAction
  | UpdatePriceControlSuccessAction
  | UpdatePriceControlFailureAction
  | DeletePriceControlAction
  | DeletePriceControlSuccessAction
  | DeletePriceControlFailureAction
  | CreatePriceControlAction
  | CreatePriceControlSuccessAction
  | CreatePriceControlFailureAction
