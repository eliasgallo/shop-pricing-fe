import axios, { AxiosResponse } from 'axios'
import { PriceControlActionType } from '../action-types'
import { PriceControlAction } from '../actions'
import { Dispatch } from 'redux'
import { PriceControlItem } from '../../types'

const BASE_URL = 'http://localhost:4000'
const token = '7796b4f81de5b07bb87350842135496e5194db9d'

export const fetchPriceControlList = () => {
  return async (dispatch: Dispatch<PriceControlAction>): Promise<void> => {
    dispatch({ type: PriceControlActionType.FETCHING })
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
      const list: PriceControlItem[] = response.data.map(
        (res: PriceControlItem) => res
      )
      dispatch({
        type: PriceControlActionType.FETCH_SUCCESS,
        payload: list,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch price control list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: PriceControlActionType.FETCH_ERROR, payload: msg })
      }
    }
  }
}

export const updatePriceControlItem = (item: PriceControlItem) => {
  return async (dispatch: Dispatch<PriceControlAction>) => {
    dispatch({ type: PriceControlActionType.UPDATING })
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
        type: PriceControlActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update price control item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceControlActionType.UPDATE_ERROR,
          payload: msg,
        })
      }
    }
  }
}

export const deletePriceControlItem = (item: PriceControlItem) => {
  return async (dispatch: Dispatch<PriceControlAction>) => {
    dispatch({ type: PriceControlActionType.DELETING })
    try {
      await axios.delete(`${BASE_URL}/price_control_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({
        type: PriceControlActionType.DELETE_SUCCESS,
        payload: item,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete price control item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: PriceControlActionType.DELETE_ERROR,
          payload: msg,
        })
      }
    }
  }
}

