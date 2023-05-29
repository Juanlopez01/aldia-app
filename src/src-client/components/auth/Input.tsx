import { ChangeEventHandler, ReactElement } from "react"

interface Props {
  name: string
  label: string
  labelClassName?: string
  children?: React.ReactNode
  type: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Input({ label, name,value , type,labelClassName, placeholder, children, onChange}: Props): ReactElement {
  return (
    <>
      <label htmlFor={name} className={labelClassName}>
        {label}
      </label>
      <input name={name} type={type} value={value} placeholder={placeholder} onChange={onChange} />
      {children}
    </>
  )
}
