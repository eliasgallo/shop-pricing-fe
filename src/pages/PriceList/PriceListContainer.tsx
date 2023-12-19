import { ReactNode } from 'react'
import { PriceItem } from '@types'
import { useNavigation } from '@customHooks/routerDomHooks'
import { useFetchList } from '@customHooks/useFetchList'
import { Spinner } from '@shared/Spinner'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { styled } from 'styled-components'
import { PriceListRow } from './PriceListRow'
import { PageTitle } from '@shared/PageTitle'
import { NewItemComponent } from '@shared/NewItemComponent'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

type PriceListProps = {
  priceList: PriceItem[]
  sortedCategories: string[]
  loading: boolean
  error: string | null
  fetchList: () => void
}

export const PriceListContainer = ({
  priceList,
  sortedCategories,
  loading,
  error,
  fetchList,
}: PriceListProps): JSX.Element => {
  useFetchList(priceList, fetchList)
  const { editNav, newNav, sectionNav } = useNavigation()

  const priceItemRow = (item: PriceItem): ReactNode => {
    return (
      <PriceListRow
        key={item.id}
        item={{ ...item }}
        onRowClick={() => editNav(item.id)}
      />
    )
  }

  const sectionRows = (section: string): ReactNode[] =>
    priceList
      .filter((item) => item.category === section)
      .map(
        (item: PriceItem): ReactNode => (
          <li key={item.id}>{priceItemRow(item)}</li>
        )
      )

  return (
    <>
      <HeaderContainer>
        <PageTitle>Price list</PageTitle>
        <NewItemComponent onClick={newNav} />
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <ListWrapper>
        {sortedCategories.map((category: string) => (
          <SectionComponent
            key={category}
            onSectionClick={sectionNav}
            section={category}
          >
            {sectionRows(category)}
          </SectionComponent>
        ))}
      </ListWrapper>
      {loading && <Spinner />}
    </>
  )
}
