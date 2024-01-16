import { ReactNode, useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTranslation } from 'react-i18next'
import { ShopListRow } from './ShopListRow'
import { Spinner } from '@shared/Spinner'
import { ShopItem } from '@types'
import { ListWrapper } from '@shared/ListWrapper'
import { SectionComponent } from '@shared/SectionComponent'
import { useNavigation } from '@customHooks/routerDomHooks'
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

type ShopListProps = {
  shopList: ShopItem[]
  sortedStores: string[]
  loading: boolean
  error: null | string
  fetchList: () => void
  updateItem: (item: ShopItem) => void
  clearList: () => void
  clearCheckedItems: () => void
}

export const ShopListContainer = ({
  shopList,
  sortedStores,
  loading,
  error,
  fetchList,
  updateItem,
  clearList,
  clearCheckedItems,
}: ShopListProps): JSX.Element => {
  const [modalAllOpen, setModalAllOpen] = useState(false)
  const [modalCheckedOpen, setModalCheckedOpen] = useState(false)
  useEffect(() => {
    shopList.length === 0 && fetchList()
  }, [])
  const { editNav, newNav, sectionNav } = useNavigation()
  const { t } = useTranslation()

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
  const handleClearCheckedItems = () => {
    setModalCheckedOpen(false)
    clearCheckedItems()
  }
  const handleClearList = () => {
    setModalAllOpen(false)
    clearList()
  }

  return (
    <>
      <ConfirmationModal
        confirm={handleClearCheckedItems}
        open={modalCheckedOpen}
        onClose={() => setModalCheckedOpen(false)}
        title={t('list.modal.clear-checked-title')}
        description={t('list.modal.clear-description')}
      />
      <ConfirmationModal
        confirm={handleClearList}
        open={modalAllOpen}
        onClose={() => setModalAllOpen(false)}
        title={t('list.modal.clear-all-title')}
        description={t('list.modal.clear-description')}
      />
      <HeaderContainer>
        <PageTitle>{t('list.shop.title')}</PageTitle>
        <MoreMenuComponent
          options={[
            {
              title: t('list.more-menu.remove-checked-title'),
              handleOption: () => setModalCheckedOpen(true),
            },
            {
              title: t('list.more-menu.remove-all-title'),
              handleOption: () => setModalAllOpen(true),
            },
          ]}
        />
      </HeaderContainer>
      {error && `Error message: ${error}`}
      <ListContainer>
        <NewItemComponent onClick={newNav} />
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
      </ListContainer>
      {loading && <Spinner />}
    </>
  )
}
