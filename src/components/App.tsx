import type { Router } from '@remix-run/router'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from 'react-redux'

import { store } from '../store'
import { Home } from './Home'
import { PriceControl } from './PriceControl'
import { ShopList } from './ShopList'
import { DetailsShopItemPage } from './DetailsShopItemPage'

const AppContainer = styled.div`
  padding: 10px;
`

const AppRoot = (): JSX.Element => {
  return (
    <AppContainer>
      <Outlet />
    </AppContainer>
  )
}

const router: Router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<AppRoot />}
    >
      <Route
        index
        element={<Home />}
      />
      <Route
        path='price-control'
        element={<PriceControl />}
      />
      <Route
        path='shop-list'
        element={<ShopList />}
      />
      <Route
        path='shop-list/:id'
        element={<DetailsShopItemPage />}
      />
    </Route>
  )
)

export const App = (): JSX.Element => {
  return (
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  )
}
