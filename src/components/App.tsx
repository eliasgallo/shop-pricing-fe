import type { Router } from '@remix-run/router'
import {
  Outlet,
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import styled, { ThemeProvider, createGlobalStyle } from 'styled-components'
import { Provider } from 'react-redux'

import {
  appSelectors,
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
import { themes } from '@shared/Theme'
import { useAppSelector } from '@customHooks/useTypeSelector'

const GlobalStyles = createGlobalStyle`
  body {
    margin: 10px;
    background-color: ${(props) => props.theme.background};
    color: ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.fontFamily}
  }
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
    <>
      <GlobalStyles />
      <AppTopBar>
        <BreadcrumbsTrails />
        <LoginMenu />
      </AppTopBar>
      <Outlet />
    </>
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

const AppWithReduxStore = () => (
  <Provider store={store}>
    <AppComponent />
  </Provider>
)

const AppComponent = (): JSX.Element => {
  const theme = useAppSelector(appSelectors.getThemeMode)
  return (
    <ThemeProvider theme={themes[theme]}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default AppWithReduxStore
