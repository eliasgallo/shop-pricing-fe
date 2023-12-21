import axios, { AxiosResponse } from 'axios'
import { PriceAction, SessionAction } from '../actions'
import { Dispatch } from '@reduxjs/toolkit'
import { PriceItem } from '@types'
import { withAuthHeader } from './headers'
import { RootState } from '../store'
import { updateSessionExpiry } from '../reducers/sessionReducer'
import {
  priceLoading,
  priceFetch,
  priceError,
  priceUpdate,
  priceDelete,
  priceCreate,
  priceClearAll,
} from '../reducers/priceReducer'
import { sessionSelectors } from '../reducers'

const token = (state: RootState): string => sessionSelectors.getToken(state)

const BASE_URL = process.env.BE_BASE_URL

export const fetchPriceList = () => {
  return async (
    dispatch: Dispatch<PriceAction | SessionAction>,
    getState: () => RootState
  ): Promise<void> => {
    dispatch(priceLoading())
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/price_control_items`,
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      const list: PriceItem[] = response.data['data']
      dispatch(priceFetch(list))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch price list'
        if (error instanceof Error) msg = error.message
        dispatch(priceError(msg))
      }
    }
  }
}

export const updatePriceItem = (item: PriceItem) => {
  return async (
    dispatch: Dispatch<PriceAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(priceLoading())
    try {
      const response = await axios.put(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(priceUpdate({ oldItem: item, newItem: response.data['data'] }))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update price item'
        if (error instanceof Error) msg = error.message
        dispatch(priceError(msg))
      }
    }
  }
}

export const deletePriceItem = (item: PriceItem) => {
  return async (
    dispatch: Dispatch<PriceAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(priceLoading())
    try {
      const response = await axios.delete(`${BASE_URL}/price_control_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: withAuthHeader(token(getState())),
      })
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(priceDelete(item))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete price item'
        if (error instanceof Error) msg = error.message
        dispatch(priceError(msg))
      }
    }
  }
}

export const createPriceItem = (item: PriceItem) => {
  return async (
    dispatch: Dispatch<PriceAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(priceLoading())
    try {
      const response = await axios.post(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(priceCreate(response.data['data']))
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create price item'
        if (error instanceof Error) msg = error.message
        dispatch(priceError(msg))
      }
    }
  }
}

export const clearAllPriceItems = () => {
  return async (
    dispatch: Dispatch<PriceAction | SessionAction>,
    getState: () => RootState
  ) => {
    dispatch(priceLoading())
    try {
      const response = await axios.delete(
        `${BASE_URL}/price_control_items/clear_all`,
        { headers: withAuthHeader(token(getState())) }
      )
      dispatch(updateSessionExpiry(response.data['token_expiry']))
      dispatch(priceClearAll())
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to clear price list'
        if (error instanceof Error) msg = error.message
        dispatch(priceError(msg))
      }
    }
  }
}
