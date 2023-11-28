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
