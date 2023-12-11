import { ReactNode, useEffect } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from '@shared/Spinner'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { LocationStateNewItem, ShopItem } from '@types'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
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

type ShopListProps = {
  shopList: ShopItem[]
  sortedStores: string[]
  loading: boolean
  error: null | string
  fetchList: () => void
  updateItem: (item: ShopItem) => void
}

export const ShopListContainer: React.FC<ShopListProps> = ({
  shopList,
  sortedStores,
  loading,
  error,
  fetchList,
  updateItem,
}) => {
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (Object.keys(shopList).length === 0) fetchList()
  }, [])

  const onSectionClick = (store: string) => {
    const catState: LocationStateNewItem = { data: store }
    navigate(`./new`, { relative: 'path', state: catState })
  }

  const sectionRows = (section: string): ReactNode[] =>
    shopList
      .filter((item) => item.store === section)
      .map(
        (item: ShopItem): ReactNode => (
          <ShopListRow
            key={item.id}
            item={{ ...item }}
            updateItem={updateItem}
            editButtonClick={() =>
              navigate(`./${item.id}`, { relative: 'path' })
            }
          />
        )
      )

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
      {error && `Error message: ${error}`}
      <ListWrapper>
        {sortedStores.map((store: string) => (
          <SectionComponent
            key={store}
            onSectionClick={onSectionClick}
            section={store}
          >
            {sectionRows(store)}
          </SectionComponent>
        ))}
      </ListWrapper>
      {loading && <Spinner />}
    </>
  )
}
