import { ReactNode } from 'react'
import { PriceItem } from '@types'
import { Spinner } from '@shared/Spinner'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { styled } from 'styled-components'
import { PriceListRow } from './PriceListRow'
import { navigation, fetchListEffect } from '../pageContainerUtils'

const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const NewItem = styled.div`
  align-self: flex-end;
  background-color: #24a0ed;
  color: white;
  padding: 5px 5px;
  border: 2px solid black;
  border-radius: 5px;
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
  fetchListEffect(priceList, fetchList)
  const { editNav, newNav, sectionNav } = navigation()

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
        <h1>Price list</h1>
        <NewItem onClick={newNav}>New Item ＋</NewItem>
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
