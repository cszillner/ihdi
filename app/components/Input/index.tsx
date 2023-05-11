import React, { type ComponentPropsWithRef } from 'react'

type InputProps = ComponentPropsWithRef<'input'> & {
  label?: string
}
type InputRef = React.Ref<HTMLInputElement>

const Input = React.forwardRef(({ label, className, ...props}: InputProps, ref: InputRef) => {
  return (
    <label className="grid font-bold">
      {label}
      <input 
        ref={ref}
        className={`
          px-4
          py-2
          outline-none
          rounded
          border-2
          border-gray-300
          font-normal
          text-lg
          hover:border-blue-500
          focus:border-blue-700
          focus:text-blue-600
          transition-all
          duration-300
          ${className}
        `}
        { ...props }
      />
    </label>
  )
})

Input.displayName = 'Input'

export { Input }