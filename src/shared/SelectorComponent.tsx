import { ChangeEvent } from 'react'

type Props = {
  selectedValue: string
  onChange: (value: string) => void
  allValues: { [key: string]: string }
  name: string
}

export const SelectorComponent = ({
  selectedValue,
  onChange,
  allValues,
  name,
}: Props) => {
  return (
    <select
      name={name}
      value={selectedValue}
      onChange={(e: ChangeEvent<HTMLSelectElement>) => onChange(e.target.value)}
    >
      {Object.keys(allValues).map((key: string) => {
        return (
          <option
            key={key}
            value={key}
          >
            {allValues[key]}
          </option>
        )
      })}
    </select>
  )
}
