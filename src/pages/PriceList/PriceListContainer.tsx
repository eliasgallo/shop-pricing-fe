import { ChangeEvent, ReactNode, useEffect, useState } from 'react'
import { useTranslation } from 'react-i18next'
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

const ListContainer = styled.div`
  display: grid;
  gap: 10px;
  margin-top: 10px;
`

const SearchInput = styled.input`
  border: solid;
  border-radius: 5px;
  padding: 5px;
`

type PriceListProps = {
  priceList: PriceItem[]
  sortedCategories: string[]
  loading: boolean
  error: string | null
  fetchList: () => void
  clearList: () => void
  filterChanged: (filterValue: string) => void
}

export const PriceListContainer = ({
  priceList,
  sortedCategories,
  loading,
  error,
  fetchList,
  clearList,
  filterChanged,
}: PriceListProps): JSX.Element => {
  const [modalOpen, setModalOpen] = useState(false)
  const { t } = useTranslation()
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

  const sectionRows = (priceItems: PriceItem[]): ReactNode[] =>
    priceItems.map(
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
        title={t('list.modal.clear-all-title')}
        description={t('list.modal.clear-description')}
      />
      <HeaderContainer>
        <PageTitle>{t('list.price.title')}</PageTitle>
        <MoreMenuComponent
          options={[
            {
              title: t('list.more-menu.remove-all-title'),
              handleOption: () => setModalOpen(true),
            },
          ]}
        />
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <ListContainer>
        <SearchInput
          type='search'
          placeholder={`🔎 ${t('list.price.search-input-placeholder')}`}
          onChange={(e: ChangeEvent<HTMLInputElement>) =>
            filterChanged(e.target.value)
          }
        />
        <NewItemComponent onClick={newNav} />
        <ListWrapper>
          {sortedCategories.map((category: string) => {
            const list = priceList.filter((item) => item.category === category)
            return (
              Boolean(list.length) && (
                <SectionComponent
                  key={category}
                  onSectionClick={sectionNav}
                  section={category}
                >
                  {sectionRows(list)}
                </SectionComponent>
              )
            )
          })}
        </ListWrapper>
      </ListContainer>
      {loading && <Spinner />}
    </>
  )
}
