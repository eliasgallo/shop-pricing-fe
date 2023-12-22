import { ComponentPropsWithoutRef } from 'react'
import styled from 'styled-components'

const NewItem = styled.div`
  background-color: #24a0ed;
  color: white;
  padding: 5px 5px;
  border: 2px solid black;
  border-radius: 5px;
  cursor: pointer;
  width: fit-content;
`
type NewItemProps = ComponentPropsWithoutRef<'div'>
export const NewItemComponent = ({ ...restProps }: NewItemProps) => (
  <NewItem {...restProps}>New Item ＋</NewItem>
)
