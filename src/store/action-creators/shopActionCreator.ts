import axios, { AxiosResponse } from 'axios'
import { ShopItem } from '@types'
import { SessionAction, ShopListAction } from '../actions'
import { Dispatch } from '@reduxjs/toolkit'
import { withAuthHeader } from './headers'
import { RootState } from '../store'
import { updateSessionExpiry } from '../reducers/sessionReducer'
import {
  shopClearAll,
  shopClearChecked,
  shopCreate,
  shopDelete,
  shopError,
  shopFetch,
  shopLoading,
  shopUpdate,
} from '../reducers/shopListReducer'
import { sessionSelectors } from '../reducers'

const BASE_URL = process.env.BE_BASE_URL
const token = (state: RootState): string => sessionSelectors.getToken(state)

export const fetchShopList = () => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ): Promise<void> => {
    dispatch(shopLoading())
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/shopping_items`,
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopFetch(response.data['data']))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}

export const updateShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(shopLoading())
    try {
      const response = await axios.put(
        `${BASE_URL}/shopping_items`,
        // TODO: just update the changed fields
        JSON.stringify(item),
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopUpdate({ oldItem: item, newItem: response.data['data'] }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}

export const deleteShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(shopLoading())
    try {
      const response = await axios.delete(`${BASE_URL}/shopping_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: withAuthHeader(token(getState())),
      })
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopDelete(item))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}

export const createShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(shopLoading())
    try {
      const response = await axios.post(
        `${BASE_URL}/shopping_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopCreate(response.data['data']))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}

export const clearAllShopItems = () => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(shopLoading())
    try {
      const response = await axios.delete(
        `${BASE_URL}/shopping_items/clear_all`,
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopClearAll())
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}

export const clearCheckedShopItems = () => {
  return async (
    dispatch: Dispatch<ShopListAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(shopLoading())
    try {
      const response = await axios.delete(
        `${BASE_URL}/shopping_items/clear_checked_items`,
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(shopClearChecked(response.data['data']))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete shop item'
        if (error instanceof Error) msg = error.message
        dispatch(shopError(msg))
      }
    }
  }
}
