import { useEffect } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from './Spinner'
import { useActions } from '../hooks/useActions'
import { useAppSelector } from '../hooks/useTypeSelector'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { ShoppingItem } from '../store/common-models'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const ShopListRowWrapper = styled.div`
  margin-top: 5px;
`

const List = styled.ul`
  list-style: none;
  padding: 0;
`

const NewItem = styled.div`
  align-self: flex-end;
  /* background: #58ff00; */
  background-color: #24a0ed;
  color: white;
  padding: 5px 5px;
  border: 2px solid black;
  border-radius: 5px;
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
      <HeaderContainer>
        <h1>Shop list</h1>
        <NewItem
          onClick={() => {
            navigate(`./new`, { relative: 'path' })
          }}
        >
          New Item ＋
        </NewItem>
      </HeaderContainer>
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
