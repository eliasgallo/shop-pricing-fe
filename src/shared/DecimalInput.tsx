import { ChangeEvent, useState } from 'react'

interface DecimalInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  decimals: number
  startValue: number
  name: string
  valueChanged: (newValue: number) => void
}

const placeholder = (decimals: number) => {
  const base = '14'
  return decimals > 0 ? `${base}.${'9'.repeat(decimals)}` : base
}

export const DecimalInput = ({
  decimals,
  startValue,
  valueChanged,
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
        valueChanged(parseFloat(newValue))
      }}
      inputMode='decimal' // for phones?
      {...restProps}
    />
  )
}
