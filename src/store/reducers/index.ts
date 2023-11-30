// configureStore
import { combineReducers } from 'redux'
import { shopListReducer } from './shopListReducer'
import { priceListReducer } from './priceReducer'

export const reducers = combineReducers({
  shop: shopListReducer,
  price: priceListReducer,
})

export type RootState = ReturnType<typeof reducers>
