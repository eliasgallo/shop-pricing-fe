import { styled } from 'styled-components'

interface CheckboxComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
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
