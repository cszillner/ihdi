import { type ComponentPropsWithoutRef } from "react"

type InputProps = ComponentPropsWithoutRef<'input'> & {
  label: string
}

export function Input(props: InputProps) {
  return (
    <label className="grid font-bold">
      {props.label}
      <input 
        type={props.type} 
        className="
          px-4
          py-2
          border-2
          border-gray-300
          rounded
          outline-none
          font-normal
          text-lg
          hover:border-blue-500
          focus:border-blue-700
          transition-all
          duration-300
        "
        { ...props }
      />
    </label>
  )
}