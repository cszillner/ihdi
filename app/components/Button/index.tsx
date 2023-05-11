import React, { type ComponentPropsWithRef } from 'react'

type ButtonProps = ComponentPropsWithRef<'button'>
type ButtonRef = React.Ref<HTMLButtonElement>

const Button = React.forwardRef(({ className, ...props }: ButtonProps, ref: ButtonRef) => {
  return (
    <button 
      ref={ref}
      className={`
        px-4
        py-2
        outline-none
        border-2
        border-blue-500
        rounded
        text-white
        font-bold
        text-lg
        bg-blue-500
        hover:bg-blue-600
        active:bg-blue-700
        focus:border-blue-700
        disabled:opacity-50
        disabled:pointer-events-none
        transition-all
        duration-300
        ${className}
      `}
      { ...props }
    />
  )
})

Button.displayName = 'Button'

export { Button }
