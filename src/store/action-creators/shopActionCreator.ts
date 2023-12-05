import axios, { AxiosResponse } from 'axios'
import { ShopActionType } from '../action-types'
import { ShopListAction } from '../actions'
import { Dispatch } from 'redux'
import { ShopItem } from '@types'
import { RootState } from '../reducers'
import { withAuthHeader } from './headers'

const BASE_URL = process.env.BE_BASE_URL

export const fetchShopList = () => {
  return async (
    dispatch: Dispatch<ShopListAction>,
    getState: () => RootState
  ): Promise<void> => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/shopping_items`,
        { headers: withAuthHeader(getState().session.token) }
      )
      const list: ShopItem[] = response.data['data']
      dispatch({
        type: ShopActionType.FETCH_SUCCESS,
        payload: list,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch shop list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: ShopActionType.LOADING_ERROR, error: msg })
      }
    }
  }
}

export const updateShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction>,
    getState: () => RootState
  ) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response = await axios.put(
        `${BASE_URL}/shopping_items`,
        // TODO: just update the changed fields
        JSON.stringify(item),
        { headers: withAuthHeader(getState().session.token) }
      )
      dispatch({
        type: ShopActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data['data'] },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shop item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const deleteShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction>,
    getState: () => RootState
  ) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      await axios.delete(`${BASE_URL}/shopping_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: withAuthHeader(getState().session.token),
      })
      dispatch({
        type: ShopActionType.DELETE_SUCCESS,
        payload: item,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete shop item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const createShopItem = (item: ShopItem) => {
  return async (
    dispatch: Dispatch<ShopListAction>,
    getState: () => RootState
  ) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response = await axios.post(
        `${BASE_URL}/shopping_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(getState().session.token) }
      )
      dispatch({
        type: ShopActionType.CREATE_SUCCESS,
        payload: response.data['data'],
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create shop item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}
