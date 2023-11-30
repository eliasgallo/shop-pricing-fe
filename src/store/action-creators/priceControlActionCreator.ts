import axios, { AxiosResponse } from 'axios'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions'
import { Dispatch } from 'redux'
import { PriceItem } from '../../types'

const BASE_URL = 'http://localhost:4000'
const token = '7796b4f81de5b07bb87350842135496e5194db9d'

export const fetchPriceControlList = () => {
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
        let msg = 'Failed to fetch price control list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: PriceActionType.LOADING_ERROR, error: msg })
      }
    }
  }
}

export const updatePriceControlItem = (item: PriceItem) => {
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
        let msg = 'Failed to update price control item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const deletePriceControlItem = (item: PriceItem) => {
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
        let msg = 'Failed to delete price control item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const createPriceControlItem = (item: PriceItem) => {
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
        let msg = 'Failed to create price control item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}
