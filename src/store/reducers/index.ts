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
export { selectors as loginSelectors } from './loginReducer'
export { selectors as priceSelectors } from './priceReducer'
export { selectors as sessionSelectors } from './sessionReducer'
export { selectors as shopSelectors } from './shopListReducer'
