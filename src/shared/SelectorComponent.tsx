interface Props extends React.SelectHTMLAttributes<HTMLSelectElement> {
  selectedValue: string
  allValues: { [key: string]: string }
}

export const SelectorComponent = ({
  selectedValue,
  allValues,
  ...restProps
}: Props) => {
  return (
    <select
      value={selectedValue}
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
