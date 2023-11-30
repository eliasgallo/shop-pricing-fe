import axios, { AxiosResponse } from 'axios'
import { ShopActionType } from '../action-types'
import { ShoppingListAction } from '../actions'
import { Dispatch } from 'redux'
import { ShopItem } from '../../types'

const BASE_URL = 'http://localhost:4000'
const token = '7796b4f81de5b07bb87350842135496e5194db9d'

export const fetchShoppingList = () => {
  return async (dispatch: Dispatch<ShoppingListAction>): Promise<void> => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response: AxiosResponse = await axios.get(
        `${BASE_URL}/shopping_items`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      const list: ShopItem[] = response.data.map((res: ShopItem) => res)
      dispatch({
        type: ShopActionType.FETCH_SUCCESS,
        payload: list,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch shopping list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: ShopActionType.LOADING_ERROR, error: msg })
      }
    }
  }
}

export const updateShoppingItem = (item: ShopItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response = await axios.put(
        `${BASE_URL}/shopping_items`,
        // TODO: just update the changed fields
        JSON.stringify(item),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      dispatch({
        type: ShopActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const deleteShoppingItem = (item: ShopItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      await axios.delete(`${BASE_URL}/shopping_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({
        type: ShopActionType.DELETE_SUCCESS,
        payload: item,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to delete shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}

export const createShoppingItem = (item: ShopItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShopActionType.LOADING })
    try {
      const response = await axios.post(
        `${BASE_URL}/shopping_items`,
        JSON.stringify(item),
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        }
      )
      dispatch({
        type: ShopActionType.CREATE_SUCCESS,
        payload: response.data,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShopActionType.LOADING_ERROR,
          error: msg,
        })
      }
    }
  }
}
