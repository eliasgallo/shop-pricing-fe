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
import { PriceList } from './PriceList'
import { ShopList } from './ShopList'
import { ShopItemDetails } from './ShopItemDetails'
import { PriceItemDetails } from './PriceItemDetails'
import { BreadcrumbsTrails } from './BreadcrumbTrails'

const AppContainer = styled.div`
  padding: 10px;
`

const AppRoot = (): JSX.Element => {
  return (
    <AppContainer>
      <BreadcrumbsTrails />
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
        element={<PriceList />}
      />
      <Route
        path='price-control/:id'
        element={<PriceItemDetails />}
      />
      <Route
        path='shop-list'
        element={<ShopList />}
      />
      <Route
        path='shop-list/:id'
        element={<ShopItemDetails />}
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
