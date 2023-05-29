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
    <div>
      <label
        htmlFor={name}
        className={`block mb-2 text-sm font-medium text-black dark:text-white ${labelClassName}`}
      >
        {label}
      </label>
      <input
        name={name}
        type={type}
        value={value}
        placeholder={placeholder}
        onChange={onChange}
        className={`
        bg-trasparent border-2 border-main-green
        text-sm rounded-lg placeholder-gray-400 
        focus:ring-darkest-blue focus:border-darkest-blue block w-full p-2.5 
ring-red-800
        dark:border-darkest-blue dark:focus:ring-redborder-darkest-blue dark:focus:border-darkest-blue
        `}
      />
      {children}
    </div>
  )
}
