import { PriceItem } from '@types'
import { distinct, sliceItemId } from '@utils/listUtils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'

type PriceListState = {
  loading: boolean
  error: string | null
  priceList: PriceItem[]
  sortedCategories: string[]
}

const initialState: PriceListState = {
  loading: false,
  error: null,
  priceList: [],
  sortedCategories: [],
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
  priceResetState,
} = priceListSlice.actions
export const priceListReducer = priceListSlice.reducer
