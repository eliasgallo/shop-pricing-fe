// configureStore
import { combineReducers } from 'redux'
import { shopListReducer } from './shoppingListReducer'
import { priceListReducer } from './priceControlReducer'

export const reducers = combineReducers({
  shopping: shopListReducer,
  priceList: priceListReducer,
})

export type RootState = ReturnType<typeof reducers>
