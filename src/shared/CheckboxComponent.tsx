interface CheckboxComponentProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  label: string
  isChecked: boolean
}

export const CheckboxComponent = ({
  label,
  isChecked,
  ...restProps
}: CheckboxComponentProps) => {
  return (
    <label>
      {label}
      <input
        type='checkbox'
        checked={isChecked}
        {...restProps}
      />
    </label>
  )
}
