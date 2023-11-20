import { BrowserRouter, Route, Routes } from 'react-router-dom'
import styled from 'styled-components'
import { Provider } from 'react-redux'

import { store } from '../store'
import { Home } from './Home'
import { PriceControl } from './PriceControl'
import { ShopList } from './ShopList'

const AppContainer = styled.div`
  padding: 10px;
`

export const App = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer>
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/price-control'
              element={<PriceControl />}
            />
            <Route
              path='/shop-list'
              element={<ShopList />}
            />
          </Routes>
        </AppContainer>
      </Provider>
    </BrowserRouter>
  )
}
