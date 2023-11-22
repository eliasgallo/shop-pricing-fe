import { useEffect } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from './Spinner'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useTypeSelector'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { ShoppingItem } from '../store/common-models'

const ShopListRowWrapper = styled.div`
  margin-top: 5px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

export function ShopList() {
  const { fetchShoppingList, updateShoppingItem } = useActions()
  const {
    shoppingList = [],
    loading,
    error,
  } = useAppSelector((state) => state.shopping)
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (shoppingList.length === 0) fetchShoppingList()
  }, [])

  return (
    <>
      <h1>Shop list</h1>
      <List>
        {shoppingList.map((item: ShoppingItem) => {
          return (
            <li key={item.id}>
              <ShopListRowWrapper>
                <ShopListRow
                  key={item.id}
                  item={{ ...item }}
                  updateItem={updateShoppingItem}
                  editButtonClick={() =>
                    navigate(`./${item.id}`, { relative: 'path' })
                  }
                />
              </ShopListRowWrapper>
            </li>
          )
        })}
        {error && `Error message: ${error}`}
      </List>
      {loading && <Spinner />}
    </>
  )
}
