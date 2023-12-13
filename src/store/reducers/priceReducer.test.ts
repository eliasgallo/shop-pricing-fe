import { describe, expect, it } from '@jest/globals'
import { PriceItem } from '@types'
import { priceListReducer as reducer } from './priceReducer'
import { PriceAction } from '../actions/price'

const init = {
  loading: false,
  error: null,
  priceList: [],
  sortedCategories: [],
}

const initialItem: PriceItem = {
  category: 'cat',
  comparison_price: 0,
  comparison_price_unit: 'kr/kg',
  name: 'item name',
  reliability: '?',
  tags: ['frozen'],
}

const sortedCategories = ['cat0', 'cat1', 'cat2']

const priceItems: PriceItem[] = [
  { ...initialItem, id: 1, name: 'item 1', category: sortedCategories[1] },
  { ...initialItem, id: 2, name: 'B', category: sortedCategories[2] },
  { ...initialItem, id: 22, name: 'a', category: sortedCategories[2] },
  { ...initialItem, id: 3, name: 'c', category: sortedCategories[2] },
  { ...initialItem, name: '', category: sortedCategories[0] },
]

describe('priceReducer', () => {
  it('LOADING sets a loading state', (): void => {
    const action: PriceAction = { type: 'price/priceLoading' }
    const state = { ...init, loading: false, error: 'error' }
    const expected = { ...init, loading: true, error: null }
    expect(reducer(state, action)).toEqual(expected)
  })

  it('LOADING_ERROR sets state with error', (): void => {
    const action: PriceAction = { type: 'price/priceError', payload: 'error' }
    const state = { ...init, loading: true, error: null }
    const expected = { ...init, loading: false, error: 'error' }
    expect(reducer(state, action)).toEqual(expected)
  })

  describe('FETCH_SUCCESS', () => {
    const action: PriceAction = {
      type: 'price/priceFetch',
      payload: priceItems,
    }
    const state = { ...init, loading: true }
    const result = reducer(state, action)

    it('adds all the items in a price list as sorts by name (case ignored)', (): void => {
      const expected = ['', 'a', 'B', 'c', 'item 1']
      expect(result.priceList.map((i) => i.name)).toEqual(expected)
    })

    it('adds and sorts categories', (): void => {
      expect(result.sortedCategories).toEqual(sortedCategories)
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('UPDATE_SUCCESS', () => {
    const oldItem = priceItems[1]
    const updatedItem = { ...priceItems[1], name: 'BB', category: 'cat3' }
    const action: PriceAction = {
      type: 'price/priceUpdate',
      payload: { oldItem, newItem: updatedItem },
    }
    const state = { ...init, priceList: priceItems, loading: true }
    const result = reducer(state, action)

    it('replace the item and sorts the list', (): void => {
      const expected = ['', 'B', 'BB', 'c', 'item 1']
      expect(result.priceList.map((i) => i.name)).toEqual(expected)
    })

    it('sorts categories', (): void => {
      const category = updatedItem.category
      expect(result.sortedCategories).toEqual(sortedCategories.concat(category))
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('DELETE_SUCCESS', () => {
    const removedItem = priceItems[0]
    const action: PriceAction = {
      type: 'price/priceDelete',
      payload: removedItem,
    }
    const state = { ...init, priceList: priceItems, loading: true }
    const result = reducer(state, action)

    it('removes the item', (): void => {
      expect(result.priceList).not.toContain(removedItem)
    })

    it('removes cat0 (because it is the only cat0 item) sorts categories', (): void => {
      expect(result.sortedCategories).toEqual(sortedCategories.slice(1))
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('CREATE_SUCCESS', () => {
    const newItem = { ...initialItem, name: '0', category: 'cat2' }
    const action: PriceAction = {
      type: 'price/priceCreate',
      payload: newItem,
    }
    const state = { ...init, priceList: priceItems, loading: true }
    const result = reducer(state, action)

    it('adds the new item and sorts the list', (): void => {
      const expected = ['', '0', 'a', 'B', 'c', 'item 1']
      expect(result.priceList.map((i) => i.name)).toEqual(expected)
    })

    it('sorts categories', (): void => {
      expect(result.sortedCategories).toEqual(sortedCategories)
    })

    it('sets loading to false', () => {
      expect(result.loading).toBeFalsy()
    })
  })

  describe('default behaviour', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const action: any = { type: 'UNKOWN ACTION TYPE' }

    it('returns state if action is unknown', (): void => {
      expect(reducer(init, action)).toEqual(init)
    })

    it('returns a initial state if state does not exist', (): void => {
      expect(reducer(undefined, action)).toEqual(init)
    })
  })

  it('resets state', (): void => {
    const action = { type: 'price/priceResetState' }
    const state = {
      loading: true,
      error: 'error',
      priceList: priceItems,
      sortedCategories,
    }
    const expected = init
    expect(reducer(state, action)).toEqual(expected)
  })
})
