// configureStore
import { combineReducers } from 'redux'
import { shopListReducer } from './shopListReducer'
import { priceListReducer } from './priceReducer'
import { loginReducer } from './loginReducer'
import { sessionReducer } from './sessionReducer'

export const reducers = combineReducers({
  shop: shopListReducer,
  price: priceListReducer,
  login: loginReducer,
  session: sessionReducer,
})

export type RootState = ReturnType<typeof reducers>
