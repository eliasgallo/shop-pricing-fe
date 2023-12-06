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

import { store } from '@store'
import { Home } from '@pages/Home'
import { Login } from '@pages/Login'
import { PriceList } from '@pages/PriceList'
import { ShopList } from '@pages/ShopList'
import { ShopItemDetails } from '@pages/ShopItemDetails'
import { PriceItemDetails } from '@pages/PriceItemDetails'
import { BreadcrumbsTrails } from './BreadcrumbTrails'
import { Protected } from './Protected'
import { LoginMenu } from './login-menu'

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
        path='price-control/:id'
        element={
          <Protected>
            <PriceItemDetails />
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
        path='shop-list/:id'
        element={
          <Protected>
            <ShopItemDetails />
          </Protected>
        }
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
