import { ReactNode, useEffect, useState } from 'react'
import { PriceItem } from '@types'
import { useNavigation } from '@customHooks/routerDomHooks'
import { Spinner } from '@shared/Spinner'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { styled } from 'styled-components'
import { PriceListRow } from './PriceListRow'
import { PageTitle } from '@shared/PageTitle'
import { NewItemComponent } from '@shared/NewItemComponent'
import { MoreMenuComponent } from '@shared/MoreMenuComponent'
import { ConfirmationModal } from '@shared/Modal'

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
  clearList: () => void
}

export const PriceListContainer = ({
  priceList,
  sortedCategories,
  loading,
  error,
  fetchList,
  clearList,
}: PriceListProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  useEffect(() => {
    priceList.length === 0 && fetchList()
  }, [])
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
  const handleClearAllItems = () => {
    setModalOpen(false)
    clearList()
  }
  return (
    <>
      <ConfirmationModal
        confirm={handleClearAllItems}
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        title='Clear all items'
      />
      <HeaderContainer>
        <PageTitle>Price list</PageTitle>
        <MoreMenuComponent
          options={[{ title: '🗑️all', handleOption: () => setModalOpen(true) }]}
        />
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <ListWrapper>
        <NewItemComponent onClick={newNav} />
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
