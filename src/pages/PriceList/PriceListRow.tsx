import styled from 'styled-components'
import {
  ComparisonPriceType,
  PriceItem,
  ReliabilityType,
  TagTypeShort,
} from '@types'

type PriceListRowProps = {
  item: PriceItem
  onRowClick: () => void
}

const Container = styled.div`
  border: solid 2px;
  border-radius: 5px;
  display: flex;
  position: relative;
  justify-content: space-between;
`

const ItemInfo = styled.span`
  padding: 10px 0 10px 5px;
  flex-grow: 1;
  overflow: hidden;
  text-overflow: ellipsis;
  cursor: pointer;
`
const prettyTags = (tags: string[]): string =>
  tags
    .slice()
    .sort()
    .map((tag) => TagTypeShort[tag])
    .join('')

const itemInfo = (item: PriceItem): string => {
  const tags = item.tags.length > 0 && prettyTags(item.tags)
  const price =
    item.comparison_price > 0 &&
    `${item.comparison_price}${ComparisonPriceType[item.comparison_price_unit]}`
  const reliability = ReliabilityType[item.reliability]

  return [tags, item.name, price, reliability].filter(Boolean).join(' ')
}

export const PriceListRow = ({ item, onRowClick }: PriceListRowProps) => {
  return (
    <Container>
      <ItemInfo onClick={onRowClick}>{itemInfo(item)}</ItemInfo>
    </Container>
  )
}
