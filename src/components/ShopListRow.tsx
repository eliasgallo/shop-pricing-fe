import styled from 'styled-components'
import { PriceUnitTypes, ShoppingItem } from '../store/common-models'

type ShopListRowProps = {
  item: ShoppingItem
  updateItem: (item: ShoppingItem) => void
  editButtonClick: () => void
}

// TODO: prettier
const Container = styled.div`
  border: solid 2px;
  border-radius: 5px;
  display: flex;
  position: relative;
  justify-content: space-between;
`

const ItemInfo = styled.label`
  padding: 10px 0 10px 5px;

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

export const ShopListRow = ({
  item,
  updateItem,
  editButtonClick,
}: ShopListRowProps) => {
  // const checkLabel: string = item.checked ? '🟩' : '⬜️'
  const itemInfo: string = ` ${item.quantity_value} ${item.quantity_type} ${
    item.name
  } ${item.price}${PriceUnitTypes[item.price_unit]}${item.offer && '🔖'}`

  const itemChecked = (): void => {
    item.checked = !item.checked
    updateItem(item)
  }

  return (
    <Container>
      <ItemInfo onClick={itemChecked}>
        {`${itemInfo}`}
        {item.checked && <Strikethrough />}
      </ItemInfo>
      <EditButton onClick={editButtonClick}>ℹ</EditButton>
    </Container>
  )
}
