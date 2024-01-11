import { styled } from 'styled-components'

type PickerProps = {
  current: string
  setCurrent: (newCurrent: string) => void
  allOptions: string[]
  labelText: string
}

const Select = styled.select`
  text-transform: capitalize;
`

export const SimplePicker = ({
  current,
  setCurrent,
  allOptions,
  labelText,
}: PickerProps): JSX.Element => {
  return (
    <label>
      {`${labelText}: `}
      <Select
        name='simple_picker_select'
        value={current}
        onChange={(e: React.ChangeEvent<HTMLSelectElement>) =>
          setCurrent(e.target.value)
        }
      >
        {allOptions.map((mode: string) => (
          <option key={mode}>{mode}</option>
        ))}
      </Select>
    </label>
  )
}
