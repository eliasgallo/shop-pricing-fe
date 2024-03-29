import type { Router } from '@remix-run/router'
import {
  Outlet,
  Route,
  RouterProvider,
  createHashRouter,
  createRoutesFromElements,
} from 'react-router-dom'
import { ThemeProvider, createGlobalStyle } from 'styled-components'
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
import { TopNavigation } from './TopNavigation'
import { Protected } from './Protected'
import { LoginMenu } from './LoginMenu'
import { VerifyItem } from './VerifyItem'
import { themes } from '@shared/Theme'
import { useAppSelector } from '@customHooks/useTypeSelector'
import { NotFound } from '@pages/NotFound'
import { ThemeMode } from '@types'

const GlobalStyles = createGlobalStyle`
  html {
    min-height: 100%;
  }
  body {
    margin: 10px;
    height: 100%;
    background: ${(props) => props.theme.background};
    ${(props) => props.theme.color};
    font-family: ${(props) => props.theme.fontFamily};
    button {
      ${(props) => props.theme.buttonMixin};
    }
  }
`

const AppRoot = (): JSX.Element => {
  return (
    <>
      <GlobalStyles />
      <LoginMenu />
      <TopNavigation />
      <Outlet />
    </>
  )
}

const router: Router = createHashRouter(
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
        element={<NotFound />}
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
  // Let it crash if it is not a ThemeMode
  const theme = useAppSelector(appSelectors.getThemeMode) as ThemeMode
  return (
    <ThemeProvider theme={themes[theme]}>
      <RouterProvider router={router} />
    </ThemeProvider>
  )
}

export default AppWithReduxStore
