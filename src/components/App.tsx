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

import { priceSelectors, shopSelectors, store } from '@store'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { PriceList } from '@pages/PriceList'
import { ShopList } from '@pages/ShopList'
import { ShopItemDetails } from '@pages/ShopItemDetails'
import { PriceItemDetails } from '@pages/PriceItemDetails'
import { BreadcrumbsTrails } from './BreadcrumbTrails'
import { Protected } from './Protected'
import { LoginMenu } from './login-menu'
import { VerifyId } from './VerifyId'

const AppContainer = styled.div`
  padding: 10px;
`

const AppRoot = (): JSX.Element => {
  return (
    <AppContainer>
      <BreadcrumbsTrails />
      <LoginMenu />
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
        path='login'
        element={<Login />}
      />
      <Route
        path='price-control'
        element={
          <Protected>
            <PriceList />
          </Protected>
        }
      />
      <Route
        path='price-control/:itemId'
        element={
          <Protected>
            <VerifyId listSelector={priceSelectors.getPriceList}>
              <PriceItemDetails />
            </VerifyId>
          </Protected>
        }
      />
      <Route
        path='shop-list'
        element={
          <Protected>
            <ShopList />
          </Protected>
        }
      />
      <Route
        path='shop-list/:itemId'
        element={
          <Protected>
            <VerifyId listSelector={shopSelectors.getShopList}>
              <ShopItemDetails />
            </VerifyId>
          </Protected>
        }
      />
      <Route
        path='*'
        element={<div>Not found</div>}
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
