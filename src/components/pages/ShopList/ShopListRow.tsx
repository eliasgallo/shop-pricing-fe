import styled from 'styled-components'
import { PriceUnitTypes, QuantityTypes, ShopItem } from '@types'

type ShopListRowProps = {
  item: ShopItem
  updateItem: (item: ShopItem) => void
  editButtonClick: () => void
}

const Container = styled.div`
  border: solid 2px;
  border-radius: 5px;
  display: flex;
  position: relative;
  justify-content: space-between;
`

const ItemInfo = styled.label`
  padding: 10px 0 10px 5px;
  flex-grow: 1;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

const EditButton = styled.button`
  padding: 0 20px;
  background-color: #24a0ed;
  color: white;
  font-weight: bold;
  border: none;
`

const Strikethrough = styled.div`
  position: absolute;
  top: calc(50% + 1px);
  left: 0;
  border-bottom: 2px solid;
  width: 100%;
`

const itemInfo = (item: ShopItem): string => {
  const quantity =
    item.quantity_value > 0 &&
    `${item.quantity_value}${QuantityTypes[item.quantity_type]}`
  const price =
    item.price > 0 && `${item.price}${PriceUnitTypes[item.price_unit]}`
  const offer = item.offer && '🔖'
  return [quantity, item.name, price, offer].filter(Boolean).join(' ')
}

export const ShopListRow = ({
  item,
  updateItem,
  editButtonClick,
}: ShopListRowProps) => {
  const itemChecked = (): void => {
    item.checked = !item.checked
    updateItem(item)
  }

  return (
    <Container>
      <ItemInfo onClick={itemChecked}>
        {itemInfo(item)}
        {item.checked && <Strikethrough />}
      </ItemInfo>
      <EditButton onClick={editButtonClick}>ℹ</EditButton>
    </Container>
  )
}
