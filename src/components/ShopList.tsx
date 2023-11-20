import { useEffect } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { ShoppingItemType } from './response-api-types'
import { Spinner } from './Spinner'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useTypeSelector'

const ShopListRowWrapper = styled.div`
  margin-top: 5px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

export function ShopList() {
  const { fetchShoppingList, updateShoppingItem } = useActions()
  const { shoppingList, loading, error } = useAppSelector(
    (state) => state.shopping
  )

  // TODO: sort by checked / unchecked
  useEffect(() => {
    fetchShoppingList()
  }, [])

  const updateItem = (item: ShoppingItemType) => {
    updateShoppingItem(item)
  }

  return (
    <>
      <h1>Shop list</h1>
      <List>
        {shoppingList.map((item: ShoppingItemType) => {
          return (
            <li key={item.id}>
              <ShopListRowWrapper>
                <ShopListRow
                  key={item.id}
                  item={{ ...item }}
                  updateItem={updateItem}
                  editButtonClick={() => {}}
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
