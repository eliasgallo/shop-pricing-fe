type CheckboxComponentProps = {
  label: string
  isChecked: boolean
  onChange: () => void
}

export const CheckboxComponent = ({
  label,
  isChecked,
  onChange,
}: CheckboxComponentProps) => {
  return (
    <label>
      {label}
      <input
        type='checkbox'
        name={label}
        checked={isChecked}
        onChange={onChange}
      />
    </label>
  )
}
