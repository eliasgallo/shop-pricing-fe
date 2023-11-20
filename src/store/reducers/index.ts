// configureStore
import { combineReducers } from 'redux'
import { shopListReducer } from './shoppingListReducer'

export const reducers = combineReducers({ shopping: shopListReducer })

export type RootState = ReturnType<typeof reducers>
