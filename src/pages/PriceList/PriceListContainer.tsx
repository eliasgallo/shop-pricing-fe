import { ReactNode, useEffect } from 'react'
import { LocationStateNewItem, PriceItem } from '@types'
import { Spinner } from '@shared/Spinner'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { NavigateFunction, useNavigate } from 'react-router-dom'
import { styled } from 'styled-components'
import { PriceListRow } from './PriceListRow'

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
  const navigate: NavigateFunction = useNavigate()

  useEffect(() => {
    if (Object.keys(priceList).length === 0) fetchList()
  }, [])

  const priceItemRow = (item: PriceItem): ReactNode => {
    return (
      <PriceListRow
        key={item.id}
        item={{ ...item }}
        onRowClick={() => navigate(`./${item.id}`, { relative: 'path' })}
      />
    )
  }

  const onSectionClick = (category: string): void => {
    const catState: LocationStateNewItem = { data: category }
    navigate(`./new`, { relative: 'path', state: catState })
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
        {sortedCategories.map((category: string) => (
          <SectionComponent
            key={category}
            onSectionClick={onSectionClick}
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
