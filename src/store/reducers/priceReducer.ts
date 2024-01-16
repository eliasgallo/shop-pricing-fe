import { PriceItem } from '@types'
import { distinct, sliceItemId } from '@utils/listUtils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

type PriceListState = {
  loading: boolean
  error: string | null
  priceList: PriceItem[]
  sortedCategories: string[]
  filterValue: string
}

const initialState: PriceListState = {
  loading: false,
  error: null,
  priceList: [],
  sortedCategories: [],
  filterValue: '',
}

const lowerCaseNameSort = (
  left: { name: string },
  right: { name: string }
): number => left.name.toLowerCase().localeCompare(right.name.toLowerCase())

const lowerCaseSort = (left: string, right: string): number =>
  left.toLowerCase().localeCompare(right.toLowerCase())

const sortedCategoriesList = (list: PriceItem[]): string[] =>
  distinct(list.map((item) => item.category)).sort(lowerCaseSort)

const priceListSlice = createSlice({
  name: 'price',
  initialState,
  reducers: {
    priceLoading: (state: PriceListState) => {
      state.error = null
      state.loading = true
    },
    priceError: (state: PriceListState, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    priceFetch: (state: PriceListState, action: PayloadAction<PriceItem[]>) => {
      state.loading = false
      state.priceList = action.payload.sort(lowerCaseNameSort)
      state.sortedCategories = sortedCategoriesList(action.payload)
    },
    priceUpdate: (
      state: PriceListState,
      action: PayloadAction<{ oldItem: PriceItem; newItem: PriceItem }>
    ) => {
      const newItem = action.payload.newItem
      const idToRemove: number = action.payload.oldItem.id || newItem.id!
      const newList: PriceItem[] = sliceItemId(state.priceList, idToRemove)
        .concat(newItem)
        .sort(lowerCaseNameSort)
      state.loading = false
      state.priceList = newList
      state.sortedCategories = sortedCategoriesList(newList)
    },
    priceDelete: (state: PriceListState, action: PayloadAction<PriceItem>) => {
      const newList = sliceItemId(state.priceList, action.payload.id!)
      state.loading = false
      state.priceList = newList
      state.sortedCategories = sortedCategoriesList(newList)
    },
    priceCreate: (state: PriceListState, action: PayloadAction<PriceItem>) => {
      const newList: PriceItem[] = state.priceList
        .concat(action.payload)
        .sort(lowerCaseNameSort)
      state.loading = false
      state.priceList = newList
      state.sortedCategories = sortedCategoriesList(newList)
    },
    priceClearAll: (state: PriceListState) => {
      state.loading = false
      state.priceList = []
    },
    setFilterValue: (state: PriceListState, action: PayloadAction<string>) => {
      state.filterValue = action.payload
    },
    priceResetState: () => initialState,
  },
})

export const {
  priceLoading,
  priceError,
  priceFetch,
  priceUpdate,
  priceDelete,
  priceCreate,
  priceClearAll,
  setFilterValue,
  priceResetState,
} = priceListSlice.actions
export const priceListReducer = priceListSlice.reducer

export const selectors = {
  getLoading: (state: RootState) => state.price.loading,
  getError: (state: RootState) => state.price.error,
  getPriceList: (state: RootState) => state.price.priceList,
  getSortedCateogries: (state: RootState) => state.price.sortedCategories,
  getFilteredList: (state: RootState): PriceItem[] => {
    const filterValue = state.price.filterValue.trim()
    if (filterValue === '') return state.price.priceList
    const ignoreCase = new RegExp(filterValue, 'i')
    return state.price.priceList.filter((item) => ignoreCase.test(item.name))
  },
}
