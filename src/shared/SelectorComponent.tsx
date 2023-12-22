import { OverrideProps } from '@types'
import { ComponentPropsWithoutRef } from 'react'

type SelectorProps = OverrideProps<
  ComponentPropsWithoutRef<'select'>,
  { onChange: (value: string) => void }
> & {
  selectedValue: string
  allValues: { [key: string]: string }
}

export const SelectorComponent = ({
  selectedValue,
  allValues,
  onChange,
  ...restProps
}: SelectorProps) => {
  return (
    <select
      value={selectedValue}
      onChange={(e) => {
        onChange(e.target.value)
      }}
      {...restProps}
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
