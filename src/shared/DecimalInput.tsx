import { OverrideProps } from '@types'
import { ChangeEvent, ComponentPropsWithoutRef, useState } from 'react'

type DecimalInputProps = OverrideProps<
  ComponentPropsWithoutRef<'input'>,
  { onChange: (value: number) => void }
> & {
  decimals: number
  startValue: number
  name: string
}

const placeholder = (decimals: number) => {
  const base = '14'
  return decimals > 0 ? `${base}.${'9'.repeat(decimals)}` : base
}

export const DecimalInput = ({
  decimals,
  startValue,
  onChange,
  ...restProps
}: DecimalInputProps) => {
  const [value, setValue] = useState(startValue.toString())
  return (
    <input
      placeholder={placeholder(decimals)}
      value={value}
      onChange={(e: ChangeEvent<HTMLInputElement>) => {
        const newValue: string = e.target.value
          .replace(',', '.')
          .replace(RegExp(`^(\\d+(?:.\\d{0,${decimals}})?).*`, 'gm'), '$1')
        setValue(newValue)
        onChange(parseFloat(newValue))
      }}
      inputMode='decimal' // for phones?
      {...restProps}
    />
  )
}
