import { ReactNode } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from '@shared/Spinner'
import { ShopItem } from '@types'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { fetchListEffect } from '../pageContainerUtils'
import { useNavigation } from '@customHooks/routerDomHooks'

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

export const ShopListContainer = ({
  shopList,
  sortedStores,
  loading,
  error,
  fetchList,
  updateItem,
}: ShopListProps): JSX.Element => {
  fetchListEffect(shopList, fetchList)
  const { editNav, newNav, sectionNav } = useNavigation()

  const sectionRows = (section: string): ReactNode[] =>
    shopList
      .filter((item) => item.store === section)
      .map(
        (item: ShopItem): ReactNode => (
          <ShopListRow
            key={item.id}
            item={{ ...item }}
            updateItem={updateItem}
            editButtonClick={() => editNav(item.id)}
          />
        )
      )

  return (
    <>
      <HeaderContainer>
        <h1>Shop list</h1>
        <NewItem onClick={newNav}>New Item ＋</NewItem>
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <ListWrapper>
        {sortedStores.map((store: string) => (
          <SectionComponent
            key={store}
            onSectionClick={sectionNav}
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
