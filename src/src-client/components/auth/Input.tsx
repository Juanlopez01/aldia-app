import { ChangeEventHandler, ReactElement } from "react"

interface Props {
  name: string
  label: string
  labelClassName?: string
  error?: string
  children?: React.ReactNode
  type: string
  placeholder?: string
  value: string
  onChange: ChangeEventHandler<HTMLInputElement>
}

export default function Input({ label, name,value , error, type,labelClassName, placeholder, children, onChange}: Props): ReactElement {
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
        bg-trasparent border-2 
        text-sm rounded-lg placeholder-gray-400 
        focus:ring-darkest-blue focus:border-darkest-blue block w-full p-2.5 
         dark:focus:ring-darkest-blue dark:focus:border-darkest-blue
        ${error? "border-red-800" : "border-main-green dark:border-darkest-blue"}
        `}
        />
      {error? <p className="text-xs text-red-700">{error}</p>: null}
    </div>
  )
}
