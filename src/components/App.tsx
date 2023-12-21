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

import {
  fetchPriceList,
  fetchShopList,
  priceSelectors,
  shopSelectors,
  store,
} from '@store'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { PriceList } from '@pages/PriceList'
import { ShopList } from '@pages/ShopList'
import { ShopItemDetails } from '@pages/ShopItemDetails'
import { PriceItemDetails } from '@pages/PriceItemDetails'
import { BreadcrumbsTrails } from './BreadcrumbTrails'
import { Protected } from './Protected'
import { LoginMenu } from './login-menu'
import { VerifyItem } from './VerifyItem'

const AppContainer = styled.div`
  padding: 5px;
`

const AppTopBar = styled.div`
  display: grid;
  grid-auto-flow: column;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 10px;
`

const AppRoot = (): JSX.Element => {
  return (
    <AppContainer>
      <AppTopBar>
        <BreadcrumbsTrails />
        <LoginMenu />
      </AppTopBar>
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
            <VerifyItem
              selectors={{
                list: priceSelectors.getPriceList,
                loading: priceSelectors.getLoading,
              }}
              fetchListAC={fetchPriceList}
            >
              <PriceItemDetails />
            </VerifyItem>
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
            <VerifyItem
              selectors={{
                list: shopSelectors.getShopList,
                loading: shopSelectors.getLoading,
              }}
              fetchListAC={fetchShopList}
            >
              <ShopItemDetails />
            </VerifyItem>
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
