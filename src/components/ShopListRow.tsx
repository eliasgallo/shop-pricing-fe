import styled from 'styled-components'
import { ShoppingItemType } from './response-api-types'

type ShopListRowProps = {
  item: ShoppingItemType
  updateItem: (item: ShoppingItemType) => void
  editButtonClick: () => void
}

// TODO: prettier
const Container = styled.div`
  border: solid 2px;
  border-radius: 5px;
  display: flex;
  position: relative;
`

const ItemInfo = styled.div`
  margin-right: auto;
  padding: 10px 0;
  padding-left: 10px;
  width: 100%; // click area
`

const EditButton = styled.label`
  padding: 10px;
  align-self: center;
`

const Strikethrough = styled.div`
  position: absolute;
  top: calc(50% + 1px);
  border-bottom: 2px solid;
  width: 100%;
`

export const ShopListRow = ({ item, updateItem }: ShopListRowProps) => {
  // const checkLabel: string = item.checked ? '🟩' : '⬜️'
  const itemInfo: string = ` ${item.quantity_value} ${item.quantity_type} ${item.name} ${item.price}${item.price_unit}`

  const itemChecked = () => {
    item.checked = !item.checked
    updateItem(item)
  }

  return (
    <Container>
      <ItemInfo onClick={itemChecked}>{`${itemInfo}`}</ItemInfo>
      <EditButton>{'>'}</EditButton>
      {item.checked && <Strikethrough />}
    </Container>
  )
}
