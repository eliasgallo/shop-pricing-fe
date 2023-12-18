import { ShopItem } from '@types'
import { sliceItemId, distinct } from '@utils/listUtils'
import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { RootState } from '../store'

// TODO: move to backend
const defaultStores = [
  'Willys',
  'Lidl',
  'Ica',
  'Ica kvantum',
  'Ica maxi',
  'Coop',
  'Coop stora',
  'Coop konsum',
  'Xtra',
  'Dollar store',
]

const emptyStore = 'Any store'

type ShopListState = {
  loading: boolean
  error: string | null
  shopList: ShopItem[]
  sortedStores: string[]
  storeSuggestions: string[]
}

const initialState: ShopListState = {
  loading: false,
  error: null,
  shopList: [],
  sortedStores: [],
  storeSuggestions: defaultStores,
}

const shopItemOrder = (a: ShopItem, b: ShopItem): number => {
  if (a.checked === b.checked && a.created_at === b.created_at) return 0
  if (a.checked && b.checked)
    return (a.updated_at || '') > (b.updated_at || '') ? -1 : 1
  if (a.checked === b.checked)
    return (a.created_at || '') > (b.created_at || '') ? 1 : -1
  if (a.checked) return 1
  return -1 // b.checked === true
}

const storesOrder = (left: string, right: string): number => {
  if (left === emptyStore) return 1
  if (right === emptyStore) return -1
  return left.toLowerCase().localeCompare(right.toLowerCase())
}

const refreshStores = (list: ShopItem[]) =>
  distinct(list.map((item) => item.store)).sort(storesOrder)
const updateStoreSuggestions = (stores: string[]) =>
  distinct(stores.concat(defaultStores)).sort(storesOrder)

const shopListSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    shopLoading: (state: ShopListState) => {
      state.error = null
      state.loading = true
    },
    shopError: (state: ShopListState, action: PayloadAction<string>) => {
      state.loading = false
      state.error = action.payload
    },
    shopFetch: (state: ShopListState, action: PayloadAction<ShopItem[]>) => {
      const stores = refreshStores(action.payload)
      state.loading = false
      state.shopList = action.payload.sort(shopItemOrder)
      state.sortedStores = stores
      state.storeSuggestions = updateStoreSuggestions(stores)
    },
    shopUpdate: (
      state: ShopListState,
      action: PayloadAction<{ oldItem: ShopItem; newItem: ShopItem }>
    ) => {
      const newItem = action.payload.newItem
      const idToRemove: number = action.payload.oldItem.id || newItem.id!
      const newList: ShopItem[] = sliceItemId(state.shopList, idToRemove)
        .concat(newItem)
        .sort(shopItemOrder)
      const stores = refreshStores(newList)
      state.loading = false
      state.shopList = newList.sort(shopItemOrder)
      state.sortedStores = stores
      state.storeSuggestions = updateStoreSuggestions(stores)
    },
    shopDelete: (state: ShopListState, action: PayloadAction<ShopItem>) => {
      const newList = sliceItemId(state.shopList, action.payload.id!)
      state.loading = false
      state.shopList = newList
    },
    shopCreate: (state: ShopListState, action: PayloadAction<ShopItem>) => {
      const newList: ShopItem[] = state.shopList
        .concat(action.payload)
        .sort(shopItemOrder)
      const stores = refreshStores(newList)
      state.loading = false
      state.shopList = newList.sort(shopItemOrder)
      state.sortedStores = stores
      state.storeSuggestions = updateStoreSuggestions(stores)
    },
    shopResetState: () => initialState,
  },
})

export const {
  shopLoading,
  shopError,
  shopFetch,
  shopUpdate,
  shopDelete,
  shopCreate,
  shopResetState,
} = shopListSlice.actions
export const shopListReducer = shopListSlice.reducer

export const selectors = {
  getLoading: (state: RootState) => state.shop.loading,
  getError: (state: RootState) => state.shop.error,
  getShopList: (state: RootState) => state.shop.shopList,
  getSortedStores: (state: RootState) => state.shop.sortedStores,
  getStoreSuggestions: (state: RootState) => state.shop.storeSuggestions,
}
