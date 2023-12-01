import axios, { AxiosResponse } from 'axios'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'
import { Dispatch } from 'redux'
import { PriceItem } from '@types'

const BASE_URL = process.env.BE_BASE_URL
const token = '7796b4f81de5b07bb87350842135496e5194db9d'

export const fetchPriceList = () => {
  return async (dispatch: Dispatch<PriceAction>): Promise<void> => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/price_control_items`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      const list: PriceItem[] = response.data.map((res: PriceItem) => res)
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
  return async (dispatch: Dispatch<PriceAction>) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response = await axios.put(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      dispatch({
        type: PriceActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data },
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
  return async (dispatch: Dispatch<PriceAction>) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      await axios.delete(`${BASE_URL}/price_control_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
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
  return async (dispatch: Dispatch<PriceAction>) => {
    dispatch({ type: PriceActionType.LOADING })
    try {
      const response = await axios.post(
        `${BASE_URL}/price_control_items`,
        JSON.stringify(item),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      dispatch({
        type: PriceActionType.CREATE_SUCCESS,
        payload: response.data,
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
