import { describe, expect, it } from '@jest/globals'
import { priceListReducer as reducer } from './priceReducer'
import { PriceActionType } from '../action-types'
import { PriceAction } from '../actions/price'
import { PriceItem, PriceListType } from '@types'

const init = {
  loading: false,
  error: null,
  priceList: {},
}

const initialItem: PriceItem = {
  category: 'cat',
  comparison_price: 0,
  comparison_price_unit: 'kr/kg',
  name: 'item name',
  reliability: '?',
  tags: ['frozen'],
}

const priceItems: PriceItem[] = [
  { ...initialItem, id: 1, name: 'item 1', category: 'cat1' },
  { ...initialItem, id: 2, name: 'B', category: 'cat2' },
  { ...initialItem, id: 22, name: 'a', category: 'cat2' },
  { ...initialItem, id: 3, name: 'c', category: 'cat2' },
  { ...initialItem, name: '', category: 'cat3' },
]

const priceKeyList: PriceListType = {
  cat1: [priceItems[0]],
  cat2: [priceItems[1], priceItems[2], priceItems[3]],
  cat3: [priceItems[4]],
}

describe('priceReducer', () => {
  it('LOADING sets a loading state', (): void => {
    const action: PriceAction = { type: PriceActionType.LOADING }
    const state = { ...init, loading: false, error: 'error' }
    const expected = { ...init, loading: true, error: null }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOADING_ERROR sets state with error', (): void => {
    const action: PriceAction = {
      type: PriceActionType.LOADING_ERROR,
      error: 'error',
    }
    const state = { ...init, loading: true, error: null }
    const expected = { ...init, loading: false, error: 'error' }
    expect(reducer(state, action)).toEqual(expected)
  })

  describe('FETCH_SUCCESS', () => {
    const action: PriceAction = {
      type: PriceActionType.FETCH_SUCCESS,
      payload: priceItems,
    }
    const state = { ...init, loading: true }
    const result = reducer(state, action)

    it('converts the fetched list to a key/value (category/list) object', () => {
      const expected = ['cat1', 'cat2', 'cat3']
      expect(Object.keys(result.priceList)).toEqual(expected)
    })

    it('the lists in the object are sorted by name (case insensitive)', (): void => {
      const expected = ['a', 'B', 'c']
      expect(result.priceList['cat2'].map((i) => i.name)).toEqual(expected)
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('UPDATE_SUCCESS', () => {
    const oldItem = priceItems[0]
    const updatedItem = { ...priceItems[0], name: 'BB', category: 'cat2' }
    const action: PriceAction = {
      type: PriceActionType.UPDATE_SUCCESS,
      payload: {
        oldItem,
        newItem: updatedItem,
      },
    }
    const state = { ...init, priceList: priceKeyList, loading: true }
    const result = reducer(state, action)

    it('remove the old item and add the new', () => {
      expect(result.priceList[oldItem.category]).toHaveLength(0)
      expect(result.priceList[updatedItem.category]).toContain(updatedItem)
    })

    it('sorts the list', () => {
      const expected = ['a', 'B', 'BB', 'c']
      expect(result.priceList[updatedItem.category].map((i) => i.name)).toEqual(
        expected
      )
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('DELETE_SUCCESS', () => {
    const removedItem = priceItems[1]
    const action: PriceAction = {
      type: PriceActionType.DELETE_SUCCESS,
      payload: removedItem,
    }
    const state = { ...init, priceList: priceKeyList, loading: true }
    const result = reducer(state, action)

    it('removes the item', () => {
      expect(result.priceList[removedItem.category]).not.toContain(removedItem)
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('CREATE_SUCCESS', () => {
    const newItem = { ...initialItem, name: '0', category: 'cat2' }
    const action: PriceAction = {
      type: PriceActionType.CREATE_SUCCESS,
      payload: newItem,
    }
    const state = { ...init, priceList: priceKeyList, loading: true }
    const result = reducer(state, action)

    it('adds the new item', () => {
      const { category } = newItem
      expect(result.priceList[category]).toContain(newItem)
      expect(result.priceList[category].length).toBe(
        priceKeyList[category].length + 1
      )
    })

    it('sorts the list', () => {
      const expected = ['0', 'a', 'B', 'c']
      expect(result.priceList[newItem.category].map((i) => i.name)).toEqual(
        expected
      )
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })
})
