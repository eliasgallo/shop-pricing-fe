import { ComponentPropsWithoutRef } from 'react'
import { useTranslation } from 'react-i18next'
import styled from 'styled-components'

const NewItem = styled.div`
  ${(props) => props.theme.buttonMixin};
  padding: 5px 5px;
  cursor: pointer;
  width: fit-content;
  place-self: end;
`
type NewItemProps = ComponentPropsWithoutRef<'div'>
export const NewItemComponent = ({ ...restProps }: NewItemProps) => (
  <NewItem {...restProps}>{useTranslation().t('list.new-item-button')}</NewItem>
)
