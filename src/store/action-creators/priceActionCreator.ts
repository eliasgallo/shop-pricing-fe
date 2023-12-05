import axios, { AxiosResponse } from 'axios'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'
import { Dispatch } from 'redux'
import { PriceItem } from '@types'
import { RootState } from '../reducers'
import { withAuthHeader } from './headers'

const BASE_URL = process.env.BE_BASE_URL

export const fetchPriceList = () => {
  return async (
    dispatch: Dispatch<PriceAction>,
    getState: () => RootState
  ): Promise<void> => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/price_control_items`,
        { headers: withAuthHeader(getState().session.token) }
      )
      const list: PriceItem[] = response.data['data']
      dispatch({
        type: PriceActionType.FETCH_SUCCESS,
        payload: list,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch price list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: PriceActionType.LOADING_ERROR, error: msg })
      }
    }
  }
}

export const updatePriceItem = (item: PriceItem) => {
  return async (dispatch: Dispatch<PriceAction>, getState: () => RootState) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response = await axios.put(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(getState().session.token) }
      )
      dispatch({
        type: PriceActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data['data'] },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update price item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const deletePriceItem = (item: PriceItem) => {
  return async (dispatch: Dispatch<PriceAction>, getState: () => RootState) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      await axios.delete(`${BASE_URL}/price_control_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: withAuthHeader(getState().session.token),
      })
      dispatch({
        type: PriceActionType.DELETE_SUCCESS,
        payload: item,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete price item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const createPriceItem = (item: PriceItem) => {
  return async (dispatch: Dispatch<PriceAction>, getState: () => RootState) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response = await axios.post(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        { headers: withAuthHeader(getState().session.token) }
      )
      dispatch({
        type: PriceActionType.CREATE_SUCCESS,
        payload: response.data['data'],
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create price item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}
