import { useEffect } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from '../Spinner'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { LocationStateNewItem, ShopItem, ShopListType } from '../../types'

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

const SectionButton = styled.div`
  cursor: pointer;
  color: #24a0ed;
  min-width: 30%; // increase click size in case the name is short
`
const Section = styled.div`
  &:not(:first-child) {
    margin-top: 20px;
  }
`

type ShopListProps = {
  shopList: ShopListType
  loading: boolean
  error: null | string
  fetchList: () => void
  updateItem: (item: ShopItem) => void
}

export const ShopListContainer: React.FC<ShopListProps> = ({
  shopList,
  loading,
  error,
  fetchList,
  updateItem,
}) => {
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (Object.keys(shopList).length === 0) fetchList()
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
        {Object.keys(shopList).map((store: string) => {
          return (
            <Section key={store}>
              <SectionButton
                onClick={() => {
                  const storeState: LocationStateNewItem = { data: store }
                  navigate(`./new`, { relative: 'path', state: storeState })
                }}
              >
                {store} (+)
              </SectionButton>
              {shopList[store].map((item: ShopItem) => {
                return (
                  <li key={item.id}>
                    <ShopListRowWrapper>
                      <ShopListRow
                        key={item.id}
                        item={{ ...item }}
                        updateItem={updateItem}
                        editButtonClick={() =>
                          navigate(`./${item.id}`, { relative: 'path' })
                        }
                      />
                    </ShopListRowWrapper>
                  </li>
                )
              })}
            </Section>
          )
        })}
        {error && `Error message: ${error}`}
      </List>
      {loading && <Spinner />}
    </>
  )
}
