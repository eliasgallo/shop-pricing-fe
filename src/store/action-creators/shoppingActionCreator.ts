import axios, { AxiosResponse } from 'axios'
import { ShoppingListActionType } from '../action-types'
import { ShoppingListAction } from '../actions'
import { Dispatch } from 'redux'
import { ShoppingItem } from '../../types'

const BASE_URL = 'http://localhost:4000'
const token = '7796b4f81de5b07bb87350842135496e5194db9d'

export const fetchShoppingList = () => {
  return async (dispatch: Dispatch<ShoppingListAction>): Promise<void> => {
    dispatch({ type: ShoppingListActionType.FETCHING })
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
      const list: ShoppingItem[] = response.data.map((res: ShoppingItem) => res)
      dispatch({
        type: ShoppingListActionType.FETCH_SUCCESS,
        payload: list,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to fetch shopping list'
        if (error instanceof Error) msg = error.message
        dispatch({ type: ShoppingListActionType.FETCH_ERROR, payload: msg })
      }
    }
  }
}

export const updateShoppingItem = (item: ShoppingItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShoppingListActionType.UPDATING })
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
        type: ShoppingListActionType.UPDATE_SUCCESS,
        payload: { oldItem: item, newItem: response.data },
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShoppingListActionType.UPDATE_ERROR,
          payload: msg,
        })
      }
    }
  }
}

export const deleteShoppingItem = (item: ShoppingItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShoppingListActionType.DELETING })
    try {
      await axios.delete(`${BASE_URL}/shopping_items`, {
        data: JSON.stringify({ ids: [item.id] }),
        headers: {
          'Content-Type': 'application/json',
          Authorization: token,
        },
      })
      dispatch({
        type: ShoppingListActionType.DELETE_SUCCESS,
        payload: item,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to update shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShoppingListActionType.DELETE_ERROR,
          payload: msg,
        })
      }
    }
  }
}

export const createShoppingItem = (item: ShoppingItem) => {
  return async (dispatch: Dispatch<ShoppingListAction>) => {
    dispatch({ type: ShoppingListActionType.CREATING })
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
        type: ShoppingListActionType.CREATE_SUCCESS,
        payload: response.data,
      })
    } catch (error: unknown) {
      if (error instanceof Error) {
        let msg = 'Failed to create shopping item'
        if (error instanceof Error) msg = error.message
        dispatch({
          type: ShoppingListActionType.CREATE_ERROR,
          payload: msg,
        })
      }
    }
  }
}

// ;(async () => {
//   setLoading(true)
//   const headers: HeadersInit = new Headers()
//   headers.set('Content-Type', 'application/json')
//   headers.set('Authorization', token)
//   const requestInit: RequestInit = {
//     headers,
//     method: 'PUT',
//     body: JSON.stringify(item),
//   }
//   const data = await fetch(`${BASE_URL}/shopping_items`, requestInit)
//   const jsonItem = await data.json()
//   setResult(
//     result.map((i) => {
//       return i.id === jsonItem.id ? jsonItem : i
//     })
//   )
//   setLoading(false)
// })()
