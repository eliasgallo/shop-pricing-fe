import { ReactNode } from 'react'
import styled from 'styled-components'
import { ShopListRow } from './ShopListRow'
import { Spinner } from '@shared/Spinner'
import { ShopItem } from '@types'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { useFetchList } from '@customHooks/useFetchList'
import { useNavigation } from '@customHooks/routerDomHooks'
import { PageTitle } from '@shared/PageTitle'
import { NewItemComponent } from '@shared/NewItemComponent'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  useFetchList(shopList, fetchList)
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
        <PageTitle>Shop list</PageTitle>
        <NewItemComponent onClick={newNav} />
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
