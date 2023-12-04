// configureStore
import { combineReducers } from 'redux'
import { shopListReducer } from './shopListReducer'
import { priceListReducer } from './priceReducer'
import { loginReducer } from './loginReducer'

export const reducers = combineReducers({
  shop: shopListReducer,
  price: priceListReducer,
  login: loginReducer,
})

export type RootState = ReturnType<typeof reducers>
