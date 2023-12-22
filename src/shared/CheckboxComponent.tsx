import { ComponentPropsWithoutRef } from 'react'
import { styled } from 'styled-components'

type CheckboxComponentProps = ComponentPropsWithoutRef<'input'> & {
  label: string
  isChecked: boolean
}

const Label = styled.label`
  cursor: pointer;
`

export const CheckboxComponent = ({
  label,
  isChecked,
  ...restProps
}: CheckboxComponentProps) => {
  return (
    <Label>
      {label}
      <input
        type='checkbox'
        checked={isChecked}
        {...restProps}
      />
    </Label>
  )
}
