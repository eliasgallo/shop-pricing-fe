import { shopListReducer } from './shopListReducer'
import { priceListReducer } from './priceReducer'
import { loginReducer } from './loginReducer'
import { sessionReducer } from './sessionReducer'

export const reducers = {
  shop: shopListReducer,
  price: priceListReducer,
  login: loginReducer,
  session: sessionReducer,
}
